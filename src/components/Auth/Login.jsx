import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/auth.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/api/login/', {
        email: formData.email,
        password: formData.password,
      });

      const { access, refresh, user } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'teacher') {
        navigate('/dashboard');
      } else if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        setError('Unknown user role.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black font-mono text-green-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-green-500 rounded-xl p-10 w-full max-w-md"
      >
        <h1 className="text-3xl mb-8 font-bold text-center">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />

        {error && <p className="text-red-400">{error}</p>}

<motion.button
  type="submit"
  className="w-full py-2 bg-green-400 text-black font-bold rounded-full mt-4 hover:bg-green-300 transition-all"
  whileHover={{ scale: 1.05 }}
>
  🔓 Login
</motion.button>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="mt-6 space-y-3 text-sm text-center"
>
  <motion.div whileHover={{ scale: 1.05 }}>
    <a
      href="/forgot-password"
      className="inline-flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors"
    >
      🔐 Forgot Password?
    </a>
  </motion.div>
  <motion.div whileHover={{ scale: 1.05 }}>
    <a
      href="/register"
      className="inline-flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors"
    >
      📝 Don't have an account? <span className="underline">Register here</span>
    </a>
  </motion.div>
</motion.div>


        </form>
      </motion.div>
    </section>
  );
}
