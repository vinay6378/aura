import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '/', isRouter: true },
    { name: 'About', href: '/about', isRouter: true },
    { name: 'Services', href: '/services', isRouter: true, hasDropdown: true },
    { name: 'Contact', href: '/contact', isRouter: true }
  ];

  const developmentServices = [
    { name: 'Website Development', href: '/services/website-development' },
    { name: 'Software Development', href: '/services/software-development' },
    { name: 'Mobile Application', href: '/services/mobile-application' },
    { name: 'Data Science / Analyst', href: '/services/data-science-analyst' }
  ];

  const creativeServices = [
    { name: 'Brand Identity', href: '/creative/brand-identity' },
    { name: 'Photo Editing', href: '/creative/photo-editing' },
    { name: 'Print Design', href: '/creative/print-design' },
    { name: 'Architectural Design', href: '/creative/architectural-design' }
  ];

  const marketingServices = [
    { name: 'Social Media', href: '/marketing/social-media' },
    { name: 'Social Media Content', href: '/marketing/social-media-content' },
    { name: 'PPC & Ads', href: '/marketing/ppc-ads' },
    { name: 'Online Ad Campaigns', href: '/marketing/online-ad-campaigns' },
    { name: 'Content Marketing', href: '/marketing/content-marketing' },
    { name: 'Influencer Marketing', href: '/marketing/influencer-marketing' },
    { name: 'Analytics', href: '/marketing/analytics' }
  ];

  const contentServices = [
    { name: 'Business Content', href: '/content/business-content' },
    { name: 'Book & Ebook Publishing', href: '/content/book-ebook-publishing' }
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? 'bg-black bg-opacity-95 backdrop-blur-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/LOGO.png" 
                alt="AURA Digital Logo"
                className="h-24 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-12">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          className="text-white hover:text-aura-cyan transition-colors duration-200 px-4 py-2 relative group block"
                          onMouseEnter={() => setIsServicesDropdownOpen(true)}
                          onMouseLeave={() => setIsServicesDropdownOpen(false)}
                          aria-haspopup="true"
                          aria-expanded={isServicesDropdownOpen}
                        >
                          {item.name}
                          <motion.div
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-aura-cyan"
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isServicesDropdownOpen && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-96 glass-effect rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setIsServicesDropdownOpen(true)}
                            onMouseLeave={() => setIsServicesDropdownOpen(false)}
                          >
                            {/* Development Section */}
                            <div className="mb-6">
                              <h3 className="text-aura-cyan font-semibold mb-3">Development</h3>
                              <div className="space-y-2">
                                {developmentServices.map((service, serviceIndex) => (
                                  <Link
                                    key={service.name}
                                    to={service.href}
                                    className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            
                            {/* Creative Section */}
                            <div className="mb-6">
                              <h3 className="text-aura-cyan font-semibold mb-3">Creative</h3>
                              <div className="space-y-2">
                                {creativeServices.map((service, serviceIndex) => (
                                  <Link
                                    key={service.name}
                                    to={service.href}
                                    className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            
                            {/* Marketing Section */}
                            <div className="mb-6">
                              <h3 className="text-aura-cyan font-semibold mb-3">Marketing</h3>
                              <div className="space-y-2">
                                {marketingServices.map((service, serviceIndex) => (
                                  <Link
                                    key={service.name}
                                    to={service.href}
                                    className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Content Section */}
                            <div>
                              <h3 className="text-aura-cyan font-semibold mb-3">Content</h3>
                              <div className="space-y-2">
                                {contentServices.map((service, serviceIndex) => (
                                  <Link
                                    key={service.name}
                                    to={service.href}
                                    className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-white hover:text-aura-cyan transition-colors duration-200 px-4 py-2 relative group block"
                      >
                        {item.name}
                        <motion.div
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-aura-cyan"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <motion.path
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6M18 6" : "M4 6h16M4 12h16M4 18h16"}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black bg-opacity-95 backdrop-blur-lg max-h-[80vh] overflow-y-auto custom-scrollbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-6">
            {/* Mobile Services Dropdown */}
            <div className="mb-6">
              <div className="text-white font-semibold mb-4">Services</div>
              
              {/* Development Services */}
              <div className="mb-4">
                <div className="text-aura-cyan font-semibold mb-2">Development</div>
                <div className="space-y-2 ml-4">
                  {developmentServices.map((service, index) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Creative Services */}
              <div className="mb-4">
                <div className="text-aura-cyan font-semibold mb-2">Creative</div>
                <div className="space-y-2 ml-4">
                  {creativeServices.map((service, index) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Marketing Services */}
              <div className="mb-4">
                <div className="text-aura-cyan font-semibold mb-2">Marketing</div>
                <div className="space-y-2 ml-4">
                  {marketingServices.map((service, index) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Content Services */}
              <div className="mb-6">
                <div className="text-aura-cyan font-semibold mb-2">Content</div>
                <div className="space-y-2 ml-4">
                  {contentServices.map((service, index) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            {navItems.filter(item => !item.hasDropdown).map((item, index) => (
              <motion.div
                key={item.name}
                className="mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.isRouter ? (
                  <Link
                    to={item.href}
                    className="block text-white hover:text-aura-cyan transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <motion.a
                    href={item.href}
                    className="block text-white hover:text-aura-cyan transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scroll indicator when navbar is hidden */}
      {!isVisible && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <div className="bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-cyan-500 transition-colors">
            ↑ Scroll to Top
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
