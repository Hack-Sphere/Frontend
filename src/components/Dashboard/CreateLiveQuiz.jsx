import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/auth';
import { motion } from 'framer-motion';

export default function CreateLiveQuiz() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    classroom: '',
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('/api/v2/quiz/create/', {
        ...formData,
        correct_answer: formData.correct_answer.toUpperCase(),
      });
      setSuccess(true);
      setTimeout(() => navigate(`/classroom/${formData.classroom}`), 1500);
    } catch (err) {
      console.error('❌ Quiz creation failed:', err.response?.data || err.message);
      setError('Failed to create quiz. Check all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0a0a0a] border border-green-500 rounded-lg p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6">🧠 Create Live Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="classroom"
            placeholder="Classroom ID (UUID)"
            value={formData.classroom}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />

          <input
            type="text"
            name="question"
            placeholder="Quiz Question"
            value={formData.question}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />
          <input
            type="text"
            name="option_a"
            placeholder="Option A"
            value={formData.option_a}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />
          <input
            type="text"
            name="option_b"
            placeholder="Option B"
            value={formData.option_b}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />
          <input
            type="text"
            name="option_c"
            placeholder="Option C"
            value={formData.option_c}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />
          <input
            type="text"
            name="option_d"
            placeholder="Option D"
            value={formData.option_d}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />
          <input
            type="text"
            name="correct_answer"
            placeholder="Correct Answer (A/B/C/D)"
            value={formData.correct_answer}
            onChange={handleChange}
            required
            className="w-full bg-black border border-green-400 p-2 rounded"
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-400 animate-pulse">✅ Quiz created!</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-green-400 text-black font-bold py-2 px-4 rounded"
          >
            Submit Quiz
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
