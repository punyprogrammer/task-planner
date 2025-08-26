'use client';

import { Task, TaskStatus } from '@/types/task';
import { calculateTaskStats, getMonthlyStats } from '@/utils/stats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, Circle, TrendingUp, BarChart3, Activity } from 'lucide-react';

interface StatsProps {
  tasks: Task[];
}

export const Stats = ({ tasks }: StatsProps) => {
  const overallStats = calculateTaskStats(tasks);
  const monthlyStats = getMonthlyStats(tasks);

  const statusData = [
    { name: 'Completed', value: overallStats.completed, color: '#10B981' },
    { name: 'In Progress', value: overallStats.inProgress, color: '#F59E0B' },
    { name: 'Not Started', value: overallStats.notStarted, color: '#6B7280' },
  ];

  const monthlyChartData = monthlyStats.map(({ month, stats }) => ({
    month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    completed: stats.completed,
    inProgress: stats.inProgress,
    notStarted: stats.notStarted,
    completionRate: stats.completionRate,
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'Not Started':
        return <Circle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Total Tasks</p>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{overallStats.total}</p>
            </div>
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-400 mt-1">{overallStats.completed}</p>
            </div>
            <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">In Progress</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-1">{overallStats.inProgress}</p>
            </div>
            <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Completion Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400 mt-1">{overallStats.completionRate}%</p>
            </div>
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Status Distribution Pie Chart */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Task Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#f9fafb',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(value: any, name: any) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-4 sm:mt-6">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                {getStatusIcon(item.name)}
                <span className="text-xs sm:text-sm text-gray-300 font-medium">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Progress Line Chart */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Monthly Completion Rate</h3>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={10}
                className="sm:text-xs"
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={10}
                className="sm:text-xs"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#f9fafb',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(value: any) => [`${value}%`, 'Completion Rate']}
              />
              <Line
                type="monotone"
                dataKey="completionRate"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Task Breakdown */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">Monthly Task Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              fontSize={10}
              className="sm:text-xs"
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={10}
              className="sm:text-xs"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#f9fafb',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              }}
            />
            <Bar dataKey="completed" fill="#10B981" name="Completed" radius={[2, 2, 0, 0]} />
            <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" radius={[2, 2, 0, 0]} />
            <Bar dataKey="notStarted" fill="#6B7280" name="Not Started" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
