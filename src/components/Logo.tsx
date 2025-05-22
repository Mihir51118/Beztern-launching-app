import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  animated = true,
  showTagline = false
}) => {
  // Size mapping for different dimensions
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64"
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const infinityVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 }
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className={`inline-flex flex-col items-center justify-center ${className}`}
      variants={animated ? containerVariants : {}}
      initial={animated ? "initial" : false}
      animate={animated ? "animate" : false}
      whileHover={animated ? "hover" : false}
    >
      {/* Main logo container - red box */}
      <motion.div 
        className={`relative ${sizeClasses[size]} bg-[#B30000] flex flex-col items-center justify-center p-2`}
        variants={animated ? infinityVariants : {}}
        whileHover={animated ? { scale: 1.02 } : {}}
      >
        {/* White background for infinity symbol */}
        <div className="bg-white w-full h-3/5 flex items-center justify-center mb-1">
          {/* Infinity symbol */}
          <svg 
            viewBox="0 0 100 40" 
            className="w-4/5 h-4/5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M30,20 C30,13 35,8 40,8 C45,8 50,13 50,20 C50,27 45,32 40,32 C35,32 30,27 30,20 Z" 
              stroke="black" 
              strokeWidth="5"
              fill="none"
            />
            <path 
              d="M50,20 C50,13 55,8 60,8 C65,8 70,13 70,20 C70,27 65,32 60,32 C55,32 50,27 50,20 Z" 
              stroke="black" 
              strokeWidth="5"
              fill="none"
            />
            <path 
              d="M30,20 C30,13 35,8 40,8 C45,8 50,13 50,20 C50,27 45,32 40,32 C35,32 30,27 30,20 Z" 
              stroke="black" 
              strokeWidth="2"
              fill="none"
            />
            <path 
              d="M50,20 C50,13 55,8 60,8 C65,8 70,13 70,20 C70,27 65,32 60,32 C55,32 50,27 50,20 Z" 
              stroke="black" 
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        
        {/* BEZTERN text */}
        <div className="w-full h-2/5 flex items-center justify-center">
          <h1 className="text-white font-extrabold tracking-wide text-center" style={{
            fontSize: size === 'sm' ? '0.9rem' : size === 'md' ? '1.5rem' : '2.5rem'
          }}>
            BEZTERN
          </h1>
        </div>
      </motion.div>
      
      {/* Optional tagline */}
      {showTagline && (
        <motion.p
          className="text-gray-700 font-medium mt-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Infinity in style
        </motion.p>
      )}
    </motion.div>
  );
};
