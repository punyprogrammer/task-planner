export enum TaskStatus {
  NOT_STARTED = 'not-started',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export enum TaskSection {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number; // in minutes
  completionTime?: number; // in minutes
  status: TaskStatus;
  section: TaskSection;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  completionRate: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM format
  stats: TaskStats;
}
