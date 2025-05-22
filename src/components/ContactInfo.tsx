import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MessageSquare, Phone, Mail, Clock, MapPin, Instagram, Youtube } from 'lucide-react';

// Define types for better type safety
interface ContactMethod {
  href: string;
  bg: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
}

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Animation variants with TypeScript support
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2, 
      duration: 0.6, 
      ease: [0.215, 0.61, 0.355, 1] // Improved easing for smoother animation
    },
  }),
};

// Stagger children animation
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Child item animation
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const ContactInfo: React.FC = () => {
  // Contact methods data
  const contactMethods: ContactMethod[] = [
    {
      href: "https://wa.me/919079195956",
      bg: "bg-emerald-600 hover:bg-emerald-700",
      icon: <MessageSquare className="w-6 h-6 mr-3" aria-hidden="true" />,
      label: "Message us on WhatsApp",
      ariaLabel: "Contact us on WhatsApp"
    },
    {
      href: "tel:+919079195956",
      bg: "bg-blue-600 hover:bg-blue-700",
      icon: <Phone className="w-6 h-6 mr-3" aria-hidden="true" />,
      label: "Call Us",
      ariaLabel: "Call us at 9079195956"
    },
    {
      href: "mailto:Beztern@gmail.com",
      bg: "bg-rose-600 hover:bg-rose-700",
      icon: <Mail className="w-6 h-6 mr-3" aria-hidden="true" />,
      label: "Email",
      ariaLabel: "Email us at Beztern@gmail.com"
    },
  ];

  // Social links data
  const socialLinks: SocialLink[] = [
    {
      href: "https://www.instagram.com/beztern?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: <Instagram className="w-7 h-7" aria-hidden="true" />,
      label: "Instagram"
    },
    {
      href: "http://www.youtube.com/@bezternindia",
      icon: <Youtube className="w-7 h-7" aria-hidden="true" />,
      label: "YouTube"
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-800">
      <motion.div 
        className="text-center space-y-5 mb-16"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={containerVariants}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Better yet, see us in person!
        </h2>
        <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
          We love our customers, so feel free to visit during normal business hours.
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {contactMethods.map((method) => (
          <motion.a
            key={method.href}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={method.ariaLabel}
            className={`flex items-center justify-center px-8 py-5 rounded-xl text-white font-semibold tracking-wide shadow-lg transition-all duration-300 ${method.bg} backdrop-blur-sm backdrop-saturate-150 ring-1 ring-white/10 hover:ring-white/30`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              y: -5
            }}
            whileTap={{ scale: 0.98 }}
          >
            {method.icon}
            <span>{method.label}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        className="text-center space-y-8 bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50"
        initial="hidden"
        animate="visible"
        custom={2}
        variants={containerVariants}
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-4"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/30">
              <h3 className="text-2xl font-bold text-white">B</h3>
            </div>
          </motion.div>
          <h3 className="text-3xl font-bold tracking-wide text-white drop-shadow-md">BEZTERN</h3>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <MapPin className="w-5 h-5 text-red-500" aria-hidden="true" />
          <p className="text-lg tracking-wide">Sagwara, राजस्थान, भारत</p>
        </div>
        
        <p className="text-2xl font-semibold tracking-wider text-white drop-shadow-md">
          <a href="tel:+919079195956" className="hover:text-red-400 transition-colors">9079195956</a>
        </p>
        
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" aria-hidden="true" />
            <h4 className="text-xl font-semibold tracking-wide text-white">Hours</h4>
          </div>
          <p className="text-gray-300 text-lg">Open today: 09:00 am – 05:00 pm</p>
        </div>

        <div className="pt-6 border-t border-gray-800/50">
          <p className="text-gray-400 mb-4">Connect with us</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.label} page`}
                className="p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full text-red-500 hover:text-red-400 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.15, 
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' 
                }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
