import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('User not authenticated');
          return;
        }
        
        const headers = { 'Authorization': `Bearer ${token}` };

        const [coursesRes, profileRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/courses/', { headers }),
          axios.get('http://127.0.0.1:8000/api/profile/', { headers })
        ]);
        
        setCourses(coursesRes.data);
        setUserRole(profileRes.data.role);

      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Data fetch error:', err);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://127.0.0.1:8000/api/courses/${courseId}/enroll/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Successfully enrolled!');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Enrollment failed.';
      alert(errorMessage);
      console.error('Enrollment error:', err.response);
    }
  };

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (courses.length === 0 && !error) return <div className="text-gray-500 text-center mt-10">Loading courses or no courses available.</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 my-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4"><em>Taught by: {course.teacher_username}</em></p>
              
              {userRole === 'student' && (
                <button 
                  onClick={() => handleEnroll(course.id)}
                  className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
