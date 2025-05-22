import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface EmailFormProps {
  onSubmit?: (email: string) => Promise;
  darkMode?: boolean;
  colorScheme?: 'blue' | 'purple' | 'green' | 'red' | 'amber';
  buttonText?: string;
  successMessage?: string;
  placeholderText?: string;
  className?: string;
}

export const EmailForm: React.FC = ({
  onSubmit,
  darkMode = true,
  colorScheme = 'blue',
  buttonText = 'Notify Me',
  successMessage = 'Thank you! We'll notify you when we launch.',
  placeholderText = 'Your email address',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Color schemes mapping
  const colorSchemes = {
    blue: {
      button: 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600',
      ring: 'focus:ring-blue-500/50',
      border: 'focus:border-blue-500',
      success: 'from-green-700 to-green-600',
      successText: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]'
    },
    purple: {
      button: 'from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600',
      ring: 'focus:ring-purple-500/50',
      border: 'focus:border-purple-500',
      success: 'from-purple-700 to-purple-600',
      successText: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.5)]'
    },
    green: {
      button: 'from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600',
      ring: 'focus:ring-emerald-500/50',
      border: 'focus:border-emerald-500',
      success: 'from-emerald-700 to-emerald-600',
      successText: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]'
    },
    red: {
      button: 'from-red-600 to-red-500 hover:from-red-700 hover:to-red-600',
      ring: 'focus:ring-red-500/50',
      border: 'focus:border-red-500',
      success: 'from-red-700 to-red-600',
      successText: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]'
    },
    amber: {
      button: 'from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500',
      ring: 'focus:ring-amber-500/50',
      border: 'focus:border-amber-500',
      success: 'from-amber-600 to-amber-500',
      successText: 'text-gray-900',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
    }
  };

  const colors = colorSchemes[colorScheme];
  
  const validateEmail = useCallback((email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }, []);

  // Focus input on error
  useEffect(() => {
    if (status === 'error') {
      inputRef.current?.focus();
    }
  }, [status]);

  // Reset form on success after timeout
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success') {
      timer = setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Simulate API call if no onSubmit provided
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setIsSubmitting(false);
      setStatus('success');
      setEmail('');
    } catch (error) {
      setIsSubmitting(false);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Animation variants
  const inputVariants: Variants = {
    idle: { 
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    hover: { 
      boxShadow: "0 0 10px rgba(255,255,255,0.1)",
    },
    focus: { 
      boxShadow: `0 0 15px rgba(255,255,255,0.15)`,
    },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants: Variants = {
    idle: { scale: 1 },
    hover: { scale: 1.04 },
    tap: { scale: 0.96 },
    disabled: { scale: 1, opacity: 0.7 }
  };

  const successVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  const checkmarkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    
      
        
          
             {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              placeholder={placeholderText}
              className={`
                px-4 py-3 rounded-lg w-full
                ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-white text-gray-800'}
                font-medium text-lg
                border

---
Answer from Perplexity: pplx.ai/share