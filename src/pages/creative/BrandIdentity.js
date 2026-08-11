import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandIdentity = () => {
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
              Brand Identity <span className="gradient-text">Development</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Complete brand identity and positioning solutions that make your business stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">What We Offer</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Logo Design</h3>
                    <p className="text-gray-300">Custom logo designs that capture your brand essence</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Brand Guidelines</h3>
                    <p className="text-gray-300">Comprehensive brand style guides and usage rules</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Visual Identity</h3>
                    <p className="text-gray-300">Complete visual systems including colors, fonts, and imagery</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Marketing Strategy</h3>
                    <p className="text-gray-300">Strategic brand positioning and messaging frameworks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Brand Voice</h3>
                    <p className="text-gray-300">Tone of voice and communication style guidelines</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Process</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Discovery & Research</h3>
                  <p className="text-gray-300">Understanding your business, audience, and market position</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Strategy Development</h3>
                  <p className="text-gray-300">Creating brand positioning and messaging frameworks</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Visual Design</h3>
                  <p className="text-gray-300">Designing logos, color schemes, and visual elements</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Brand Guidelines</h3>
                  <p className="text-gray-300">Creating comprehensive brand style guides</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Implementation & Launch</h3>
                  <p className="text-gray-300">Rolling out your new brand across all touchpoints</p>
                </div>
              </div>
            </motion.div>
          </div>

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

export default BrandIdentity;