import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from './utils/auth';

export default function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ redirect condition

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await API.post('/api/password-reset-confirm/', {
        uid,
        token,
        new_password: newPassword
      });

      if (res.status === 200) {
        setMessage('✅ Password reset successful! Redirecting to login...');
        setSuccess(true); // ✅ trigger redirect flag
      } else {
        setError('❌ Unexpected response. Try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || '❌ Reset failed. Try again.');
    }
  };

  // 🔁 Redirect if success flag is set
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="border border-green-500 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">🔑 Set New Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full bg-transparent border border-green-400 p-2 rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-transparent border border-green-400 p-2 rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {message && <p className="text-green-300 animate-pulse mb-4">{message}</p>}

        <button
          type="submit"
          className="w-full bg-green-400 text-black py-2 rounded font-bold hover:bg-green-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
