import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone, Mail, MapPin, AlertTriangle, Bell, Download, Calendar, Users, Shield, ChevronRight, Home } from 'lucide-react';
import BreadcrumbNavigation from '../SEO/BreadcrumbNavigation';
import { SEOLink } from '../SEO/ContextualLinking';

interface EnhancedPublicLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  breadcrumbs?: Array<{ label: string; href: string; current?: boolean }>;
}

const EnhancedPublicLayout: React.FC<EnhancedPublicLayoutProps> = ({ 
  children, 
  currentPage = 'home',
  breadcrumbs = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home', icon: Shield, keywords: ['disaster', 'emergency', 'preparedness'] },
    { name: 'Current Alerts', href: '#alerts', icon: AlertTriangle, keywords: ['alerts', 'warnings', 'emergency'] },
    { name: 'Latest News', href: '#news', icon: Bell, keywords: ['news', 'announcements', 'updates'] },
    { name: 'Activity Gallery', href: '#gallery', icon: Calendar, keywords: ['photos', 'activities', 'training'] },
    { name: 'Interactive Map', href: '#map', icon: MapPin, keywords: ['map', 'evacuation', 'centers'] },
    { name: 'Resource Hub', href: '#resources', icon: Download, keywords: ['downloads', 'guides', 'documents'] },
    { name: 'Report Incident', href: '#report', icon: Phone, keywords: ['report', 'emergency', 'incident'] },
    { name: 'Contact Us', href: '#contact', icon: Mail, keywords: ['contact', 'help', 'support'] }
  ];

  // Generate default breadcrumbs if none provided
  const defaultBreadcrumbs = [
    { label: 'Home', href: '#home' },
    ...(currentPage !== 'home' ? [{ 
      label: navigationItems.find(item => item.href === `#${currentPage}`)?.name || currentPage, 
      href: `#${currentPage}`, 
      current: true 
    }] : [{ label: 'Home', href: '#home', current: true }])
  ];

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  // Enhanced search with contextual linking
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const [newsResponse, alertsResponse, resourcesResponse] = await Promise.all([
        fetch('/data/news.json'),
        fetch('/data/alerts.json'),
        fetch('/data/resources.json')
      ]);

      const news = await newsResponse.json();
      const alerts = await alertsResponse.json();
      const resources = await resourcesResponse.json();

      const results = [];
      const searchLower = query.toLowerCase();

      // Enhanced search with keyword matching
      news.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.excerpt.toLowerCase().includes(searchLower)) {
          results.push({ 
            ...item, 
            type: 'news',
            relevantLinks: navigationItems.filter(nav => 
              nav.keywords.some(keyword => 
                item.title.toLowerCase().includes(keyword) || 
                item.excerpt.toLowerCase().includes(keyword)
              )
            )
          });
        }
      });

      alerts.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.message.toLowerCase().includes(searchLower)) {
          results.push({ 
            ...item, 
            type: 'alert',
            relevantLinks: [
              navigationItems.find(nav => nav.href === '#map'),
              navigationItems.find(nav => nav.href === '#contact')
            ].filter(Boolean)
          });
        }
      });

      resources.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.description.toLowerCase().includes(searchLower)) {
          results.push({ 
            ...item, 
            type: 'resource',
            relevantLinks: [
              navigationItems.find(nav => nav.href === '#news'),
              navigationItems.find(nav => nav.href === '#gallery')
            ].filter(Boolean)
          });
        }
      });

      setSearchResults(results.slice(0, 5));
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Sticky Navbar with SEO improvements */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with enhanced SEO */}
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp"
                alt="Pio Duran DRRM Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  <SEOLink href="#home" title="Pio Duran Disaster Risk Reduction and Management">
                    Pio Duran DRRM
                  </SEOLink>
                </h1>
                <p className="text-xs text-gray-600">Disaster Risk Reduction</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation with contextual linking */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <SEOLink
                  key={item.name}
                  href={item.href}
                  title={`${item.name} - ${item.keywords.join(', ')}`}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  priority={['Home', 'Current Alerts', 'Resource Hub'].includes(item.name) ? 'high' : 'medium'}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </SEOLink>
              ))}
            </div>

            {/* Enhanced Search Bar */}
            <div className="hidden md:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search disaster info..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  aria-label="Search disaster information"
                />
              </div>

              {/* Enhanced Search Results with contextual links */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Search Results</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div key={index} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className={`p-1 rounded ${
                            result.type === 'alert' ? 'bg-red-100 text-red-600' :
                            result.type === 'news' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {result.type === 'alert' ? <AlertTriangle className="w-3 h-3" /> :
                             result.type === 'news' ? <Bell className="w-3 h-3" /> :
                             <Download className="w-3 h-3" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {result.excerpt || result.message || result.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-400 capitalize">{result.type}</span>
                              {result.relevantLinks && result.relevantLinks.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-400">Related:</span>
                                  {result.relevantLinks.slice(0, 2).map((link: any, linkIndex: number) => (
                                    <SEOLink
                                      key={linkIndex}
                                      href={link.href}
                                      className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      {link.name}
                                    </SEOLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with enhanced linking */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <SEOLink
                    key={item.name}
                    href={item.href}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </SEOLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb Navigation */}
      {finalBreadcrumbs.length > 1 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <BreadcrumbNavigation items={finalBreadcrumbs} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Enhanced Footer with contextual linking */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp"
                  alt="Pio Duran DRRM Logo"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">MDRRMO</h3>
                  <p className="text-gray-400">Disaster Risk Reduction & Management</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Committed to protecting our community through effective{' '}
                <SEOLink href="#resources" className="text-red-400 hover:text-red-300">
                  disaster preparedness
                </SEOLink>
                ,{' '}
                <SEOLink href="#alerts" className="text-red-400 hover:text-red-300">
                  emergency response
                </SEOLink>
                , and recovery initiatives.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Emergency: 911</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span className="text-sm">drrm@pioduran.gov.ph</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <SEOLink href="#alerts" className="text-gray-400 hover:text-white transition-colors">
                    Current Alerts
                  </SEOLink>
                </li>
                <li>
                  <SEOLink href="#news" className="text-gray-400 hover:text-white transition-colors">
                    Latest News
                  </SEOLink>
                </li>
                <li>
                  <SEOLink href="#resources" className="text-gray-400 hover:text-white transition-colors">
                    Emergency Resources
                  </SEOLink>
                </li>
                <li>
                  <SEOLink href="#report" className="text-gray-400 hover:text-white transition-colors">
                    Report Incident
                  </SEOLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency Contacts</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">Fire Department: 911</li>
                <li className="text-gray-400">Police: 911</li>
                <li className="text-gray-400">Medical Emergency: 911</li>
                <li className="text-gray-400">MDRRMO: (054) 123-4567</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Municipality of Pio Duran, Albay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Click outside to close search results */}
      {showSearchResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSearchResults(false)}
        />
      )}
    </div>
  );
};

export default EnhancedPublicLayout;