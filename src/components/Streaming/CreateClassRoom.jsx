import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/auth.js';

export default function CreateClassroomPage({ onCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stream_url: '',
    pin_code: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.post('/api/v2/classroom/create/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('✅ Classroom created:', response.data);
      setSuccess(true);

      // Optional callback
      if (typeof onCreated === 'function') {
        onCreated(response.data);
      }

      // Redirect to the classroom page
      setTimeout(() => {
        navigate(`/classroom/${response.data.id}`);
      }, 1000);

    } catch (err) {
      console.error('❌ Classroom creation failed:', err);
      setError('Failed to create classroom. Check your input and try again.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black font-mono text-green-400 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-green-400 rounded-xl p-10 w-full max-w-md"
      >
        <h1 className="text-3xl mb-8 font-bold text-center">Create Virtual Classroom</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Class Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          <input
            type="url"
            name="stream_url"
            placeholder="Stream URL (YouTube Embed)"
            value={formData.stream_url}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="pin_code"
            placeholder="6-digit PIN"
            value={formData.pin_code}
            onChange={handleChange}
            maxLength="6"
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-300 animate-pulse">✅ Classroom created! Redirecting...</p>}

          <motion.button
            type="submit"
            className="w-full py-2 bg-green-400 text-black font-bold rounded-full mt-4 hover:bg-green-300 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Create Classroom
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
