import React, { useState } from 'react';
import { Plus, Trash2, Edit, Eye, Save, Settings, Layout, Type, Image, Link, Square, Circle } from 'lucide-react';

interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'form' | 'section';
  content: string;
  styles: Record<string, string>;
}

const PageBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const componentTypes = [
    { type: 'text', icon: Type, label: 'Text', color: 'bg-blue-500' },
    { type: 'image', icon: Image, label: 'Image', color: 'bg-green-500' },
    { type: 'button', icon: Square, label: 'Button', color: 'bg-purple-500' },
    { type: 'form', icon: Layout, label: 'Form', color: 'bg-orange-500' },
    { type: 'section', icon: Circle, label: 'Section', color: 'bg-cyan-500' }
  ];

  const addComponent = (type: Component['type']) => {
    const newComponent: Component = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    };
    setComponents([...components, newComponent]);
  };

  const getDefaultContent = (type: Component['type']) => {
    switch (type) {
      case 'text': return 'Enter your text here...';
      case 'image': return 'https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=400';
      case 'button': return 'Click Me';
      case 'form': return 'Contact Form';
      case 'section': return 'New Section';
      default: return '';
    }
  };

  const getDefaultStyles = (type: Component['type']) => {
    switch (type) {
      case 'text': return { fontSize: '16px', color: '#000000', fontWeight: 'normal' };
      case 'image': return { width: '100%', height: '200px', objectFit: 'cover' };
      case 'button': return { backgroundColor: '#3B82F6', color: '#ffffff', padding: '10px 20px', borderRadius: '8px' };
      case 'form': return { backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '8px' };
      case 'section': return { backgroundColor: '#ffffff', padding: '40px', minHeight: '200px' };
      default: return {};
    }
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    setSelectedComponent(null);
  };

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;
    const baseClasses = `${isSelected ? 'ring-2 ring-blue-500' : ''} relative group cursor-pointer`;

    switch (component.type) {
      case 'text':
        return (
          <div 
            className={`${baseClasses} p-4`}
            style={component.styles}
            onClick={() => setSelectedComponent(component.id)}
          >
            {component.content}
            {!previewMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div 
            className={`${baseClasses}`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <img 
              src={component.content} 
              alt="Component" 
              className="w-full h-48 object-cover rounded"
              style={component.styles}
            />
            {!previewMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div 
            className={`${baseClasses} inline-block`}
            onClick={() => setSelectedComponent(component.id)}
          >
            <button 
              className="px-4 py-2 rounded font-medium"
              style={component.styles}
            >
              {component.content}
            </button>
            {!previewMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      case 'form':
        return (
          <div 
            className={`${baseClasses} p-6 border rounded-lg`}
            style={component.styles}
            onClick={() => setSelectedComponent(component.id)}
          >
            <h3 className="text-lg font-semibold mb-4">{component.content}</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full p-2 border rounded"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2 border rounded"
              />
              <textarea 
                placeholder="Message" 
                className="w-full p-2 border rounded h-20"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
            {!previewMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      case 'section':
        return (
          <div 
            className={`${baseClasses} border-2 border-dashed border-gray-300 rounded-lg`}
            style={component.styles}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="flex items-center justify-center h-full text-gray-500">
              {component.content}
            </div>
            {!previewMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page Builder</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create beautiful pages with drag-and-drop components
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                previewMode 
                  ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {previewMode ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Components Panel */}
        {!previewMode && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Components</h3>
              <div className="space-y-2">
                {componentTypes.map((componentType) => {
                  const Icon = componentType.icon;
                  return (
                    <button
                      key={componentType.type}
                      onClick={() => addComponent(componentType.type as Component['type'])}
                      className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className={`p-2 rounded ${componentType.color}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {componentType.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className={previewMode ? 'lg:col-span-4' : 'lg:col-span-2'}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 min-h-[600px]">
            {components.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start building your page by adding components</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {components.map((component) => (
                  <div key={component.id}>
                    {renderComponent(component)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Properties Panel */}
        {!previewMode && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Properties</h3>
              {selectedComponent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <input
                      type="text"
                      value={components.find(c => c.id === selectedComponent)?.content || ''}
                      onChange={(e) => updateComponent(selectedComponent, { content: e.target.value })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={components.find(c => c.id === selectedComponent)?.styles.backgroundColor || '#ffffff'}
                      onChange={(e) => updateComponent(selectedComponent, { 
                        styles: { 
                          ...components.find(c => c.id === selectedComponent)?.styles, 
                          backgroundColor: e.target.value 
                        }
                      })}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Select a component to edit its properties
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBuilder;