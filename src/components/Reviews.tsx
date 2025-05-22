import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
}

export const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Anonymous",
      date: "13/5/2025",
      text: "Review 1",
      rating: 5
    },
    {
      id: 2,
      name: "Anonymous",
      date: "13/5/2025",
      text: "Review 2",
      rating: 5
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Customer Reviews
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-white bg-opacity-5 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium">{review.name}</h3>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-300">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};