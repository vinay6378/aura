import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Website Development', href: '/services/website-development' },
      { name: 'Software Development', href: '/services/software-development' },
      { name: 'Mobile Application', href: '/services/mobile-application' },
      { name: 'Data Science / Analyst', href: '/services/data-science-analyst' },
      { name: 'Brand Identity', href: '/creative/brand-identity' },
      { name: 'Photo Editing', href: '/creative/photo-editing' },
      { name: 'Print Design', href: '/creative/print-design' },
      { name: 'Architectural Design', href: '/creative/architectural-design' },
      { name: 'Social Media Content', href: '/marketing/social-media-content' },
      { name: 'Online Ad Campaigns', href: '/marketing/online-ad-campaigns' },
      { name: 'Influencer Marketing', href: '/marketing/influencer-marketing' },
      { name: 'Business Content', href: '/content/business-content' },
      { name: 'Book & Ebook Publishing', href: '/content/book-ebook-publishing' },
      { name: 'Professional Photography', href: '/specialized/professional-photography' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vinay-sharma-475398169/', icon: 'in' },
      { name: 'X (Twitter)', href: 'https://x.com/Vinaygautam939', icon: '𝕏' },
      { name: 'GitHub', href: 'https://github.com/vinay6378/aura1', icon: '⚡' },
      { name: 'YouTube', href: 'https://www.youtube.com/@AuraDigitalSolution', icon: '▶' },
      { name: 'Instagram', href: 'https://www.instagram.com/aura_ai.tech/', icon: '📸' },
      { name: 'Website', href: 'https://auraofficial.in', icon: '🌐' }
    ]
  };

  return (
    <footer className="glass-effect border-t border-white border-opacity-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="gradient-text">AURA</span>
            </h3>
            <p className="text-gray-300">
              Transform your digital presence with cutting-edge web development, 
              stunning 3D designs, and innovative marketing solutions.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <p>✓ 50+ Projects Delivered</p>
              <p>✓ 10+ Happy Clients</p>
              <p>✓ 2+ Years Experience</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">📧</span>
                <a href="mailto:vs8890864@gmail.com" className="hover:text-aura-cyan transition-colors">vs8890864@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">📍</span>
                <span>Kishangarh, Ajmer, INDIA</span>
              </div>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Services</h4>
            <div className="grid grid-cols-2 gap-4">
              {footerLinks.services.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-aura-cyan transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
            <div className="grid grid-cols-2 gap-4">
              {footerLinks.company.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-aura-cyan transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <div className="grid grid-cols-2 gap-4">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-aura-cyan transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-6 justify-center">
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-400/50 transition-all duration-300">
                      <span className="text-2xl font-bold bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                        {social.icon}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white border-opacity-20 pt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} <span className="gradient-text font-semibold">AURA</span>. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              AURA &hearts;</div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
