import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-green-500 py-6 text-green-400 font-mono text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Copyright */}
        <p className="text-xs md:text-sm text-center">
          © {new Date().getFullYear()} HackeSphere. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a href="mailto:hacksphere@example.com" className="hover:text-green-200" title="Email">
            <FaEnvelope size={18} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
            <FaGithub size={18} />
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
            <FaTwitter size={18} />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
