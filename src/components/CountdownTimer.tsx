import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useTransform } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  title?: string | React.ReactNode;
  subtitle?: string;
  onComplete?: () => void;
  onTick?: (timeLeft: TimeLeft) => void;
  colorScheme?: 'red' | 'blue' | 'purple' | 'green' | 'gold' | 'cyber';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showSeparators?: boolean;
  className?: string;
  glassmorphism?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title,
  subtitle,
  onComplete,
  onTick,
  colorScheme = 'red',
  size = 'md',
  showLabels = true,
  showSeparators = false,
  className = '',
  glassmorphism = false,
}) => {
  // Refs for optimization
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimeRef = useRef<number>(new Date(targetDate).getTime());
  
  // State for time tracking
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  // Motion values for progress animation
  const progress = useMotionValue(1);
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);

  // Size classes based on size prop
  const sizeClasses = useMemo(() => ({
    sm: {
      container: "p-4 md:p-5 rounded-2xl",
      grid: "gap-2 md:gap-4",
      box: "p-2 md:p-3 rounded-xl",
      digits: "w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl",
      label: "text-xs tracking-wider",
      title: "text-xl md:text-2xl mb-4",
    },
    md: {
      container: "p-6 md:p-8 rounded-3xl",
      grid: "gap-4 md:gap-8",
      box: "p-4 md:p-6 rounded-2xl",
      digits: "w-20 h-20 md:w-28 md:h-28 text-3xl md:text-[3.5rem]",
      label: "text-xs md:text-sm tracking-widest",
      title: "text-2xl md:text-3xl mb-6 md:mb-8",
    },
    lg: {
      container: "p-8 md:p-10 rounded-3xl",
      grid: "gap-6 md:gap-10",
      box: "p-6 md:p-8 rounded-2xl",
      digits: "w-24 h-24 md:w-36 md:h-36 text-4xl md:text-6xl",
      label: "text-sm md:text-base tracking-widest",
      title: "text-3xl md:text-4xl mb-8 md:mb-10",
    },
  }), []);

  // Color schemes with enhanced options
  const colorStyles = useMemo(() => ({
    red: {
      bgGlow: "shadow-[0_0_30px_rgba(255,0,0,0.7)]",
      textGradient: "from-red-500 via-white to-red-700",
      textColor: "text-red-400",
      underline: "bg-red-600 shadow-[0_0_8px_#FF0000]",
      hoverGlow: "0 0 15px #FF0000, 0 0 30px #FF3B3B",
      border: "border-red-900/30",
      separator: "bg-red-800/50",
      glass: "bg-red-950/30 backdrop-blur-md",
      progress: "from-red-600/80 to-red-900/50"
    },
    blue: {
      bgGlow: "shadow-[0_0_30px_rgba(59,130,246,0.7)]",
      textGradient: "from-blue-500 via-white to-blue-700",
      textColor: "text-blue-400",
      underline: "bg-blue-600 shadow-[0_0_8px_#3B82F6]",
      hoverGlow: "0 0 15px #3B82F6, 0 0 30px #60A5FA",
      border: "border-blue-900/30",
      separator: "bg-blue-800/50",
      glass: "bg-blue-950/30 backdrop-blur-md",
      progress: "from-blue-600/80 to-blue-900/50"
    },
    purple: {
      bgGlow: "shadow-[0_0_30px_rgba(139,92,246,0.7)]",
      textGradient: "from-purple-500 via-white to-purple-700",
      textColor: "text-purple-400",
      underline: "bg-purple-600 shadow-[0_0_8px_#8B5CF6]",
      hoverGlow: "0 0 15px #8B5CF6, 0 0 30px #A78BFA",
      border: "border-purple-900/30",
      separator: "bg-purple-800/50",
      glass: "bg-purple-950/30 backdrop-blur-md",
      progress: "from-purple-600/80 to-purple-900/50"
    },
    green: {
      bgGlow: "shadow-[0_0_30px_rgba(16,185,129,0.7)]",
      textGradient: "from-green-500 via-white to-green-700",
      textColor: "text-green-400",
      underline: "bg-green-600 shadow-[0_0_8px_#10B981]",
      hoverGlow: "0 0 15px #10B981, 0 0 30px #34D399",
      border: "border-green-900/30",
      separator: "bg-green-800/50",
      glass: "bg-green-950/30 backdrop-blur-md",
      progress: "from-green-600/80 to-green-900/50"
    },
    gold: {
      bgGlow: "shadow-[0_0_30px_rgba(234,179,8,0.7)]",
      textGradient: "from-yellow-500 via-white to-amber-700",
      textColor: "text-yellow-400",
      underline: "bg-yellow-600 shadow-[0_0_8px_#EAB308]",
      hoverGlow: "0 0 15px #EAB308, 0 0 30px #FBBF24",
      border: "border-amber-900/30",
      separator: "bg-amber-800/50",
      glass: "bg-amber-950/30 backdrop-blur-md",
      progress: "from-amber-600/80 to-amber-900/50"
    },
    cyber: {
      bgGlow: "shadow-[0_0_30px_rgba(45,212,191,0.7)]",
      textGradient: "from-cyan-400 via-white to-fuchsia-600",
      textColor: "text-cyan-400",
      underline: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-[0_0_8px_#2DD4BF]",
      hoverGlow: "0 0 15px #2DD4BF, 0 0 30px #F472B6",
      border: "border-cyan-900/30",
      separator: "bg-gradient-to-r from-cyan-800/50 to-fuchsia-800/50",
      glass: "bg-slate-900/40 backdrop-blur-md",
      progress: "from-cyan-600/80 to-fuchsia-600/50"
    }
  }), []);

  // Current color style based on colorScheme prop
  const currentColorStyle = useMemo(() => colorStyles[colorScheme], [colorScheme, colorStyles]);
  const currentSizeClass = useMemo(() => sizeClasses[size], [size, sizeClasses]);

  // Calculate time left with optimized performance
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = targetTimeRef.current - now;
    
    if (diff > 0) {
      // Calculate total seconds for progress animation
      const totalSeconds = Math.floor(diff / 1000);
      const totalInitialSeconds = Math.floor((targetTimeRef.current - new Date(Date.now()).getTime()) / 1000);
      progress.set(totalSeconds / totalInitialSeconds);
      
      const newTimeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
      
      // Store previous values before updating
      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
      
      // Call onTick callback if provided
      if (onTick) onTick(newTimeLeft);
      
      return true;
    } else {
      // Countdown complete
      if (!isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
      return false;
    }
  }, [timeLeft, onComplete, onTick, progress, isComplete]);

  // Initialize and manage countdown interval
  useEffect(() => {
    // Reset completion state when target date changes
    setIsComplete(false);
    targetTimeRef.current = new Date(targetDate).getTime();
    
    // Initial calculation
    calculateTimeLeft();
    
    // Set up interval with requestAnimationFrame for better performance
    const tick = () => {
      const shouldContinue = calculateTimeLeft();
      if (shouldContinue) {
        intervalRef.current = setTimeout(tick, 1000);
      }
    };
    
    intervalRef.current = setTimeout(tick, 1000);
    
    // Clean up interval
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [targetDate, calculateTimeLeft]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Animation variants
  const flipVariants: Variants = {
    initial: { 
      rotateX: -90, 
      opacity: 0,
      transformPerspective: 1200
    },
    animate: { 
      rotateX: 0, 
      opacity: 1, 
      transformPerspective: 1200,
      transition: { 
        duration: 0.5, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      } 
    },
    exit: { 
      rotateX: 90, 
      opacity: 0, 
      transformPerspective: 1200,
      transition: { 
        duration: 0.3 
      } 
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Time units data
  const units = useMemo(() => [
    { label: 'Days', value: timeLeft.days, prevValue: prevTimeLeft.days },
    { label: 'Hours', value: timeLeft.hours, prevValue: prevTimeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes, prevValue: prevTimeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds, prevValue: prevTimeLeft.seconds },
  ], [timeLeft, prevTimeLeft]);

  return (
    <section
      aria-label="Countdown Timer"
      className={`relative max-w-4xl mx-auto ${currentSizeClass.container} ${glassmorphism ? currentColorStyle.glass : 'bg-black'} ${currentColorStyle.bgGlow} ${className}`}
    >
      {/* Progress bar */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${currentColorStyle.progress}`}
        style={{ 
          width: progress.get() * 100 + '%',
          opacity
        }}
      />
      
      {title && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {typeof title === 'string' ? (
            <h2 className={`font-bold ${currentSizeClass.title} text-transparent bg-clip-text bg-gradient-to-r ${currentColorStyle.textGradient}`}>
              {title}
            </h2>
          ) : (
            title
          )}
          
          {subtitle && (
            <p className={`${currentColorStyle.textColor} opacity-80 mb-6`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <motion.div 
        className={`grid grid-cols-2 md:grid-cols-4 ${currentSizeClass.grid} text-white`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {units.map(({ label, value, prevValue }, idx) => (
          <React.Fragment key={label}>
            <motion.div
              className={`relative flex flex-col items-center bg-gradient-to-br from-black via-gray-900 to-black ${currentSizeClass.box} shadow-lg ${currentColorStyle.border} border backdrop-filter backdrop-blur-sm`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: currentColorStyle.hoverGlow,
                transition: { duration: 0.2 }
              }}
              aria-label={`${value} ${label} remaining`}
            >
              <div className={`relative ${currentSizeClass.digits} flex items-center justify-center overflow-hidden`}>
                {/* Reflective surface effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                
                {/* Only trigger AnimatePresence when the value changes */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${label}-${value}`}
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${currentColorStyle.textGradient} drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]`}
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {formatNumber(value)}
                  </motion.span>
                </AnimatePresence>
                
                {/* Digital display effect - horizontal lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-full h-[1px] bg-white/10"
                      style={{ top: `${25 * (i + 1)}%` }}
                    />
                  ))}
                </div>
              </div>

              {showLabels && (
                <span className={`mt-3 font-semibold uppercase ${currentSizeClass.label} ${currentColorStyle.textColor}`}>
                  {label}
                </span>
              )}

              {/* Glowing underline */}
              <motion.span
                className={`mt-1 block w-10 h-1 rounded-full ${currentColorStyle.underline}`}
                layoutId={`underline-${label}`}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </motion.div>
            
            {/* Separators between units */}
            {showSeparators && idx < units.length - 1 && (
              <div className="hidden md:flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${currentColorStyle.separator} mx-1`} />
                <div className={`w-2 h-2 rounded-full ${currentColorStyle.separator} mx-1`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
      
      {isComplete && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className={`text-lg ${currentColorStyle.textColor}`}>
            The countdown has ended!
          </p>
        </motion.div>
      )}
    </section>
  );
};
