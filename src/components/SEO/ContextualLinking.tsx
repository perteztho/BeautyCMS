import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ContextualLink {
  text: string;
  href: string;
  title?: string;
  external?: boolean;
  nofollow?: boolean;
  className?: string;
}

interface ContextualLinkingProps {
  content: string;
  links: ContextualLink[];
}

const ContextualLinking: React.FC<ContextualLinkingProps> = ({ content, links }) => {
  const processContent = (text: string, linkData: ContextualLink[]) => {
    let processedContent = text;
    
    linkData.forEach((link, index) => {
      const linkElement = (
        <a
          key={index}
          href={link.href}
          title={link.title}
          className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors ${link.className || ''}`}
          {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
          {...(link.nofollow && { rel: 'nofollow' })}
          onClick={(e) => {
            if (!link.external && link.href.startsWith('#')) {
              e.preventDefault();
              const element = document.querySelector(link.href);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        >
          {link.text}
          {link.external && <ExternalLink className="w-3 h-3 inline ml-1" />}
        </a>
      );
      
      // Replace text with link (simplified approach)
      processedContent = processedContent.replace(
        new RegExp(`\\b${link.text}\\b`, 'gi'),
        `<LINK_${index}>`
      );
    });
    
    return processedContent;
  };

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: processContent(content, links) }} />
    </div>
  );
};

// Enhanced Link Component with SEO attributes
interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
  external?: boolean;
  nofollow?: boolean;
  sponsored?: boolean;
  ugc?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export const SEOLink: React.FC<SEOLinkProps> = ({
  href,
  children,
  title,
  className = '',
  external = false,
  nofollow = false,
  sponsored = false,
  ugc = false,
  priority = 'medium'
}) => {
  const buildRelAttribute = () => {
    const relValues = [];
    if (external) relValues.push('noopener', 'noreferrer');
    if (nofollow) relValues.push('nofollow');
    if (sponsored) relValues.push('sponsored');
    if (ugc) relValues.push('ugc');
    return relValues.length > 0 ? relValues.join(' ') : undefined;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!external && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      title={title}
      className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ${className}`}
      {...(external && { target: '_blank' })}
      {...(buildRelAttribute() && { rel: buildRelAttribute() })}
      {...(priority === 'high' && { 'data-priority': 'high' })}
      onClick={handleClick}
    >
      {children}
      {external && <ExternalLink className="w-3 h-3 inline ml-1" />}
    </a>
  );
};

export default ContextualLinking;