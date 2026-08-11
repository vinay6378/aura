import { useEffect } from 'react';

const SEO = ({ 
  title = 'AURA Digital - Web Development, Digital Marketing & Software Solutions',
  description = 'Transform your business with AURA Digital\'s expert web development, digital marketing, software solutions, and branding services.',
  keywords = 'web development, digital marketing, software development, SEO, branding',
  ogImage = '/images/og-image.jpg',
  twitterHandle = '@auraofficial',
  canonicalUrl = 'https://auraofficial.in'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name, content, property = null) => {
      let meta;
      if (property) {
        meta = document.querySelector(`meta[property="${property}"]`);
      } else {
        meta = document.querySelector(`meta[name="${name}"]`);
      }
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'AURA Digital');
    updateMetaTag('robots', 'index, follow');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Open Graph / Facebook
    updateMetaTag('og:type', 'website', 'og:type');
    updateMetaTag('og:url', canonicalUrl, 'og:url');
    updateMetaTag('og:title', title, 'og:title');
    updateMetaTag('og:description', description, 'og:description');
    updateMetaTag('og:image', ogImage, 'og:image');
    updateMetaTag('og:site_name', 'AURA Digital', 'og:site_name');
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
    updateMetaTag('twitter:url', canonicalUrl, 'twitter:url');
    updateMetaTag('twitter:title', title, 'twitter:title');
    updateMetaTag('twitter:description', description, 'twitter:description');
    updateMetaTag('twitter:image', ogImage, 'twitter:image');
    updateMetaTag('twitter:site', twitterHandle, 'twitter:site');
    
    // Cleanup function
    return () => {
      // Reset to default values when component unmounts
      document.title = 'AURA Digital - Web Development, Digital Marketing & Software Solutions';
    };
  }, [title, description, keywords, ogImage, twitterHandle, canonicalUrl]);
  
  return null; // This component doesn't render anything
};

export default SEO;