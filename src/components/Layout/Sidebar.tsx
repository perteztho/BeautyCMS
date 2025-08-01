import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  Database, 
  Puzzle, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Shield,
  Monitor,
  Palette,
  Search,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-500' },
    { id: 'pages', icon: FileText, label: 'Page Builder', color: 'text-green-500' },
    { id: 'users', icon: Users, label: 'Users', color: 'text-purple-500' },
    { id: 'plugins', icon: Puzzle, label: 'Plugins', color: 'text-orange-500' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-pink-500' },
    { id: 'database', icon: Database, label: 'Database', color: 'text-cyan-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-500' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">AdminCMS</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === item.id ? item.color : ''}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;