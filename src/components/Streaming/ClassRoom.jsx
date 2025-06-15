import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/auth.js';
import StreamPlayer from './StreamPlayer';
import StudentJoins from './StudentJoins';
import QuizDisplay from './QuizDisplay';
import TeacherQuizResults from './TeacherQuizResults';
import ClassroomChat from './ClassroomChat';

export default function Classroom() {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    API.get(`/api/v2/classroom/${classroomId}/`)
      .then(res => setClassroom(res.data))
      .catch(err => {
        console.error("Error fetching classroom", err);
        if (err.response?.status === 401) {
          console.warn("⚠ Unauthorized - token expired?");
        }
        setError("Failed to load classroom.");
      });
  }, [classroomId]);

  // Check notifications for class end
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await API.get('/api/v2/notifications/');
        const ended = res.data.find(
          note => note.classroom === classroomId && note.type === 'class_ended'
        );
        if (ended) {
          alert('🔔 This class has ended. Redirecting you to dashboard.');
          navigate('/student-dashboard');
        }
      } catch (err) {
        console.error('Failed to check notifications:', err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [classroomId, navigate]);

  if (error) {
    return <div className="p-10 text-red-500 bg-black">{error}</div>;
  }

  if (!classroom) {
    return <div className="p-10 text-green-400 font-mono bg-black">Loading classroom...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {user?.role === 'teacher' && classroom.is_active && (
        <button
          onClick={async () => {
            try {
              await API.post(`/api/v2/classroom/${classroomId}/end/`);
              alert('✅ Class ended.');
              window.location.reload();
            } catch (err) {
              alert('❌ Failed to end class.');
            }
          }}
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-400 text-black rounded font-bold"
        >
          🛑 End Class
        </button>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Video and Details */}
        <div className="w-full md:w-2/3 p-6">
          <div className="bg-[#0a0a0a] rounded-xl shadow-lg border border-green-500 p-6">
            <h1 className="text-3xl font-bold mb-2">🎥 {classroom.title}</h1>
            <p className="mb-4 italic text-green-300">{classroom.description}</p>
            <StreamPlayer streamUrl={classroom.stream_url} />
            <StudentJoins classroomId={classroom.id} />
            <QuizDisplay classroomId={classroom.id} />
            {user?.role === 'teacher' && (
              <div className="mt-10">
                <TeacherQuizResults classroomId={classroom.id} />
              </div>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-1/3 p-6">
          <div className="sticky top-4 bg-[#0a0a0a] border border-green-500 rounded-xl p-4 h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">💬 Live Chat</h2>
            <ClassroomChat classroomId={classroom.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
