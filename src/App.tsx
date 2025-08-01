import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import EnhancedLoginForm from './components/Auth/EnhancedLoginForm';
import PublicApp from './components/Public/PublicApp';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import RealTimeDashboard from './components/Dashboard/RealTimeDashboard';
import PageBuilder from './components/PageBuilder/PageBuilder';
import UserManagement from './components/Users/UserManagement';
import PluginManagement from './components/Plugins/PluginManagement';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import DatabaseManager from './components/Database/DatabaseManager';
import SettingsPanel from './components/Settings/SettingsPanel';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [isPublicView, setIsPublicView] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // Show public frontend by default for non-authenticated users
  if (isPublicView && !user) {
    return (
      <div className="relative">
        <PublicApp />
        {/* Admin Access Button */}
        <button
          onClick={() => setIsPublicView(false)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          Admin Login
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <RealTimeDashboard />;
      case 'pages':
        return <PageBuilder />;
      case 'users':
        return <UserManagement />;
      case 'plugins':
        return <PluginManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'database':
        return <DatabaseManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <RealTimeDashboard />;
    }
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="flex h-screen">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                darkMode={darkMode}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                user={user || { name: 'User', email: 'user@example.com' }}
                onLogout={logout}
              />
              <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {renderContent()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;