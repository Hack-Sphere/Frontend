import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional icon set (install with `npm i lucide-react`)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-green-500 text-green-400 font-mono fixed w-full z-50 px-4 py-2">
  <div className="flex justify-between items-center max-w-7xl mx-auto">
    
    {/* Logo with Brand */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/images/no1.png"
        alt="Hacksphere Logo"
        className="h-14 w-auto" // bigger logo
      />
      <span className="text-2xl font-bold hidden sm:block">HACKSPHERE</span>
    </Link>


        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/register" className="hover:text-green-200">Register</Link>
          <Link to="/about" className="hover:text-green-200">About</Link>
          <Link to="/contact" className="hover:text-green-200">Contact</Link>

          <motion.a
            href="/login"
            className="px-6 py-2 font-bold text-black bg-green-400 rounded-full hover:bg-green-300 transition-all"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px #00ff00, 0 0 30px #00ff00' }}
          >
            Login
          </motion.a>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-green-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-3 px-2 border-t border-green-500 pt-4">
          <Link to="/register" className="hover:text-green-200">Register</Link>
          <a href="#courses" className="hover:text-green-200">Courses</a>
          <a href="#about" className="hover:text-green-200">About</a>
          <a href="#contact" className="hover:text-green-200">Contact</a>
          <motion.a
            href="/login"
            className="w-fit px-6 py-2 font-bold text-black bg-green-400 rounded-full hover:bg-green-300 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.a>
        </div>
      )}
    </nav>
  );
}
