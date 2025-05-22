import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Focus input on error
  useEffect(() => {
    if (status === 'error') {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setEmail('');

      // Auto-clear success message after 5s
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="relative">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Your email address"
            className={`input-field px-4 py-3 rounded-lg w-full
              bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
              text-white font-semibold text-lg
              border-2 transition-all duration-300
              ${
                status === 'error'
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-transparent focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-60 disabled:cursor-not-allowed
            `}
            disabled={isSubmitting || status === 'success'}
            aria-label="Email address"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'email-error' : undefined}
            autoComplete="email"
            spellCheck={false}
          />
          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                id="email-error"
                className="text-red-400 text-sm mt-1 font-medium select-none"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                role="alert"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          className="btn-primary w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 shadow-lg
            hover:from-blue-700 hover:to-blue-600
            focus:outline-none focus:ring-4 focus:ring-blue-400
            disabled:opacity-70 disabled:cursor-not-allowed
            flex justify-center items-center gap-2"
          disabled={isSubmitting || status === 'success'}
          whileHover={isSubmitting || status === 'success' ? {} : { scale: 1.04 }}
          whileTap={isSubmitting || status === 'success' ? {} : { scale: 0.96 }}
          aria-live="polite"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : status === 'success' ? (
            <>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </motion.svg>
              Notification Set!
            </>
          ) : (
            'Notify Me'
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-700 to-green-600 text-white text-center font-semibold shadow-lg select-none"
            role="alert"
            aria-live="assertive"
          >
            Thank you! We'll notify you when we launch.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
