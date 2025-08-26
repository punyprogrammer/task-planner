'use client';

import { BarChart3, Calendar, Clock, Target } from 'lucide-react';

export type TabType = 'daily' | 'weekly' | 'monthly' | 'stats';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'daily' as TabType, label: 'Daily Goals', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { id: 'weekly' as TabType, label: 'Weekly Goals', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { id: 'monthly' as TabType, label: 'Monthly Goals', icon: Target, color: 'from-green-500 to-green-600' },
    { id: 'stats' as TabType, label: 'Statistics', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <nav className="relative bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-md border-b border-gray-700/30">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex space-x-1 py-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium rounded-xl transition-all duration-300 group whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl opacity-90`}></div>
                )}
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300'
                  }`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm">
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.id === 'daily' ? 'Daily' : 
                       tab.id === 'weekly' ? 'Weekly' : 
                       tab.id === 'monthly' ? 'Monthly' : 'Stats'}
                    </span>
                  </span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
