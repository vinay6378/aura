import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden min-h-screen flex items-center" aria-label="Hero section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-purple-500/20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Hero Content */}
          <motion.div
            className="text-center space-y-8 md:space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Section */}
            <motion.div
              className="mb-8 md:mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/images/LOGO.png" 
                alt="AURA Digital Logo - Professional Web Development and Digital Marketing"
                className="h-32 md:h-40 lg:h-48 w-auto mx-auto"
                loading="eager"
              />
            </motion.div>
            
            {/* Welcome Section */}
            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Welcome Text */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-300 uppercase tracking-wider">
                  Welcome to
                </h2>
                
                {/* AURA Branding */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                    AURA
                  </span>
                  <span className="text-purple-400 ml-2 md:ml-3">DIGITAL</span>
                </h1>
              </div>
              
              {/* Divider */}
              <div className="flex items-center justify-center space-x-3 md:space-x-4">
                <div className="h-px bg-purple-400 w-16 md:w-20"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="h-px bg-purple-400 w-16 md:w-20"></div>
              </div>
            </motion.div>
            
            {/* Description Section */}
            <motion.div
              className="max-w-3xl mx-auto space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                Transform your digital presence with cutting-edge web solutions
              </p>
              
              {/* Key Features */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-purple-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm md:text-base">Web Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-sm md:text-base">Digital Marketing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span className="text-sm md:text-base">Brand Strategy</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="pt-6 md:pt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Get In Touch
                  </Button>
                </Link>
                
                <Link to="/services">
                  <Button variant="secondary" size="lg">
                    Explore Services
                  </Button>
                </Link>
              </div>
              
              {/* Additional Info */}
              <div className="mt-6 md:mt-8 text-gray-400 text-xs md:text-sm">
                <p className="flex flex-wrap justify-center gap-2 md:gap-4">
                  <span>✓ 500+ Projects Delivered</span>
                  <span>✓ 50+ Happy Clients</span>
                  <span>✓ 10+ Years Experience</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
