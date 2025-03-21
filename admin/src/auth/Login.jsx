import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginForm.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple client-side validation
    if (!email || !password) {
      setLoading(false);
      setError('Please fill in both fields.');
      return;
    }

    try {
      await onLogin(email, password); // Assume onLogin returns a promise
      setLoading(false);
      navigate('/'); // Redirect on successful login
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text" // Changed from "email" to "text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
