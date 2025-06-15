import React, { useState } from 'react';
import { motion } from 'framer-motion';
import API from './utils/auth'; // ✅ import your axios instance

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError('');

    try {
      await API.post('/api/v2/contact/', form); // ✅ your backend API endpoint
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setError('❌ Failed to send message. Try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/20 to-black animate-pulse opacity-10 z-0" />

      <div className="relative z-10 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-2xl bg-[#0b0b0b] p-10 border border-green-500 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            📩 Contact Hacksphere
          </h2>
          <p className="text-green-300 text-center mb-10">
            Have a question, suggestion, or issue? We’d love to hear from you.
          </p>

          {submitted && (
            <div className="bg-green-800 text-green-100 p-4 mb-6 rounded">
              ✅ Thanks for reaching out! We'll get back to you soon.
            </div>
          )}
          {error && (
            <div className="bg-red-800 text-red-100 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-green-400 px-4 py-3 rounded text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className="absolute top-[-0.8rem] left-3 text-sm px-1 bg-black text-green-400">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-green-400 px-4 py-3 rounded text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className="absolute top-[-0.8rem] left-3 text-sm px-1 bg-black text-green-400">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full bg-black border border-green-400 px-4 py-3 rounded text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className="absolute top-[-0.8rem] left-3 text-sm px-1 bg-black text-green-400">
                Your Message
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded transition-all"
            >
              Send Message 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
