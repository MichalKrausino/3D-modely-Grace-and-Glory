import { db } from './db';
import api from './api';
import { useOfflineTasksStore } from '@/store/offline-tasks';

export const syncService = {
  sync: async () => {
    const isOnline = navigator.onLine;
    if (!isOnline) {
      console.log('App is offline, skipping sync.');
      return;
    }

    console.log('App is online, starting sync...');

    const unsyncedTasks = await db.tasks.where('synced').equals(0).toArray();

    if (unsyncedTasks.length > 0) {
      console.log(`Found ${unsyncedTasks.length} unsynced tasks. Pushing to server...`);
      for (const task of unsyncedTasks) {
        try {
          const { id, ...taskData } = task;
          await api.post('/tasks', taskData);
          await db.tasks.update(id, { synced: 1 });
        } catch (error) {
          console.error('Failed to sync task to server:', error);
        }
      }
    } else {
      console.log('No unsynced tasks to push.');
    }

    try {
      console.log('Fetching latest tasks from server...');
      const serverTasks = await api.get('/tasks');
      await db.tasks.clear();
      await db.tasks.bulkAdd(serverTasks.data.map((task: any) => ({ ...task, synced: 1 })));
      console.log('Local database updated with server data.');
    } catch (error) {
      console.error('Failed to fetch tasks from server:', error);
    }

    // Refresh the local store
    await useOfflineTasksStore.getState().fetchTasks();
  },

  start: () => {
    window.addEventListener('online', syncService.sync);
    syncService.sync(); // Initial sync
  },

  stop: () => {
    window.removeEventListener('online', syncService.sync);
  },
};