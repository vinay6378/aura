import React from 'react';
import { motion } from 'framer-motion';


const About = () => {
  const team = [
    {
      name: 'Vinay Sharma',
      role: 'CEO & Founder',
      image: '/images/CEO.jpeg',
      description: 'Visionary leader with 5+ years in digital transformation',
      expertise: ['Strategy', 'Leadership', 'Innovation'],
      color: 'from-purple-500 to-blue-500'
    },
    
    {
      name: 'Yogesh Sharma',  
      role: 'CTO',
      image: '/images/CTO.png',
      description: 'Tech expert specializing in scalable architectures',
      expertise: ['Architecture', 'Cloud', 'DevOps'],
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Deepak Sharma',
      role: 'Lead Developer',
      image: '/images/Lead.png',
      description: 'Full-stack developer with expertise in modern frameworks',
      expertise: ['React.js', 'Node.js', 'Python'],
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Himanshu Bundel',
      role: 'Creative Director',
      image: '/images/Creative.png',
      description: 'Design expert focused on user experience and branding',
      expertise: ['UI/UX', 'Branding', 'Design Systems'],
      color: 'from-pink-500 to-purple-500'
    },
   
  ];

  const achievements = [
    { number: '10+', label: 'Projects Delivered', icon: '🚀' },
    { number: '4+', label: 'Team Members', icon: '👥' },
    { number: '1+', label: 'Years Experience', icon: '⏰' },
    { number: '90%', label: 'Client Satisfaction', icon: '⭐' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering results that exceed expectations.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We build trust through transparent communication and honest partnerships.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We push boundaries with creative solutions and cutting-edge technology.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🚀',
      title: 'Growth',
      description: 'We help our clients grow by providing solutions that drive business success.',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'AURA Founded',
      description: 'Started with a vision to transform businesses through digital innovation.',
      icon: '🎯'
    },
    {
      year: '2024',
      title: 'First Projects',
      description: 'Successfully delivered our initial projects and built strong client relationships.',
      icon: '🚀'
    },
    {
      year: '2024',
      title: 'Team Expansion',
      description: 'Grew our team with talented professionals passionate about digital excellence.',
      icon: '👥'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Expanding our services and reaching new heights in digital transformation.',
      icon: '🔮'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-50"></div>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'][i]}, transparent)`,
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i * 10)}%`
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 8 + i * 2,
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
                <span className="text-aura-cyan font-semibold">✨ About AURA</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafting Digital <span className="gradient-text">Excellence</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We are a team of passionate professionals dedicated to transforming businesses 
              through innovative digital solutions and exceptional service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <p className="text-gray-100 mb-6 text-lg">
                Aura is a digital solutions agency specializing in Web Development, Software Solutions, and Digital Marketing.
              </p>
              <p className="text-gray-100 mb-6 text-lg">
                Founded in 2024, AURA began as a small team with a big vision: to help businesses 
                thrive in the digital age. What started as a web development agency has grown into a 
                comprehensive digital solutions provider.
              </p>
              <p className="text-gray-100 mb-6 text-lg">
                Today, we serve clients across industries, helping them leverage technology to achieve 
                their goals and stay ahead of the competition. Our journey has been marked by continuous 
                learning, innovation, and a commitment to excellence.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    className="text-center p-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{achievement.number}</div>
                    <div className="text-gray-300">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              The milestones that shaped our success
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
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
                    {item.icon}
                  </motion.div>
                  <motion.div
                    className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="glass-effect p-6 rounded-2xl">
                      <div className="text-2xl font-bold text-white mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-aura-cyan mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-effect p-8 rounded-2xl text-center h-full group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-3xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              The talented professionals driving AURA's innovation and success
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -15 }}
              >
                {/* Card Background */}
                <div className="glass-effect p-8 rounded-2xl text-center h-full relative overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                  
                  {/* Avatar Section */}
                  <div className="relative mb-6">
                    <motion.div
                      className="w-28 h-28 mx-auto relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Avatar Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full animate-pulse`}></div>
                      {/* Avatar Content */}
                      <div className="relative w-full h-full rounded-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center border-2 border-white border-opacity-30 overflow-hidden">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={`${member.name} - ${member.role} at AURA Digital`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-3xl text-white font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Role Badge */}
                    <motion.div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${member.color} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      {member.role}
                    </motion.div>
                  </div>
                  
                  {/* Name */}
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-gray-300 text-sm leading-relaxed mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    {member.description}
                  </motion.p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs text-gray-300 border border-white border-opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Hover Effect Lines */}
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Stats */}
          <motion.div
            className="glass-effect p-8 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: '14+', label: 'Core Members' },
                { number: '2t55+', label: 'Years Combined Experience' },
                { number: '50+', label: 'Skills & Technologies' },
                { number: '100%', label: 'Dedicated to Excellence' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  To empower businesses with innovative digital solutions that drive growth, 
                  enhance efficiency, and create lasting value. We are committed to excellence, 
                  innovation, and client success in everything we do.
                </p>
                <div className="mt-8">
                  <motion.a
                    href="#contact"
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Our Journey
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

export default About;
