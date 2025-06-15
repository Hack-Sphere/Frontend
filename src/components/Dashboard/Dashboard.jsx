import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaPlus, FaBars } from 'react-icons/fa';
import API from '../utils/auth';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // ✅ Good
    API.get('/api/v2/teacher/classrooms/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setClassrooms(res.data))
    .catch(err => console.error('Failed to load classrooms', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-green-400 font-mono">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-green-900 transition-all duration-300 p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{sidebarOpen && 'Hacksphere'}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-green-300">
            <FaBars />
          </button>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 hover:text-green-200">
            <FaChalkboardTeacher /> {sidebarOpen && 'Classrooms'}
          </li>
          <Link to="/students" className="flex items-center gap-2 hover:text-green-200">
            <FaUserGraduate /> {sidebarOpen && 'Students'}
          </Link>
          <Link to="/create-quiz">
          <li className="flex items-center gap-2 hover:text-green-200">
           📝 {sidebarOpen && 'CreateQuiz'}
          </li>
          </Link>
          <br></br>
          <Link to="/create-tutorial">
          <li className="flex items-center gap-3  hover:text-green-200">
           📚 {sidebarOpen && 'Tutorials'}
          </li>
          </Link>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Virtual Classrooms</h2>
          <Link
            to="/create-classroom"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400"
          >
            <FaPlus /> Create Classroom
          </Link>
        </div>

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
                      <span className="text-green-300">✅ Active</span>
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

      </div>
    </div>
  );
}
