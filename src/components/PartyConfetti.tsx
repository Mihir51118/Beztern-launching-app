import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Confetti {
  id: number;
  x: number;
  rotation: number;
  size: number;
  color: string;
}

export const PartyConfetti: React.FC = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const colors = ['#1a1a1a', '#2a2a2a', '#3a3a3a', '#4a4a4a', '#5a5a5a', '#ffffff', '#f5f5f5'];

  const createConfettiBurst = () => {
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setConfetti(current => [...current, ...newConfetti].slice(-100));
  };

  useEffect(() => {
    createConfettiBurst(); // Initial burst on mount
    const interval = setInterval(createConfettiBurst, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size * 3,
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
          initial={{
            y: -20,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: ['0vh', '100vh'],
            scale: [0, 1, 1, 0.5],
            rotate: [0, piece.rotation + 720],
          }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
