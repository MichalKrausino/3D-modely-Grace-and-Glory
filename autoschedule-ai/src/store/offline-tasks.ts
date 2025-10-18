import { create } from 'zustand';
import { db } from '@/lib/db';
import { Task, TaskStatus } from './tasks';

interface OfflineTasksState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'status'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTasks: () => Promise<Task[]>;
}

export const useOfflineTasksStore = create<OfflineTasksState>((set, get) => ({
  tasks: [],
  fetchTasks: async () => {
    const tasks = await db.tasks.toArray();
    set({ tasks });
  },
  addTask: async (task) => {
    const newTask = { ...task, id: crypto.randomUUID(), status: 'Planned' as TaskStatus, synced: false };
    await db.tasks.add(newTask);
    await get().fetchTasks();
  },
  updateTaskStatus: async (taskId, status) => {
    await db.tasks.update(taskId, { status, synced: false });
    await get().fetchTasks();
  },
  deleteTask: async (taskId) => {
    await db.tasks.delete(taskId);
    await get().fetchTasks();
  },
  getTasks: async () => {
    return await db.tasks.toArray();
  },
}));