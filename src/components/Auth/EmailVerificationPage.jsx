import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/auth.js';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [resendSuccess, setResendSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('verify_email');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError("No email found. Please register again.");
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async () => {
    try {
      await API.post('api/verify-email/', {
        email,
        code,
      });

      setSuccess('✅ Email verified! Redirecting to login...');
      setError('');
      localStorage.removeItem('verify_email');

      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      console.error(err.response?.data);
      setError('❌ Invalid OTP code.');
      setSuccess('');
    }
  };

  const handleResend = async () => {
    try {
      setResendSuccess('');
      await API.post('api/resend-otp/', { email });
      setTimer(60);
      setResendSuccess(`✅ OTP resent to ${email}`);
    } catch (err) {
      console.error(err.response?.data);
      setError('❌ Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono flex flex-col items-center justify-center">
      <div className="max-w-md w-full border border-green-500 p-6 rounded-xl shadow-lg shadow-green-500/30">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">🔐 Email Verification</h1>
        {email && (
          <p className="text-green-300 text-center mb-4">
            We've sent an OTP code to <span className="underline">{email}</span>  Dont Share it With any 
          </p>
        )}

        <input
          type="text"
          placeholder="Enter OTP Code"
          value={code}
          className="w-full mb-4 bg-transparent border border-green-400 px-4 py-2 rounded outline-none"
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-400 text-black py-2 rounded hover:bg-green-300 transition-all font-bold"
        >
          Verify Email
        </button>

        {timer > 0 ? (
          <p className="mt-4 text-sm text-green-300">Resend in {timer}s</p>
        ) : (
          <button
            onClick={handleResend}
            className="mt-4 text-sm underline hover:text-green-300"
          >
            🔁 Resend OTP
          </button>
        )}

        {resendSuccess && <p className="text-green-300 mt-2">{resendSuccess}</p>}
        {success && <p className="text-green-300 mt-4 animate-pulse">{success}</p>}
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
