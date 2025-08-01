import React, { useState } from 'react';
import { Plus, Search, Settings, ToggleLeft as Toggle, Download, Trash2, Star, Shield, Zap, Edit, FileText, Image, Bell, Eye, X } from 'lucide-react';
import WYSIWYGEditor from './WYSIWYGEditor';
import MarkdownEditor from './MarkdownEditor';
import ImageUploader from './ImageUploader';
import NotificationsPlugin from './NotificationsPlugin';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: string;
  isActive: boolean;
  isInstalled: boolean;
  rating: number;
  downloads: number;
  icon: string;
  component?: React.ComponentType<any>;
}

const PluginManagement: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: '1',
      name: 'WYSIWYG Editor',
      description: 'Rich text editor with formatting tools, image insertion, and real-time preview capabilities.',
      version: '3.2.1',
      author: 'Editor Pro',
      category: 'Editors',
      isActive: true,
      isInstalled: true,
      rating: 4.9,
      downloads: 25430,
      icon: '✏️',
      component: WYSIWYGEditor
    },
    {
      id: '2',
      name: 'Markdown Editor',
      description: 'Professional markdown editor with live preview, syntax highlighting, and export options.',
      version: '2.8.0',
      author: 'Markdown Team',
      category: 'Editors',
      isActive: true,
      isInstalled: true,
      rating: 4.8,
      downloads: 18920,
      icon: '📝',
      component: MarkdownEditor
    },
    {
      id: '3',
      name: 'Image Uploader',
      description: 'Advanced image upload system with drag-and-drop, preview, and batch processing capabilities.',
      version: '1.9.2',
      author: 'Media Tools',
      category: 'Media',
      isActive: true,
      isInstalled: true,
      rating: 4.7,
      downloads: 22100,
      icon: '🖼️',
      component: ImageUploader
    },
    {
      id: '4',
      name: 'Notifications System',
      description: 'Comprehensive notification management with real-time alerts, filtering, and customization.',
      version: '2.1.5',
      author: 'NotifyPro',
      category: 'Communication',
      isActive: true,
      isInstalled: true,
      rating: 4.6,
      downloads: 16780,
      icon: '🔔',
      component: NotificationsPlugin
    },
    {
      id: '5',
      name: 'SEO Optimizer',
      description: 'Advanced SEO tools for optimizing your website content and improving search rankings.',
      version: '2.1.0',
      author: 'SEO Team',
      category: 'SEO',
      isActive: true,
      isInstalled: true,
      rating: 4.8,
      downloads: 12430,
      icon: '🔍'
    },
    {
      id: '6',
      name: 'Contact Form Builder',
      description: 'Create beautiful contact forms with drag-and-drop functionality and spam protection.',
      version: '1.5.2',
      author: 'Form Studio',
      category: 'Forms',
      isActive: true,
      isInstalled: true,
      rating: 4.6,
      downloads: 8920,
      icon: '📋'
    },
    {
      id: '7',
      name: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting tools to track user engagement and site performance.',
      version: '3.0.1',
      author: 'Analytics Pro',
      category: 'Analytics',
      isActive: false,
      isInstalled: true,
      rating: 4.9,
      downloads: 15650,
      icon: '📊'
    },
    {
      id: '8',
      name: 'Security Scanner',
      description: 'Advanced security scanning and vulnerability detection for your website.',
      version: '1.2.0',
      author: 'SecureWeb',
      category: 'Security',
      isActive: false,
      isInstalled: false,
      rating: 4.7,
      downloads: 6780,
      icon: '🛡️'
    },
    {
      id: '9',
      name: 'Performance Monitor',
      description: 'Monitor website performance, loading times, and optimize for better user experience.',
      version: '2.3.0',
      author: 'SpeedTools',
      category: 'Performance',
      isActive: false,
      isInstalled: false,
      rating: 4.5,
      downloads: 9340,
      icon: '⚡'
    },
    {
      id: '10',
      name: 'Social Media Integration',
      description: 'Seamlessly integrate social media feeds and sharing buttons across your website.',
      version: '1.8.0',
      author: 'SocialConnect',
      category: 'Social',
      isActive: false,
      isInstalled: false,
      rating: 4.3,
      downloads: 11200,
      icon: '🌐'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activePlugin, setActivePlugin] = useState<Plugin | null>(null);
  const [showPluginDemo, setShowPluginDemo] = useState(false);

  const categories = ['all', 'Editors', 'Media', 'Communication', 'SEO', 'Forms', 'Analytics', 'Security', 'Performance', 'Social'];
  const filters = ['all', 'installed', 'active', 'available'];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'installed' && plugin.isInstalled) ||
                         (selectedFilter === 'active' && plugin.isActive) ||
                         (selectedFilter === 'available' && !plugin.isInstalled);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const togglePlugin = (pluginId: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === pluginId ? { ...plugin, isActive: !plugin.isActive } : plugin
    ));
  };

  const installPlugin = (pluginId: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === pluginId ? { ...plugin, isInstalled: true } : plugin
    ));
  };

  const uninstallPlugin = (pluginId: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === pluginId ? { ...plugin, isInstalled: false, isActive: false } : plugin
    ));
  };

  const demoPlugin = (plugin: Plugin) => {
    setActivePlugin(plugin);
    setShowPluginDemo(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Plugin Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Extend your CMS functionality with powerful plugins
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Upload Plugin</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search plugins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filters.map(filter => (
              <option key={filter} value={filter}>
                {filter === 'all' ? 'All Plugins' : 
                 filter === 'installed' ? 'Installed' :
                 filter === 'active' ? 'Active' : 'Available'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <div key={plugin.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                  {plugin.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{plugin.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">v{plugin.version}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{plugin.rating}</span>
                </div>
                {plugin.isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {plugin.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>By {plugin.author}</span>
              <span>{plugin.downloads.toLocaleString()} downloads</span>
            </div>

            <div className="flex items-center space-x-2">
              {plugin.isInstalled ? (
                <>
                  <button
                    onClick={() => togglePlugin(plugin.id)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      plugin.isActive 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {plugin.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  {plugin.component && (
                    <button
                      onClick={() => demoPlugin(plugin)}
                      className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Demo Plugin"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => uninstallPlugin(plugin.id)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Settings className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => installPlugin(plugin.id)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No plugins found matching your criteria</p>
          </div>
        </div>
      )}

      {/* Plugin Demo Modal */}
      {showPluginDemo && activePlugin && activePlugin.component && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{activePlugin.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {activePlugin.name} Demo
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Interactive demonstration of plugin features
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPluginDemo(false)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <activePlugin.component />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginManagement;