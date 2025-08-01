import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, FileText, Calendar, User, Star } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  lastUpdated: string;
  featured: boolean;
}

const ResourcesSection: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch('/data/resources.json');
        const data = await response.json();
        setResources(data);
        setFilteredResources(data);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, categoryFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guides': return 'bg-blue-100 text-blue-800';
      case 'maps': return 'bg-green-100 text-green-800';
      case 'contacts': return 'bg-purple-100 text-purple-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'reports': return 'bg-yellow-100 text-yellow-800';
      case 'plans': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📋';
      case 'zip': return '🗜️';
      default: return '📁';
    }
  };

  const handleDownload = (resource: Resource) => {
    // In a real application, this would trigger the actual download
    // For demo purposes, we'll just show an alert
    alert(`Downloading: ${resource.title}\nFile: ${resource.fileType} (${resource.fileSize})\n\nIn a production environment, this would download the actual file.`);
  };

  const categories = [...new Set(resources.map(resource => resource.category))];
  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  if (loading) {
    return (
      <section id="resources" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading resources...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Resource Hub</h2>
          <p className="text-xl text-gray-600">Download essential documents, guides, and resources for disaster preparedness</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{getFileTypeIcon(resource.fileType)}</div>
                        <div>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(resource.category)}`}>
                            {resource.category}
                          </span>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-xs text-yellow-600 font-medium">FEATURED</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{resource.fileType}</div>
                        <div className="text-xs text-gray-500">{resource.fileSize}</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Updated {formatDate(resource.lastUpdated)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(resource)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Resources */}
        {regularResources.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getFileTypeIcon(resource.fileType)}</div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(resource.category)}`}>
                          {resource.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{resource.fileType}</div>
                        <div className="text-xs text-gray-500">{resource.fileSize}</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Updated {formatDate(resource.lastUpdated)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(resource)}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">No resources match your current search criteria.</p>
          </div>
        )}

        {/* Resource Statistics */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Resource Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{resources.length}</div>
              <div className="text-sm text-gray-600">Total Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {resources.filter(r => r.featured).length}
              </div>
              <div className="text-sm text-gray-600">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {resources.filter(r => r.category === 'guides').length}
              </div>
              <div className="text-sm text-gray-600">Guides</div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-blue-800 text-sm mb-3">
                Can't find what you're looking for? Our team is here to help you access the resources you need.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;