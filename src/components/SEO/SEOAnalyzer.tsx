import React, { useState } from 'react';
import { Search, TrendingUp, Link, AlertCircle, CheckCircle, BarChart3, Globe } from 'lucide-react';
import InternalLinkingAnalyzer from './InternalLinkingAnalyzer';
import { generateAnchorTextVariations, analyzeSiteStructure, generateLinkingRecommendations } from '../../utils/seoHelpers';

const SEOAnalyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('linking');

  const tabs = [
    { id: 'linking', label: 'Internal Linking', icon: Link },
    { id: 'structure', label: 'Site Structure', icon: BarChart3 },
    { id: 'recommendations', label: 'Recommendations', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'linking':
        return <InternalLinkingAnalyzer />;
      
      case 'structure':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Site Structure Analysis
            </h3>
            
            {/* URL Structure Recommendations */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                URL Structure Best Practices
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-800 dark:text-green-200">Good URL Examples</span>
                  </div>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li><code>/disaster-alerts/typhoon-warning-signal-2</code></li>
                    <li><code>/resources/emergency-preparedness-guide</code></li>
                    <li><code>/news/community-disaster-drill-2024</code></li>
                    <li><code>/evacuation-centers/pio-duran-elementary</code></li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="font-medium text-red-800 dark:text-red-200">URLs to Avoid</span>
                  </div>
                  <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li><code>/page.php?id=123&type=alert</code></li>
                    <li><code>/news/article_2024_01_15_disaster</code></li>
                    <li><code>/resources/download.php?file=guide.pdf</code></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Link Attributes Guide */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Link Attributes Best Practices
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Link Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Attributes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Internal Links
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>title, aria-label</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>&lt;a href="/alerts" title="Current disaster alerts"&gt;</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        External Links
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>target="_blank" rel="noopener noreferrer"</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>&lt;a href="https://pagasa.dost.gov.ph" target="_blank"&gt;</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Download Links
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>download, type</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>&lt;a href="/guide.pdf" download type="application/pdf"&gt;</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Sponsored Links
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>rel="sponsored nofollow"</code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code>&lt;a href="/partner" rel="sponsored"&gt;</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'recommendations':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              SEO Recommendations
            </h3>
            
            <div className="space-y-6">
              {/* Anchor Text Variations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Anchor Text Variations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                      Emergency Preparedness
                    </h5>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                      <li>• emergency preparedness guide</li>
                      <li>• disaster preparedness resources</li>
                      <li>• how to prepare for emergencies</li>
                      <li>• emergency planning information</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-medium text-green-900 dark:text-green-200 mb-2">
                      Evacuation Centers
                    </h5>
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                      <li>• evacuation centers near you</li>
                      <li>• emergency shelter locations</li>
                      <li>• find evacuation sites</li>
                      <li>• safe evacuation areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Implementation Guidelines */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Implementation Guidelines
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h5 className="font-medium text-yellow-900 dark:text-yellow-200 mb-2">
                      Priority Actions
                    </h5>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
                      <li>Add contextual links from homepage to key disaster preparedness pages</li>
                      <li>Implement breadcrumb navigation on all pages</li>
                      <li>Create topic clusters around emergency preparedness themes</li>
                      <li>Add related article suggestions at the end of news posts</li>
                      <li>Link evacuation center information to the interactive map</li>
                    </ol>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-medium text-purple-900 dark:text-purple-200 mb-2">
                      Technical Implementation
                    </h5>
                    <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-300">
                      <li>• Use semantic HTML5 elements (nav, main, article, section)</li>
                      <li>• Implement structured data for breadcrumbs</li>
                      <li>• Add proper ARIA labels for accessibility</li>
                      <li>• Use descriptive link titles and alt text</li>
                      <li>• Implement proper heading hierarchy (H1-H6)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Analyze and optimize your website's internal linking strategy and SEO structure
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SEOAnalyzer;