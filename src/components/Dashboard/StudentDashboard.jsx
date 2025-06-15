import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaUser, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import API from '../utils/auth';
import { Link } from 'react-router-dom';
export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [activeClasses, setActiveClasses] = useState([]);
  const [joiningClass, setJoiningClass] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };

    API.get('/api/student/profile/', { headers }).then(res => setProfile(res.data));
    API.get('/api/v2/student/attendance/', { headers }).then(res => setAttendance(res.data));
    API.get('/api/v2/classroom/active/', { headers }).then(res => setActiveClasses(res.data));
  }, []);

  const handleJoinClick = (classroomId) => {
    setJoiningClass(classroomId);
    setPinCode('');
    setJoinError('');
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/v2/classroom/${joiningClass}/join/`, { pin_code: pinCode });
      navigate(`/classroom/${joiningClass}`);
    } catch (err) {
      setJoinError(err.response?.data?.detail || 'Failed to join class.');
    }
  };
  

  if (!profile) return <div className="text-green-400 p-8">Loading profile...</div>;

  return (
    <div className="flex bg-black text-green-400 font-mono min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0a0a0a] p-6 shadow-lg border-r border-green-500">
        <div className="text-2xl font-bold mb-10 text-green-500">🎓 Dashboard</div>
        <ul className="space-y-6 text-lg">
          <li className="flex items-center gap-3 hover:text-green-300 cursor-pointer">
            <FaChalkboardTeacher /> My Classes
          </li>
          <li className="flex items-center gap-3 hover:text-green-300 cursor-pointer">
            <FaCheckCircle /> Attendance
          </li>
          <Link to="/profile"
            className="flex items-center gap-3 hover:text-green-300 cursor-pointer"
            
          >
            <FaUser /> Update Profile
          </Link>
          <li className="flex items-center gap-3 hover:text-green-300 cursor-pointer">
            <FaSignOutAlt /> Logout
          </li>
          <Link to="/tutorials">
                   <li className="flex items-center gap-3 hover:text-green-300 cursor-pointer">
                     📚 Study-Materials
                    </li>
          </Link>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {profile.username}</h1>
          <div className="cursor-pointer" onClick={() => navigate('/profile')}>
            {profile.profile_image ? (
              <img src={profile.profile_image} alt="Profile" className="w-12 h-12 rounded-full border border-green-500" />
            ) : (
              <FaUser className="text-3xl" />
            )}
          </div>
        </div>

        {/* Active Classes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">👨‍🏫 Active Classes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {activeClasses.map((cls, i) => (
              <div key={i} className="border border-green-600 p-4 rounded-lg bg-[#111]">
                <h3 className="text-xl font-bold">{cls.title}</h3>
                <p className="text-sm">Instructor: {cls.teacher_name}</p>
                <button
                  className="mt-3 px-4 py-1 border border-green-400 hover:bg-green-700 transition"
                  onClick={() => handleJoinClick(cls.id)}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PIN Prompt Card */}
        {joiningClass && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <form
              onSubmit={handlePinSubmit}
              className="bg-black border border-green-500 p-6 rounded-xl w-full max-w-sm text-center"
            >
              <h1 className="text-2xl font-bold mb-4">🔐 Enter Class PIN</h1>
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="6-digit PIN"
                className="w-full bg-transparent border border-green-400 px-4 py-2 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="bg-green-400 text-black px-4 py-2 w-full rounded font-bold hover:bg-green-300"
              >
                Join Class
              </button>
              <button
                type="button"
                onClick={() => setJoiningClass(null)}
                className="mt-3 text-sm text-green-300 hover:underline"
              >
                Cancel
              </button>
              {joinError && <p className="text-red-400 mt-3">{joinError}</p>}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
