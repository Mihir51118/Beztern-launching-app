import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageSquare } from 'lucide-react';

type NotificationType = 'whatsapp' | 'phone' | 'email';

interface NotificationOption {
  type: NotificationType;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  link?: string;
}

export const NotificationForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | null>(null);
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notificationOptions: NotificationOption[] = [
    { 
      type: 'whatsapp', 
      icon: <MessageSquare className="w-6 h-6" />, 
      label: 'WhatsApp',
      placeholder: 'Click to chat on WhatsApp',
      link: 'https://wa.me/919079195956'
    },
    { 
      type: 'phone', 
      icon: <Phone className="w-6 h-6" />, 
      label: 'Call Us',
      placeholder: 'Click to call',
      link: 'tel:+919079195956'
    },
    { 
      type: 'email', 
      icon: <Mail className="w-6 h-6" />, 
      label: 'Email Us',
      placeholder: 'Enter your email'
    }
  ];

  const handleOptionClick = (option: NotificationOption) => {
    if (option.link) {
      window.open(option.link, '_blank');
    } else {
      setSelectedType(option.type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setContact('');
      setSelectedType(null);

      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-3 gap-4">
          {notificationOptions.map((option) => (
            <motion.button
              key={option.type}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedType === option.type
                  ? 'border-red-600 bg-red-600 bg-opacity-10'
                  : 'border-red-300 border-opacity-20 hover:border-red-600'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <motion.div
                  animate={{
                    rotate: selectedType === option.type ? [0, 15, -15, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {option.icon}
                </motion.div>
                <span className="text-sm text-red-100">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://www.instagram.com/beztern?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@beztern"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </motion.a>
        </div>

        <AnimatePresence>
          {selectedType === 'email' && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-red-900 bg-opacity-20 border-2 border-red-600 border-opacity-20 rounded-lg text-red-100 placeholder-red-300 placeholder-opacity-50 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  disabled={isSubmitting || status === 'success'}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                disabled={isSubmitting || status === 'success'}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg text-center text-green-100"
          >
            Thanks! We'll get back to you soon.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};