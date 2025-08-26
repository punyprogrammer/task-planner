import { Task, TaskSection, TaskStatus } from '@/types/task';

const STORAGE_KEY = 'task-planner-tasks';
const BANDWIDTH_KEY = 'task-planner-daily-bandwidth';

export const storage = {
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const tasks = JSON.parse(stored);
      return tasks.map((task: Partial<Task> & { createdAt: string; updatedAt: string; completedAt?: string }) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  },

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
    const tasks = storage.getTasks();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    tasks.push(newTask);
    storage.saveTasks(tasks);
    return newTask;
  },

  updateTask: (id: string, updates: Partial<Task>): Task | null => {
    const tasks = storage.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;
    
    const updatedTask: Task = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    tasks[index] = updatedTask;
    storage.saveTasks(tasks);
    return updatedTask;
  },

  deleteTask: (id: string): boolean => {
    const tasks = storage.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    storage.saveTasks(filteredTasks);
    return true;
  },

  moveTask: (id: string, newSection: TaskSection): Task | null => {
    return storage.updateTask(id, { section: newSection });
  },

  getTasksBySection: (section: TaskSection): Task[] => {
    return storage.getTasks().filter(task => task.section === section);
  },

  getTasksByStatus: (status: TaskStatus): Task[] => {
    return storage.getTasks().filter(task => task.status === status);
  },

  // Bandwidth management
  getDailyBandwidth: (): number => {
    if (typeof window === 'undefined') return 480; // Default 8 hours
    
    try {
      const stored = localStorage.getItem(BANDWIDTH_KEY);
      return stored ? parseInt(stored) : 480;
    } catch (error) {
      console.error('Error loading daily bandwidth from localStorage:', error);
      return 480;
    }
  },

  saveDailyBandwidth: (bandwidth: number): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(BANDWIDTH_KEY, bandwidth.toString());
    } catch (error) {
      console.error('Error saving daily bandwidth to localStorage:', error);
    }
  },
};
