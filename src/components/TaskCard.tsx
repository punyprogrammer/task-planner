'use client';

import { useState } from 'react';
import { Task, TaskStatus, TaskSection } from '@/types/task';
import { formatTime, getStatusColor, getStatusIcon } from '@/utils/stats';
import { ChevronDown, Edit3, Trash2, Move, Clock, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newSection: TaskSection) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete, onMove }: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const handleStatusChange = (newStatus: TaskStatus) => {
    const updates: Partial<Task> = { status: newStatus };
    if (newStatus === TaskStatus.COMPLETED) {
      updates.completedAt = new Date();
    } else {
      updates.completedAt = undefined;
    }
    onUpdate(task.id, updates);
  };

  const handleCompletionTimeChange = (minutes: number) => {
    onUpdate(task.id, { completionTime: minutes });
  };

  const getSectionName = (section: TaskSection) => {
    switch (section) {
      case TaskSection.DAILY: return 'Daily';
      case TaskSection.WEEKLY: return 'Weekly';
      case TaskSection.MONTHLY: return 'Monthly';
    }
  };

  const getSectionIcon = (section: TaskSection) => {
    switch (section) {
      case TaskSection.DAILY: return <Calendar className="w-3 h-3" />;
      case TaskSection.WEEKLY: return <Clock className="w-3 h-3" />;
      case TaskSection.MONTHLY: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="group bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <span className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
              <span className="mr-1 sm:mr-1.5 text-sm">{getStatusIcon(task.status)}</span>
              <span className="hidden sm:inline">{task.status.replace('-', ' ')}</span>
              <span className="sm:hidden">{task.status.split('-')[0]}</span>
            </span>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs text-gray-400 bg-gray-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-700/50">
              {getSectionIcon(task.section)}
              <span className="hidden sm:inline">{getSectionName(task.section)}</span>
              <span className="sm:hidden">{getSectionName(task.section).slice(0, 1)}</span>
            </span>
          </div>
          
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-1">{task.title}</h3>
          
          {task.description && (
            <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Est: {formatTime(task.estimatedTime)}</span>
            </div>
            {task.completionTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Actual: {formatTime(task.completionTime)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{task.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-2 sm:ml-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 group-hover:bg-gray-700/50"
          >
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-4 sm:space-y-6">
          {/* Status Management */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Update Status</label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.values(TaskStatus).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    task.status === status
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Completion Time Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Actual Time Spent (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={task.completionTime || ''}
              onChange={(e) => handleCompletionTimeChange(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
              placeholder="Enter actual time spent"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4">
            <button
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">Edit</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Move className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Move</span>
                <span className="sm:hidden">Move</span>
              </button>
              
              {showMoveMenu && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 min-w-48">
                  {Object.values(TaskSection).map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        onMove(task.id, section);
                        setShowMoveMenu(false);
                      }}
                      className="block w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-700 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                    >
                      Move to {getSectionName(section)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => onDelete(task.id)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Delete</span>
              <span className="sm:hidden">Del</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
