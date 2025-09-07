import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: 'student', // Default role
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('https://abhisheksharma07.pythonanywhere.com/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Make sure to send the role in the body
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role, 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join('\n');
        throw new Error(errorMessage || "Registration failed!");
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500">Join SmartHub Today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fields for username, email, password, confirm password */}
          <div>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <div>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <div>
            <input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>

          {/* NEW DROPDOWN FOR ROLE  */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;