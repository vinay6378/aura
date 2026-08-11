import React from 'react';
import { motion } from 'framer-motion';

const SoftwareDevelopment = () => {
  const services = [
    {
      title: 'Custom Software Solutions',
      description: 'Tailored software applications designed to meet your specific business requirements',
      icon: '⚙️',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Enterprise Applications',
      description: 'Scalable enterprise-grade software for large organizations',
      icon: '🏢',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'API Development',
      description: 'RESTful APIs and microservices for seamless system integration',
      icon: '🔌',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Database Solutions',
      description: 'Robust database design and optimization for data management',
      icon: '🗄️',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Cloud Solutions',
      description: 'Cloud-native applications with AWS, Azure, and Google Cloud',
      icon: '☁️',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'DevOps & CI/CD',
      description: 'Automated deployment pipelines and continuous integration',
      icon: '🔄',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const technologies = [
    { category: 'Backend', items: ['Python', 'Node.js', 'Java', 'PHP', 'Ruby on Rails'], icon: '⚙️' },
    { category: 'Frontend', items: ['React.js', 'Vue.js', 'Angular', 'TypeScript', 'Next.js'], icon: '🎨' },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase'], icon: '🗄️' },
    { category: 'Cloud', items: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Vercel'], icon: '☁️' },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions'], icon: '🔄' },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'], icon: '📱' }
  ];

  const process = [
    {
      step: '01',
      title: 'Requirements Analysis',
      description: 'We analyze your business needs and define clear software requirements.'
    },
    {
      step: '02',
      title: 'System Design',
      description: 'We design the architecture and technical specifications for your software.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our team develops your software using agile methodologies and best practices.'
    },
    {
      step: '04',
      title: 'Testing & QA',
      description: 'Comprehensive testing to ensure quality, security, and performance.'
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'Seamless deployment to production with minimal downtime.'
    },
    {
      step: '06',
      title: 'Maintenance',
      description: 'Ongoing support and maintenance to keep your software running smoothly.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 opacity-50"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#11998e', '#38ef7d', '#667eea', '#764ba2', '#f093fb', '#f5576c'][i]}, transparent)`,
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
                <span className="text-aura-cyan font-semibold">🛠️ Software Development</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Custom Software That <span className="gradient-text">Powers Your Business</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We build robust, scalable, and innovative software solutions that solve complex business challenges and drive growth.
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
                Start Your Project
              </motion.a>
              <motion.a
                href="#technologies"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Tech Stack
              </motion.a>
            </motion.div>
          </motion.div>
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
              Our Software <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive software development solutions for modern businesses
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
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Cutting-edge technologies we use to build powerful software solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                className="glass-effect p-8 rounded-2xl group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mr-4">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-sm text-gray-300 border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
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
              Development <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our proven methodology for delivering exceptional software
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2 hidden lg:block"></div>
            
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-1/2"></div>
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl relative z-10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div
                    className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="glass-effect p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-aura-cyan mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600 opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Build Your <span className="gradient-text">Custom Software?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's discuss your requirements and create a solution that drives your business forward.
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

export default SoftwareDevelopment;
