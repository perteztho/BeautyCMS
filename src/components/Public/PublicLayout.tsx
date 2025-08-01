import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone, Mail, MapPin, AlertTriangle, Bell, Download, Calendar, Users, Shield } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home', icon: Shield },
    { name: 'Alerts', href: '#alerts', icon: AlertTriangle },
    { name: 'News', href: '#news', icon: Bell },
    { name: 'Gallery', href: '#gallery', icon: Calendar },
    { name: 'Map', href: '#map', icon: MapPin },
    { name: 'Resources', href: '#resources', icon: Download },
    { name: 'Report Incident', href: '#report', icon: Phone },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  // Simple client-side search functionality
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      // Search through news, alerts, and resources
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

      // Search news
      news.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.excerpt.toLowerCase().includes(searchLower)) {
          results.push({ ...item, type: 'news' });
        }
      });

      // Search alerts
      alerts.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.message.toLowerCase().includes(searchLower)) {
          results.push({ ...item, type: 'alert' });
        }
      });

      // Search resources
      resources.forEach((item: any) => {
        if (item.title.toLowerCase().includes(searchLower) || 
            item.description.toLowerCase().includes(searchLower)) {
          results.push({ ...item, type: 'resource' });
        }
      });

      setSearchResults(results.slice(0, 5)); // Limit to 5 results
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
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pio Duran DRRM</h1>
                <p className="text-xs text-gray-600">Disaster Risk Reduction</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
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
                            <span className="text-xs text-gray-400 capitalize">{result.type}</span>
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
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pio Duran DRRM</h3>
                  <p className="text-gray-400">Disaster Risk Reduction & Management</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Committed to protecting our community through effective disaster preparedness, 
                response, and recovery initiatives.
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
                <li><a href="#alerts" className="text-gray-400 hover:text-white transition-colors">Current Alerts</a></li>
                <li><a href="#news" className="text-gray-400 hover:text-white transition-colors">Latest News</a></li>
                <li><a href="#resources" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                <li><a href="#report" className="text-gray-400 hover:text-white transition-colors">Report Incident</a></li>
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

export default PublicLayout;