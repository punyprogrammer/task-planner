'use client';

import { useState } from 'react';
import { TaskSection, TaskStatus } from '@/types/task';
import { X, Plus, Calendar, Clock, Target } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (taskData: {
    title: string;
    description?: string;
    estimatedTime: number;
    status: TaskStatus;
    section: TaskSection;
  }) => void;
}

export const AddTaskModal = ({ isOpen, onClose, onAdd }: AddTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedTime: 30,
    section: TaskSection.DAILY,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      estimatedTime: formData.estimatedTime,
      status: TaskStatus.NOT_STARTED,
      section: formData.section,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      estimatedTime: 30,
      section: TaskSection.DAILY,
    });
    onClose();
  };

  if (!isOpen) return null;

  const getSectionIcon = (section: TaskSection) => {
    switch (section) {
      case TaskSection.DAILY: return <Calendar className="w-4 h-4" />;
      case TaskSection.WEEKLY: return <Clock className="w-4 h-4" />;
      case TaskSection.MONTHLY: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Add New Task</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all duration-200"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none"
              rows={3}
              placeholder="Enter task description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Estimated Time (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={formData.estimatedTime}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Section
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Object.values(TaskSection).map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, section }))}
                  className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 ${
                    formData.section === section
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                      : 'bg-gray-800/50 border-gray-600/50 text-gray-400 hover:bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  {getSectionIcon(section)}
                  <span className="text-xs font-medium">
                    {section === TaskSection.DAILY ? 'Daily' : 
                     section === TaskSection.WEEKLY ? 'Weekly' : 'Monthly'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
