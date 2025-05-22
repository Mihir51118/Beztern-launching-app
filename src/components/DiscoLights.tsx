import React, { useMemo, useCallback } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';

interface Light {
  baseColor: string;
  x: string;
  y: string;
  size: number;
  drift: { x: number; y: number };
  duration: number;
  delay: number;
  intensity?: number;
  blurAmount?: number;
}

interface DiscoLightsProps {
  intensity?: number;
  speed?: number;
  count?: number;
  blendMode?: 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'color-dodge';
  hueRotation?: boolean;
  className?: string;
  preset?: 'party' | 'subtle' | 'intense' | 'cyberpunk';
}

export const DiscoLights: React.FC<DiscoLightsProps> = ({
  intensity = 1,
  speed = 1,
  count = 5,
  blendMode = 'screen',
  hueRotation = true,
  className = '',
  preset,
}) => {
  // Honor user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  // Presets for different moods
  const presets = useMemo(() => ({
    party: {
      intensity: 1,
      speed: 1,
      count: 5,
      blendMode: 'screen' as const,
      colors: ['#FF0040', '#00FFAC', '#3D00FF', '#FFE400', '#FF00E1'],
    },
    subtle: {
      intensity: 0.6,
      speed: 0.7,
      count: 3,
      blendMode: 'soft-light' as const,
      colors: ['#FF8A80', '#80D8FF', '#CCFF90', '#FFD180'],
    },
    intense: {
      intensity: 1.4,
      speed: 1.2,
      count: 7,
      blendMode: 'color-dodge' as const,
      colors: ['#FF0040', '#00FFAC', '#3D00FF', '#FFE400', '#FF00E1', '#00FFFF', '#FF8A00'],
    },
    cyberpunk: {
      intensity: 1.2,
      speed: 0.8,
      count: 4,
      blendMode: 'hard-light' as const,
      colors: ['#00F0FF', '#FF00C3', '#8E2DE2', '#4A00E0'],
    },
  }), []);

  // Apply preset if specified
  const activePreset = preset ? presets[preset] : null;
  const activeIntensity = activePreset?.intensity ?? intensity;
  const activeSpeed = activePreset?.speed ?? speed;
  const activeCount = activePreset?.count ?? count;
  const activeBlendMode = activePreset?.blendMode ?? blendMode;
  
  // Generate random position within constraints
  const randomPosition = useCallback(() => {
    const margin = 15;
    return {
      x: `${margin + Math.random() * (100 - 2 * margin)}%`,
      y: `${margin + Math.random() * (100 - 2 * margin)}%`,
    };
  }, []);

  // Generate lights with dynamic count
  const lights: Light[] = useMemo(() => {
    const baseColors = activePreset?.colors ?? [
      '#FF0040', '#00FFAC', '#3D00FF', '#FFE400', '#FF00E1', 
      '#00FFFF', '#FF8A00', '#4A00E0', '#1ED760', '#FF3B30'
    ];
    
    return Array.from({ length: activeCount }).map((_, index) => {
      const position = randomPosition();
      const colorIndex = index % baseColors.length;
      
      return {
        baseColor: baseColors[colorIndex],
        x: position.x,
        y: position.y,
        size: 250 + Math.random() * 150,
        drift: { 
          x: 30 + Math.random() * 40, 
          y: 30 + Math.random() * 40 
        },
        duration: (6 + Math.random() * 4) / activeSpeed,
        delay: Math.random() * 2,
        intensity: activeIntensity,
        blurAmount: 80 + Math.random() * 40,
      };
    });
  }, [activeCount, activePreset, activeIntensity, activeSpeed, randomPosition]);

  // Animation variants
  const containerVariants: Variants = {
    animate: {
      filter: hueRotation 
        ? ['hue-rotate(0deg)', 'hue-rotate(360deg)', 'hue-rotate(0deg)'] 
        : 'hue-rotate(0deg)',
      transition: {
        duration: 60 / activeSpeed,
        repeat: Infinity,
        ease: 'linear',
      }
    }
  };

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div 
        className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{ backgroundColor: 'transparent' }}
      >
        {lights.slice(0, 3).map((light, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: light.x,
              top: light.y,
              width: `${light.size * 0.8}px`,
              height: `${light.size * 0.8}px`,
              background: `radial-gradient(circle at center, ${light.baseColor} 0%, transparent 70%)`,
              filter: `blur(${light.blurAmount}px)`,
              opacity: 0.3 * activeIntensity,
              mixBlendMode: activeBlendMode,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ backgroundColor: 'transparent' }}
      variants={containerVariants}
      animate="animate"
    >
      {lights.map((light, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: light.x,
            top: light.y,
            width: `${light.size}px`,
            height: `${light.size}px`,
            background: `radial-gradient(circle at center, ${light.baseColor} 0%, transparent 70%)`,
            filter: `blur(${light.blurAmount}px)`,
            mixBlendMode: activeBlendMode,
          }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [
              0.2 * activeIntensity, 
              0.6 * activeIntensity, 
              0.2 * activeIntensity
            ],
            rotate: [0, 180, 360],
            x: [
              0,
              light.drift.x * (Math.random() > 0.5 ? 1 : -1),
              0,
            ],
            y: [
              0,
              light.drift.y * (Math.random() > 0.5 ? 1 : -1),
              0,
            ],
            filter: [
              `hue-rotate(0deg) blur(${light.blurAmount}px)`,
              `hue-rotate(45deg) blur(${light.blurAmount * 1.2}px)`,
              `hue-rotate(0deg) blur(${light.blurAmount}px)`,
            ],
          }}
          transition={{
            duration: light.duration,
            repeat: Infinity,
            delay: light.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
};
