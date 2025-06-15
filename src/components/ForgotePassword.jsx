// PasswordResetRequest.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './utils/auth.js';

export default function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ redirect flag
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await API.post('/api/password-reset/', { email });
      setMessage(res.data.message);
      setSuccess(true); // ✅ trigger redirect
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login'); // ✅ redirect after 2s
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono flex justify-center items-center">
      <form onSubmit={handleSubmit} className="border border-green-500 rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">🔐 Password Reset</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 border border-green-400 rounded bg-transparent mb-4"
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400"
        >
          Send Reset Email
        </button>
        {message && <p className="text-green-300 mt-3">✅ {message}</p>}
        {error && <p className="text-red-400 mt-3">❌ {error}</p>}
      </form>
    </div>
  );
}
