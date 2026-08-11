import React from 'react';
import { motion } from 'framer-motion';

const MobileApplication = () => {
  const platforms = [
    {
      title: 'iOS Development',
      description: 'Native iOS apps using Swift and SwiftUI for iPhone and iPad',
      icon: '🍎',
      color: 'from-gray-700 to-gray-900',
      features: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'Push Notifications']
    },
    {
      title: 'Android Development',
      description: 'Native Android apps using Kotlin and Jetpack Compose',
      icon: '🤖',
      color: 'from-green-500 to-green-700',
      features: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase', 'Material Design']
    },
    {
      title: 'Cross-Platform',
      description: 'Single codebase apps using React Native and Flutter',
      icon: '🔄',
      color: 'from-blue-500 to-purple-600',
      features: ['React Native', 'Flutter', 'Ionic', 'Xamarin', 'Unity']
    }
  ];

  const services = [
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive mobile app designs',
      icon: '🎨',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'App Development',
      description: 'Full-cycle mobile app development',
      icon: '📱',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'App Store Deployment',
      description: 'Seamless deployment to App Store and Google Play',
      icon: '🚀',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Maintenance & Updates',
      description: 'Ongoing support and regular app updates',
      icon: '🔧',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing app speed and battery usage',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Security & Compliance',
      description: 'Ensuring app security and regulatory compliance',
      icon: '🔒',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your requirements and create a mobile app strategy.'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'We create wireframes and interactive prototypes for your app.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our developers build your app using the latest mobile technologies.'
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Comprehensive testing on multiple devices and platforms.'
    },
    {
      step: '05',
      title: 'Launch',
      description: 'We deploy your app to App Store and Google Play.'
    },
    {
      step: '06',
      title: 'Support',
      description: 'Ongoing maintenance and updates to keep your app current.'
    }
  ];

  const caseStudies = [
    {
      title: 'E-commerce Mobile App',
      description: 'Complete shopping experience with payment integration',
      platform: 'React Native',
      result: '300% increase in mobile sales'
    },
    {
      title: 'Healthcare Management',
      description: 'Patient management and telemedicine platform',
      platform: 'Native iOS & Android',
      result: '50,000+ active users'
    },
    {
      title: 'Food Delivery App',
      description: 'Real-time tracking and order management system',
      platform: 'Flutter',
      result: '4.8 star rating on app stores'
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
                <span className="text-aura-cyan font-semibold">📱 Mobile Application Development</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Mobile Apps That <span className="gradient-text">Transform Ideas</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We create stunning, high-performance mobile applications for iOS, Android, and cross-platform solutions that engage users and drive business growth.
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
                Build Your App
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
              Mobile <span className="gradient-text">Platforms</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              We develop for all major mobile platforms with native performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.title}
                className="glass-effect p-8 rounded-2xl text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center text-4xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {platform.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{platform.title}</h3>
                <p className="text-gray-300 mb-6">{platform.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {platform.features.map((feature, featureIndex) => (
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
              Mobile App <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive mobile app development services from concept to launch
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
              App Development <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our systematic approach to building successful mobile applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Case Studies Section */}
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
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Mobile apps we've built that deliver real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                className="glass-effect p-8 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{study.title}</h3>
                <p className="text-gray-300 mb-4">{study.description}</p>
                <div className="mb-4">
                  <span className="text-aura-cyan font-semibold">Platform:</span>
                  <span className="text-gray-300 ml-2">{study.platform}</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <span className="text-green-400 font-semibold">Result:</span>
                  <span className="text-white ml-2">{study.result}</span>
                </div>
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
                  Ready to Launch Your <span className="gradient-text">Mobile App?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's turn your mobile app idea into a reality that users will love.
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

export default MobileApplication;
