import React, { useState } from 'react';
import { Settings, User, Shield, Bell, Database, Palette, Globe, Mail, Save, Server, Code, Zap, Monitor, Wifi, HardDrive, Cloud, Key, Lock, Eye, EyeOff } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const sections = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'database', icon: Database, label: 'Database' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'localization', icon: Globe, label: 'Localization' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'api', icon: Code, label: 'API & Integrations' },
    { id: 'performance', icon: Zap, label: 'Performance' },
    { id: 'system', icon: Server, label: 'System' },
    { id: 'backup', icon: Cloud, label: 'Backup & Recovery' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    defaultValue="AdminCMS"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    defaultValue="A powerful content management system for modern websites"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    defaultValue="https://example.com"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="maintenance"
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="maintenance" className="text-sm text-gray-700 dark:text-gray-300">
                      Enable maintenance mode
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="registration"
                      defaultChecked
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="registration" className="text-sm text-gray-700 dark:text-gray-300">
                      Allow user registration
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="comments"
                      defaultChecked
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="comments" className="text-sm text-gray-700 dark:text-gray-300">
                      Enable comments
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    defaultValue="CMS Administrator and Developer"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="admin">Administrator</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="contributor">Contributor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h3>
              <div className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Password Security</h4>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Last password change: 30 days ago. Consider updating your password regularly.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Authenticator App</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Use an app like Google Authenticator</p>
                      </div>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SMS Verification</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive codes via text message</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                        Setup
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Login Security</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="login-alerts"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="login-alerts" className="text-sm text-gray-700 dark:text-gray-300">
                        Email alerts for new logins
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="failed-attempts"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="failed-attempts" className="text-sm text-gray-700 dark:text-gray-300">
                        Lock account after 5 failed attempts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="session-timeout"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="session-timeout" className="text-sm text-gray-700 dark:text-gray-300">
                        Auto-logout after 30 minutes of inactivity
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">New user registrations</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when new users sign up</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Content updates</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notifications for page and post changes</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">System alerts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Important system notifications and errors</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Plugin updates</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notifications for available plugin updates</p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Browser notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Show notifications in your browser</p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Desktop notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">System notifications on your desktop</p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Sound alerts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Play sound for important notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notification Frequency</h4>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="instant">Instant</option>
                    <option value="hourly">Hourly digest</option>
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly digest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Database Settings</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Connection Status</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Connected to MySQL database on localhost
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Database Host
                    </label>
                    <input
                      type="text"
                      defaultValue="localhost"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Port
                    </label>
                    <input
                      type="number"
                      defaultValue="3306"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Database Name
                  </label>
                  <input
                    type="text"
                    defaultValue="admin_cms"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue="admin"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Database Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="ssl"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="ssl" className="text-sm text-gray-700 dark:text-gray-300">
                        Use SSL connection
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-backup"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="auto-backup" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable automatic backups
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="query-cache"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="query-cache" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable query caching
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Test Connection
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Backup Database
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Optimize Tables
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Theme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-3"></div>
                      <p className="font-medium text-gray-900 dark:text-white">Default</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Blue and purple gradient</p>
                    </div>
                    <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer">
                      <div className="w-full h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded mb-3"></div>
                      <p className="font-medium text-gray-900 dark:text-white">Nature</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Green and teal gradient</p>
                    </div>
                    <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer">
                      <div className="w-full h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded mb-3"></div>
                      <p className="font-medium text-gray-900 dark:text-white">Sunset</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Orange and red gradient</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Color Customization</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <input
                        type="color"
                        defaultValue="#3B82F6"
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <input
                        type="color"
                        defaultValue="#8B5CF6"
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        defaultValue="#10B981"
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Warning Color
                      </label>
                      <input
                        type="color"
                        defaultValue="#F59E0B"
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Typography</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Heading Font
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="inter">Inter</option>
                        <option value="roboto">Roboto</option>
                        <option value="open-sans">Open Sans</option>
                        <option value="lato">Lato</option>
                        <option value="montserrat">Montserrat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Body Font
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="inter">Inter</option>
                        <option value="roboto">Roboto</option>
                        <option value="open-sans">Open Sans</option>
                        <option value="lato">Lato</option>
                        <option value="source-sans">Source Sans Pro</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Layout Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sidebar-collapsed"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="sidebar-collapsed" className="text-sm text-gray-700 dark:text-gray-300">
                        Collapse sidebar by default
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rounded-corners"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="rounded-corners" className="text-sm text-gray-700 dark:text-gray-300">
                        Use rounded corners
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="animations"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="animations" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable animations
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API & Integrations</h3>
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Key className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-medium text-green-800 dark:text-green-200">API Status</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    REST API is enabled and functioning properly
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">API Keys</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">Public API Key</span>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value="pk_live_51234567890abcdef"
                          readOnly
                          className="flex-1 p-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm"
                        />
                        <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">Secret API Key</span>
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="password"
                          value="sk_live_51234567890abcdef"
                          readOnly
                          className="flex-1 p-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm"
                        />
                        <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                          Copy
                        </button>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Generate New Keys
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Webhook Endpoints</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">User Registration</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">https://api.example.com/webhooks/user-registration</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded text-xs">
                            Active
                          </span>
                          <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Content Updates</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">https://api.example.com/webhooks/content-updates</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 rounded text-xs">
                            Inactive
                          </span>
                          <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add Webhook
                  </button>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Third-party Integrations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">Google Analytics</h5>
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded text-xs">
                          Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Track website analytics and user behavior
                      </p>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        Configure
                      </button>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">Stripe</h5>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 rounded text-xs">
                          Not Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Accept payments and manage subscriptions
                      </p>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Settings</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Performance Score</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Current performance score: 92/100 (Excellent)
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Caching</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Page Caching</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cache static pages for faster loading</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Database Query Caching</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cache database queries to reduce load times</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Asset Caching</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cache CSS, JS, and image files</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Optimization</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Image Compression</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically compress uploaded images</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">CSS/JS Minification</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Minify CSS and JavaScript files</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Lazy Loading</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Load images and content as needed</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Cache Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cache Expiration (hours)
                      </label>
                      <input
                        type="number"
                        defaultValue="24"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Cache Size (MB)
                      </label>
                      <input
                        type="number"
                        defaultValue="500"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Clear All Cache
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Run Performance Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Backup & Recovery</h3>
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-medium text-green-800 dark:text-green-200">Last Backup</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Successfully completed on January 15, 2024 at 3:00 AM
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Automatic Backups</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-backup-enabled"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="auto-backup-enabled" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable automatic backups
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Backup Frequency
                        </label>
                        <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Backup Time
                        </label>
                        <input
                          type="time"
                          defaultValue="03:00"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Backup Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="backup-database"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="backup-database" className="text-sm text-gray-700 dark:text-gray-300">
                        Include database in backups
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="backup-files"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="backup-files" className="text-sm text-gray-700 dark:text-gray-300">
                        Include uploaded files
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="backup-settings"
                        defaultChecked
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="backup-settings" className="text-sm text-gray-700 dark:text-gray-300">
                        Include configuration settings
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Storage Location</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="local-storage"
                          name="storage"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="local-storage" className="text-sm text-gray-700 dark:text-gray-300">
                          Local Server Storage
                        </label>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cloud-storage"
                          name="storage"
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="cloud-storage" className="text-sm text-gray-700 dark:text-gray-300">
                          Cloud Storage (AWS S3, Google Cloud)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Backups</h4>
                  <div className="space-y-2">
                    {[
                      { date: '2024-01-15', size: '245 MB', status: 'Complete' },
                      { date: '2024-01-14', size: '243 MB', status: 'Complete' },
                      { date: '2024-01-13', size: '241 MB', status: 'Complete' },
                      { date: '2024-01-12', size: '238 MB', status: 'Complete' }
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{backup.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{backup.size}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded text-xs">
                            {backup.status}
                          </span>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                            Download
                          </button>
                          <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
                            Restore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Create Backup Now
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Upload Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section to configure settings</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your CMS settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            {renderSection()}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;