import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundParticles } from './components/BackgroundParticles';
import { AnimatedHeadline } from './components/AnimatedHeadline';
import { CountdownTimer } from './components/CountdownTimer';
import { NotificationForm } from './components/NotificationForm';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { DiscoLights } from './components/DiscoLights';
import { PartySparkles } from './components/PartySparkles';
import { PartyBackground } from './components/PartyBackground';
import { PartyConfetti } from './components/PartyConfetti';
import { ContactInfo } from './components/ContactInfo';
import { Reviews } from './components/Reviews';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Background decorative components */}
      <PartyBackground />
      <PartyConfetti />
      <DiscoLights />
      <PartySparkles />
      <BackgroundParticles />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Logo className="w-40 h-40 md:w-48 md:h-48" />
          </motion.div>

          <AnimatedHeadline />

          <motion.p
            className="text-gray-200 text-opacity-90 text-center text-lg md:text-xl max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            We're building something extraordinary. BEZTERN is set to redefine innovation with limitless possibilities for your digital future.
          </motion.p>

          <CountdownTimer targetDate="May 11, 2025 12:00:00 GMT+0530" />

          <NotificationForm />
        </div>

        <Reviews />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  );
}

export default App;
