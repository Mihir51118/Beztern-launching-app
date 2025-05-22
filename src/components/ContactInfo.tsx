import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

export const ContactInfo: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl">
      <motion.div 
        className="text-center space-y-5 mb-16"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={containerVariants}
      >
        <h2 className="text-5xl font-extrabold tracking-wide text-white drop-shadow-lg">
          Better yet, see us in person!
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          We love our customers, so feel free to visit during normal business hours.
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-16"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={containerVariants}
      >
        {[
          {
            href: "https://wa.me/919079195956",
            bg: "bg-green-600 hover:bg-green-700",
            icon: <MessageSquare className="w-6 h-6 mr-3" />,
            label: "Message us on WhatsApp"
          },
          {
            href: "tel:+919079195956",
            bg: "bg-blue-600 hover:bg-blue-700",
            icon: <Phone className="w-6 h-6 mr-3" />,
            label: "Call Us"
          },
          {
            href: "mailto:Beztern@gmail.com",
            bg: "bg-red-600 hover:bg-red-700",
            icon: <Mail className="w-6 h-6 mr-3" />,
            label: "Email"
          },
        ].map(({href, bg, icon, label}) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold tracking-wide shadow-lg transition-all duration-300 ${bg} ring-1 ring-transparent hover:ring-white/30`}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
            <span>{label}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        className="text-center space-y-8"
        initial="hidden"
        animate="visible"
        custom={2}
        variants={containerVariants}
      >
        <h3 className="text-3xl font-bold tracking-wide text-white drop-shadow-md">BEZTERN</h3>
        <p className="text-gray-400 text-lg tracking-wide uppercase">Sagwara, राजस्थान, भारत</p>
        <p className="text-2xl font-semibold tracking-wider text-white drop-shadow-md">9079195956</p>
        
        <div className="space-y-3">
          <h4 className="text-2xl font-semibold tracking-wide text-white">Hours</h4>
          <p className="text-gray-400 text-lg">Open today: 09:00 am – 05:00 pm</p>
        </div>

        <div className="flex justify-center space-x-10 mt-10">
          {[
            {
              href: "https://www.instagram.com/beztern?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
              svg: (
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor" >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )
            },
            {
              href: "http://www.youtube.com/@bezternindia",
              svg: (
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              )
            }
          ].map(({href, svg}) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, color: '#F87171', textShadow: '0 0 8px #F87171' }}
              whileTap={{ scale: 0.9 }}
              className="text-red-500 hover:text-red-400 transition-colors duration-300"
            >
              {svg}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
