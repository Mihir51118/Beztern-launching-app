import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Heart, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color?: string;
}

interface FooterProps {
  companyName?: string;
  showEmail?: boolean;
  emailAddress?: string;
  showSocialLinks?: boolean;
  customLinks?: Array<{
    text: string;
    href: string;
    isExternal?: boolean;
  }>;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "BEZTERN",
  showEmail = true,
  emailAddress = "hello@beztern.com",
  showSocialLinks = true,
  customLinks = [],
  className = "",
}) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks: SocialLink[] = [
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: "https://facebook.com", 
      label: "Facebook",
      color: "hover:text-blue-500"
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://twitter.com", 
      label: "Twitter",
      color: "hover:text-sky-500"
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: "https://instagram.com", 
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://linkedin.com", 
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com", 
      label: "GitHub",
      color: "hover:text-gray-100"
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.9,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <footer className={`py-8 px-6 border-t border-beztern-accent/20 backdrop-blur-sm relative z-10 ${className}`}>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Top section with logo and links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-beztern-accent/10">
          {/* Company info */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <motion.div 
              className="font-bold text-2xl text-beztern-accent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {companyName}
            </motion.div>
            <p className="text-beztern-muted text-sm max-w-xs">
              Creating innovative solutions for tomorrow's challenges. Join us on our journey.
            </p>
            
            {showEmail && (
              <motion.a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center text-sm text-beztern-muted hover:text-beztern-accent transition-colors duration-300 w-fit"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4 mr-2" />
                {emailAddress}
              </motion.a>
            )}
          </motion.div>
          
          {/* Quick links */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="font-semibold text-beztern-accent text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              {[
                { text: "Home", href: "/" },
                { text: "About", href: "/about" },
                { text: "Services", href: "/services" },
                { text: "Contact", href: "/contact" },
                ...customLinks
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-beztern-muted hover:text-beztern-accent transition-colors duration-300 text-sm flex items-center"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                  {link.isExternal && <ExternalLink className="ml-1 w-3 h-3" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Newsletter signup */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="font-semibold text-beztern-accent text-sm uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-beztern-muted text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-beztern-background border border-beztern-accent/20 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-beztern-accent"
                required
              />
              <motion.button
                type="submit"
                className="bg-beztern-accent text-white px-3 py-2 rounded-r-md text-sm font-medium"
                whileHover={{ backgroundColor: "rgba(var(--beztern-accent-rgb), 0.8)" }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Bottom section with copyright and social links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            variants={itemVariants}
            className="text-beztern-muted text-sm flex items-center"
          >
            © {currentYear} {companyName}. All rights reserved.
            <motion.span 
              className="inline-flex items-center ml-2"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              animate={{ 
                scale: [1, 1.1, 1],
                transition: { 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }
              }}
            >
              Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> in India
            </motion.span>
          </motion.div>
          
          {showSocialLinks && (
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`text-beztern-muted ${link.color} transition-colors duration-300 p-2 rounded-full hover:bg-beztern-accent/10`}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </footer>
  );
};
