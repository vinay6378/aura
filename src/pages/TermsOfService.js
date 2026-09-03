import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using AURA Digital services, you accept these terms',
        'If you disagree with any part, you may not access our services',
        'These terms apply to all visitors, users, and clients',
        'We reserve the right to update these terms periodically',
        'Continued use constitutes acceptance of modifications'
      ]
    },
    {
      title: 'Services Description',
      content: [
        'Website development and design services',
        'Software development and customization',
        'Mobile application development',
        'Digital marketing and SEO services',
        'Content creation and management',
        'Technical support and maintenance',
        'Consulting and strategy services'
      ]
    },
    {
      title: 'Client Responsibilities',
      content: [
        'Provide accurate and complete project information',
        'Respond promptly to requests and clarifications',
        'Provide necessary materials and access',
        'Review deliverables within specified timeframes',
        'Provide feedback for iterative improvements',
        'Maintain confidentiality of project details',
        'Make timely payments as agreed'
      ]
    },
    {
      title: 'Payment Terms',
      content: [
        'Payment schedules outlined in project proposals',
        '50% advance payment for projects above ₹1,00,000',
        'Final payment due upon project completion',
        'Late payments subject to 2% monthly interest',
        'Additional work billed separately',
        'Payment methods: Bank transfer, UPI, Credit Card',
        'All prices exclusive of applicable taxes'
      ]
    },
    {
      title: 'Project Timeline and Delivery',
      content: [
        'Timelines estimated based on project complexity',
        'Delays due to client changes may extend timeline',
        'Force majeure events may affect delivery schedules',
        'Regular progress updates provided to clients',
        'Beta testing included in development timeline',
        'Final delivery includes documentation and training'
      ]
    },
    {
      title: 'Intellectual Property Rights',
      content: [
        'Client owns final deliverables upon full payment',
        'AURA retains rights to pre-existing intellectual property',
        'Open-source components remain under original licenses',
        'Third-party assets subject to their respective licenses',
        'Client grants license to use project in portfolio',
        'Source code provided unless otherwise agreed'
      ]
    },
    {
      title: 'Confidentiality',
      content: [
        'Both parties agree to maintain confidentiality',
        'Business information remains proprietary',
        'Technical details not to be disclosed',
        'Confidentiality extends beyond project completion',
        'Employees bound by non-disclosure agreements',
        'Breach of confidentiality may result in legal action'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'Services provided "as is" without warranties',
        'AURA not liable for indirect or consequential damages',
        'Maximum liability limited to project value',
        'No liability for data loss or corruption',
        'Client responsible for data backup and security',
        'Force majeure events exempt from liability'
      ]
    },
    {
      title: 'Termination of Services',
      content: [
        'Either party may terminate with 30-day notice',
        'Immediate termination for material breach',
        'Client pays for work completed up to termination',
        'Confidentiality obligations survive termination',
        'Final payment due upon termination',
        'Return of all materials and intellectual property'
      ]
    },
    {
      title: 'Dispute Resolution',
      content: [
        'Good faith negotiation as first step',
        'Mediation through neutral third party if needed',
        'Jurisdiction: Courts of Ajmer, India',
        'Arbitration under Indian Arbitration Act',
        'Costs shared equally by both parties',
        'Decision final and binding on both parties'
      ]
    },
    {
      title: 'Service Level Agreement',
      content: [
        'Response time: Within 24 hours for support requests',
        'Uptime guarantee: 99.5% for hosted solutions',
        'Bug fixes: Within 48 hours of reporting',
        'Security updates: Applied within 7 days of release',
        'Performance monitoring and regular reporting',
        'Compensation for SLA breaches as specified'
      ]
    },
    {
      title: 'Compliance and Legal',
      content: [
        'Compliance with Indian IT Act and regulations',
        'Adherence to international data protection laws',
        'Tax compliance as per Indian laws',
        'Export control compliance for international projects',
        'Accessibility standards compliance where applicable',
        'Regular legal audits and compliance checks'
      ]
    },
    {
      title: 'Miscellaneous Provisions',
      content: [
        'Entire agreement between parties',
        'No waiver of any term unless in writing',
        'Severability: Invalid terms don\'t affect others',
        'No third-party beneficiaries unless specified',
        'Notices sent via email and confirmed receipt',
        'Governing law: Indian law and jurisdiction'
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
            Terms of <span className="text-purple-400">Service</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            These Terms of Service govern your relationship with AURA Digital. Please read them carefully before using our services.
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
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6">
              By engaging with AURA Digital, you agree to these terms. Let's create something amazing together!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
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

export default TermsOfService;
