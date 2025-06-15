import React, { useState, useEffect } from 'react';
import API from '../utils/auth.js';

export default function LiveStudentWatchCount({ classroomId }) {
  const [count, setWatchCount] = useState(0);

  useEffect(() => {
    const fetchWatchCount = () => {
      API.get(`/api/v2/classroom/${classroomId}/watch-count/`)
        .then(res => setWatchCount(res.data.count))
        .catch(err => console.error('Failed to fetch watch count', err));
    };

    fetchWatchCount();
    const interval = setInterval(fetchWatchCount, 5000);
    return () => clearInterval(interval);
  }, [classroomId]);

  return (
    <div className="bg-black border border-green-400 rounded-lg p-4 font-mono mt-8 text-green-400">
      <h2 className="text-2xl font-bold mb-2">🎥  Views</h2>
      <p className="text-lg">
        👨‍🎓 {count} {count === 1 ? 'student is' : 'students are'} views
      </p>
    </div>
  );
}
