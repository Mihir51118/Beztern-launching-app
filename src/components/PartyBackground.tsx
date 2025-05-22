import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, Variants, useMotionValue } from 'framer-motion';

interface ClothingItem {
  id: number;
  size: number;
  shape: 'circle' | 'square' | 'rounded' | 'star';
  baseColor: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  hueRotate: number;
  direction: 1 | -1;
}

interface PartyBackgroundProps {
  count?: number;
  intensity?: number;
  speed?: number;
  colorScheme?: 'default' | 'neon' | 'pastel' | 'monochrome' | 'brand';
  shapes?: Array<'circle' | 'square' | 'rounded' | 'star'>;
  blurAmount?: number;
  className?: string;
}

export const PartyBackground: React.FC<PartyBackgroundProps> = ({
  count = 20,
  intensity = 1,
  speed = 1,
  colorScheme = 'default',
  shapes = ['circle', 'square', 'rounded'],
  blurAmount = 10,
  className = '',
}) => {
  // Respect user's motion preferences
  const prefersReducedMotion = useReducedMotion();
  
  // State for window dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Motion value for global animation control
  const globalAnimationControl = useMotionValue(1);

  // Color schemes
  const colorSchemes = {
    default: ['#FF3F8E', '#04C2C9', '#2E55C1', '#FF9A3C', '#FFC93C'],
    neon: ['#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'],
    pastel: ['#FFB6C1', '#ADD8E6', '#98FB98', '#FFDAB9', '#DDA0DD'],
    monochrome: ['#FFFFFF', '#DDDDDD', '#AAAAAA', '#777777', '#444444'],
    brand: ['#FF3F8E', '#FF3F8E', '#FF3F8E', '#2E55C1', '#2E55C1'],
  };

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

  // Create a star shape SVG path
  const createStarPath = useCallback((size: number): string => {
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
  }, []);

  // Generate items with memoized random values
  const clothingItems: ClothingItem[] = React.useMemo(() => {
    const colors = colorSchemes[colorScheme];
    const selectedShapes = shapes.length > 0 ? shapes : ['circle'];
    
    return Array.from({ length: count }).map((_, i) => {
      // Base size adjusted by intensity
      const size = (40 + Math.random() * 40) * intensity;
      
      // Drift range adjusted by intensity
      const driftRange = 20 + Math.random() * 100 * intensity;
      
      // Duration adjusted by speed (inverse relationship)
      const baseDuration = (10 + Math.random() * 10) / speed;
      
      return {
        id: i,
        size,
        shape: selectedShapes[Math.floor(Math.random() * selectedShapes.length)],
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        initialX: Math.random() * dimensions.width,
        initialY: Math.random() * dimensions.height,
        initialRotate: Math.random() * 360,
        driftX: driftRange,
        driftY: driftRange,
        duration: baseDuration,
        delay: Math.random() * 5,
        hueRotate: Math.random() * 60,
        direction: Math.random() > 0.5 ? 1 : -1,
      };
    });
  }, [count, intensity, speed, colorScheme, shapes, dimensions]);

  // Animation variants
  const itemVariants: Variants = {
    initial: (item: ClothingItem) => ({
      x: item.initialX,
      y: item.initialY,
      rotate: item.initialRotate,
      scale: 0.5,
      opacity: 0.3,
    }),
    animate: (item: ClothingItem) => ({
      x: [
        item.initialX,
        item.initialX + item.driftX * item.direction,
        item.initialX,
      ],
      y: [
        item.initialY,
        item.initialY + item.driftY * item.direction,
        item.initialY,
      ],
      rotate: [
        item.initialRotate,
        item.initialRotate + 360 * item.direction,
        item.initialRotate,
      ],
      scale: [0.5, 0.9, 0.5],
      opacity: [0.3 * intensity, 0.8 * intensity, 0.3 * intensity],
      filter: [
        `hue-rotate(0deg) blur(${blurAmount}px)`,
        `hue-rotate(${item.hueRotate}deg) blur(${blurAmount * 2}px)`,
        `hue-rotate(0deg) blur(${blurAmount}px)`,
      ],
      transition: {
        duration: item.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: item.delay,
      },
    }),
    hover: (item: ClothingItem) => ({
      scale: 1.2,
      opacity: 1,
      rotate: item.initialRotate + 45,
      filter: `hue-rotate(${item.hueRotate * 2}deg) blur(${blurAmount * 0.5}px)`,
      skewY: 5,
      zIndex: 10,
      transition: { duration: 0.3, ease: 'easeOut' },
    }),
  };

  // If user prefers reduced motion, show static version
  if (prefersReducedMotion) {
    return (
      <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
        {clothingItems.slice(0, Math.floor(count / 2)).map((item) => (
          <div
            key={item.id}
            className="absolute mix-blend-screen"
            style={{
              width: item.size,
              height: item.size,
              left: item.initialX,
              top: item.initialY,
              opacity: 0.4 * intensity,
              transform: `rotate(${item.initialRotate}deg)`,
            }}
          >
            {item.shape === 'star' ? (
              <svg
                width={item.size}
                height={item.size}
                viewBox={`0 0 ${item.size} ${item.size}`}
                style={{
                  filter: `blur(${blurAmount}px)`,
                }}
              >
                <path
                  d={createStarPath(item.size)}
                  fill={item.baseColor}
                  opacity={0.7}
                />
              </svg>
            ) : (
              <div
                style={{
                  background: `radial-gradient(circle at center, ${item.baseColor} 0%, transparent 70%)`,
                  width: '100%',
                  height: '100%',
                  borderRadius:
                    item.shape === 'circle'
                      ? '50%'
                      : item.shape === 'rounded'
                      ? '12px'
                      : '0px',
                  boxShadow: `0 0 ${item.size * 0.5}px ${item.baseColor}80`,
                  filter: `blur(${blurAmount}px)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {clothingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute mix-blend-screen"
          custom={item}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          style={{
            width: item.size,
            height: item.size,
            left: 0,
            top: 0,
            zIndex: 0,
          }}
        >
          {item.shape === 'star' ? (
            <svg
              width={item.size}
              height={item.size}
              viewBox={`0 0 ${item.size} ${item.size}`}
            >
              <motion.path
                d={createStarPath(item.size)}
                fill={item.baseColor}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  transition: { duration: item.duration / 2, repeat: Infinity }
                }}
              />
            </svg>
          ) : (
            <div
              style={{
                background: `radial-gradient(circle at center, ${item.baseColor} 0%, transparent 70%)`,
                width: '100%',
                height: '100%',
                borderRadius:
                  item.shape === 'circle'
                    ? '50%'
                    : item.shape === 'rounded'
                    ? '12px'
                    : '0px',
                boxShadow: `0 0 ${item.size * 0.5}px ${item.baseColor}80`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
