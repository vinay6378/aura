import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DataScienceAnalyst = () => {
  const features = [
    {
      title: 'Data Analysis',
      description: 'Clean, explore, and interpret complex datasets to uncover trends',
      icon: '📈',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Machine Learning',
      description: 'Build predictive models for forecasting and automation',
      icon: '🤖',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Business Intelligence',
      description: 'Interactive dashboards that make KPIs clear for every stakeholder',
      icon: '📊',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Data Visualization',
      description: 'Compelling charts and reports in Power BI, Tableau, and custom tools',
      icon: '🎨',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Predictive Analytics',
      description: 'Anticipate customer behavior, demand, and risk before it happens',
      icon: '🔮',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Data Engineering',
      description: 'Reliable pipelines and warehouses for accurate, timely data',
      icon: '⚙️',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We align on business goals, data sources, and success metrics.'
    },
    {
      step: '02',
      title: 'Data Preparation',
      description: 'We collect, clean, and structure data for reliable analysis.'
    },
    {
      step: '03',
      title: 'Modeling & Analysis',
      description: 'We apply statistics, ML, and visualization to extract insights.'
    },
    {
      step: '04',
      title: 'Delivery & Support',
      description: 'We deploy dashboards, reports, and train your team to use them.'
    }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '₹1,49,999',
      features: ['Data audit', 'Basic dashboards', 'Monthly reports', '1 data source', 'Email support'],
      recommended: false
    },
    {
      name: 'Professional',
      price: '₹2,99,999',
      features: ['Advanced analytics', 'ML models', 'Power BI / Tableau setup', 'Multiple sources', '3 months support'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '₹5,99,999',
      features: ['Custom ML pipelines', 'Real-time dashboards', 'Dedicated analyst', 'API integrations', '6 months support'],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 opacity-50"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#4facfe', '#00f2fe', '#667eea', '#764ba2', '#43e97b', '#38f9d7'][i]}, transparent)`,
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
              ease: 'linear'
            }}
          />
        ))}
      </div>

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
                <span className="text-aura-cyan font-semibold">📊 Data Science / Analyst</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Turn Data Into <span className="gradient-text">Decisions</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              From exploratory analysis to production-ready models and executive dashboards — we help you act on data with confidence.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all text-center"
              >
                Get Started
              </Link>
              <a
                href="#pricing"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all text-center"
              >
                View Pricing
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
              What We <span className="gradient-text">Deliver</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              End-to-end data science and analytics services for startups and enterprises
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
              Our Analytics <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              A clear path from raw data to business impact
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
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
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
              Flexible plans for analytics projects of every size
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
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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

                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-full font-semibold text-center block ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'glass-effect text-white'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 opacity-10"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to <span className="gradient-text">Unlock Your Data?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let&apos;s build analytics that help you grow faster and make smarter decisions.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    to="/services"
                    className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DataScienceAnalyst;
