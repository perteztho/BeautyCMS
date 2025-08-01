import React, { useState, useEffect } from 'react';
import { Database, Plus, Edit, Trash2, Search, Filter, Download, Upload, RefreshCw, AlertCircle } from 'lucide-react';
import DatabaseConnection from './DatabaseConnection';
import { apiService } from '../../services/api';

interface DatabaseRecord {
  id: string;
  table: string;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface DatabaseTable {
  name: string;
  columns: string[];
  recordCount: number;
  lastUpdated: string;
}

const DatabaseManager: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tables: DatabaseTable[] = [
    {
      name: 'users',
      columns: ['id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'pages',
      columns: ['id', 'title', 'slug', 'content', 'status', 'author_id', 'created_at', 'updated_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'plugins',
      columns: ['id', 'name', 'slug', 'version', 'is_active', 'settings', 'created_at', 'updated_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'media',
      columns: ['id', 'filename', 'original_name', 'mime_type', 'file_size', 'file_path', 'uploaded_by', 'created_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'notifications',
      columns: ['id', 'title', 'message', 'type', 'category', 'priority', 'user_id', 'is_read', 'created_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'analytics',
      columns: ['id', 'page_id', 'visits', 'unique_visitors', 'bounce_rate', 'avg_session_duration', 'date', 'created_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'settings',
      columns: ['id', 'setting_key', 'setting_value', 'setting_type', 'category', 'created_at', 'updated_at'],
      recordCount: 0,
      lastUpdated: new Date().toISOString()
    }
  ];

  const [tableData, setTableData] = useState<any[]>([]);

  const checkConnection = async () => {
    try {
      const response = await apiService.healthCheck();
      setIsConnected(!!response.data);
      setError(null);
    } catch (err) {
      setIsConnected(false);
      setError('Failed to connect to database');
    }
  };

  const loadTableData = async () => {
    if (!isConnected) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (selectedTable) {
        case 'users':
          response = await apiService.getUsers({ limit: 100 });
          setTableData(response.data?.users || []);
          break;
        case 'pages':
          response = await apiService.getPages({ limit: 100 });
          setTableData(response.data?.pages || []);
          break;
        default:
          setTableData([]);
          break;
      }
    } catch (err) {
      setError(`Failed to load ${selectedTable} data`);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (isConnected) {
      loadTableData();
    }
  }, [selectedTable, isConnected]);

  const currentTable = tables.find(t => t.name === selectedTable);
  
  const filteredData = tableData.filter(record => {
    if (!searchTerm) return true;
    return Object.values(record).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderCellValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    return value.toString();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Database Manager</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your XAMPP MySQL database tables and records
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={loadTableData}
              disabled={!isConnected || loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button 
              disabled={!isConnected}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button 
              disabled={!isConnected}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Database Connection Status */}
        <div className="mb-6">
          <DatabaseConnection />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {isConnected ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tables</h3>
              <div className="space-y-2">
                {tables.map((table) => (
                  <button
                    key={table.name}
                    onClick={() => setSelectedTable(table.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTable === table.name
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span className="font-medium">{table.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {selectedTable === table.name ? filteredData.length : '...'} records
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {currentTable?.name} ({filteredData.length} records)
                  </h3>
                  <button 
                    onClick={loadTableData}
                    disabled={loading}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="p-8 text-center">
                    <Database className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">No records found</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        {currentTable?.columns.map((column) => (
                          <th
                            key={column}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((record, index) => (
                        <tr key={record.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          {currentTable?.columns.map((column) => (
                            <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {renderCellValue(record[column])}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Database Not Connected</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please ensure XAMPP MySQL is running and check the connection above.
          </p>
        </div>
      )}
    </div>
  );
};

export default DatabaseManager;