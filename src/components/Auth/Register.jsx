import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/auth.js';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirm_password, 
      });
  
      console.log(response.data);
      setSuccess(true);
  
      localStorage.setItem('verify_email', formData.email);
         navigate('/verify-email');

  
      // Redirect to verify-email page after short delay
      setTimeout(() => {
        navigate('/verify-email');
      }, 1000);
    } catch (err) {
      console.error('❌ Backend Error:', err.response?.data);
    
      const data = err.response?.data;
      if (data) {
        if (data.email) setError(`Email: ${data.email[0]}`);
        else if (data.username) setError(`Username: ${data.username[0]}`);
        else if (data.password) setError(`Password: ${data.password[0]}`);
        else if (data.non_field_errors) setError(data.non_field_errors[0]);
        else setError('Registration failed. Please check the form.');
      } else {
        setError('Unknown error. Please try again.');
      }
    }
    
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-black font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-green-500 rounded-xl p-10 w-full max-w-md text-green-400"
      >
        <h1 className="text-3xl mb-8 font-bold text-center">Register</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
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
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-green-400 p-2 focus:outline-none"
            required
          />
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-300 animate-pulse">Registered successfully! Redirecting...</p>}

          <motion.button
            type="submit"
            className="w-full py-2 bg-green-400 text-black font-bold rounded-full mt-4 hover:bg-green-300 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
          <Link to="/login" className="text-green-300 hover:underline">
                👤 Already have an Account login
              </Link>
        </form>
      </motion.div>
    </section>
  );
}
