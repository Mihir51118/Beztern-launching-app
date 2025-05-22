import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="py-6 px-4 border-t border-beztern-accent border-opacity-20 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-beztern-muted text-sm mb-4 md:mb-0">
          © {currentYear} BEZTERN. All rights reserved.
        </div>
        
        <div className="flex space-x-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-beztern-muted hover:text-beztern-accent transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};