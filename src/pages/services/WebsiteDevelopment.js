import React from 'react';
import { motion } from 'framer-motion';

const WebsiteDevelopment = () => {
  const features = [
    {
      title: 'Responsive Design',
      description: 'We create websites that look stunning on all devices',
      icon: '📱',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Modern Technologies',
      description: 'Built with React.js, Vue.js, Angular, and cutting-edge frameworks',
      icon: '⚡',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'SEO Optimization',
      description: 'Websites optimized for search engines from day one',
      icon: '🔍',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Performance Focus',
      description: 'Lightning-fast loading times and smooth user experience',
      icon: '🚀',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Security First',
      description: 'Built with security best practices and regular updates',
      icon: '🔒',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Scalable Architecture',
      description: 'Websites that grow with your business needs',
      icon: '📈',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We understand your goals and create a comprehensive project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'We create stunning designs and interactive prototypes for your approval.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our expert developers bring your vision to life with clean, efficient code.'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Rigorous testing followed by a seamless deployment to production.'
    }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '₹17,500',
      features: ['5 Pages', 'Responsive Design',  'Contact Form', '1 Month Support'],
      recommended: false
    },
    {
      name: 'Professional',
      price: '₹49,999',
      features: ['10 Pages', 'Responsive Design', 'Basic SEO', 'Analytics Setup', '3 Months Support'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '₹1,99,999',
      features: ['Unlimited Pages', 'Custom Design', 'Standard SEO', 'E-commerce Integration', 'API Integration', '6 Months Support'],
      recommended: false
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
                <span className="text-aura-cyan font-semibold">🌐 Website Development</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Stunning Websites That <span className="gradient-text">Drive Results</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We create modern, responsive, and high-performance websites that captivate your audience and convert visitors into customers.
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
                Get Started
              </motion.a>
              <motion.a
                href="#pricing"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Pricing
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Our <span className="gradient-text">Website Development</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              We combine cutting-edge technology with creative design to deliver exceptional web experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
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
              Our Development <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              A systematic approach to delivering exceptional websites
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Choose the perfect plan for your website development needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`glass-effect p-8 rounded-2xl relative ${plan.recommended ? 'ring-2 ring-aura-cyan' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </div>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-aura-cyan mb-6">{plan.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.a
                  href="#contact"
                  className={`w-full py-3 rounded-full font-semibold text-center block ${
                    plan.recommended 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'glass-effect text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
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
                  Ready to Launch Your <span className="gradient-text">Website?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's create a stunning website that represents your brand and drives business growth.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Project
                  </motion.a>
                  <motion.a
                    href="/services"
                    className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Services
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

export default WebsiteDevelopment;
