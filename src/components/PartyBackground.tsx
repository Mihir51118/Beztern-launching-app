import React from 'react';
import { motion } from 'framer-motion';

interface ClothingItem {
  id: number;
  size: number;
  shape: 'circle' | 'square' | 'rounded';
  baseColor: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}

export const PartyBackground: React.FC = () => {
  // Generate 20 randomized “clothing items”
  const clothingItems: ClothingItem[] = React.useMemo(() => {
    const colors = ['#FF3F8E', '#04C2C9', '#2E55C1', '#FF9A3C', '#FFC93C'];
    const shapes: ClothingItem['shape'][] = ['circle', 'square', 'rounded'];
    return Array.from({ length: 20 }).map((_, i) => {
      const size = 40 + Math.random() * 40; // 40px–80px
      return {
        id: i,
        size,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        initialRotate: Math.random() * 360,
        driftX: 20 + Math.random() * 100, // horizontal drift range
        driftY: 20 + Math.random() * 100, // vertical drift range
        duration: 10 + Math.random() * 10, // 10s–20s loop
        delay: Math.random() * 5, // initial delay
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {clothingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute mix-blend-screen"
          initial={{
            x: item.initialX,
            y: item.initialY,
            rotate: item.initialRotate,
            scale: 0.5,
          }}
          animate={{
            x: [
              item.initialX,
              item.initialX + (Math.random() > 0.5 ? item.driftX : -item.driftX),
              item.initialX,
            ],
            y: [
              item.initialY,
              item.initialY + (Math.random() > 0.5 ? item.driftY : -item.driftY),
              item.initialY,
            ],
            rotate: [
              item.initialRotate,
              item.initialRotate + (Math.random() > 0.5 ? 360 : -360),
              item.initialRotate,
            ],
            scale: [0.5, 0.9, 0.5],
            opacity: [0.3, 0.8, 0.3],
            filter: [
              'hue-rotate(0deg) blur(10px)',
              `hue-rotate(${Math.random() * 60}deg) blur(20px)`,
              'hue-rotate(0deg) blur(10px)',
            ],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          whileHover={{
            scale: 1.2,
            opacity: 1,
            rotate: item.initialRotate + 45,
            skewY: 5,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          style={{
            width: item.size,
            height: item.size,
            left: 0,
            top: 0,
          }}
        >
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
        </motion.div>
      ))}
    </div>
  );
};
