import React, { useState } from 'react';
import { TrendingUp, Users, Eye, Clock, Globe, Smartphone, Monitor, Tablet } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Visitors',
      value: '89,423',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Page Views',
      value: '234,567',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      title: 'Avg. Session Duration',
      value: '3m 24s',
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Bounce Rate',
      value: '32.4%',
      change: '-2.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const topPages = [
    { page: '/home', views: 45234, change: '+12%' },
    { page: '/about', views: 23456, change: '+8%' },
    { page: '/contact', views: 12345, change: '+15%' },
    { page: '/blog', views: 8765, change: '+5%' },
    { page: '/products', views: 6543, change: '+22%' }
  ];

  const trafficSources = [
    { source: 'Organic Search', percentage: 45.2, color: 'bg-blue-500' },
    { source: 'Direct', percentage: 23.1, color: 'bg-green-500' },
    { source: 'Social Media', percentage: 15.7, color: 'bg-purple-500' },
    { source: 'Referral', percentage: 10.4, color: 'bg-orange-500' },
    { source: 'Email', percentage: 5.6, color: 'bg-pink-500' }
  ];

  const deviceStats = [
    { device: 'Desktop', icon: Monitor, percentage: 52.3, color: 'bg-blue-500' },
    { device: 'Mobile', icon: Smartphone, percentage: 38.7, color: 'bg-green-500' },
    { device: 'Tablet', icon: Tablet, percentage: 9.0, color: 'bg-purple-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your website performance and user engagement
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{page.page}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{page.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">{page.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{source.source}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Usage</h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${device.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{device.device}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{device.percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Page view', page: '/home', time: '2 minutes ago', location: 'New York, US' },
              { action: 'Form submission', page: '/contact', time: '5 minutes ago', location: 'London, UK' },
              { action: 'Page view', page: '/about', time: '8 minutes ago', location: 'Tokyo, JP' },
              { action: 'User registration', page: '/register', time: '12 minutes ago', location: 'Berlin, DE' },
              { action: 'Page view', page: '/blog', time: '15 minutes ago', location: 'Sydney, AU' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action} on {activity.page}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;