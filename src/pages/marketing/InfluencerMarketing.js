import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InfluencerMarketing = () => {
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
              Influencer <span className="gradient-text">Marketing</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Work with influencers to amplify your brand reach and connect with target audiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Services</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Influencer Identification</h3>
                    <p className="text-gray-300">Find the right influencers for your brand</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Campaign Management</h3>
                    <p className="text-gray-300">End-to-end campaign coordination</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Performance Tracking</h3>
                    <p className="text-gray-300">Monitor campaign performance and ROI</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Relationship Building</h3>
                    <p className="text-gray-300">Long-term influencer partnerships</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">ROI Analysis</h3>
                    <p className="text-gray-300">Measure and optimize campaign effectiveness</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Influencer Tiers</h2>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Nano Influencers</h3>
                  <p className="text-gray-300 text-sm">1K-10K followers, high engagement rates</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Micro Influencers</h3>
                  <p className="text-gray-300 text-sm">10K-100K followers, niche audiences</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Macro Influencers</h3>
                  <p className="text-gray-300 text-sm">100K-1M followers, broad reach</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Mega Influencers</h3>
                  <p className="text-gray-300 text-sm">1M+ followers, maximum visibility</p>
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

export default InfluencerMarketing;