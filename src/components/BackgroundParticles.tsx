import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

export const BackgroundParticles: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load the full tsparticles package to access all features
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        background: {
          color: { value: 'transparent' },
        },
        fpsLimit: 60,
        fullScreen: {
          enable: false, // we are using absolute/inset-0 for positioning
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'bubble',
              // Particles enlarge and become more opaque on hover
            },
            onClick: {
              enable: true,
              mode: 'push', // spawn new particles on click
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
            value: ['#6D28D9', '#3B82F6', '#10B981', '#F59E0B'], // multi‐color palette
            animation: {
              enable: true,
              speed: 20, // cycle through palette
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.2,
            width: 1,
            blink: false,
            consent: false,
            shadow: {
              enable: true,
              color: '#3B82F6',
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
            speed: 1.5,
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
            value: 80,
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
            type: ['circle', 'triangle', 'star'],
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
          rotate: {
            value: { min: 0, max: 360 },
            animation: {
              enable: true,
              speed: 5,
              sync: false,
            },
            direction: 'random',
          },
          tilt: {
            enable: true,
            value: { min: 0, max: 360 },
            animation: {
              enable: true,
              speed: 10,
              sync: false,
            },
          },
          roll: {
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
          wobble: {
            enable: true,
            distance: 10,
            speed: { min: -5, max: 5 },
          },
        },
        detectRetina: true,
        emitters: [
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
      }}
    />
  );
};
