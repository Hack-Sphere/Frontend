import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import FeaturesSection from './FeaturesSection';
import VideoSection from './VideoSection';
import CallToAction from './CallToAction'; // Assuming you have a CallToAction component
import Footer from './Footer'; // Assuming you have a Footer component
import { Link } from 'react-router-dom';

export default function LandingHero() {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
   <section
  id="home"
  className="min-h-screen flex flex-col md:flex-row items-center justify-center font-mono bg-black text-green-400 relative overflow-hidden"
>
  {/* Text Left Side */}
  <div className="w-full md:w-1/2 p-10 z-10 text-center md:text-left">
    <motion.h1
      className="text-3xl md:text-3xl font-bold leading-tight mb-3 py-24"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2 }}
    >
    ⚡ Launch Your Ethical Hacking Career with Confidence<br />
      <span className="text-green-300 text-1xl">🎯 100% Free, Hands-On Cybersecurity Training</span> No Fluff, Just Real Skills
    </motion.h1>
    <motion.a
      className="inline-block mt-6 px-7 py-4 bg-green-400 text-black font-bold rounded-full hover:bg-green-300 transition-all shadow-md"
      whileHover={{ scale: 1.1 }}
    >
    <Link to="/login">
      🚀 Get Started
    </Link>
    </motion.a>
  </div>

  {/* Image Right Side */}
  <div className="w-full md:w-1/2 h-full relative">
    <img
      src="https://images5.alphacoders.com/423/423529.jpg"
      alt="Hacker"
      className="w-full h-full object-cover brightness-75"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden"></div>
  </div>
</section>

    <FeaturesSection/>
    <VideoSection/> 
    <CallToAction />
    <Footer /> {/* Include the Footer here */}



    </>
  );
}
