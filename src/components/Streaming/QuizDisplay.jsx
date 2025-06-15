import React, { useEffect, useState } from 'react';
import API from '../utils/auth';
import { FaCheckCircle } from 'react-icons/fa';

export default function QuizDisplay({ classroomId }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!classroomId) return;

    API.get(`/api/v2/quiz/${classroomId}/`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else {
          console.warn('Unexpected quiz format:', res.data);
          setQuizzes([]);
        }
      })
      .catch(err => {
        console.error('Failed to load quizzes', err);
        setError('Failed to load quiz data.');
      });
  }, [classroomId]);

  const handleOptionChange = (quizId, value) => {
    setSelectedOptions(prev => ({ ...prev, [quizId]: value }));
  };

  const handleSubmit = async (quizId) => {
    if (!selectedOptions[quizId]) return;

    try {
      await API.post(`/api/v2/quiz/submit/`, {
        quiz: quizId,
        selected_option: selectedOptions[quizId]
      });
      setSubmitted(prev => ({ ...prev, [quizId]: true }));
    } catch (err) {
      console.error('Failed to submit answer', err);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">📝 Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="border border-green-400 p-4 rounded">
              <p className="font-bold mb-2">❓ {quiz.question}</p>

              <div className="space-y-2">
                {['A', 'B', 'C', 'D'].map(opt => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`quiz-${quiz.id}`}
                      value={opt}
                      checked={selectedOptions[quiz.id] === opt}
                      disabled={submitted[quiz.id]}
                      onChange={() => handleOptionChange(quiz.id, opt)}
                    />
                    <span>
                      {opt}. {quiz[`option_${opt.toLowerCase()}`]}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => handleSubmit(quiz.id)}
                disabled={submitted[quiz.id] || !selectedOptions[quiz.id]}
                className={`mt-3 px-4 py-1 rounded font-bold flex items-center gap-2
                  ${submitted[quiz.id]
                    ? 'bg-green-700 text-white'
                    : 'bg-green-400 text-black hover:bg-green-300'}`}
              >
                {submitted[quiz.id] ? (
                  <>
                    <FaCheckCircle /> Submitted
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Submit Answer
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
