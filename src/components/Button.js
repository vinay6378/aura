import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href, 
  onClick,
  ...props 
}) => {
  // Base styles
  const baseStyles = 'font-semibold transition-all inline-block shadow-lg hover:shadow-xl';
  
  // Variant styles
  const variants = {
    primary: 'bg-white text-gray-900 hover:bg-purple-50',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
    glass: 'glass-effect text-white hover:bg-white/20',
    admin: 'bg-purple-600 text-white hover:bg-purple-700 rounded-lg',
  };
  
  // Size styles
  const sizes = {
    sm: 'px-4 py-2 rounded-full text-sm',
    md: 'px-6 py-3 rounded-full text-base',
    lg: 'px-8 py-4 rounded-full text-lg',
    xl: 'px-10 py-5 rounded-full text-xl',
    admin: 'px-4 py-2 rounded-lg text-sm',
  };
  
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.3 },
  };
  
  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={buttonStyles} {...props}>
          {children}
        </a>
      </motion.div>
    );
  }
  
  return (
    <motion.button 
      className={buttonStyles}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;