'use client';

import { useState } from 'react';
import { Task, TaskSection as TaskSectionType } from '@/types/task';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { Plus, Calendar, Clock, Target, TrendingUp } from 'lucide-react';

interface TaskSectionProps {
  section: TaskSectionType;
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newSection: TaskSectionType) => void;
  onAdd: (taskData: {
    title: string;
    description?: string;
    estimatedTime: number;
    status: import('@/types/task').TaskStatus;
    section: TaskSectionType;
  }) => void;
}

export const TaskSection = ({ section, tasks, onUpdate, onDelete, onMove, onAdd }: TaskSectionProps) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const getSectionIcon = () => {
    switch (section) {
      case TaskSectionType.DAILY:
        return <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />;
      case TaskSectionType.WEEKLY:
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6" />;
      case TaskSectionType.MONTHLY:
        return <Target className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const getSectionName = () => {
    switch (section) {
      case TaskSectionType.DAILY:
        return 'Daily Goals';
      case TaskSectionType.WEEKLY:
        return 'Weekly Goals';
      case TaskSectionType.MONTHLY:
        return 'Monthly Goals';
    }
  };

  const getSectionGradient = () => {
    switch (section) {
      case TaskSectionType.DAILY:
        return 'from-blue-500 to-blue-600';
      case TaskSectionType.WEEKLY:
        return 'from-purple-500 to-purple-600';
      case TaskSectionType.MONTHLY:
        return 'from-green-500 to-green-600';
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`p-2 sm:p-3 bg-gradient-to-br ${getSectionGradient()} rounded-xl shadow-lg`}>
              {getSectionIcon()}
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">{getSectionName()}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-xs sm:text-sm text-gray-300">
                    {completedTasks} of {totalTasks} completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getSectionGradient()} rounded-full transition-all duration-500`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-300">{completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${getSectionGradient()} hover:scale-105 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
            {getSectionIcon()}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 sm:mb-3">No tasks yet</h3>
          <p className="text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
            Get started by adding your first task to this section. Organize your goals and track your progress.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${getSectionGradient()} hover:scale-105 text-white rounded-xl font-medium transition-all duration-300 shadow-lg text-sm sm:text-base`}
          >
            Add Your First Task
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(taskData) => {
          onAdd({ ...taskData, section });
          setShowAddModal(false);
        }}
      />
    </div>
  );
};
