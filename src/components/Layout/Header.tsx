import React, { useState } from 'react';
import { Search, Bell, User, Moon, Sun, LogOut, Settings, Shield } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  user: { name: string; email: string; avatar?: string };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onDarkModeToggle, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New user registered', time: '5 min ago', type: 'user' },
    { id: 2, title: 'Database backup completed', time: '1 hour ago', type: 'system' },
    { id: 3, title: 'Plugin update available', time: '2 hours ago', type: 'plugin' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search pages, users, settings..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Security</span>
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;