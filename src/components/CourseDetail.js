import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCourse(response.data);
      } catch (err) {
        setError('Failed to fetch course details.');
        console.error('Course detail fetch error:', err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!course) return <div className="text-gray-500 text-center mt-10">Loading course...</div>;

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h2>
      <p className="text-md text-gray-500 mb-6">Taught by: {course.teacher_username}</p>
      <div className="prose max-w-none">
        <p>{course.description}</p>
      </div>
    </div>
  );
}

export default CourseDetail;

