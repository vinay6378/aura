import React from 'react';
import { motion } from 'framer-motion';

const PPCAds = () => {
  const platforms = [
    {
      name: 'Google Ads',
      icon: '🔍',
      color: 'from-blue-500 to-yellow-500',
      description: 'Reach customers on Google Search and Display Network',
      features: ['Search Ads', 'Display Ads', 'Shopping Ads', 'YouTube Ads']
    },
    {
      name: 'Facebook Ads',
      icon: '📘',
      color: 'from-blue-600 to-blue-800',
      description: 'Targeted advertising on Facebook and Instagram',
      features: ['Facebook Feed', 'Instagram Stories', 'Facebook Stories', 'Messenger Ads']
    },
    {
      name: 'LinkedIn Ads',
      icon: '💼',
      color: 'from-blue-700 to-blue-900',
      description: 'B2B advertising on LinkedIn professional network',
      features: ['Sponsored Content', 'Message Ads', 'Dynamic Ads', 'Lead Gen Forms']
    },
    {
      name: 'Twitter Ads',
      icon: '🐦',
      color: 'from-blue-400 to-blue-600',
      description: 'Promoted tweets and trends on Twitter',
      features: ['Promoted Tweets', 'Trend Takeovers', 'Website Cards', 'App Installs']
    }
  ];

  const services = [
    {
      title: 'Campaign Strategy',
      description: 'Develop comprehensive PPC strategies aligned with your business goals',
      icon: '📋',
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Ad Creative Development',
      description: 'Create compelling ad copy and visuals that drive conversions',
      icon: '🎨',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Audience Targeting',
      description: 'Advanced audience segmentation and targeting for maximum ROI',
      icon: '🎯',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Bid Management',
      description: 'Optimized bidding strategies to maximize ad performance',
      icon: '💰',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'A/B Testing',
      description: 'Continuous testing of ads, landing pages, and strategies',
      icon: '🧪',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights on campaign performance',
      icon: '📊',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Campaign Audit',
      description: 'We analyze your current campaigns and identify optimization opportunities.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'We create a comprehensive PPC strategy tailored to your goals.'
    },
    {
      step: '03',
      title: 'Campaign Setup',
      description: 'We set up and launch your PPC campaigns with optimized settings.'
    },
    {
      step: '04',
      title: 'Optimization',
      description: 'We continuously monitor and optimize for better performance.'
    }
  ];

  const results = [
    {
      metric: '350%',
      description: 'Return on ad spend',
      icon: '💰'
    },
    {
      metric: '60%',
      description: 'Lower cost per acquisition',
      icon: '⬇️'
    },
    {
      metric: '400%',
      description: 'Increase in conversions',
      icon: '📈'
    },
    {
      metric: '85%',
      description: 'Improvement in quality score',
      icon: '⭐'
    }
  ];

  const industries = [
    {
      name: 'E-commerce',
      description: 'Drive online sales with targeted shopping and search ads',
      icon: '🛒'
    },
    {
      name: 'B2B Services',
      description: 'Generate qualified leads for business services',
      icon: '💼'
    },
    {
      name: 'Healthcare',
      description: 'Reach patients and healthcare professionals',
      icon: '🏥'
    },
    {
      name: 'Real Estate',
      description: 'Generate leads for property sales and rentals',
      icon: '🏠'
    },
    {
      name: 'Education',
      description: 'Attract students for courses and programs',
      icon: '🎓'
    },
    {
      name: 'Travel & Hospitality',
      description: 'Drive bookings for hotels, flights, and experiences',
      icon: '✈️'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 opacity-50"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'][i]}, transparent)`,
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
                <span className="text-aura-cyan font-semibold">📢 PPC & Ads</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Drive Results with <span className="gradient-text">Targeted Advertising</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Strategic PPC campaigns that reach your ideal audience, maximize ROI, and drive measurable business growth across all major advertising platforms.
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
                Start Campaign
              </motion.a>
              <motion.a
                href="#platforms"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Platforms
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advertising <span className="gradient-text">Platforms</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              We manage your ad campaigns across all major advertising platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="glass-effect p-8 rounded-2xl group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center text-2xl mr-6 flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {platform.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{platform.name}</h3>
                    <p className="text-gray-300 mb-4">{platform.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-sm text-gray-300 border border-white border-opacity-20"
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

      {/* Services Section */}
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
              PPC <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive PPC management services for maximum ROI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
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
              Specialized PPC expertise for various industry verticals
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
              Real metrics from our successful PPC campaigns
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
              PPC <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our systematic approach to PPC campaign success
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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Maximize Your <span className="gradient-text">Ad ROI?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's create targeted PPC campaigns that drive conversions and grow your business.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Campaign
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

export default PPCAds;
