import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, XCircle, Settings, Filter, Search } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationsPluginProps {
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationsPlugin: React.FC<NotificationsPluginProps> = ({ onNotificationClick }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New User Registration',
      message: 'John Doe has registered for an account',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
      category: 'users',
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Database Backup Complete',
      message: 'Daily database backup completed successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      category: 'system',
      priority: 'low'
    },
    {
      id: '3',
      title: 'Plugin Update Available',
      message: 'SEO Optimizer plugin has an update available',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      category: 'plugins',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected',
      type: 'error',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: false,
      category: 'security',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Page Published',
      message: 'About Us page has been published successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: true,
      category: 'content',
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'read' && notif.read) || 
                         (filter === 'unread' && !notif.read);
    const matchesCategory = categoryFilter === 'all' || notif.category === categoryFilter;
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;
  const categories = ['all', ...Array.from(new Set(notifications.map(notif => notif.category)))];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unreadCount} unread of {notifications.length} total
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllAsRead}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
            >
              Mark all read
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-500 dark:text-gray-400">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    onNotificationClick?.(notification);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Notification Settings</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Push notifications</span>
              <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Sound alerts</span>
              <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPlugin;