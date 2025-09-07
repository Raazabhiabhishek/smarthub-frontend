import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        {/* You can add a navigation bar here later */}
        <nav>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirects to login page by default */}
          <Route path="/" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;