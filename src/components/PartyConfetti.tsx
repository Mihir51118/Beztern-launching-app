import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Confetti {
  id: number;
  x: number;
  rotation: number;
  size: number;
  color: string;
  delay: number;
  driftX: number;
  driftY: number;
  shape: 'rectangle' | 'square' | 'circle' | 'triangle';
  opacity: number;
  duration: number;
}

interface PartyConfettiProps {
  enabled?: boolean;
  count?: number;
  interval?: number;
  colors?: string[];
  maxItems?: number;
  gravity?: number;
  wind?: number;
  shapes?: Array<'rectangle' | 'square' | 'circle' | 'triangle'>;
  className?: string;
}

export const PartyConfetti: React.FC<PartyConfettiProps> = ({
  enabled = true,
  count = 30,
  interval = 3000,
  colors = ['#1a1a1a', '#2a2a2a', '#3a3a3a', '#4a4a4a', '#5a5a5a', '#ffffff', '#f5f5f5'],
  maxItems = 100,
  gravity = 1,
  wind = 0.5,
  shapes = ['rectangle', 'square', 'circle', 'triangle'],
  className = '',
}) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Create triangle SVG path
  const createTrianglePath = (size: number) => {
    const height = size * Math.sqrt(3) / 2;
    return `M${size/2},0 L${size},${height} L0,${height} Z`;
  };

  // Create a burst of confetti pieces with enhanced properties
  const createConfettiBurst = useCallback(() => {
    if (!enabled) return;
    
    const newConfetti = Array.from({ length: count }, (_, i) => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 10 + 5;
      const duration = 5 + Math.random() * 3; // Random duration between 5-8 seconds
      
      return {
        id: Date.now() + i,
        x: Math.random() * 100,
        rotation: Math.random() * 360,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2, // staggered start delay
        driftX: (Math.random() - 0.5) * 50 * wind, // horizontal drift affected by wind
        driftY: (Math.random() * 50 + 50) * gravity, // vertical drift affected by gravity
        shape,
        opacity: 0.5 + Math.random() * 0.5, // Random opacity between 0.5-1
        duration,
      };
    });

    setConfetti(current => [...current, ...newConfetti].slice(-maxItems));
  }, [enabled, count, colors, maxItems, gravity, wind, shapes]);

  // Setup and cleanup interval
  useEffect(() => {
    if (enabled) {
      createConfettiBurst(); // Initial burst on mount
      intervalRef.current = setInterval(createConfettiBurst, interval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [createConfettiBurst, enabled, interval]);

  // If user prefers reduced motion, show minimal animation
  if (prefersReducedMotion) {
    return (
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
        {confetti.slice(0, 10).map(piece => (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              top: `${10 + Math.random() * 20}%`,
              width: piece.size,
              height: piece.shape === 'rectangle' ? piece.size * 3 : piece.size,
              backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : '0',
              opacity: piece.opacity * 0.7,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {confetti.map(piece => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              width: piece.shape === 'square' || piece.shape === 'circle' ? piece.size : piece.size,
              height: piece.shape === 'rectangle' ? piece.size * 3 : 
                     piece.shape === 'square' || piece.shape === 'circle' ? piece.size : 'auto',
              backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' || piece.shape === 'rectangle' ? '2px' : '0',
              zIndex: 50,
              transformOrigin: 'center center',
            }}
            initial={{
              y: -20,
              scale: 0,
              rotate: 0,
              opacity: 0,
              x: 0,
            }}
            animate={{
              y: [0, piece.driftY],
              x: [0, piece.driftX],
              scale: [0, 1, 1, 0.5],
              rotate: [0, piece.rotation + 720],
              opacity: [piece.opacity, piece.opacity, 0],
            }}
            transition={{
              duration: piece.duration,
              ease: 'easeInOut',
              delay: piece.delay,
              times: [0, 0.2, 0.8, 1], // Control timing of scale changes
            }}
            exit={{ opacity: 0, scale: 0, y: 100, transition: { duration: 0.5 } }}
          >
            {piece.shape === 'triangle' && (
              <svg
                width={piece.size}
                height={piece.size}
                viewBox={`0 0 ${piece.size} ${piece.size}`}
                style={{ display: 'block' }}
              >
                <path
                  d={createTrianglePath(piece.size)}
                  fill={piece.color}
                />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
