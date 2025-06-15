import React, { useEffect, useState } from 'react';
import API from '../utils/auth';

export default function TeacherQuizResults({ classroomId }) {
  const [results, setResults] = useState([]); // ✅ Always initialize as an array
  const [error, setError] = useState('');

  useEffect(() => {
    if (!classroomId) return;

    API.get(`/api/v2/quiz-results/${classroomId}/`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          console.warn('Unexpected results format:', res.data);
          console.log(res.data);
          setResults([]); // Fallback
        }
      })
      .catch(err => {
        console.error('Failed to fetch quiz results', err);
        setError('Could not load quiz results.');
      });
  }, [classroomId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">📊 Quiz Results</h3>
      {results.length === 0 ? (
        <p>No quiz results yet.</p>
      ) : (
        <table className="w-full border border-green-500">
          <thead>
            <tr className="bg-green-900">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Question</th>
              <th className="p-2 border">Answer</th>
              <th className="p-2 border">Correct</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index)  => (
              <tr key={index} className="border-t border-green-700">
                <td className="p-2">{result.student}</td>
                <td className="p-2">{result.question}</td>
                <td className="p-2">{result.your_answer}</td>
                <td className="p-2">{result.is_correct ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
