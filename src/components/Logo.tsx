import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center bg-gray-900 p-4 ${className}`}
    >
      {/*
        RESPONSIVE PANEL:
        • On mobile: w-11/12 (≈91.7% width), h-auto so it grows with content
        • On desktop (md and up): max-w-xl (≈576px) & h-[90vh]
      */}
      <motion.div
        className="relative flex flex-col items-center bg-gradient-to-b from-[#330000] to-[#660000]
                   w-11/12 h-auto md:w-full md:max-w-xl md:h-[90vh] rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Top spacing (pushes logo down a bit) */}
        <div className="pt-8 md:pt-12 flex-shrink-0">
          {/* LOGO BOX */}
          <motion.div
            className="mx-auto bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-md
                       md:p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative flex flex-col items-center justify-center bg-[#330000] rounded-xl overflow-hidden
                         w-32 h-32 md:w-44 md:h-44"
            >
              {/* Infinity Loops (flat spin) */}
              <motion.div
                className="relative mb-1 w-28 h-16 md:w-36 md:h-20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              >
                <div
                  className="absolute border-[6px] border-white rounded-full
                             left-0 top-0 w-16 h-16 md:w-20 md:h-20"
                />
                <div
                  className="absolute border-[6px] border-white rounded-full
                             right-0 top-0 w-16 h-16 md:w-20 md:h-20"
                />
              </motion.div>

              {/* BEZTERN Text with shimmer */}
              <motion.div
                className="w-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.span
                  className="relative inline-block text-white font-extrabold tracking-widest
                             text-xl md:text-2xl overflow-hidden"
                >
                  {/* Shimmer bar */}
                  <motion.span
                    className="absolute top-0 left-[-100%] w-full h-full
                               bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  />
                  {/* Underlying text */}
                  <span className="relative">BEZTERN</span>
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Spacer to push taglines toward center on desktop */}
        <div className="flex-grow" />

        {/* TAGLINES */}
        <div className="w-full px-4 md:px-8">
          <motion.div
            className="space-y-2 md:space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.25 },
              },
            }}
          >
            {['BE BOLD', 'BE TIMELESS', 'BE BEZTERN'].map((line, i) => (
              <motion.h2
                key={i}
                className="text-xl md:text-3xl font-extrabold text-white tracking-wide text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
              >
                {line}
              </motion.h2>
            ))}
          </motion.div>
        </div>

        {/* DESCRIPTION */}
        <motion.p
          className="text-sm md:text-base text-gray-200 max-w-lg text-center mt-4 px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        >
          Discover trendy streetwear and oversized tees at unbeatable prices.
        </motion.p>

        {/* LEARN MORE BUTTON (fixed near bottom) */}
        <motion.div
          className="w-full flex justify-center mt-6 mb-6 md:absolute md:bottom-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.button
            className="px-6 py-2 bg-white text-[#330000] font-semibold rounded-lg hover:bg-opacity-90 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
