import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrintDesign = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Print-Ready <span className="gradient-text">Design</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Create professional designs for print materials that make a lasting impression
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Business Cards', icon: '💳', desc: 'Professional business card designs' },
              { title: 'Brochures', icon: '📄', desc: 'Marketing brochure layouts' },
              { title: 'Flyers', icon: '📋', desc: 'Eye-catching flyer designs' },
              { title: 'Posters', icon: '🖼️', desc: 'Event and promotional posters' },
              { title: 'Packaging', icon: '📦', desc: 'Product packaging design' },
              { title: 'Menus', icon: '🍽️', desc: 'Restaurant menu designs' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-effect p-6 rounded-2xl text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="glass-effect p-8 rounded-2xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Print Design Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-300 text-sm">Understand your needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-300 text-sm">Create concepts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Review</h3>
                <p className="text-gray-300 text-sm">Refine and approve</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Print</h3>
                <p className="text-gray-300 text-sm">Final production</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/contact">
              <motion.button
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg inline-block hover:scale-105 transition-all"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrintDesign;