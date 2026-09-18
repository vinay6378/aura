import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

const DEFAULT_TITLE = 'AURA Digital - Web Development, Digital Marketing & Software Solutions';
const DEFAULT_DESC = "Transform your business with AURA Digital's expert web development, digital marketing, software solutions, and branding services.";
const DEFAULT_KEYWORDS = 'web development, digital marketing, software development, SEO, branding';

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  ogImage = '/images/og-image.jpg',
  twitterHandle = '@auraofficial',
  canonicalUrl = 'https://auraofficial.in'
}) => {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    let mounted = true;
    const path = window.location.pathname;
    supabase
      .from('seo_pages')
      .select('*')
      .eq('path', path)
      .maybeSingle()
      .then(({ data }) => {
        if (mounted && data) setSeoData(data);
        else if (mounted) setSeoData(null);
      });
    return () => { mounted = false; };
  }, [canonicalUrl]);

  const finalTitle = seoData?.title || title;
  const finalDesc = seoData?.description || description;
  const finalKeywords = seoData?.keywords || keywords;
  const finalCanonical = seoData?.canonical_url || canonicalUrl;
  const finalOgImage = seoData?.og_image || ogImage;
  const isIndexed = seoData ? seoData.is_indexed : true;

  useEffect(() => {
    document.title = finalTitle;

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

    updateMetaTag('title', finalTitle);
    updateMetaTag('description', finalDesc);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'AURA Digital');
    updateMetaTag('robots', isIndexed ? 'index, follow' : 'noindex, nofollow');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonical);

    updateMetaTag('og:type', 'website', 'og:type');
    updateMetaTag('og:url', finalCanonical, 'og:url');
    updateMetaTag('og:title', finalTitle, 'og:title');
    updateMetaTag('og:description', finalDesc, 'og:description');
    updateMetaTag('og:image', finalOgImage, 'og:image');
    updateMetaTag('og:site_name', 'AURA Digital', 'og:site_name');

    updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
    updateMetaTag('twitter:url', finalCanonical, 'twitter:url');
    updateMetaTag('twitter:title', finalTitle, 'twitter:title');
    updateMetaTag('twitter:description', finalDesc, 'twitter:description');
    updateMetaTag('twitter:image', finalOgImage, 'twitter:image');
    updateMetaTag('twitter:site', twitterHandle, 'twitter:site');

    let schemaScript = document.getElementById('seo-schema-injected');
    if (seoData?.schema_json) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'seo-schema-injected';
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(seoData.schema_json);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [finalTitle, finalDesc, finalKeywords, finalCanonical, finalOgImage, isIndexed, twitterHandle, seoData]);

  return null;
};

export default SEO;
