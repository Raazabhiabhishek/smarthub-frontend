import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Define the async function to fetch data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };

        const [profileRes, coursesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/profile/', { headers }),
          axios.get('http://127.0.0.1:8000/api/my-courses/', { headers })
        ]);

        setUserProfile(profileRes.data);
        setMyCourses(coursesRes.data);

      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error('Dashboard fetch error:', err);
      }
    };

    // 2. Call the function
    fetchData();
  }, []); // The empty array [] means this effect runs only once

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!userProfile) return <div className="text-gray-500 text-center mt-10">Loading...</div>;

  const courseListTitle = userProfile.role === 'teacher' ? "Courses You Are Teaching" : "Your Enrolled Courses";

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome, {userProfile.username}!</p>
      </div>

      {userProfile.role === 'teacher' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Teacher Actions</h3>
          <Link to="/create-course">
            <button className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Create New Course
            </button>
          </Link>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{courseListTitle}</h3>
        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCourses.map(course => (
              <div key={course.id} className="border p-4 rounded-md">
                <h4 className="font-bold">{course.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You are not teaching or enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
// ```eof

// Once you save this, the error will be resolved, and your personalized dashboard should load correctly.