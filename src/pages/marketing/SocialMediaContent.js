import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SocialMediaContent = () => {
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
              Social Media <span className="gradient-text">Content</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Create engaging content for social media platforms that drives engagement and growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Content Creation</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Post Design</h3>
                    <p className="text-gray-300">Eye-catching social media graphics</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Video Content</h3>
                    <p className="text-gray-300">Short-form videos and reels</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Copywriting</h3>
                    <p className="text-gray-300">Engaging captions and hashtag research</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Story Content</h3>
                    <p className="text-gray-300">Interactive stories and highlights</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Platform Expertise</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📘</div>
                  <p className="text-white font-semibold">Instagram</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🐦</div>
                  <p className="text-white font-semibold">Twitter/X</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <p className="text-white font-semibold">LinkedIn</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📺</div>
                  <p className="text-white font-semibold">YouTube</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <p className="text-white font-semibold">TikTok</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📘</div>
                  <p className="text-white font-semibold">Facebook</p>
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

export default SocialMediaContent;