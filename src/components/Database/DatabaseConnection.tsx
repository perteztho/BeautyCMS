import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, RefreshCw, Settings, AlertTriangle, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ConnectionStatus {
  connected: boolean;
  message: string;
  timestamp?: string;
}

const DatabaseConnection: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    message: 'Checking connection...'
  });
  const [isChecking, setIsChecking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (error) {
        setConnectionStatus({
          connected: false,
          message: `Supabase connection failed: ${error.message}`
        });
      } else {
        setConnectionStatus({
          connected: true,
          message: 'Supabase database connected successfully',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      setConnectionStatus({
        connected: false,
        message: 'Unable to connect to Supabase'
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${connectionStatus.connected ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <Database className={`w-6 h-6 ${connectionStatus.connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database Connection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Supabase Connection Status</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={checkConnection}
            disabled={isChecking}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>Test Connection</span>
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <div className={`p-4 rounded-lg border ${
        connectionStatus.connected 
          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
          : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
      }`}>
        <div className="flex items-center space-x-3">
          {connectionStatus.connected ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
          <div className="flex-1">
            <p className={`font-medium ${
              connectionStatus.connected 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {connectionStatus.message}
            </p>
            {connectionStatus.timestamp && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Last checked: {new Date(connectionStatus.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      {!connectionStatus.connected && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Supabase Setup Required
              </h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <p>To connect to Supabase, please:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Click the "Connect to Supabase" button in the top right</li>
                  <li>Or manually update the .env file with your Supabase credentials</li>
                  <li>Ensure your Supabase project has the required tables</li>
                </ol>
                <div className="mt-3 p-3 bg-blue-100 dark:bg-blue-900/20 rounded">
                  <p className="font-medium mb-1">Required Environment Variables:</p>
                  <code className="text-xs">
                    VITE_SUPABASE_URL=https://furylakyzlrtnpvpdvbx.supabase.co<br/>
                    VITE_SUPABASE_ANON_KEY=your-anon-key
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Settings */}
      {showSettings && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Supabase Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supabase URL
              </label>
              <input
                type="text"
                value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                readOnly
                className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anon Key
              </label>
              <input
                type="password"
                value={import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••' : 'Not configured'}
                readOnly
                className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              <strong>Note:</strong> Update the .env file with your actual Supabase credentials to enable database functionality.
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {connectionStatus.connected && (
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Supabase Dashboard</span>
          </a>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            View Tables
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
            Run Migrations
          </button>
        </div>
      )}
    </div>
  );
};

export default DatabaseConnection;