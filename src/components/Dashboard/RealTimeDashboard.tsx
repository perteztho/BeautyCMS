import React, { useState, useEffect } from 'react';
import { Users, FileText, Database, Activity, TrendingUp, Globe, Shield, Zap, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import StatsCard from './StatsCard';

interface DashboardStats {
  totalUsers: number;
  activePages: number;
  databaseRecords: number;
  systemHealth: number;
  pageViews: number;
  countries: number;
  securityScore: number;
  avgLoadTime: string;
}

const RealTimeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activePages: 0,
    databaseRecords: 0,
    systemHealth: 99.9,
    pageViews: 0,
    countries: 45,
    securityScore: 95,
    avgLoadTime: '2.3s'
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load users data
      const usersResponse = await apiService.getUsers({ limit: 1000 });
      const totalUsers = usersResponse.data?.pagination?.total || 0;
      
      // Load pages data
      const pagesResponse = await apiService.getPages({ limit: 1000 });
      const activePages = pagesResponse.data?.pages?.filter((page: any) => page.status === 'published').length || 0;
      
      // Simulate other stats (in production, these would come from real APIs)
      setStats({
        totalUsers,
        activePages,
        databaseRecords: totalUsers * 15 + activePages * 8,
        systemHealth: 99.9,
        pageViews: Math.floor(Math.random() * 100000) + 50000,
        countries: 45,
        securityScore: 95,
        avgLoadTime: '2.3s'
      });

      // Mock recent activity
      setRecentActivity([
        { action: `New user registered`, user: 'john.doe@example.com', time: '5 minutes ago' },
        { action: 'Page updated', user: user?.email || 'admin@cms.com', time: '15 minutes ago' },
        { action: 'Database backup completed', user: 'System', time: '1 hour ago' },
        { action: 'Plugin activated', user: user?.email || 'admin@cms.com', time: '2 hours ago' },
        { action: 'User role updated', user: 'jane.smith@example.com', time: '3 hours ago' }
      ]);

      // Mock system status
      setSystemStatus([
        { service: 'Web Server', status: 'online', uptime: '99.9%' },
        { service: 'Database', status: 'online', uptime: '99.8%' },
        { service: 'File Storage', status: 'online', uptime: '100%' },
        { service: 'Email Service', status: 'online', uptime: '99.7%' },
        { service: 'Backup System', status: 'online', uptime: '99.5%' }
      ]);

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Pages',
      value: stats.activePages.toString(),
      change: '+3 new this week',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Database Records',
      value: stats.databaseRecords.toLocaleString(),
      change: '+234 today',
      changeType: 'positive' as const,
      icon: Database,
      color: 'bg-purple-500'
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      change: 'All systems operational',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'bg-emerald-500'
    },
    {
      title: 'Page Views',
      value: stats.pageViews.toLocaleString(),
      change: '+18% from last week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      title: 'Global Reach',
      value: `${stats.countries} Countries`,
      change: '+2 new regions',
      changeType: 'positive' as const,
      icon: Globe,
      color: 'bg-cyan-500'
    },
    {
      title: 'Security Score',
      value: `${stats.securityScore}/100`,
      change: 'Excellent security',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Performance',
      value: stats.avgLoadTime,
      change: 'Avg load time',
      changeType: 'neutral' as const,
      icon: Zap,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your CMS today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <button
              onClick={loadDashboardData}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
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
            {systemStatus.map((service, index) => (
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

export default RealTimeDashboard;