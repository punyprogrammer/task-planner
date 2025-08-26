import { Task, TaskStats, MonthlyStats, TaskStatus } from '@/types/task';
import { format } from 'date-fns';

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
  const inProgress = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length;
  const notStarted = tasks.filter(task => task.status === TaskStatus.NOT_STARTED).length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    completionRate: Math.round(completionRate * 100) / 100,
  };
};

export const getMonthlyStats = (tasks: Task[]): MonthlyStats[] => {
  const monthlyMap = new Map<string, Task[]>();

  tasks.forEach(task => {
    const monthKey = format(task.createdAt, 'yyyy-MM');
    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, []);
    }
    monthlyMap.get(monthKey)!.push(task);
  });

  return Array.from(monthlyMap.entries())
    .map(([month, monthTasks]) => ({
      month,
      stats: calculateTaskStats(monthTasks),
    }))
    .sort((a, b) => b.month.localeCompare(a.month));
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'text-green-400 bg-green-400/10 border-green-400/20';
    case TaskStatus.IN_PROGRESS:
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case TaskStatus.NOT_STARTED:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

export const getStatusIcon = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return '✓';
    case TaskStatus.IN_PROGRESS:
      return '⟳';
    case TaskStatus.NOT_STARTED:
      return '○';
    default:
      return '○';
  }
};
