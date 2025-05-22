import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine, ISourceOptions } from 'tsparticles-engine';

interface BackgroundParticlesProps {
  density?: number;
  speed?: number;
  colorScheme?: 'default' | 'red' | 'blue' | 'green' | 'purple';
  interactive?: boolean;
  performanceMode?: boolean;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  density = 80,
  speed = 1.5,
  colorScheme = 'default',
  interactive = true,
  performanceMode = false,
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Color schemes mapping
  const colorSchemes = useMemo(() => ({
    default: ['#6D28D9', '#3B82F6', '#10B981', '#F59E0B'],
    red: ['#EF4444', '#DC2626', '#B91C1C', '#F97316'],
    blue: ['#3B82F6', '#2563EB', '#1D4ED8', '#0EA5E9'],
    green: ['#10B981', '#059669', '#047857', '#84CC16'],
    purple: ['#8B5CF6', '#7C3AED', '#6D28D9', '#A855F7'],
  }), []);

  // Memoize the entire options object to prevent unnecessary re-renders
  const particlesOptions = useMemo<ISourceOptions>(() => ({
    background: {
      color: { value: 'transparent' },
    },
    fpsLimit: performanceMode ? 30 : 60,
    fullScreen: {
      enable: false,
      zIndex: -10,
    },
    interactivity: {
      events: {
        onHover: {
          enable: interactive,
          mode: 'bubble',
        },
        onClick: {
          enable: interactive,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 120,
          duration: 2,
          size: 8,
          opacity: 0.8,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: colorSchemes[colorScheme],
        animation: {
          enable: true,
          speed: 20,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.2,
        width: 1,
        shadow: {
          enable: !performanceMode,
          color: colorSchemes[colorScheme][0],
          blur: 5,
        },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: speed,
        straight: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        density: {
          enable: true,
          area: 900,
        },
        value: performanceMode ? Math.floor(density * 0.6) : density,
      },
      opacity: {
        value: 0.5,
        random: {
          enable: true,
          minimumValue: 0.2,
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: performanceMode ? ['circle'] : ['circle', 'triangle', 'star'],
        options: {
          star: { sides: 5 },
          triangle: { sides: 3 },
        },
      },
      size: {
        value: { min: 1, max: 6 },
        random: {
          enable: true,
          minimumValue: 1,
        },
        animation: {
          enable: true,
          speed: 5,
          minimumValue: 1,
          sync: false,
        },
      },
      // Disable complex animations in performance mode
      rotate: performanceMode ? undefined : {
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: 5,
          sync: false,
        },
        direction: 'random',
      },
      tilt: performanceMode ? undefined : {
        enable: true,
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: 10,
          sync: false,
        },
      },
      roll: performanceMode ? undefined : {
        enable: true,
        darken: {
          enable: true,
          value: 25,
        },
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: performanceMode ? undefined : {
        enable: true,
        distance: 10,
        speed: { min: -5, max: 5 },
      },
    },
    detectRetina: true,
    emitters: performanceMode ? [] : [
      {
        direction: 'none',
        life: {
          count: 0,
          duration: 0.1,
          delay: 3,
        },
        rate: {
          delay: 5,
          quantity: 10,
        },
        size: {
          width: 0,
          height: 0,
        },
        position: {
          x: 50,
          y: 50,
        },
      },
    ],
  }), [colorScheme, density, speed, interactive, performanceMode, colorSchemes]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={particlesOptions}
    />
  );
};
