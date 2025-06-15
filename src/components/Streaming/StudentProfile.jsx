import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../utils/auth';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ for redirection

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    date_of_birth: '',
    phone_number: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };

    API.get('/api/student/profile/', { headers }).then(res => {
      setProfile(res.data);
      setFormData({
        date_of_birth: res.data.date_of_birth || '',
        phone_number: res.data.phone_number || '',
        image: null,
      });
      if (res.data.image) {
        setImagePreview(res.data.image);
        localStorage.setItem('profileImage', res.data.image); // ✅ Store image URL for reuse
      }
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const data = new FormData();
    data.append('date_of_birth', formData.date_of_birth);
    data.append('phone_number', formData.phone_number);
    if (formData.image) data.append('image', formData.image);

    try {
      const res = await API.put('/api/student/profile/', data, { headers });
      setProfile(res.data);

      if (res.data.image) {
        setImagePreview(res.data.image);
        localStorage.setItem('profileImage', res.data.image); // ✅ Update stored image
      }

      // ✅ Redirect after successful update
      navigate('/student-dashboard');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="bg-black text-green-400 p-8 min-h-screen font-mono">
      <h1 className="text-3xl mb-6">👤 Profile Settings</h1>
      <div className="flex items-center space-x-4 mb-6">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
          />
        ) : (
          <FaUserCircle className="text-6xl text-green-400" />
        )}
        <label className="text-sm cursor-pointer hover:underline">
          Change Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full bg-black border border-green-500 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full bg-black border border-green-500 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
