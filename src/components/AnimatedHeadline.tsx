import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedHeadlineProps {
  headline?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  headline = "We're Launching Soon",
  gradientFrom = "#ef4444",
  gradientTo = "#b91c1c",
}) => {
  // Memoize words array to avoid recalculations on re-renders
  const words = useMemo(() => headline.split(' '), [headline]);

  // Container animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    hover: {
      rotateX: 3,
      rotateY: -3,
      perspective: 1000,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // Individual word animation variants
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
    breathe: {
      scale: [1, 1.03, 1],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.h1
      aria-label={headline}
      className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-center mb-8 tracking-tight select-none"
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="relative inline-block mr-2 md:mr-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
          }}
          variants={item}
          whileHover={{
            backgroundImage: `linear-gradient(to right, ${gradientTo}, ${gradientFrom})`,
            backgroundSize: '200% 100%',
            backgroundPosition: ['0% 50%', '100% 50%'],
            transition: { duration: 1.2, ease: 'easeInOut' },
            textShadow: `0 0 10px rgba(239, 68, 68, 0.6)`,
            scale: 1.05,
          }}
          animate="breathe"
        >
          {word}
          <motion.span
            className="block h-[3px] absolute bottom-[-6px] left-0 right-0 rounded-full"
            style={{ background: gradientFrom }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + index * 0.2 + 0.7,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: 'left', background: gradientFrom }}
          />
        </motion.span>
      ))}
    </motion.h1>
  );
};
