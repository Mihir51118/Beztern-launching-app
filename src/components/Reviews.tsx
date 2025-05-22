import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Star, User, ChevronLeft, ChevronRight, Quote, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
  verified?: boolean;
  avatar?: string;
  location?: string;
  helpfulCount?: number;
}

interface ReviewsProps {
  title?: string;
  subtitle?: string;
  reviews?: Review[];
  maxDisplayed?: number;
  showControls?: boolean;
  className?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({
  title = "Customer Reviews",
  subtitle = "What our customers are saying about us",
  reviews: propReviews,
  maxDisplayed = 4,
  showControls = true,
  className = "",
}) => {
  // Default reviews if none provided
  const defaultReviews: Review[] = [
    {
      id: 1,
      name: "Anonymous",
      date: "13/5/2025",
      text: "The quality of the products exceeded my expectations. The oversized tees fit perfectly and the material is super comfortable. Will definitely order again!",
      rating: 5,
      verified: true,
      location: "New Delhi",
      helpfulCount: 24
    },
    {
      id: 2,
      name: "Anonymous",
      date: "13/5/2025",
      text: "Fast shipping and great customer service. I had a question about sizing and they responded within hours. The streetwear collection is on point!",
      rating: 5,
      verified: true,
      location: "Mumbai",
      helpfulCount: 18
    },
    {
      id: 3,
      name: "Anonymous",
      date: "10/5/2025",
      text: "Been looking for affordable streetwear that doesn't compromise on quality. Finally found it here. The designs are unique and the prices are unbeatable.",
      rating: 4,
      verified: false,
      location: "Bangalore",
      helpfulCount: 7
    },
    {
      id: 4,
      name: "Anonymous",
      date: "5/5/2025",
      text: "Ordered two oversized tees and they arrived earlier than expected. The fabric is soft and the prints are vibrant. Definitely recommend!",
      rating: 5,
      verified: true,
      location: "Hyderabad",
      helpfulCount: 12
    }
  ];

  const reviews = propReviews || defaultReviews;
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / maxDisplayed);
  
  // Get current page reviews
  const currentReviews = reviews.slice(
    currentPage * maxDisplayed, 
    (currentPage + 1) * maxDisplayed
  );
  
  // Navigation handlers
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* Overall rating summary */}
        <motion.div 
          className="flex items-center justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-600"}`} 
                />
              ))}
            </div>
            <span className="font-bold text-xl">
              {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
            </span>
            <span className="text-gray-400 ml-2">
              ({reviews.length} reviews)
            </span>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPage}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {currentReviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-700/30 backdrop-blur-sm"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 text-gray-700 opacity-20">
                <Quote size={40} />
              </div>
              
              <div className="flex items-center space-x-4 mb-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-md">
                  {review.avatar ? (
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{review.name}</h3>
                    {review.verified && (
                      <motion.span 
                        className="ml-2 text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Verified
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>{review.date}</span>
                    {review.location && (
                      <span className="ml-2 opacity-70">• {review.location}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 mb-4">{review.text}</p>
              
              {review.helpfulCount !== undefined && (
                <div className="flex items-center text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700/30">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{review.helpfulCount} found this helpful</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination controls */}
      {showControls && totalPages > 1 && (
        <motion.div 
          className="flex justify-center items-center mt-10 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={prevPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="text-sm text-gray-400">
            {currentPage + 1} / {totalPages}
          </div>
          
          <motion.button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={nextPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};
