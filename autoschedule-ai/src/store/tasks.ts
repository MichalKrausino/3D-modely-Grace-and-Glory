import { create } from 'zustand';
import api from '@/lib/api';

export type TaskStatus = 'Planned' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  name: string;
  duration: number;
  deadline?: string;
  category: string;
  status: TaskStatus;
}

interface TasksState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'status'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const response = await api.get('/tasks');
    set({ tasks: response.data });
  },
  addTask: async (task) => {
    const response = await api.post('/tasks', task);
    set((state) => ({
      tasks: [...state.tasks, response.data],
    }));
  },
  updateTaskStatus: async (taskId, status) => {
    const response = await api.put(`/tasks/${taskId}`, { status });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? response.data : task
      ),
    }));
  },
  deleteTask: async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));