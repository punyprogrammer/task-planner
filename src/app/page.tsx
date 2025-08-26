'use client';

import { useState } from 'react';
import { TaskSection as TaskSectionType } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { Navigation, TabType } from '@/components/Navigation';
import { TaskSection } from '@/components/TaskSection';
import { Stats } from '@/components/Stats';
import { CheckSquare, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const { tasks, isLoading, addTask, updateTask, deleteTask, moveTask, getTasksBySection } = useTasks();

  const getCurrentSection = (): TaskSectionType => {
    switch (activeTab) {
      case 'daily':
        return TaskSectionType.DAILY;
      case 'weekly':
        return TaskSectionType.WEEKLY;
      case 'monthly':
        return TaskSectionType.MONTHLY;
      default:
        return TaskSectionType.DAILY;
    }
  };

  const currentSectionTasks = getTasksBySection(getCurrentSection());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-500/20 border-t-blue-500 mx-auto mb-4 sm:mb-6"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-transparent border-t-blue-400 animate-ping"></div>
          </div>
          <p className="text-gray-300 text-base sm:text-lg font-medium">Loading your tasks...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your productivity dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Task Planner
              </h1>
              <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm sm:text-base">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="hidden sm:inline">Organize your daily, weekly, and monthly goals</span>
                <span className="sm:hidden">Organize your goals</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {activeTab === 'stats' ? (
            <div className="animate-fade-in">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
                <p className="text-gray-400 text-sm sm:text-base">Track your productivity and progress over time</p>
              </div>
              <Stats tasks={tasks} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {activeTab === 'daily' ? 'Daily Goals' : 
                   activeTab === 'weekly' ? 'Weekly Goals' : 'Monthly Goals'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  {activeTab === 'daily' ? 'Focus on today\'s priorities' : 
                   activeTab === 'weekly' ? 'Plan your week ahead' : 'Set long-term objectives'}
                </p>
              </div>
              <TaskSection
                section={getCurrentSection()}
                tasks={currentSectionTasks}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onMove={moveTask}
                onAdd={addTask}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-t border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Task Planner - Built with Next.js, TypeScript, and localStorage
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
