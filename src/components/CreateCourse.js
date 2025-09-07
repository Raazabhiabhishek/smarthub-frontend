// frontend/src/components/CreateCourse.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('http://127.0.0.1:8000/api/courses/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Course created successfully!');
      navigate('/courses'); // Redirect to the course list
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course.');
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;