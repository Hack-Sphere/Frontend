import React, { useState } from 'react';
import API from './utils/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TutorialEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    images.forEach(img => formData.append('images', img));

    try {
      await API.post('/api/v2/tutorials/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Tutorial published!');
      setTimeout(() => navigate('/tutorials'), 1500);
    } catch (err) {
      setMessage('❌ Failed to submit tutorial.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Write a New Tutorial</h1>

      {message && <p className="mb-4 text-green-300">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border border-green-400 p-2 rounded"
          required
        />

        <textarea
          placeholder="Tutorial content (Use <!--img--> to place images between sections)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="12"
          className="w-full bg-transparent border border-green-400 p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full border border-green-400 p-2 bg-transparent rounded"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-black px-6 py-2 rounded font-bold hover:bg-green-400"
        >
          📤 Publish Tutorial
        </motion.button>
      </form>
    </div>
  );
}
