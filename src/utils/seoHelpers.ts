// SEO and Internal Linking Utilities

export interface LinkAnalysis {
  totalInternalLinks: number;
  totalExternalLinks: number;
  brokenLinks: string[];
  orphanPages: string[];
  linkDepth: Record<string, number>;
}

export interface AnchorTextVariation {
  primary: string;
  variations: string[];
  context: string;
}

// Generate anchor text variations for better SEO
export const generateAnchorTextVariations = (primaryKeyword: string, context: string): AnchorTextVariation => {
  const variations = [];
  
  // Exact match
  variations.push(primaryKeyword);
  
  // Partial match variations
  if (primaryKeyword.includes(' ')) {
    const words = primaryKeyword.split(' ');
    variations.push(words.slice(0, -1).join(' '));
    variations.push(words.slice(1).join(' '));
  }
  
  // Contextual variations based on content type
  if (context.includes('emergency') || context.includes('disaster')) {
    variations.push(`${primaryKeyword} information`);
    variations.push(`${primaryKeyword} guide`);
    variations.push(`${primaryKeyword} resources`);
  }
  
  if (context.includes('training') || context.includes('preparation')) {
    variations.push(`${primaryKeyword} training`);
    variations.push(`${primaryKeyword} preparation`);
    variations.push(`how to ${primaryKeyword}`);
  }
  
  // Generic variations
  variations.push(`learn about ${primaryKeyword}`);
  variations.push(`${primaryKeyword} details`);
  variations.push(`more on ${primaryKeyword}`);
  
  return {
    primary: primaryKeyword,
    variations: [...new Set(variations)], // Remove duplicates
    context
  };
};

// URL structure recommendations
export const generateSEOFriendlyURL = (title: string, category?: string): string => {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
  
  // Add category prefix if provided
  if (category) {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    slug = `${categorySlug}/${slug}`;
  }
  
  return slug;
};

// Link priority scoring
export const calculateLinkPriority = (
  fromPage: string, 
  toPage: string, 
  context: string
): number => {
  let priority = 5; // Base priority
  
  // High priority pages
  const highPriorityPages = ['/', '/alerts', '/resources', '/contact'];
  if (highPriorityPages.includes(fromPage) || highPriorityPages.includes(toPage)) {
    priority += 2;
  }
  
  // Emergency-related content gets higher priority
  if (context.toLowerCase().includes('emergency') || 
      context.toLowerCase().includes('disaster') ||
      context.toLowerCase().includes('alert')) {
    priority += 3;
  }
  
  // Training and preparation content
  if (context.toLowerCase().includes('training') || 
      context.toLowerCase().includes('preparation')) {
    priority += 1;
  }
  
  return Math.min(priority, 10); // Cap at 10
};

// Best practices for link attributes
export const getLinkAttributes = (
  href: string, 
  context: 'internal' | 'external' | 'download' | 'email' | 'tel'
) => {
  const attributes: Record<string, string> = {};
  
  switch (context) {
    case 'external':
      attributes.target = '_blank';
      attributes.rel = 'noopener noreferrer';
      break;
      
    case 'download':
      attributes.download = '';
      break;
      
    case 'email':
      attributes.href = `mailto:${href}`;
      break;
      
    case 'tel':
      attributes.href = `tel:${href}`;
      break;
      
    case 'internal':
    default:
      // No special attributes needed for internal links
      break;
  }
  
  return attributes;
};

// Site structure analysis
export const analyzeSiteStructure = (pages: Array<{url: string, links: string[]}>) => {
  const analysis: LinkAnalysis = {
    totalInternalLinks: 0,
    totalExternalLinks: 0,
    brokenLinks: [],
    orphanPages: [],
    linkDepth: {}
  };
  
  const allPages = pages.map(p => p.url);
  const linkedPages = new Set<string>();
  
  pages.forEach(page => {
    page.links.forEach(link => {
      if (link.startsWith('http')) {
        analysis.totalExternalLinks++;
      } else {
        analysis.totalInternalLinks++;
        linkedPages.add(link);
        
        // Check if link exists
        if (!allPages.includes(link)) {
          analysis.brokenLinks.push(link);
        }
      }
    });
  });
  
  // Find orphan pages (pages with no inbound links)
  analysis.orphanPages = allPages.filter(page => 
    page !== '/' && !linkedPages.has(page)
  );
  
  // Calculate link depth (simplified BFS)
  const calculateDepth = (startPage: string) => {
    const visited = new Set<string>();
    const queue = [{page: startPage, depth: 0}];
    const depths: Record<string, number> = {};
    
    while (queue.length > 0) {
      const {page, depth} = queue.shift()!;
      
      if (visited.has(page)) continue;
      visited.add(page);
      depths[page] = depth;
      
      const pageData = pages.find(p => p.url === page);
      if (pageData) {
        pageData.links.forEach(link => {
          if (!visited.has(link) && allPages.includes(link)) {
            queue.push({page: link, depth: depth + 1});
          }
        });
      }
    }
    
    return depths;
  };
  
  analysis.linkDepth = calculateDepth('/');
  
  return analysis;
};

// Internal linking recommendations
export const generateLinkingRecommendations = (
  currentPage: string,
  allPages: Array<{url: string, title: string, keywords: string[], content: string}>
) => {
  const recommendations = [];
  
  const currentPageData = allPages.find(p => p.url === currentPage);
  if (!currentPageData) return recommendations;
  
  // Find related pages based on keyword overlap
  allPages.forEach(page => {
    if (page.url === currentPage) return;
    
    const keywordOverlap = currentPageData.keywords.filter(keyword =>
      page.keywords.includes(keyword) || 
      page.content.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (keywordOverlap.length > 0) {
      const priority = calculateLinkPriority(currentPage, page.url, page.content);
      const anchorVariations = generateAnchorTextVariations(
        keywordOverlap[0], 
        page.content.substring(0, 200)
      );
      
      recommendations.push({
        targetPage: page.url,
        targetTitle: page.title,
        suggestedAnchors: anchorVariations.variations.slice(0, 3),
        priority,
        reason: `Related keywords: ${keywordOverlap.join(', ')}`
      });
    }
  });
  
  return recommendations.sort((a, b) => b.priority - a.priority);
};

// Schema markup for breadcrumbs
export const generateBreadcrumbSchema = (breadcrumbs: Array<{label: string, href: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `${window.location.origin}${crumb.href}`
    }))
  };
};