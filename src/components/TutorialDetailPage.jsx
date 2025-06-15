import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from './utils/auth';

export default function TutorialDetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/api/v2/tutorials/${id}/`)
      .then(res => setTutorial(res.data))
      .catch(err => setError('Failed to load tutorial.'));
  }, [id]);

  const injectImagesIntoContent = (content, images) => {
    const parts = content.split('<!--img-->');
    return parts.map((part, idx) => (
      <div key={idx}>
        <p className="mb-4 text-green-300">{part}</p>
        {images[idx] && (
          <img
            src={images[idx].image}
            alt={`img-${idx}`}
            className="mb-6 rounded border border-green-500"
          />
        )}
      </div>
    ));
  };

  if (error) return <div className="text-red-400">{error}</div>;
  if (!tutorial) return <div className="text-green-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{tutorial.title}</h1>
      <p className="text-green-300 mb-6">👤 {tutorial.created_by} | ❤️ {tutorial.likes}</p>
      {injectImagesIntoContent(tutorial.content, tutorial.images)}
    </div>
  );
}
