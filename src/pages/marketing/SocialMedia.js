import React from 'react';
import { motion } from 'framer-motion';

const SocialMedia = () => {
  const platforms = [
    {
      name: 'Facebook',
      icon: '📘',
      color: 'from-blue-600 to-blue-800',
      users: '2.9B',
      description: 'Build community and drive engagement with Facebook marketing'
    },
    {
      name: 'Instagram',
      icon: '📷',
      color: 'from-pink-500 to-purple-600',
      users: '2B',
      description: 'Visual storytelling and brand building on Instagram'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'from-blue-400 to-blue-600',
      users: '450M',
      description: 'Real-time engagement and brand voice on Twitter'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-700 to-blue-900',
      users: '900M',
      description: 'Professional networking and B2B marketing on LinkedIn'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: 'from-black to-gray-800',
      users: '1B',
      description: 'Short-form video content and viral marketing on TikTok'
    },
    {
      name: 'YouTube',
      icon: '📺',
      color: 'from-red-600 to-red-800',
      users: '2.5B',
      description: 'Video marketing and content creation on YouTube'
    }
  ];

  const services = [
    {
      title: 'Social Media Strategy',
      description: 'Develop comprehensive social media strategies aligned with your business goals',
      icon: '📋',
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Content Creation',
      description: 'Create engaging content including posts, videos, stories, and reels',
      icon: '🎨',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Community Management',
      description: 'Manage your social media communities and engage with your audience',
      icon: '👥',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Paid Social Advertising',
      description: 'Run targeted ad campaigns to reach your ideal audience',
      icon: '📢',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Influencer Marketing',
      description: 'Partner with influencers to expand your reach and credibility',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Track performance and provide detailed insights on social media metrics',
      icon: '📊',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Strategy Development',
      description: 'We analyze your brand and create a tailored social media strategy.'
    },
    {
      step: '02',
      title: 'Content Planning',
      description: 'We develop a content calendar and create engaging content.'
    },
    {
      step: '03',
      title: 'Campaign Execution',
      description: 'We implement campaigns across all relevant social platforms.'
    },
    {
      step: '04',
      title: 'Optimization',
      description: 'We monitor performance and optimize for better results.'
    }
  ];

  const results = [
    {
      metric: '400%',
      description: 'Increase in social engagement',
      icon: '📈'
    },
    {
      metric: '250%',
      description: 'Growth in follower count',
      icon: '👥'
    },
    {
      metric: '3.5x',
      description: 'Return on ad spend',
      icon: '💰'
    },
    {
      metric: '85%',
      description: 'Increase in brand awareness',
      icon: '🎯'
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
                <span className="text-aura-cyan font-semibold">📱 Social Media Marketing</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Build Your Brand & <span className="gradient-text">Engage Your Audience</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Strategic social media marketing that builds communities, drives engagement, and grows your business across all platforms.
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
              Social Media <span className="gradient-text">Platforms</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              We manage your presence across all major social media platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center text-3xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {platform.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <div className="text-aura-cyan font-semibold mb-3">{platform.users} Users</div>
                <p className="text-gray-300">{platform.description}</p>
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
              Our Social Media <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive social media marketing solutions for your brand
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
              Real metrics from our successful social media campaigns
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
              Social Media <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our systematic approach to social media success
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
                  Ready to Dominate <span className="gradient-text">Social Media?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's create a social media strategy that builds your brand and engages your audience.
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

export default SocialMedia;
