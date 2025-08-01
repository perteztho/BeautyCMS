import React, { useState, useEffect } from 'react';
import { Link, ExternalLink, Search, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface PageAnalysis {
  url: string;
  title: string;
  internalLinks: number;
  inboundLinks: number;
  keywordDensity: number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface LinkOpportunity {
  fromPage: string;
  toPage: string;
  suggestedAnchor: string;
  context: string;
  priority: number;
}

const InternalLinkingAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<PageAnalysis[]>([]);
  const [linkOpportunities, setLinkOpportunities] = useState<LinkOpportunity[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');

  useEffect(() => {
    // Simulate analysis of current website structure
    const mockAnalysis: PageAnalysis[] = [
      {
        url: '/',
        title: 'Home - Pio Duran DRRM',
        internalLinks: 8,
        inboundLinks: 0,
        keywordDensity: 2.3,
        priority: 'high',
        recommendations: [
          'Add more contextual links to key disaster preparedness pages',
          'Include links to recent news and alerts',
          'Link to resource downloads from hero section'
        ]
      },
      {
        url: '/alerts',
        title: 'Current Alerts & Warnings',
        internalLinks: 3,
        inboundLinks: 12,
        keywordDensity: 4.1,
        priority: 'high',
        recommendations: [
          'Link to related emergency procedures',
          'Add contextual links to evacuation centers',
          'Include links to emergency contact information'
        ]
      },
      {
        url: '/news',
        title: 'News & Announcements',
        internalLinks: 5,
        inboundLinks: 8,
        keywordDensity: 1.8,
        priority: 'medium',
        recommendations: [
          'Link to related gallery images',
          'Add links to relevant resources',
          'Include author bio links'
        ]
      },
      {
        url: '/gallery',
        title: 'Activity Gallery',
        internalLinks: 2,
        inboundLinks: 4,
        keywordDensity: 1.2,
        priority: 'medium',
        recommendations: [
          'Add more links to related news articles',
          'Link to training resources',
          'Include location-based links to map section'
        ]
      },
      {
        url: '/map',
        title: 'Interactive Map',
        internalLinks: 1,
        inboundLinks: 6,
        keywordDensity: 0.8,
        priority: 'high',
        recommendations: [
          'Add links to evacuation procedures',
          'Link to emergency contact details',
          'Include links to location-specific resources'
        ]
      },
      {
        url: '/resources',
        title: 'Resource Hub',
        internalLinks: 4,
        inboundLinks: 15,
        keywordDensity: 3.2,
        priority: 'high',
        recommendations: [
          'Add more cross-references between resources',
          'Link to related training programs',
          'Include contextual links to news updates'
        ]
      },
      {
        url: '/contact',
        title: 'Contact Us',
        internalLinks: 2,
        inboundLinks: 10,
        keywordDensity: 1.5,
        priority: 'low',
        recommendations: [
          'Link to department-specific pages',
          'Add links to FAQ or help sections',
          'Include links to social media profiles'
        ]
      }
    ];

    const mockOpportunities: LinkOpportunity[] = [
      {
        fromPage: '/',
        toPage: '/alerts',
        suggestedAnchor: 'current disaster alerts',
        context: 'Stay updated with our current disaster alerts and emergency warnings.',
        priority: 9
      },
      {
        fromPage: '/',
        toPage: '/resources',
        suggestedAnchor: 'emergency preparedness guides',
        context: 'Download our comprehensive emergency preparedness guides.',
        priority: 8
      },
      {
        fromPage: '/alerts',
        toPage: '/map',
        suggestedAnchor: 'evacuation centers and routes',
        context: 'Find nearby evacuation centers and routes on our interactive map.',
        priority: 9
      },
      {
        fromPage: '/news',
        toPage: '/gallery',
        suggestedAnchor: 'training activity photos',
        context: 'View photos from our recent training activity photos.',
        priority: 6
      },
      {
        fromPage: '/resources',
        toPage: '/contact',
        suggestedAnchor: 'contact our DRRM team',
        context: 'Need help? Contact our DRRM team for assistance.',
        priority: 5
      }
    ];

    setAnalysis(mockAnalysis);
    setLinkOpportunities(mockOpportunities);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Internal Linking Analysis
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze your website's internal linking structure and discover optimization opportunities.
        </p>
      </div>

      {/* Page Analysis */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Page Link Analysis
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Internal Links
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Inbound Links
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {analysis.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {page.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {page.url}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {page.internalLinks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {page.inboundLinks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(page.priority)}`}>
                      {page.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedPage(selectedPage === page.url ? '' : page.url)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Page Details */}
      {selectedPage && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
            Recommendations for {analysis.find(p => p.url === selectedPage)?.title}
          </h5>
          <ul className="space-y-2">
            {analysis.find(p => p.url === selectedPage)?.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-blue-800 dark:text-blue-300">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Link Opportunities */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Link Opportunities
        </h4>
        <div className="space-y-4">
          {linkOpportunities.map((opportunity, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {opportunity.fromPage} → {opportunity.toPage}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded-full">
                      Priority: {opportunity.priority}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {opportunity.context}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Suggested anchor:</span>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs rounded">
                      {opportunity.suggestedAnchor}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternalLinkingAnalyzer;