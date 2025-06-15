import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function QuizSubmit({ quizId }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!selected) {
      setMessage("Please select an answer first.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/quiz/submit/', {
        quiz: quizId,
        selected_option: selected
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSubmitted(true);
      setMessage("✅ Submitted! Thank you.");
    } catch (err) {
      console.error(err);
      setMessage("You may have already submitted.");
    }
  };

  if (submitted) {
    return <p className="text-green-300 mt-2">{message}</p>;
  }

  return (
    <div className="mt-4">
      <select
        className="bg-black border border-green-400 text-green-200 p-2 rounded"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value="">Select your answer</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>

      <motion.button
        className="ml-4 px-4 py-2 bg-green-400 text-black font-bold rounded hover:bg-green-300"
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
      >
        Submit
      </motion.button>

      {message && <p className="text-sm mt-2 text-green-300">{message}</p>}
    </div>
  );
}
