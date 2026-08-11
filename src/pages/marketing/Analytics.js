import React from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const services = [
    {
      title: 'Web Analytics',
      description: 'Comprehensive website performance tracking and analysis',
      icon: '🌐',
      color: 'from-blue-500 to-purple-500',
      features: ['Google Analytics', 'User Behavior', 'Conversion Tracking', 'Traffic Sources']
    },
    {
      title: 'SEO Analytics',
      description: 'Track and optimize your search engine performance',
      icon: '🔍',
      color: 'from-green-500 to-teal-500',
      features: ['Keyword Rankings', 'Backlink Analysis', 'Site Health', 'Competitor Analysis']
    },
    {
      title: 'Social Media Analytics',
      description: 'Measure and optimize social media performance',
      icon: '📱',
      color: 'from-orange-500 to-red-500',
      features: ['Engagement Metrics', 'Reach Analysis', 'Content Performance', 'Audience Insights']
    },
    {
      title: 'PPC Analytics',
      description: 'Detailed analysis of paid advertising campaigns',
      icon: '📢',
      color: 'from-pink-500 to-purple-500',
      features: ['Campaign Performance', 'ROI Analysis', 'A/B Testing', 'Conversion Tracking']
    },
    {
      title: 'E-commerce Analytics',
      description: 'Track online sales and customer behavior',
      icon: '🛒',
      color: 'from-yellow-500 to-orange-500',
      features: ['Sales Tracking', 'Customer Journey', 'Product Performance', 'Revenue Analysis']
    },
    {
      title: 'Custom Dashboards',
      description: 'Tailored analytics dashboards for your specific needs',
      icon: '📊',
      color: 'from-indigo-500 to-blue-500',
      features: ['Real-time Data', 'Custom Reports', 'KPI Tracking', 'Data Visualization']
    }
  ];

  const tools = [
    {
      name: 'Google Analytics',
      icon: '📊',
      description: 'Industry-standard web analytics platform',
      features: ['Traffic Analysis', 'User Behavior', 'Conversion Tracking', 'Custom Reports']
    },
    {
      name: 'Google Search Console',
      icon: '🔍',
      description: 'Search performance and website health monitoring',
      features: ['Search Analytics', 'Index Status', 'Technical SEO', 'Performance Reports']
    },
    {
      name: 'SEMrush',
      icon: '🎯',
      description: 'Comprehensive SEO and competitive analysis',
      features: ['Keyword Research', 'Competitor Analysis', 'Backlink Tracking', 'Site Audit']
    },
    {
      name: 'Hotjar',
      icon: '🔥',
      description: 'User behavior analysis with heatmaps and recordings',
      features: ['Heatmaps', 'Session Recordings', 'Conversion Funnels', 'User Feedback']
    },
    {
      name: 'Mixpanel',
      icon: '📈',
      description: 'Advanced product analytics and user tracking',
      features: ['Event Tracking', 'User Segmentation', 'Funnel Analysis', 'Retention Analysis']
    },
    {
      name: 'Tableau',
      icon: '📊',
      description: 'Business intelligence and data visualization',
      features: ['Data Visualization', 'Custom Dashboards', 'Business Intelligence', 'Reporting']
    }
  ];

  const metrics = [
    {
      category: 'Traffic Metrics',
      icon: '🚗',
      description: 'Track website visitors and traffic sources',
      kpis: ['Sessions', 'Users', 'Page Views', 'Bounce Rate', 'Session Duration']
    },
    {
      category: 'Conversion Metrics',
      icon: '🎯',
      description: 'Measure conversion rates and goal completions',
      kpis: ['Conversion Rate', 'Goal Completions', 'Revenue', 'Cost per Conversion', 'ROI']
    },
    {
      category: 'Engagement Metrics',
      icon: '💬',
      description: 'Analyze user engagement and interaction',
      kpis: ['Pages per Session', 'Average Session Duration', 'Scroll Depth', 'Click-through Rate']
    },
    {
      category: 'Social Metrics',
      icon: '📱',
      description: 'Track social media performance and engagement',
      kpis: ['Followers', 'Engagement Rate', 'Reach', 'Impressions', 'Social Shares']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Data Collection',
      description: 'We set up comprehensive tracking across all your digital channels.'
    },
    {
      step: '02',
      title: 'Data Analysis',
      description: 'We analyze the collected data to identify trends and insights.'
    },
    {
      step: '03',
      title: 'Reporting',
      description: 'We create detailed reports and dashboards for easy understanding.'
    },
    {
      step: '04',
      title: 'Optimization',
      description: 'We use insights to optimize your marketing strategies.'
    }
  ];

  const benefits = [
    {
      title: 'Data-Driven Decisions',
      description: 'Make informed decisions based on real data and insights',
      icon: '📊'
    },
    {
      title: 'Performance Optimization',
      description: 'Identify and fix performance issues across channels',
      icon: '⚡'
    },
    {
      title: 'ROI Improvement',
      description: 'Maximize return on investment through better targeting',
      icon: '💰'
    },
    {
      title: 'Competitive Advantage',
      description: 'Gain insights into competitor strategies and market trends',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-50"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#667eea', '#764ba2'][i]}, transparent)`,
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
                <span className="text-aura-cyan font-semibold">📊 Analytics</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Data Insights That <span className="gradient-text">Drive Growth</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Comprehensive analytics and reporting solutions that transform data into actionable insights for smarter business decisions.
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
                Start Analytics Setup
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
              Analytics <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive analytics solutions for data-driven decision making
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

      {/* Tools Section */}
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
              Analytics <span className="gradient-text">Tools</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Industry-leading tools and platforms we use for analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="glass-effect p-8 rounded-2xl group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mr-4">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                </div>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, featureIndex) => (
                    <motion.span
                      key={feature}
                      className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs text-gray-300 border border-white border-opacity-20"
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
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
              Key Performance <span className="gradient-text">Metrics</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Critical metrics we track to measure your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.category}
                className="glass-effect p-8 rounded-2xl group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mr-6">
                    {metric.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{metric.category}</h3>
                    <p className="text-gray-300">{metric.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {metric.kpis.map((kpi, kpiIndex) => (
                    <motion.div
                      key={kpi}
                      className="text-center p-3 bg-white bg-opacity-5 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-aura-cyan font-semibold">{kpi}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Analytics <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              How analytics drives business growth and success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="glass-effect p-8 rounded-2xl text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
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
              Analytics <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our systematic approach to analytics implementation
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to <span className="gradient-text">Unlock Your Data?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's set up comprehensive analytics to drive data-driven decisions and business growth.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Analytics Setup
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

export default Analytics;
