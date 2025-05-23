// src/components/CountdownTimer.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  title?: string | React.ReactNode;
  subtitle?: string;
  onComplete?: () => void;
  onTick?: (timeLeft: TimeLeft) => void;
  onMilestone?: (milestone: string, timeLeft: TimeLeft) => void;
  colorScheme?: 'neon' | 'crimson' | 'aurora' | 'cyberpunk' | 'holographic' | 'plasma' | 'quantum';
  size?: 'compact' | 'standard' | 'large' | 'massive';
  variant?: 'digital' | 'analog' | 'minimal' | 'futuristic' | 'retro' | 'matrix';
  showLabels?: boolean;
  showMilliseconds?: boolean;
  showProgress?: boolean;
  showParticles?: boolean;
  showWaveform?: boolean;
  precision?: number;
  className?: string;
  soundEnabled?: boolean;
  hapticFeedback?: boolean;
  autoScale?: boolean;
  glitchEffect?: boolean;
  hologramEffect?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title,
  subtitle,
  onComplete,
  onTick,
  onMilestone,
  colorScheme = 'crimson',
  size = 'standard',
  variant = 'futuristic',
  showLabels = true,
  showMilliseconds = false,
  showProgress = true,
  showParticles = true,
  showWaveform = false,
  precision = 1000,
  className = '',
  soundEnabled = false,
  hapticFeedback = false,
  autoScale = true,
  glitchEffect = false,
  hologramEffect = false,
}) => {
  // Enhanced refs and state
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimeRef = useRef<number>(new Date(targetDate).getTime());
  const audioContextRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0,
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0,
  });
  
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentMilestone, setCurrentMilestone] = useState<string>('');

  // Advanced motion values
  const progress = useMotionValue(1);
  const urgencyLevel = useTransform(progress, [0, 0.1, 0.5, 1], [1, 0.8, 0.4, 0]);
  const pulseIntensity = useSpring(0, { stiffness: 100, damping: 30 });
  const glitchIntensity = useMotionValue(0);

  // Enhanced size configurations
  const sizeConfigs = useMemo(() => ({
    compact: {
      container: "p-3 md:p-4 rounded-xl",
      grid: "gap-2 md:gap-3",
      box: "p-2 md:p-3 rounded-lg",
      digits: "w-12 h-12 md:w-16 md:h-16 text-lg md:text-2xl",
      label: "text-xs tracking-wide",
      title: "text-lg md:text-xl mb-3",
      particles: 20,
    },
    standard: {
      container: "p-6 md:p-8 rounded-2xl",
      grid: "gap-4 md:gap-6",
      box: "p-4 md:p-6 rounded-xl",
      digits: "w-20 h-20 md:w-28 md:h-28 text-2xl md:text-4xl",
      label: "text-sm md:text-base tracking-wider",
      title: "text-2xl md:text-3xl mb-6",
      particles: 50,
    },
    large: {
      container: "p-8 md:p-12 rounded-3xl",
      grid: "gap-6 md:gap-8",
      box: "p-6 md:p-8 rounded-2xl",
      digits: "w-28 h-28 md:w-36 md:h-36 text-3xl md:text-5xl",
      label: "text-base md:text-lg tracking-widest",
      title: "text-3xl md:text-4xl mb-8",
      particles: 80,
    },
    massive: {
      container: "p-12 md:p-16 rounded-3xl",
      grid: "gap-8 md:gap-12",
      box: "p-8 md:p-12 rounded-3xl",
      digits: "w-36 h-36 md:w-48 md:h-48 text-4xl md:text-7xl",
      label: "text-lg md:text-xl tracking-widest",
      title: "text-4xl md:text-6xl mb-12",
      particles: 120,
    },
  }), []);

  // Advanced color schemes with RED THEME
  const colorSchemes = useMemo(() => ({
    neon: {
      primary: "#00ff41",
      secondary: "#ff0080",
      accent: "#00ffff",
      background: "from-black via-gray-900 to-black",
      glow: "shadow-[0_0_50px_#00ff41,0_0_100px_#00ff41,0_0_150px_#00ff41]",
      textGradient: "from-green-400 via-cyan-300 to-green-500",
      border: "border-green-500/30",
      particles: "#00ff41",
      waveform: "stroke-green-400",
    },
    crimson: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      accent: "#ef4444",
      background: "from-black via-red-950 to-black",
      glow: "shadow-[0_0_50px_#dc2626,0_0_100px_#b91c1c,0_0_150px_#ef4444]",
      textGradient: "from-red-400 via-red-500 to-red-600",
      border: "border-red-500/30",
      particles: "#dc2626",
      waveform: "stroke-red-400",
    },
    aurora: {
      primary: "#ff6b9d",
      secondary: "#4ecdc4",
      accent: "#45b7d1",
      background: "from-purple-900 via-blue-900 to-indigo-900",
      glow: "shadow-[0_0_50px_#ff6b9d,0_0_100px_#4ecdc4,0_0_150px_#45b7d1]",
      textGradient: "from-pink-400 via-purple-300 to-blue-400",
      border: "border-pink-500/30",
      particles: "#ff6b9d",
      waveform: "stroke-pink-400",
    },
    cyberpunk: {
      primary: "#ffff00",
      secondary: "#ff00ff",
      accent: "#00ffff",
      background: "from-black via-purple-900 to-black",
      glow: "shadow-[0_0_50px_#ffff00,0_0_100px_#ff00ff,0_0_150px_#00ffff]",
      textGradient: "from-yellow-400 via-magenta-400 to-cyan-400",
      border: "border-yellow-500/30",
      particles: "#ffff00",
      waveform: "stroke-yellow-400",
    },
    holographic: {
      primary: "#ffffff",
      secondary: "#c0c0c0",
      accent: "#e0e0e0",
      background: "from-gray-900 via-slate-800 to-gray-900",
      glow: "shadow-[0_0_50px_rgba(255,255,255,0.5),0_0_100px_rgba(255,255,255,0.3)]",
      textGradient: "from-white via-gray-300 to-white",
      border: "border-white/20",
      particles: "#ffffff",
      waveform: "stroke-white",
    },
    plasma: {
      primary: "#ff4081",
      secondary: "#3f51b5",
      accent: "#00bcd4",
      background: "from-indigo-900 via-purple-900 to-pink-900",
      glow: "shadow-[0_0_50px_#ff4081,0_0_100px_#3f51b5,0_0_150px_#00bcd4]",
      textGradient: "from-pink-400 via-indigo-400 to-cyan-400",
      border: "border-pink-500/30",
      particles: "#ff4081",
      waveform: "stroke-pink-400",
    },
    quantum: {
      primary: "#9c27b0",
      secondary: "#2196f3",
      accent: "#4caf50",
      background: "from-black via-indigo-950 to-black",
      glow: "shadow-[0_0_50px_#9c27b0,0_0_100px_#2196f3,0_0_150px_#4caf50]",
      textGradient: "from-purple-400 via-blue-400 to-green-400",
      border: "border-purple-500/30",
      particles: "#9c27b0",
      waveform: "stroke-purple-400",
    },
  }), []);

  const currentScheme = colorSchemes[colorScheme];
  const currentSize = sizeConfigs[size];

  // Particle system for visual effects
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }

  // Enhanced time calculation with milliseconds
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = targetTimeRef.current - now;
    
    if (diff > 0) {
      const totalMs = diff;
      const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((totalMs % 1000) / 10);
      
      const newTimeLeft = { days, hours, minutes, seconds, milliseconds };
      
      // Calculate progress
      const totalInitialTime = targetTimeRef.current - new Date(Date.now()).getTime();
      const progressValue = diff / totalInitialTime;
      progress.set(Math.max(0, Math.min(1, progressValue)));
      
      // Check milestones
      const totalSeconds = Math.floor(diff / 1000);
      checkMilestones(totalSeconds, newTimeLeft);
      
      // Update urgency effects
      if (totalSeconds <= 60) {
        pulseIntensity.set(1);
        if (glitchEffect && totalSeconds <= 10) {
          glitchIntensity.set(Math.random() * 0.5);
        }
      }
      
      // Sound effects
      if (soundEnabled && totalSeconds <= 10 && totalSeconds > 0) {
        playTick();
      }
      
      // Haptic feedback
      if (hapticFeedback && totalSeconds <= 5 && 'vibrate' in navigator) {
        navigator.vibrate(100);
      }
      
      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
      
      if (onTick) onTick(newTimeLeft);
      
      return true;
    } else {
      if (!isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
        if (soundEnabled) playComplete();
      }
      return false;
    }
  }, [timeLeft, onComplete, onTick, progress, pulseIntensity, glitchIntensity, soundEnabled, hapticFeedback, glitchEffect, isComplete]);

  // Milestone checking
  const checkMilestones = useCallback((totalSeconds: number, timeLeft: TimeLeft) => {
    const milestones = [
      { threshold: 86400, label: "1 day remaining" },
      { threshold: 3600, label: "1 hour remaining" },
      { threshold: 600, label: "10 minutes remaining" },
      { threshold: 60, label: "1 minute remaining" },
      { threshold: 10, label: "10 seconds remaining" },
    ];
    
    for (const milestone of milestones) {
      if (totalSeconds === milestone.threshold && currentMilestone !== milestone.label) {
        setCurrentMilestone(milestone.label);
        if (onMilestone) onMilestone(milestone.label, timeLeft);
        break;
      }
    }
  }, [currentMilestone, onMilestone]);

  // Audio effects
  const playTick = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  }, []);

  const playComplete = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
    oscillator.frequency.setValueAtTime(880, audioContextRef.current.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  }, []);

  // Particle animation
  useEffect(() => {
    if (!showParticles || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        return particle.life > 0;
      });
      
      // Add new particles
      if (particlesRef.current.length < currentSize.particles) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          maxLife: 60,
          size: Math.random() * 3 + 1,
          color: currentScheme.particles,
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [showParticles, currentSize.particles, currentScheme.particles]);

  // Main countdown interval
  useEffect(() => {
    setIsComplete(false);
    targetTimeRef.current = new Date(targetDate).getTime();
    
    calculateTimeLeft();
    
    const tick = () => {
      const shouldContinue = calculateTimeLeft();
      if (shouldContinue) {
        intervalRef.current = setTimeout(tick, precision);
      }
    };
    
    intervalRef.current = setTimeout(tick, precision);
    
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [targetDate, calculateTimeLeft, precision]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const digitVariants = {
    initial: { 
      rotateX: -90, 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    },
    animate: { 
      rotateX: 0, 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      } 
    },
    exit: { 
      rotateX: 90, 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)",
      transition: { 
        duration: 0.3 
      } 
    },
  };

  // Time units with enhanced data
  const units = useMemo(() => {
    const baseUnits = [
      { label: 'Days', value: timeLeft.days, prevValue: prevTimeLeft.days, key: 'days' },
      { label: 'Hours', value: timeLeft.hours, prevValue: prevTimeLeft.hours, key: 'hours' },
      { label: 'Minutes', value: timeLeft.minutes, prevValue: prevTimeLeft.minutes, key: 'minutes' },
      { label: 'Seconds', value: timeLeft.seconds, prevValue: prevTimeLeft.seconds, key: 'seconds' },
    ];
    
    if (showMilliseconds) {
      baseUnits.push({
        label: 'MS', 
        value: timeLeft.milliseconds, 
        prevValue: prevTimeLeft.milliseconds, 
        key: 'milliseconds'
      });
    }
    
    return baseUnits;
  }, [timeLeft, prevTimeLeft, showMilliseconds]);

  return (
    <motion.section
      className={`relative max-w-6xl mx-auto ${currentSize.container} bg-gradient-to-br ${currentScheme.background} ${currentScheme.glow} ${className} overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        filter: glitchEffect ? `hue-rotate(${glitchIntensity.get() * 360}deg)` : 'none',
      }}
    >
      {/* Animated background particles */}
      {showParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          width={800}
          height={600}
        />
      )}
      
      {/* Hologram effect */}
      {hologramEffect && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse pointer-events-none" />
      )}
      
      {/* Progress bar */}
      {showProgress && (
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
          style={{ 
            width: `${progress.get() * 100}%`,
            color: currentScheme.primary
          }}
        />
      )}
      
      {/* Title section */}
      {title && (
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {typeof title === 'string' ? (
            <h1 className={`font-bold ${currentSize.title} text-transparent bg-clip-text bg-gradient-to-r ${currentScheme.textGradient} drop-shadow-2xl`}>
              {title}
            </h1>
          ) : (
            title
          )}
          
          {subtitle && (
            <p className="text-white/70 mt-4 text-lg">
              {subtitle}
            </p>
          )}
          
          {currentMilestone && (
            <motion.p 
              className="text-yellow-400 mt-2 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              key={currentMilestone}
            >
              {currentMilestone}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Main countdown display */}
      <motion.div 
        className={`grid ${showMilliseconds ? 'grid-cols-5' : 'grid-cols-4'} ${currentSize.grid} text-white`}
        variants={containerVariants}
      >
        {units.map(({ label, value, prevValue, key }) => (
          <motion.div
            key={key}
            className={`relative flex flex-col items-center bg-gradient-to-br from-black/50 via-gray-900/50 to-black/50 ${currentSize.box} ${currentScheme.border} border backdrop-blur-xl`}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: `0 0 30px ${currentScheme.primary}`,
              transition: { duration: 0.2 }
            }}
            style={{
              boxShadow: urgencyLevel.get() > 0.8 ? `0 0 20px ${currentScheme.primary}` : 'none'
            }}
          >
            {/* Digital display effect */}
            <div className={`relative ${currentSize.digits} flex items-center justify-center overflow-hidden rounded-lg bg-black/30`}>
              {/* Scan lines effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
              
              {/* Main digit display */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${key}-${value}`}
                  className={`absolute inset-0 flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentScheme.textGradient}`}
                  variants={digitVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    textShadow: `0 0 20px ${currentScheme.primary}`,
                    filter: `drop-shadow(0 0 10px ${currentScheme.primary})`
                  }}
                >
                  {formatNumber(value)}
                </motion.span>
              </AnimatePresence>
              
              {/* Glitch effect overlay */}
              {glitchEffect && urgencyLevel.get() < 0.1 && (
                <motion.div
                  className="absolute inset-0 bg-red-500/20"
                  animate={{
                    opacity: [0, 0.5, 0],
                    x: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                />
              )}
            </div>

            {/* Label */}
            {showLabels && (
              <motion.span
                className={`mt-3 font-semibold uppercase ${currentSize.label} tracking-widest`}
                style={{ color: currentScheme.primary }}
                animate={{
                  opacity: urgencyLevel.get() < 0.2 ? [1, 0.5, 1] : 1
                }}
                transition={{
                  duration: 0.5,
                  repeat: urgencyLevel.get() < 0.2 ? Infinity : 0
                }}
              >
                {label}
              </motion.span>
            )}

            {/* Pulsing border for urgency */}
            <motion.div
              className="absolute inset-0 rounded-lg border-2"
              style={{
                borderColor: currentScheme.primary,
                opacity: pulseIntensity
              }}
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Waveform visualization */}
      {showWaveform && (
        <motion.svg
          className="w-full h-16 mt-8"
          viewBox="0 0 400 60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.rect
              key={i}
              x={i * 8}
              y={30}
              width={4}
              height={Math.random() * 30}
              className={currentScheme.waveform}
              animate={{
                height: [
                  Math.random() * 30,
                  Math.random() * 30,
                  Math.random() * 30
                ]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.svg>
      )}
      
      {/* Completion state */}
      {isComplete && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
          >
            <motion.h2 
              className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentScheme.textGradient} mb-4`}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Time's Up!
            </motion.h2>
            <p className="text-white/80 text-lg">
              The countdown has completed
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default CountdownTimer;
