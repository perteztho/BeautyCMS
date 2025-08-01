import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, Search, Filter, Eye, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/data/news.json');
        const data = await response.json();
        setNews(data);
        setFilteredNews(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, categoryFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-green-100 text-green-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      case 'announcement': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(news.map(item => item.category))];
  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  if (loading) {
    return (
      <section id="news" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Announcements</h2>
          <p className="text-xl text-gray-600">Stay updated with the latest disaster preparedness news and community announcements</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(item)}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>By {item.author}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Read More</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">By {item.author}</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">No news articles match your current search criteria.</p>
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="relative">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedArticle.category)}`}>
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedArticle.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="w-4 h-4" />
                    <span>By {selectedArticle.author}</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{selectedArticle.excerpt}</p>
                <div className="prose prose-lg max-w-none">
                  <p>{selectedArticle.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;