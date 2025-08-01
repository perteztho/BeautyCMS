import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  items, 
  className = '' 
}) => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`flex ${className}`} 
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
            
            {item.current ? (
              <span 
                className="text-gray-500 dark:text-gray-400 text-sm font-medium"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1 inline" />}
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => scrollToSection(item.href)}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                title={`Navigate to ${item.label}`}
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;