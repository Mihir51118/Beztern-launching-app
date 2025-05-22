import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Phone, Mail, MessageSquare, Instagram, Youtube, CheckCircle, AlertCircle } from 'lucide-react';

type NotificationType = 'whatsapp' | 'phone' | 'email';

interface NotificationOption {
  type: NotificationType;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  link?: string;
  ariaLabel: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

export const NotificationForm: React.FC = () => {
  // State management
  const [selectedType, setSelectedType] = useState<NotificationType | null>(null);
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Focus input when email option is selected
  useEffect(() => {
    if (selectedType === 'email' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedType]);

  // Notification options data
  const notificationOptions: NotificationOption[] = [
    { 
      type: 'whatsapp', 
      icon: <MessageSquare className="w-6 h-6" aria-hidden="true" />, 
      label: 'WhatsApp',
      placeholder: 'Click to chat on WhatsApp',
      link: 'https://wa.me/919079195956',
      ariaLabel: 'Contact us on WhatsApp'
    },
    { 
      type: 'phone', 
      icon: <Phone className="w-6 h-6" aria-hidden="true" />, 
      label: 'Call Us',
      placeholder: 'Click to call',
      link: 'tel:+919079195956',
      ariaLabel: 'Call us directly'
    },
    { 
      type: 'email', 
      icon: <Mail className="w-6 h-6" aria-hidden="true" />, 
      label: 'Email Us',
      placeholder: 'Enter your email',
      ariaLabel: 'Contact us via email'
    }
  ];

  // Social links data
  const socialLinks: SocialLink[] = [
    {
      icon: <Instagram className="w-6 h-6" aria-hidden="true" />,
      href: "https://www.instagram.com/beztern?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      icon: <Youtube className="w-6 h-6" aria-hidden="true" />,
      href: "https://www.youtube.com/@beztern",
      label: "YouTube",
      color: "hover:text-red-500"
    }
  ];

  // Email validation
  const validateEmail = useCallback((email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }, []);

  // Handle option selection
  const handleOptionClick = useCallback((option: NotificationOption) => {
    if (option.link) {
      window.open(option.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedType(option.type);
      setStatus('idle');
      setErrorMessage('');
    }
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Validate email
    if (selectedType === 'email') {
      const trimmedEmail = contact.trim();
      
      if (!trimmedEmail) {
        setStatus('error');
        setErrorMessage('Please enter your email address');
        return;
      }
      
      if (!validateEmail(trimmedEmail)) {
        setStatus('error');
        setErrorMessage('Please enter a valid email address');
        return;
      }
    }
    
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setStatus('success');
      setContact('');
      
      // Auto-clear success message after delay
      timeoutRef.current = setTimeout(() => {
        setStatus('idle');
        setSelectedType(null);
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };
  
  const optionVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(220, 38, 38, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  const formVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.15 }
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    }
  };
  
  const socialVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const socialItemVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.15,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.9,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        className="space-y-8 rounded-xl bg-gray-900/50 backdrop-blur-sm p-6 border border-red-900/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-xl font-bold text-white text-center mb-6">
          Get in Touch
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {notificationOptions.map((option, index) => (
            <motion.button
              key={option.type}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedType === option.type
                  ? 'border-red-600 bg-red-600/10 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                  : 'border-red-300/20 hover:border-red-600/50'
              }`}
              variants={optionVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
              aria-label={option.ariaLabel}
            >
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  animate={{
                    rotate: selectedType === option.type ? [0, 15, -15, 0] : 0,
                    scale: selectedType === option.type ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className={`text-red-400 ${selectedType === option.type ? 'text-red-500' : ''}`}
                >
                  {option.icon}
                </motion.div>
                <span className="text-sm font-medium text-red-100">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedType === 'email' && (
            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                
                <input
                  ref={inputRef}
                  type="email"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full pl-12 pr-4 py-3 bg-red-900/20 border-2 ${
                    status === 'error' 
                      ? 'border-red-500' 
                      : 'border-red-600/20 focus:border-red-500/50'
                  } rounded-lg text-red-100 placeholder-red-300/50 focus:outline-none transition-all duration-300`}
                  disabled={isSubmitting || status === 'success'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'email-error' : undefined}
                />
                
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      id="email-error"
                      className="text-red-400 text-sm mt-2 font-medium flex items-center"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 flex justify-center items-center"
                disabled={isSubmitting || status === 'success'}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === 'success' && !selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center text-green-100 flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" aria-hidden="true" />
              Thanks! We'll get back to you soon.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-center space-x-6 pt-4 border-t border-red-900/20"
          variants={socialVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-red-200/70 text-sm mr-2">Follow us:</p>
          
          {socialLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${link.label} page`}
              className={`text-red-400 ${link.color} transition-colors duration-300 p-2 rounded-full hover:bg-red-900/30`}
              variants={socialItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
