import Dexie, { Table } from 'dexie';
import { Task } from '@/store/tasks';

export class LocalDB extends Dexie {
  tasks!: Table<Task & { synced: boolean }>;

  constructor() {
    super('autoschedule-ai-db');
    this.version(1).stores({
      tasks: '++id, name, duration, category, status, deadline, synced',
    });
  }
}

export const db = new LocalDB();