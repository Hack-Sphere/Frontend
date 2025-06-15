import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/auth.js';

const ACCESS_CODE = "Hacker101"; 

export default function TeacherRegisterPage() {
  const navigate = useNavigate();
  const [gateCode, setGateCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (gateCode === ACCESS_CODE) {
      setUnlocked(true);
    } else {
      setError('🔒 Invalid access code.');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await API.post('/api/register/', {
        ...formData,
        role: 'teacher', // ✅ Auto-assign teacher role
      });

      localStorage.setItem('verify_email', formData.email);
      setSuccess('✅ Registered as teacher. Redirecting...');
      setTimeout(() => navigate('/verify-email'), 2000);
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.email?.[0] ||
        err.response?.data?.username?.[0] ||
        'Registration failed.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono flex flex-col items-center justify-center">
      {!unlocked ? (
        <form onSubmit={handleGateSubmit} className="max-w-sm w-full border border-green-500 p-6 rounded-xl text-center">
          <h1 className="text-2xl font-bold mb-4">🔐 Teacher Access</h1>
          <input
            type="password"
            placeholder="Enter Access Code"
            value={gateCode}
            onChange={(e) => setGateCode(e.target.value)}
            className="w-full bg-transparent border border-green-400 px-4 py-2 rounded mb-4"
          />
          <button
            type="submit"
            className="bg-green-400 text-black px-4 py-2 w-full rounded font-bold hover:bg-green-300"
          >
            Unlock
          </button>
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full border border-green-500 p-6 rounded-xl"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Register as Teacher</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input name="first_name" placeholder="First Name" className="input" required onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" className="input" required onChange={handleChange} />
            <input name="email" placeholder="Email" type="email" className="input" required onChange={handleChange} />
            <input name="username" placeholder="Username" className="input" required onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" className="input" required onChange={handleChange} />
            <input name="confirm_password" placeholder="Confirm Password" type="password" className="input" required onChange={handleChange} />

            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-green-300 animate-pulse">{success}</p>}

            <button type="submit" className="bg-green-400 text-black px-4 py-2 w-full rounded font-bold hover:bg-green-300">
              Register
            </button>
          </form>
        </motion.div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid #00ff00;
          color: #aaffaa;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
