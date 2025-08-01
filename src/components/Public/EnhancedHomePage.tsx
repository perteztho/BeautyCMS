import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Calendar, MapPin, Download, Phone, Users, Shield, TrendingUp, Eye, Clock } from 'lucide-react';
import { SEOLink } from '../SEO/ContextualLinking';

interface Alert {
  id: string;
  title: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  areas: string[];
  active: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  location: string;
}

const EnhancedHomePage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [alertsRes, newsRes, galleryRes] = await Promise.all([
          fetch('/data/alerts.json'),
          fetch('/data/news.json'),
          fetch('/data/gallery.json')
        ]);

        const alertsData = await alertsRes.json();
        const newsData = await newsRes.json();
        const galleryData = await galleryRes.json();

        setAlerts(alertsData.filter((alert: Alert) => alert.active).slice(0, 3));
        setNews(newsData.slice(0, 3));
        setGallery(galleryData.slice(0, 6));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return formatDate(timestamp);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading disaster management information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with contextual links */}
      <section id="home" className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pio Duran Disaster Risk Reduction
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Protecting our community through comprehensive{' '}
              <SEOLink 
                href="#resources" 
                className="text-yellow-300 hover:text-yellow-100 underline"
                title="Emergency preparedness resources and guides"
              >
                emergency preparedness
              </SEOLink>
              ,{' '}
              <SEOLink 
                href="#alerts" 
                className="text-yellow-300 hover:text-yellow-100 underline"
                title="Current disaster alerts and warnings"
              >
                rapid response
              </SEOLink>
              , and community recovery initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SEOLink
                href="#alerts"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                title="View current disaster alerts and emergency warnings"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>View Current Alerts</span>
              </SEOLink>
              <SEOLink
                href="#report"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
                title="Report emergency incidents and disasters"
              >
                <Phone className="w-5 h-5" />
                <span>Report Emergency</span>
              </SEOLink>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Stats with internal links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">
                <SEOLink href="#contact" title="Learn more about our community protection programs">
                  Protected Residents
                </SEOLink>
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">
                <SEOLink href="#map" title="View evacuation centers on interactive map">
                  Evacuation Centers
                </SEOLink>
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">
                <SEOLink href="#contact" title="Emergency response contact information">
                  Emergency Response
                </SEOLink>
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">
                <SEOLink href="#resources" title="Access disaster preparedness resources">
                  Preparedness Rate
                </SEOLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Current Alerts with contextual linking */}
      <section id="alerts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Disaster Alerts</h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest{' '}
              <SEOLink href="#alerts" className="text-red-600 hover:text-red-800">
                disaster alerts and emergency warnings
              </SEOLink>
              {' '}for Pio Duran and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-6 rounded-xl border-2 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold text-sm uppercase tracking-wide">{alert.type}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
                <p className="text-sm mb-4">{alert.message}</p>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span>Areas: {alert.areas.join(', ')}</span>
                  <span>{formatTimestamp(alert.timestamp)}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <SEOLink 
                    href="#map" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    title="Find evacuation centers and safe routes"
                  >
                    Find Evacuation Centers →
                  </SEOLink>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <SEOLink
              href="#alerts"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              title="View all current disaster alerts and warnings"
            >
              View All Alerts
            </SEOLink>
          </div>
        </div>
      </section>

      {/* Enhanced Latest News with related links */}
      <section id="news" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2>
            <p className="text-xl text-gray-600">
              Stay informed about{' '}
              <SEOLink href="#news" className="text-blue-600 hover:text-blue-800">
                disaster preparedness initiatives
              </SEOLink>
              {' '}and community updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {item.author}</span>
                    <div className="flex items-center space-x-2">
                      <SEOLink
                        href="#news"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        title={`Read more about ${item.title}`}
                      >
                        Read More →
                      </SEOLink>
                    </div>
                  </div>
                  {/* Related links based on content */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Related:</p>
                    <div className="flex items-center space-x-2 text-xs">
                      {item.category === 'infrastructure' && (
                        <SEOLink href="#map" className="text-blue-600 hover:text-blue-800">
                          View on Map
                        </SEOLink>
                      )}
                      {item.category === 'training' && (
                        <>
                          <SEOLink href="#gallery" className="text-blue-600 hover:text-blue-800">
                            Training Photos
                          </SEOLink>
                          <span className="text-gray-300">•</span>
                          <SEOLink href="#resources" className="text-blue-600 hover:text-blue-800">
                            Training Guides
                          </SEOLink>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <SEOLink
              href="#news"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              title="View all disaster preparedness news and announcements"
            >
              View All News
            </SEOLink>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Access Section with strategic internal links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Essential Emergency Resources</h2>
            <p className="text-xl text-gray-600">Quick access to critical disaster preparedness tools and information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SEOLink
              href="#map"
              className="p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center group block"
              title="Interactive map showing evacuation centers, risk areas, and emergency services"
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Interactive Emergency Map</h3>
              <p className="text-sm text-gray-600">Find evacuation centers, risk areas, and emergency services near you</p>
            </SEOLink>

            <SEOLink
              href="#resources"
              className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center group block"
              title="Download emergency preparedness guides, evacuation maps, and safety resources"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Emergency Resources</h3>
              <p className="text-sm text-gray-600">Download preparedness guides, evacuation maps, and safety resources</p>
            </SEOLink>

            <SEOLink
              href="#report"
              className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-center group block"
              title="Report emergency incidents and disasters to our response team"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Report Emergency</h3>
              <p className="text-sm text-gray-600">Submit emergency reports and incidents to our response team</p>
            </SEOLink>

            <SEOLink
              href="#contact"
              className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center group block"
              title="Contact our disaster risk reduction and management team for assistance"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contact DRRM Team</h3>
              <p className="text-sm text-gray-600">Get in touch with our disaster risk reduction team for help</p>
            </SEOLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHomePage;