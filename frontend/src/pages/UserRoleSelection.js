import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../CSS/UserRoleSelection.css';

const UserRoleSelection = () => {
  const navigate = useNavigate();
  const { setRoleContext, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (role) => {
    setLoading(true);
    setRoleContext(role);
    localStorage.setItem('role', role);
    console.log("role: ", role);

    if (role === 'admin') {
      // Small delay for better UX
      setTimeout(() => {
        navigate('/login');
        setLoading(false);
      }, 500);
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URI}/api/auth/loginUser`);
        localStorage.setItem('token', response.data.token);
        login('user'); // Mark as logged in as user
        setTimeout(() => {
          navigate('/verify-uid');
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error logging in user:', error);
        setLoading(false);
      }
    }
  };

  const AdminIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <div className="role-selection-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="role-selection-content">
        <div className="role-selection-card">
          <div className="medical-brand">
            <div className="brand-text">Medico</div>
          </div>
          
          <div className="role-selection-header">
            <h1 className="role-selection-title">Welcome to Medico</h1>
            <p className="role-selection-subtitle">
              Choose your role to access the medico system. 
              Admins manage patient data while users can view their medical information.
            </p>
          </div>

          <div className="role-selection-grid">
            {/* Admin Card */}
            <div 
              className="role-card"
              onClick={() => handleRoleSelection('admin')}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleRoleSelection('admin')}
            >
              <div className="role-icon">
                <AdminIcon />
              </div>
              <h3 className="role-name">Healthcare Provider</h3>
              <p className="role-description">
                Access administrative tools to manage patient records, 
                prescriptions, and medical reports.
              </p>
              <ul className="role-features">
                <li>Manage patient information</li>
                <li>Create and edit prescriptions</li>
                <li>Upload medical reports</li>
                <li>Access all patient data</li>
              </ul>
            </div>

            {/* User Card */}
            <div 
              className="role-card"
              onClick={() => handleRoleSelection('user')}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleRoleSelection('user')}
            >
              <div className="role-icon">
                <UserIcon />
              </div>
              <h3 className="role-name">Patient</h3>
              <p className="role-description">
                View your personal medical information, 
                prescriptions, and reports in a secure portal.
              </p>
              <ul className="role-features">
                <li>View personal medical records</li>
                <li>Access your prescriptions</li>
                <li>Download medical reports</li>
                <li>Secure and private access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleSelection;