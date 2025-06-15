// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-br from-black via-green-900/30 to-black animate-pulse z-0"
      />

      <div className="relative z-10 max-w-xl text-center">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-9xl font-extrabold mb-6 text-green-500 drop-shadow-[0_0_15px_#22c55e]"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-green-300 mb-8"
        >
          Oops! The page you're looking for doesn’t exist or has been hacked into oblivion.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
          >
            Take me Home 🚀
          </Link>
        </motion.div>
      </div>

      {/* Optional SVG or animation effect */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#22c55e" d="M43.6,-76.1C54.6,-70.7,60.4,-54.1,68.4,-38.7C76.4,-23.3,86.7,-9.1,87.3,5.4C88,19.9,78.9,34.6,68.5,49.8C58.2,65,46.7,80.8,31.8,84.5C16.8,88.1,-1.7,79.6,-15.6,70.7C-29.6,61.8,-39,52.4,-50.4,42.4C-61.8,32.4,-75.2,21.8,-77.4,9.5C-79.6,-2.8,-70.6,-16.8,-63.2,-30.2C-55.9,-43.6,-50.3,-56.4,-40.3,-63.4C-30.3,-70.4,-15.2,-71.6,0.8,-72.8C16.8,-74,33.6,-75.5,43.6,-76.1Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
}
