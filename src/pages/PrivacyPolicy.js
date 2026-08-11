import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number)',
        'Company information (Company name, industry, size)',
        'Project details (Requirements, timeline, budget)',
        'Technical information (IP address, browser type, device information)',
        'Communication data (Messages, support requests, feedback)'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide our digital transformation services',
        'To communicate with clients about projects',
        'To improve our website and services',
        'To send marketing materials (with consent)',
        'To analyze website usage and trends',
        'To protect against fraud and ensure security'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell or rent your personal information',
        'We may share data with trusted service providers',
        'We may disclose information if required by law',
        'We share aggregated anonymous data for analytics',
        'Your information is secure with third-party processors'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'SSL encryption for all data transmissions',
        'Secure servers with limited access',
        'Regular security audits and updates',
        'Employee training on data protection',
        'Compliance with international security standards'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access to your personal information',
        'Correction of inaccurate data',
        'Deletion of your information (where applicable)',
        'Opt-out of marketing communications',
        'Data portability upon request',
        'Right to lodge complaints with authorities'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies to improve user experience',
        'Marketing cookies for personalized content',
        'You can control cookies through browser settings',
        'Cookie consent banner for transparency'
      ]
    },
    {
      title: 'International Data Transfers',
      content: [
        'Your data may be transferred internationally',
        'We ensure adequate protection during transfers',
        'Compliance with GDPR and other regulations',
        'Standard contractual clauses for international transfers',
        'Your rights remain protected globally'
      ]
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our services are not directed to children under 18',
        'We do not knowingly collect children\'s information',
        'Parents can request removal of children\'s data',
        'Age verification where required by law',
        'Educational content for digital literacy'
      ]
    },
    {
      title: 'Policy Updates',
      content: [
        'We may update this privacy policy periodically',
        'Changes will be posted on our website',
        'Material changes will be communicated via email',
        'Continued use implies acceptance of updates',
        'Last updated: March 2024'
      ]
    },
    {
      title: 'Contact Information',
      content: [
        'For privacy concerns: privacy@auraofficial.in',
        'Data Protection Officer: dpo@auraofficial.in',
        'Physical address: Kishangarh, Ajmer, INDIA',
        'Phone: +91 90798 85925',
        'Response time: Within 30 days'
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
            Privacy <span className="text-purple-400">Policy</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Your privacy is fundamental to our business. This policy outlines how AURA Digital collects, uses, and protects your information.
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

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Contact Our Team</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          className="text-center mt-12 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <p>Last updated: March 24, 2024 | Effective: March 24, 2024</p>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
