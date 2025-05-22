import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  driftX: number;
  duration: number;
  delay: number;
  intensity: number;
  shape: 'circle' | 'star' | 'diamond';
}

interface PartySparklesProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
  density?: number;
  colorScheme?: 'gold' | 'rainbow' | 'fire' | 'ice' | 'neon';
  shapes?: Array<'circle' | 'star' | 'diamond'>;
  className?: string;
  maxSparkles?: number;
}

export const PartySparkles: React.FC<PartySparklesProps> = ({
  enabled = true,
  intensity = 1,
  speed = 1,
  density = 1,
  colorScheme = 'gold',
  shapes = ['circle', 'star'],
  className = '',
  maxSparkles = 100,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Refs for intervals
  const singleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const burstIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Color schemes
  const colorSchemes = {
    gold: ['#FFEC00', '#FF8A00', '#FFD600', '#FFF700', '#FFCC00'],
    rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
    fire: ['#FF2D00', '#FF5500', '#FF8A00', '#FFAA00', '#FFCC00'],
    ice: ['#00FFFF', '#88FFFF', '#CCFFFF', '#AADDFF', '#77AAFF'],
    neon: ['#FF00FF', '#00FFFF', '#FF00AA', '#AAFF00', '#FF3377'],
  };
  
  const colors = colorSchemes[colorScheme];
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Create SVG paths for different shapes
  const createShapePath = useCallback((shape: 'star' | 'diamond', size: number): string => {
    if (shape === 'star') {
      // 5-point star
      const outerRadius = size / 2;
      const innerRadius = outerRadius * 0.4;
      const points = 5;
      let path = '';
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / points) * i;
        const x = outerRadius + radius * Math.sin(angle);
        const y = outerRadius - radius * Math.cos(angle);
        path += (i === 0 ? 'M' : 'L') + `${x},${y}`;
      }
      
      return path + 'Z';
    } else if (shape === 'diamond') {
      // Diamond shape
      const half = size / 2;
      return `M${half},0 L${size},${half} L${half},${size} L0,${half} Z`;
    }
    
    return '';
  }, []);

  // Helper to spawn a single sparkle
  const spawnSparkle = useCallback(() => {
    if (!enabled || sparkles.length >= maxSparkles) return;
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = (6 + Math.random() * 6) * intensity; // 6px–12px, scaled by intensity
    const sparkle: Sparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: dimensions.height + size,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 100 * intensity, // ±50px, scaled by intensity
      duration: (3 + Math.random() * 2) / speed, // 3–5s, scaled by speed
      delay: Math.random() * 0.5, // Slight delay variation
      intensity: 0.7 + Math.random() * 0.3, // Individual intensity variation
      shape,
    };
    
    setSparkles(current => [...current, sparkle].slice(-maxSparkles));
  }, [enabled, sparkles.length, maxSparkles, shapes, intensity, colors, dimensions.height, speed]);

  // Helper to spawn a burst of sparkles at once
  const spawnBurst = useCallback(() => {
    if (!enabled) return;
    
    const burstSize = Math.floor(15 * density); // Scale burst size by density
    const newSparkles: Sparkle[] = Array.from({ length: burstSize }).map(() => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = (4 + Math.random() * 8) * intensity; // 4px–12px, scaled by intensity
      return {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: dimensions.height + size,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        driftX: (Math.random() - 0.5) * 200 * intensity, // ±100px drift, scaled by intensity
        duration: (2 + Math.random() * 2) / speed, // 2–4s, scaled by speed
        delay: Math.random() * 0.3, // Slight delay variation
        intensity: 0.7 + Math.random() * 0.3, // Individual intensity variation
        shape,
      };
    });
    
    setSparkles(current => [...current, ...newSparkles].slice(-maxSparkles));
  }, [enabled, density, shapes, intensity, colors, dimensions.height, speed, maxSparkles]);

  // Setup intervals for sparkles
  useEffect(() => {
    if (!enabled) return;
    
    // Regular single sparkles
    const singleInterval = (200 / density); // Adjust interval based on density
    singleIntervalRef.current = setInterval(spawnSparkle, singleInterval);

    // Random bursts
    const burstInterval = 3000 + Math.random() * 3000; // 3-6 seconds
    burstIntervalRef.current = setInterval(spawnBurst, burstInterval / density);

    // Clean up intervals
    return () => {
      if (singleIntervalRef.current) clearInterval(singleIntervalRef.current);
      if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);
    };
  }, [enabled, spawnSparkle, spawnBurst, density]);

  // Remove completed sparkles
  const removeSparkle = useCallback((id: number) => {
    setSparkles(current => current.filter(s => s.id !== id));
  }, []);

  // If user prefers reduced motion, show minimal sparkles
  if (prefersReducedMotion) {
    return (
      <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
        {sparkles.slice(0, 5).map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              bottom: `${10 + Math.random() * 20}%`,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}80`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              transformOrigin: 'center center',
            }}
            initial={{
              y: sparkle.y,
              opacity: 0,
              scale: 0.3,
              rotateX: 45,
              rotateY: 45,
            }}
            animate={{
              y: [sparkle.y, sparkle.y - 200 - (sparkle.duration * 100), sparkle.y - 400 - (sparkle.duration * 200)],
              x: [
                0,
                sparkle.driftX * 0.5,
                sparkle.driftX
              ],
              opacity: [0, sparkle.intensity, 0],
              scale: [0.3, 1, 0],
              rotate: [sparkle.rotation, sparkle.rotation + 360, sparkle.rotation + 720],
              filter: [
                `blur(0px) brightness(1)`,
                `blur(1px) brightness(1.2)`,
                `blur(2px) brightness(0.8)`,
              ],
            }}
            transition={{
              duration: sparkle.duration,
              ease: "easeOut",
              times: [0, 0.4, 1],
              delay: sparkle.delay,
            }}
            onAnimationComplete={() => removeSparkle(sparkle.id)}
          >
            {sparkle.shape === 'circle' ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: sparkle.color,
                  boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}80`,
                }}
              />
            ) : (
              <svg
                width={sparkle.size}
                height={sparkle.size}
                viewBox={`0 0 ${sparkle.size} ${sparkle.size}`}
                style={{
                  filter: `drop-shadow(0 0 ${sparkle.size / 2}px ${sparkle.color})`,
                }}
              >
                <path
                  d={createShapePath(sparkle.shape as 'star' | 'diamond', sparkle.size)}
                  fill={sparkle.color}
                />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
