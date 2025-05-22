import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const flipVariants = {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } },
    exit: { rotateX: 90, opacity: 0, transition: { duration: 0.3 } },
  };

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Countdown Timer"
      className="max-w-4xl mx-auto p-8 bg-black rounded-3xl shadow-[0_0_30px_rgba(255,0,0,0.7)]"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
        {units.map(({ label, value }, idx) => (
          <motion.div
            key={label}
            className="relative flex flex-col items-center bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl p-6 shadow-lg cursor-default select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px #FF0000, 0 0 30px #FF3B3B' }}
            aria-label={`${label} remaining`}
          >
            <div className="relative w-28 h-28 flex items-center justify-center perspective-600">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${label}-${value}`}
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[3.5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-700 drop-shadow-[0_0_12px_rgba(255,0,0,0.8)] select-text"
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {formatNumber(value)}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="mt-3 text-xs md:text-sm font-semibold tracking-widest uppercase text-red-400 drop-shadow-md select-none">
              {label}
            </span>

            {/* Glowing underline */}
            <motion.span
              className="mt-1 block w-10 h-1 rounded-full bg-red-600 shadow-[0_0_8px_#FF0000]"
              layoutId={`underline-${label}`}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
