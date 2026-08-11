import React from 'react';
import { motion } from 'framer-motion';

const ContentMarketing = () => {
  const services = [
    {
      title: 'Content Strategy',
      description: 'Develop comprehensive content strategies aligned with your business goals',
      icon: '📋',
      color: 'from-purple-500 to-blue-500',
      features: ['Audience Research', 'Content Calendar', 'Topic Planning', 'Distribution Strategy']
    },
    {
      title: 'Blog Content',
      description: 'Engaging blog posts that drive traffic and establish authority',
      icon: '📝',
      color: 'from-green-500 to-teal-500',
      features: ['Industry Insights', 'How-to Guides', 'Case Studies', 'Thought Leadership']
    },
    {
      title: 'Video Content',
      description: 'Compelling video content for social media and websites',
      icon: '🎥',
      color: 'from-orange-500 to-red-500',
      features: ['Explainer Videos', 'Product Demos', 'Interviews', 'Tutorial Series']
    },
    {
      title: 'Infographics',
      description: 'Visually appealing infographics that simplify complex information',
      icon: '📊',
      color: 'from-pink-500 to-purple-500',
      features: ['Data Visualization', 'Process Flows', 'Statistics', 'Comparisons']
    },
    {
      title: 'E-books & Guides',
      description: 'In-depth downloadable content for lead generation',
      icon: '📚',
      color: 'from-yellow-500 to-orange-500',
      features: ['Industry Reports', 'How-to Guides', 'Whitepapers', 'Case Studies']
    },
    {
      title: 'Email Marketing',
      description: 'Engaging email newsletters and campaigns',
      icon: '📧',
      color: 'from-indigo-500 to-blue-500',
      features: ['Newsletters', 'Drip Campaigns', 'Product Updates', 'Personalization']
    }
  ];

  const contentTypes = [
    {
      type: 'Blog Posts',
      description: 'SEO-optimized articles that drive organic traffic',
      icon: '📝',
      stats: '300+ blog posts written'
    },
    {
      type: 'Videos',
      description: 'Engaging video content for multiple platforms',
      icon: '🎥',
      stats: '150+ videos produced'
    },
    {
      type: 'Infographics',
      description: 'Visual content that simplifies complex data',
      icon: '📊',
      stats: '200+ infographics created'
    },
    {
      type: 'E-books',
      description: 'Comprehensive guides for lead generation',
      icon: '📚',
      stats: '50+ e-books published'
    },
    {
      type: 'Case Studies',
      description: 'Success stories that build trust',
      icon: '🏆',
      stats: '100+ case studies written'
    },
    {
      type: 'Whitepapers',
      description: 'In-depth research and industry insights',
      icon: '📄',
      stats: '75+ whitepapers published'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Research & Planning',
      description: 'We research your audience and create a comprehensive content strategy.'
    },
    {
      step: '02',
      title: 'Content Creation',
      description: 'Our team creates high-quality content that resonates with your audience.'
    },
    {
      step: '03',
      title: 'Distribution',
      description: 'We distribute content across relevant channels for maximum reach.'
    },
    {
      step: '04',
      title: 'Analysis',
      description: 'We analyze performance and optimize for better results.'
    }
  ];

  const results = [
    {
      metric: '450%',
      description: 'Increase in organic traffic',
      icon: '📈'
    },
    {
      metric: '300%',
      description: 'Growth in lead generation',
      icon: '🎯'
    },
    {
      metric: '250%',
      description: 'Improvement in engagement',
      icon: '💬'
    },
    {
      metric: '200%',
      description: 'Increase in time on site',
      icon: '⏱️'
    }
  ];

  const industries = [
    {
      name: 'Technology',
      description: 'Technical content that explains complex concepts simply',
      icon: '💻'
    },
    {
      name: 'Healthcare',
      description: 'Informative healthcare content that builds trust',
      icon: '🏥'
    },
    {
      name: 'Finance',
      description: 'Financial content that educates and converts',
      icon: '💰'
    },
    {
      name: 'E-commerce',
      description: 'Product-focused content that drives sales',
      icon: '🛒'
    },
    {
      name: 'SaaS',
      description: 'B2B content that demonstrates value and ROI',
      icon: '☁️'
    },
    {
      name: 'Education',
      description: 'Educational content that attracts and engages students',
      icon: '🎓'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-50"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'][i]}, transparent)`,
              left: `${15 + (i * 12)}%`,
              top: `${10 + (i * 15)}%`
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-effect px-6 py-3 rounded-full">
                <span className="text-aura-cyan font-semibold">✍️ Content Marketing</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Content That <span className="gradient-text">Drives Engagement</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Strategic content marketing that builds authority, engages your audience, and drives measurable business results across all channels.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Content Strategy
              </motion.a>
              <motion.a
                href="#services"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Content <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive content marketing solutions for your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="glass-effect p-8 rounded-2xl group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-2xl mr-6 flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs text-gray-300 border border-white border-opacity-20"
                          whileHover={{ scale: 1.05 }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Content <span className="gradient-text">Types</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Diverse content formats to engage your audience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentTypes.map((contentType, index) => (
              <motion.div
                key={contentType.type}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl mb-4">{contentType.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{contentType.type}</h3>
                <p className="text-gray-300 mb-4">{contentType.description}</p>
                <div className="text-aura-cyan font-semibold text-sm">{contentType.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Industries We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Specialized content marketing expertise for various industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{industry.name}</h3>
                <p className="text-gray-300">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Proven <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Real metrics from our successful content marketing campaigns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={result.metric}
                className="glass-effect p-8 rounded-2xl text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{result.icon}</div>
                <div className="text-3xl font-bold text-aura-cyan mb-2">{result.metric}</div>
                <div className="text-gray-300">{result.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Content <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our systematic approach to content marketing success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="glass-effect p-8 rounded-2xl relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect p-16 rounded-2xl max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Create <span className="gradient-text">Compelling Content?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's develop a content strategy that builds your brand and drives business growth.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Content Strategy
                  </motion.a>
                  <motion.a
                    href="/services/marketing"
                    className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Marketing Services
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContentMarketing;
