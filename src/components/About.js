import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const services = [
    { id: 1, title: 'Web / Software Development', desc: 'Modern applications with cutting-edge technology' },
    { id: 2, title: 'Digital Marketing', desc: 'Strategic campaigns that drive results' },
    { id: 3, title: 'Brand Strategy', desc: 'Comprehensive brand identity solutions' },
    { id: 4, title: 'Consulting', desc: 'Expert guidance for digital transformation' }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="gradient-text">AURA</span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We create exceptional digital experiences that help businesses thrive in the modern world.
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="glass-effect p-8 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
};

export default About;
