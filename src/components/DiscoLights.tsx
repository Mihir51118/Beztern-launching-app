import React from 'react';
import { motion } from 'framer-motion';

interface Light {
  baseColor: string;
  x: string;
  y: string;
  size: number;           // diameter in px
  drift: { x: number; y: number }; // max drift offset
  duration: number;       // animation cycle duration
  delay: number;          // initial delay
}

export const DiscoLights: React.FC = () => {
  // PRO‐LEVEL: Each light has its own size, drift range, duration, and delay.
  const lights: Light[] = [
    {
      baseColor: '#FF0040',
      x: '10%',
      y: '15%',
      size: 350,
      drift: { x: 40, y: 40 },
      duration: 6,
      delay: 0,
    },
    {
      baseColor: '#00FFAC',
      x: '75%',
      y: '20%',
      size: 300,
      drift: { x: 50, y: 30 },
      duration: 7.5,
      delay: 1,
    },
    {
      baseColor: '#3D00FF',
      x: '60%',
      y: '65%',
      size: 400,
      drift: { x: 30, y: 60 },
      duration: 8,
      delay: 0.5,
    },
    {
      baseColor: '#FFE400',
      x: '25%',
      y: '80%',
      size: 320,
      drift: { x: 60, y: 40 },
      duration: 6.5,
      delay: 1.2,
    },
    {
      baseColor: '#FF00E1',
      x: '90%',
      y: '45%',
      size: 280,
      drift: { x: 45, y: 50 },
      duration: 7,
      delay: 0.8,
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      // PRO‐LEVEL: slow, continuous hue shift on container
      style={{ backgroundColor: 'transparent', mixBlendMode: 'normal' }}
      animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)', 'hue-rotate(0deg)'] }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      {lights.map((light, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: light.x,
            top: light.y,
            width: `${light.size}px`,
            height: `${light.size}px`,
            background: `radial-gradient(circle at center, ${light.baseColor} 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.2, 0.6, 0.2],
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
              'hue-rotate(0deg) blur(100px)',
              'hue-rotate(45deg) blur(120px)',
              'hue-rotate(0deg) blur(100px)',
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
