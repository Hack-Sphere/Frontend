import React, { useEffect, useState } from 'react';
import API from '../utils/auth';
import { Link } from 'react-router-dom';

export default function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    API.get('/api/v2/teacher/classrooms/')
      .then(res => setClassrooms(res.data))
      .catch(err => console.error('Failed to fetch classrooms', err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Your Virtual Classrooms</h1>

      {classrooms.length === 0 ? (
        <p>No classrooms found. Create one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-green-600 rounded">
            <thead>
              <tr className="bg-green-900 text-left">
                <th className="p-3 border-b border-green-700">Title</th>
                <th className="p-3 border-b border-green-700">PIN</th>
                <th className="p-3 border-b border-green-700">Status</th>
                <th className="p-3 border-b border-green-700">Created</th>
                <th className="p-3 border-b border-green-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map(cls => (
                <tr key={cls.id} className="hover:bg-green-800 transition">
                  <td className="p-3">{cls.title}</td>
                  <td className="p-3">{cls.pin_code}</td>
                  <td className="p-3">
                    {cls.is_active ? (
                      <span className="text-green-300">🟢 Active</span>
                    ) : (
                      <span className="text-gray-400">⚪ Inactive</span>
                    )}
                  </td>
                  <td className="p-3">{new Date(cls.created_at).toLocaleDateString()}</td>
                  <td className="p-3 space-x-4">
                    <Link to={`/classroom/${cls.id}`} className="text-green-300 underline hover:text-green-200">
                      View
                    </Link>
                    <Link to={`/attendance/${cls.id}`} className="text-green-300 underline hover:text-green-200">
                      Students
                    </Link>
                    <Link to={`/quiz-results/${cls.id}`} className="text-green-300 underline hover:text-green-200">
                      Quiz
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
