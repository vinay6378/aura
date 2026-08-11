import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const sections = [
    {
      title: 'What Are Cookies',
      content: [
        'Cookies are small text files stored on your device',
        'They help us provide better user experience',
        'Cookies remember your preferences and settings',
        'They enable website functionality and personalization',
        'Cookies are standard web technology practice'
      ]
    },
    {
      title: 'Types of Cookies We Use',
      content: [
        'Essential Cookies: Required for basic website functionality',
        'Performance Cookies: Collect usage statistics and analytics',
        'Functional Cookies: Remember your preferences and choices',
        'Marketing Cookies: Deliver personalized advertisements',
        'Social Media Cookies: Enable social media integration'
      ]
    },
    {
      title: 'Essential Cookies',
      content: [
        'Authentication and session management',
        'Security tokens and fraud prevention',
        'Load balancing and server management',
        'Shopping cart and checkout functionality',
        'User preference storage for accessibility',
        'Cannot be disabled without affecting website functionality'
      ]
    },
    {
      title: 'Performance and Analytics Cookies',
      content: [
        'Google Analytics for website traffic analysis',
        'Hotjar for user behavior tracking',
        'Page load time and performance monitoring',
        'Error tracking and debugging information',
        'A/B testing and optimization data',
        'Geographic and demographic information'
      ]
    },
    {
      title: 'Functional Cookies',
      content: [
        'Language and region preferences',
        'Theme and display settings',
        'Remember login information across sessions',
        'Customized content based on user behavior',
        'Social media sharing preferences',
        'Newsletter subscription status'
      ]
    },
    {
      title: 'Marketing and Advertising Cookies',
      content: [
        'Google Ads for personalized advertising',
        'Facebook Pixel for social media marketing',
        'LinkedIn Insight for professional targeting',
        'Retargeting campaigns for returning visitors',
        'Cross-site behavioral advertising',
        'Conversion tracking and attribution'
      ]
    },
    {
      title: 'Third-Party Cookies',
      content: [
        'Google services (Analytics, Ads, reCAPTCHA)',
        'Facebook and Instagram social plugins',
        'LinkedIn professional network integration',
        'YouTube video embedding and analytics',
        'Cloudflare for security and performance',
        'Payment gateway cookies for transactions'
      ]
    },
    {
      title: 'Managing Your Cookie Preferences',
      content: [
        'Cookie consent banner on first visit',
        'Cookie settings panel in website footer',
        'Browser settings to block all cookies',
        'Private browsing mode for temporary sessions',
        'Regular cookie cleanup recommendations',
        'Opt-out links for advertising networks'
      ]
    },
    {
      title: 'Cookie Duration and Expiry',
      content: [
        'Session cookies: Expire when browser closes',
        'Persistent cookies: 30 days to 2 years',
        'Authentication cookies: 24 hours to 30 days',
        'Analytics cookies: 2 years maximum',
        'Marketing cookies: 90 days to 1 year',
        'Security cookies: Session-based only'
      ]
    },
    {
      title: 'Your Cookie Rights',
      content: [
        'Accept or reject non-essential cookies',
        'Withdraw consent at any time',
        'View detailed cookie information',
        'Delete cookies from your device',
        'Opt out of targeted advertising',
        'Request information about cookie usage'
      ]
    },
    {
      title: 'Impact of Disabling Cookies',
      content: [
        'Some website features may not work properly',
        'Personalized content will be limited',
        'Login persistence may be affected',
        'Shopping cart functionality may be lost',
        'Social media integration may fail',
        'Analytics and performance tracking disabled'
      ]
    },
    {
      title: 'International Data Transfer',
      content: [
        'Cookies may transfer data internationally',
        'EU-US Privacy Shield compliance where applicable',
        'Standard contractual clauses for data protection',
        'Adequacy decisions for international transfers',
        'Your rights maintained across jurisdictions',
        'Transparent data flow information'
      ]
    },
    {
      title: 'Children and Privacy',
      content: [
        'No targeted advertising to users under 16',
        'Limited data collection from minors',
        'Parental consent requirements',
        'Age-appropriate content and services',
        'Educational resources about online privacy',
        'Immediate removal of children\'s data upon request'
      ]
    },
    {
      title: 'Security Measures',
      content: [
        'HTTPS encryption for all cookie transmissions',
        'Secure cookie attributes (HttpOnly, Secure)',
        'SameSite cookie policy for CSRF protection',
        'Regular security audits and penetration testing',
        'Compliance with latest security standards',
        'Employee training on data protection'
      ]
    },
    {
      title: 'Policy Updates and Changes',
      content: [
        'Cookie policy may be updated periodically',
        'Changes communicated via website notifications',
        'Material changes require renewed consent',
        'Version history maintained for transparency',
        'Effective date clearly indicated',
        '30-day grace period for significant changes'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie <span className="text-purple-400">Policy</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            This Cookie Policy explains how AURA Digital uses cookies and similar technologies to enhance your experience on our website.
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                {section.title}
              </h2>
              
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start space-x-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Cookie Management Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-gray-300 mb-6">
              Take control of your privacy by customizing your cookie settings. You can update your preferences at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                Accept All Cookies
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all">
                Customize Settings
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all">
                Reject Non-Essential
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Questions About Cookies?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have questions about our Cookie Policy or how we use cookies, please contact our privacy team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Contact Privacy Team</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          className="text-center mt-12 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <p>Last updated: March 24, 2024 | Effective: March 24, 2024</p>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
