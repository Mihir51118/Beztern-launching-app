import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedHeadline: React.FC = () => {
  const headline = "We're Launching Soon";
  const words = headline.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    // 📈 ADDED: when the entire headline is hovered, tilt it slightly in 3D
    hover: {
      rotateX: 2,
      rotateY: -2,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
    // 📈 ADDED: after “visible,” start a slow “breathing” oscillation
    breathe: {
      scale: [1, 1.02, 1],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 tracking-tight"
      variants={container}
      initial="hidden"
      animate="visible"
      // 📈 ADDED: allow a hover variant on the container (tilt effect)
      whileHover="hover"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="relative inline-block mr-2 md:mr-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
          variants={item}
          whileHover={{
            // 📈 ADDED: shimmer gradient on hover
            backgroundPosition: ['0% 50%', '100% 50%'],
            transition: { duration: 1, ease: 'easeInOut' },
            textShadow: "0 0 8px rgb(220 38 38 / 0.5)",
          }}
          // 📈 ADDED: after appearing, move into “breathe” cycle
          animate="breathe"
        >
          {word}

          {/* 📈 ADDED: Underline that draws in from left → right after the word appears */}
          <motion.span
            className="block h-1 bg-red-500 absolute bottom-[-4px] left-0 right-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.2 + 0.6, // wait for the word’s own entrance
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.span>
      ))}
    </motion.h1>
  );
};
