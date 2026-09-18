import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

const DEFAULT_SERVICES = [
  { title: 'Web Development', description: 'Modern web applications built with cutting-edge technologies', features: ['React.js', 'Vue.js', 'Angular', 'Responsive Design', 'Performance Optimization'], category: 'Development' },
  { title: 'Software Development', description: 'Custom software solutions tailored to your business needs', features: ['Python', 'PHP', 'Node.js', 'Database Design', 'API Development', 'Cloud Solutions'], category: 'Development' },
  { title: 'Mobile Development', description: 'Native and cross-platform mobile applications', features: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'App Store Deployment'], category: 'Development' },
  { title: 'Data Science / Analyst', description: 'Turn raw data into actionable insights and predictive intelligence', features: ['Data Analysis', 'Machine Learning', 'Business Intelligence', 'Dashboards & Reporting', 'Predictive Analytics'], category: 'Development' },
  { title: 'Brand Identity Development', description: 'Complete brand identity and positioning solutions', features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Marketing Strategy', 'Brand Voice'], category: 'Creative' },
  { title: 'Photo & Image Editing', description: 'Professional photo editing and image enhancement services', features: ['Photo Retouching', 'Color Correction', 'Background Removal', 'Image Enhancement', 'Photo Restoration'], category: 'Creative' },
  { title: 'Print-Ready Design', description: 'Create professional designs for print materials', features: ['Business Cards', 'Brochures', 'Flyers', 'Posters', 'Packaging Design'], category: 'Creative' },
  { title: 'Architectural & Solar Designs', description: '2D & 3D architectural and solar panel system designs', features: ['2D Floor Plans', '3D Modeling', 'Solar System Design', 'Technical Drawings', 'Visualization'], category: 'Creative' },
  { title: 'Digital Marketing', description: 'Strategic campaigns that grow your online presence', features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'PPC Campaigns'], category: 'Marketing' },
  { title: 'Social Media Content', description: 'Create engaging content for social media platforms', features: ['Content Creation', 'Social Media Strategy', 'Post Scheduling', 'Community Management', 'Analytics'], category: 'Marketing' },
  { title: 'Online Ad Campaigns', description: 'Develop and manage effective online advertising campaigns', features: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Campaign Optimization'], category: 'Marketing' },
  { title: 'Influencer Marketing', description: 'Work with influencers to amplify your brand reach', features: ['Influencer Identification', 'Campaign Management', 'Performance Tracking', 'Relationship Building', 'ROI Analysis'], category: 'Marketing' },
  { title: 'Business Content Writing', description: 'Professional business content creation for various platforms', features: ['Blog Writing', 'Website Copy', 'White Papers', 'Case Studies', 'Press Releases'], category: 'Content' },
  { title: 'Book & Ebook Publishing', description: 'Complete book and ebook publishing services', features: ['Book Design', 'Formatting', 'Cover Design', 'ISBN Registration', 'Distribution'], category: 'Content' },
  { title: 'Professional Photography', description: 'Get professional photos taken for your business needs', features: ['Product Photography', 'Corporate Headshots', 'Event Photography', 'Real Estate Photography', 'Photo Editing'], category: 'Specialized' },
  { title: 'Consultancy', description: 'Expert guidance for digital transformation and business growth', features: ['Digital Strategy', 'Process Optimization', 'Team Training', 'Growth Planning', 'Technology Consulting'], category: 'Specialized' }
];

const CATEGORY_LABELS = {
  Development: 'Development Services',
  Creative: 'Creative & Design Services',
  Marketing: 'Marketing Services',
  Content: 'Content & Publishing Services',
  Specialized: 'Specialized Services',
  general: 'General Services'
};

const CATEGORY_ORDER = ['Development', 'Creative', 'Marketing', 'Content', 'Specialized', 'general'];

const Services = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!mounted || error || !data || data.length === 0) {
          setLoading(false);
          return;
        }
        const mapped = data.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          description: s.short_desc || s.full_desc || '',
          features: [],
          category: s.category || 'general',
          icon: s.icon || ''
        }));
        setServices(mapped);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const categories = CATEGORY_ORDER.filter((cat) =>
    services.some((s) => s.category === cat)
  );

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="gradient-text">Services</span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional services designed to accelerate your business growth.
            </motion.p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => {
              const catServices = services.filter((s) => s.category === category);
              const gridCols = catServices.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4';
              return (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    {CATEGORY_LABELS[category] || category}
                  </h3>
                  <div className={`grid ${gridCols} gap-6 mb-12`}>
                    {catServices.map((service, index) => (
                      <motion.div
                        key={service.id || service.title}
                        className="glass-effect p-6 rounded-2xl h-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -5,
                          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)"
                        }}
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-gray-200 mb-4 text-sm">{service.description}</p>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-white mr-2"></div>
                              <span className="text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/contact">
              <motion.button
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Why Choose <span className="gradient-text">Aura?</span>
              </motion.h2>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                We combine creativity, technology, and strategy to deliver exceptional results
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '⚡', title: 'Fast Delivery', description: 'Quick turnaround times without compromising on quality or attention to detail.' },
                { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security and reliability you can trust for your business.' },
                { icon: '🤖', title: 'AI-Powered', description: 'Advanced AI/ML features integrated into every solution for superior results.' },
                { icon: '🕐', title: '24/7 Support', description: 'Round-the-clock assistance with AI chatbot and human experts available.' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-effect p-8 rounded-2xl text-center h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 15px 30px rgba(102, 126, 234, 0.3)"
                  }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
