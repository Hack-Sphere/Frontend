// TutorialDetail.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/auth';
import { motion } from 'framer-motion';

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/api/students/')
      .then(res => setStudents(res.data))
      .catch(err => setError('Failed to load student data.'));
  }, []);

  if (error) return <p className="text-red-400 text-center p-10">{error}</p>;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-green-300 mb-8 text-center"
        >
          👩‍🎓 Registered Students
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-6">
          {students.map((student, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-green-500 p-6 rounded-lg shadow-md hover:shadow-green-600/30"
            >
              <h3 className="text-xl font-bold text-green-300 mb-2">
                👤 {student.full_name || 'Unknown Student'}
              </h3>
              <p className="text-green-400">📧 {student.email || 'N/A'}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
