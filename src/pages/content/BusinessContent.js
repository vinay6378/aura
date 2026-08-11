import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BusinessContent = () => {
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
              Business Content <span className="gradient-text">Writing</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Professional business content creation for various platforms and purposes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Content Types</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Blog Writing</h3>
                    <p className="text-gray-300">SEO-optimized blog posts and articles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Website Copy</h3>
                    <p className="text-gray-300">Compelling website content and landing pages</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">White Papers</h3>
                    <p className="text-gray-300">In-depth research and industry reports</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Case Studies</h3>
                    <p className="text-gray-300">Customer success stories and testimonials</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Press Releases</h3>
                    <p className="text-gray-300">Newsworthy announcements and media outreach</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Content Strategy</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Content Planning</h3>
                    <p className="text-gray-300">Strategic content calendars and scheduling</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">SEO Optimization</h3>
                    <p className="text-gray-300">Keyword research and on-page SEO</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Tone & Voice</h3>
                    <p className="text-gray-300">Brand-aligned writing style</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Editing & Proofreading</h3>
                    <p className="text-gray-300">Quality assurance and polish</p>
                  </div>
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

export default BusinessContent;