import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage,
  canonical 
}) => {
  useEffect(() => {
    // Set title
    document.title = title || 'Atlanta Hourly Ride - Premium Chauffeur Service';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Atlanta\'s premier hourly chauffeur service. Professional private drivers available 24/7. Book luxury transportation by the hour with 2-hour minimum.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description || 'Atlanta\'s premier hourly chauffeur service. Professional private drivers available 24/7. Book luxury transportation by the hour with 2-hour minimum.';
      document.head.appendChild(meta);
    }

    // Set keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywordContent = keywords || 'Atlanta hourly ride, Atlanta private driver, Atlanta chauffeur service, luxury chauffeur Atlanta, hourly car service Atlanta, private chauffeur Atlanta, Atlanta airport transfer, chauffeur service Atlanta';
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywordContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywordContent;
      document.head.appendChild(meta);
    }

    // Set canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonical || window.location.href;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Open Graph tags
    const setOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setOGTag('og:title', ogTitle || title);
    setOGTag('og:description', ogDescription || description);
    setOGTag('og:type', 'website');
    setOGTag('og:url', canonicalUrl);
    if (ogImage) {
      setOGTag('og:image', ogImage);
    }

    // Twitter Card tags
    const setTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', ogTitle || title);
    setTwitterTag('twitter:description', ogDescription || description);
    if (ogImage) {
      setTwitterTag('twitter:image', ogImage);
    }

    // Add viewport meta
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical]);

  return null;
};

export default SEO;