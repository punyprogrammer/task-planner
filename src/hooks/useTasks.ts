'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskSection, TaskStatus } from '@/types/task';
import { storage } from '@/utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadTasks = () => {
      const storedTasks = storage.getTasks();
      setTasks(storedTasks);
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      storage.saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask = storage.addTask(taskData);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const updatedTask = storage.updateTask(id, updates);
    if (updatedTask) {
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    }
    return updatedTask;
  }, []);

  const deleteTask = useCallback((id: string) => {
    const success = storage.deleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
    return success;
  }, []);

  const moveTask = useCallback((id: string, newSection: TaskSection) => {
    const movedTask = storage.moveTask(id, newSection);
    if (movedTask) {
      setTasks(prev => prev.map(task => task.id === id ? movedTask : task));
    }
    return movedTask;
  }, []);

  const getTasksBySection = useCallback((section: TaskSection) => {
    return tasks.filter(task => task.section === section);
  }, [tasks]);

  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksBySection,
    getTasksByStatus,
  };
};
