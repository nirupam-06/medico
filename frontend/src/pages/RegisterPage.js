import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_URI}/api/auth/register`, { 
        name, 
        email, 
        password 
      });
      
      console.log('Registration successful', response.data);
      
      if (response.status === 201) {
        // Show success message and redirect
        setError(''); // Clear any previous errors
        alert("Successfully Registered! Redirecting to login...");
        navigate('/Login');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please check your connection and try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    return 'strong';
  };

  const passwordStrength = getPasswordStrength(password);

  const MedicalIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-card">
          <div className="medical-icon">
            <div className="icon-wrapper">
              <MedicalIcon />
            </div>
          </div>
          
          <div className="register-header">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join our portal today</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a secure password"
                disabled={loading}
                minLength="6"
              />
              {password && (
                <div className={`password-strength strength-${passwordStrength}`}>
                  Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="login-section">
              <p className="login-text">
                Already have an account?{' '}
                <a 
                  href="/Login" 
                  className="login-link"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;