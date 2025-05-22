import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;        // percentage across screen
  y: number;        // starting y (in px)
  size: number;     // diameter in px
  color: string;    // hex
  rotation: number; // initial rotation
  driftX: number;   // horizontal drift offset
  duration: number; // flight duration
}

export const PartySparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  // Choose from a darker-to-flicker palette
  const colors = ['#FFEC00', '#FF8A00', '#FF2D00', '#FFD600', '#FFF700'];

  // Helper to spawn a burst of sparkles at once
  const spawnBurst = () => {
    const newSparkles: Sparkle[] = Array.from({ length: 15 }).map(() => {
      const size = 4 + Math.random() * 8; // 4px–12px
      return {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: window.innerHeight + size, 
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        driftX: (Math.random() - 0.5) * 200, // ±100px drift
        duration: 2 + Math.random() * 2,     // 2–4s
      };
    });
    setSparkles(current => [...current, ...newSparkles]);
  };

  useEffect(() => {
    // Regular single sparkles every 200ms
    const singleInterval = setInterval(() => {
      const sparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: window.innerHeight + 8,
        size: 6 + Math.random() * 6, // 6px–12px
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        driftX: (Math.random() - 0.5) * 100, // ±50px
        duration: 3 + Math.random() * 2,     // 3–5s
      };
      setSparkles(current => [...current, sparkle]);
    }, 200);

    // Random bursts every 3–6 seconds
    const burstInterval = setInterval(() => {
      spawnBurst();
    }, 3000 + Math.random() * 3000);

    return () => {
      clearInterval(singleInterval);
      clearInterval(burstInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}80`,
          }}
          initial={{
            y: sparkle.y,
            opacity: 0,
            scale: 0.3,
            rotateX: 45,
            rotateY: 45,
          }}
          animate={{
            y: [-sparkle.duration * 0 /* placeholder */, -200, -sparkle.duration * 0 /* placeholder */],
            x: [
              sparkle.x,
              sparkle.x + (sparkle.driftX / window.innerWidth) * 100,
              sparkle.x
            ],
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0],
            rotate: [sparkle.rotation, sparkle.rotation + 720, sparkle.rotation + 1080],
          }}
          transition={{
            duration: sparkle.duration,
            ease: "easeOut",
            times: [0, 0.3, 1],
          }}
          onAnimationComplete={() => {
            setSparkles(current => current.filter(s => s.id !== sparkle.id));
          }}
        />
      ))}
    </div>
  );
};
