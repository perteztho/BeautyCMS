import React from 'react';
import StatsCard from './StatsCard';
import { Users, FileText, Database, Activity, TrendingUp, Globe, Shield, Zap } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Pages',
      value: '156',
      change: '+3 new this week',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Database Records',
      value: '15,329',
      change: '+234 today',
      changeType: 'positive' as const,
      icon: Database,
      color: 'bg-purple-500'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'All systems operational',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'bg-emerald-500'
    },
    {
      title: 'Page Views',
      value: '89,423',
      change: '+18% from last week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      title: 'Global Reach',
      value: '45 Countries',
      change: '+2 new regions',
      changeType: 'positive' as const,
      icon: Globe,
      color: 'bg-cyan-500'
    },
    {
      title: 'Security Score',
      value: '95/100',
      change: 'Excellent security',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Performance',
      value: '2.3s',
      change: 'Avg load time',
      changeType: 'neutral' as const,
      icon: Zap,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your CMS today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'john.doe@example.com', time: '5 minutes ago' },
              { action: 'Page "About Us" updated', user: 'admin@cms.com', time: '15 minutes ago' },
              { action: 'Database backup completed', user: 'System', time: '1 hour ago' },
              { action: 'Plugin "SEO Tools" activated', user: 'admin@cms.com', time: '2 hours ago' },
              { action: 'User role updated', user: 'jane.smith@example.com', time: '3 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
          <div className="space-y-4">
            {[
              { service: 'Web Server', status: 'online', uptime: '99.9%' },
              { service: 'Database', status: 'online', uptime: '99.8%' },
              { service: 'File Storage', status: 'online', uptime: '100%' },
              { service: 'Email Service', status: 'online', uptime: '99.7%' },
              { service: 'Backup System', status: 'online', uptime: '99.5%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{service.service}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Online</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{service.uptime} uptime</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;