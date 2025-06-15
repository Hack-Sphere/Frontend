// TutorialPage.jsx
import React, { useEffect, useState } from 'react';
import API from './utils/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TutorialPage() {
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/api/v2/tutorials/')
      .then(res => setTutorials(res.data))
      .catch(err => setError('Failed to load tutorials'));
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-8 py-12">
      <h1 className="text-4xl font-bold text-green-300 mb-10 text-center">
        📘 Hacksphere Tutorials
      </h1>

      {error && <p className="text-red-400 text-center">{error}</p>}

      <div className="grid md:grid-cols-2 gap-8">
        {tutorials.map(tut => (
          <motion.div
            key={tut.id}
            className="border border-green-500 bg-[#0a0a0a] p-6 rounded-xl hover:shadow-green-500/50 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold mb-2">{tut.title}</h2>
            <p className="text-green-300 text-sm mb-3">
              By: {tut.created_by} | ❤️ {tut.likes} Likes
            </p>
            <p className="text-green-400 line-clamp-4 mb-4">
              {tut.content.slice(0, 300)}...
            </p>
            {tut.images.length > 0 && (
              <img
                src={tut.images[0].image}
                alt="tutorial"
                className="rounded-lg border border-green-500 max-h-48 w-full object-cover mb-4"
              />
            )}
            <button
              onClick={() => window.location.href = `/tutorials/${tut.id}`}
              className="bg-green-500 text-black px-4 py-2 rounded font-bold hover:bg-green-400 transition-all"
            >
              Read More →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
