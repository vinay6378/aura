import React from 'react';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Crafting digital experiences that captivate and convert',
      icon: '🌐',
      features: ['React.js', 'Vue.js', 'Angular', 'Responsive Design', 'Performance Optimization', 'SEO Integration'],
      price: 'Starting at $599',
      timeline: '4-8 weeks',
      color: 'from-blue-500 to-purple-500',
      bgPattern: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      highlight: 'Modern, fast, and user-friendly websites'
    },
    {
      title: 'Software Development',
      description: 'Building powerful solutions that drive business innovation',
      icon: '⚡',
      features: ['Python', 'PHP', 'Node.js', 'Database Design', 'API Development', 'Cloud Solutions'],
      price: 'Starting at $699',
      timeline: '6-12 weeks',
      color: 'from-green-500 to-teal-500',
      bgPattern: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      highlight: 'Custom software tailored to your needs'
    },
    {
      title: 'Mobile Development',
      description: 'Creating seamless mobile experiences for iOS and Android',
      icon: '📱',
      features: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'App Store Deployment'],
      price: 'Starting at $799',
      timeline: '8-16 weeks',
      color: 'from-orange-500 to-red-500',
      bgPattern: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      highlight: 'Native and cross-platform apps'
    },
    {
      title: 'Data Science / Analyst',
      description: 'Unlock growth with data-driven decisions and advanced analytics',
      icon: '📊',
      features: ['Python & SQL', 'Machine Learning', 'Power BI & Tableau', 'Predictive Modeling', 'KPI Dashboards'],
      price: 'Starting at $1,099',
      timeline: '4-10 weeks',
      color: 'from-cyan-500 to-blue-500',
      bgPattern: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      highlight: 'Insights that drive smarter business decisions'
    },
    {
      title: 'Digital Marketing',
      description: 'Amplifying your brand voice in the digital landscape',
      icon: '📈',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'PPC Campaigns'],
      price: 'Starting at $499',
      timeline: 'Ongoing',
      color: 'from-pink-500 to-purple-500',
      bgPattern: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      highlight: 'Data-driven marketing strategies'
    },
    {
      title: 'Brand Strategy',
      description: 'Shaping unforgettable brand identities that resonate',
      icon: '�',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Marketing Strategy', 'Brand Voice'],
      price: 'Starting at $499',
      timeline: '3-6 weeks',
      color: 'from-yellow-500 to-orange-500',
      bgPattern: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      highlight: 'Comprehensive brand solutions'
    },
    {
      title: 'Consultancy',
      description: 'Guiding your digital transformation journey',
      icon: '💡',
      features: ['Digital Strategy', 'Process Optimization', 'Team Training', 'Growth Planning', 'Technology Consulting'],
      price: 'Starting at $29/hour',
      timeline: 'Flexible',
      color: 'from-indigo-500 to-blue-500',
      bgPattern: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      highlight: 'Expert guidance for growth'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We dive deep into your business ecosystem, understanding your unique challenges, goals, and vision through comprehensive research and stakeholder interviews.',
      icon: '🔍',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'We architect a comprehensive roadmap that aligns technology with business objectives, creating a blueprint for success.',
      icon: '🗺️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Design',
      description: 'We craft stunning, intuitive experiences that delight users and drive engagement, blending aesthetics with functionality.',
      icon: '🎨',
      color: 'from-orange-500 to-red-500'
    },
    {
      step: '04',
      title: 'Development',
      description: 'We build robust, scalable solutions using cutting-edge technologies and industry best practices.',
      icon: '🛠️',
      color: 'from-green-500 to-teal-500'
    },
    {
      step: '05',
      title: 'Testing',
      description: 'We rigorously test every aspect to ensure flawless performance, security, and user experience.',
      icon: '🧪',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      step: '06',
      title: 'Launch',
      description: 'We deploy your solution with precision and provide ongoing support to ensure sustained success.',
      icon: '🚀',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const technologies = [
    { category: 'Frontend', items: ['React.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'], icon: '🎨' },
    { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Java', 'Ruby on Rails'], icon: '⚙️' },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'], icon: '📱' },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase'], icon: '🗄️' },
    { category: 'Cloud', items: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Vercel'], icon: '☁️' },
    { category: 'Data Science', items: ['Python', 'Pandas', 'Scikit-learn', 'Power BI', 'SQL'], icon: '📊' },
    { category: 'Tools', items: ['Git', 'Docker', 'CI/CD', 'Jest', 'Webpack'], icon: '🔧' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'AURA transformed our digital presence completely. Their attention to detail and innovative approach exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Founder, InnovateCo',
      content: 'Working with AURA was a game-changer for our business. They delivered beyond our timeline and budget.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Director, GrowthLab',
      content: 'The team at AURA understands digital marketing like no other. Our ROI increased by 300% in just 6 months.',
      rating: 5
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
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`
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
                <span className="text-aura-cyan font-semibold">✨ Premium Digital Solutions</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform Your <span className="gradient-text">Digital Future</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where innovation meets excellence. We craft digital experiences that inspire, engage, and deliver measurable results.
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
                href="#process"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Process
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive solutions tailored to accelerate your digital transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15 }}
              >
                <div className="glass-effect p-8 rounded-2xl h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{ background: service.bgPattern }}
                  ></div>
                  
                  {/* Service Icon */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                    <div className="absolute inset-0 rounded-2xl animate-pulse bg-white opacity-20"></div>
                  </motion.div>
                  
                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  
                  {/* Highlight */}
                  <p className="text-aura-cyan font-semibold mb-4">{service.highlight}</p>
                  
                  {/* Description */}
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3 animate-pulse`}></div>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Price and Timeline */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Investment:</span>
                      <span className="text-white font-bold">{service.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Timeline:</span>
                      <span className="text-white font-semibold">{service.timeline}</span>
                    </div>
                  </div>
                  
                  {/* Hover Border */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              A systematic approach to delivering exceptional results
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2 hidden lg:block"></div>
            
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
                  {/* Step Number */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                  </div>
                  
                  {/* Step Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Technologies <span className="gradient-text">We Master</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Cutting-edge tools and frameworks to build modern solutions
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

      {/* Testimonials Section */}
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
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Hear what our clients have to say about their experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="glass-effect p-8 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
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
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your <span className="gradient-text">Business?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let's create something extraordinary together. Your success story starts here.
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
                    href="#about"
                    className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
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

export default ServicesPage;
