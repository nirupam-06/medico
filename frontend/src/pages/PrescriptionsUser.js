import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrescriptionList from '../components/PrescriptionListUser';
import '../CSS/PrescriptionUser.css';

const UserPrescriptions = ({ uid }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URI}/api/prescriptions/by-uid/${uid}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setMessage({ 
          text: 'Error fetching prescriptions. Please try again later.', 
          type: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchPrescriptions();
    }
  }, [uid]);

  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <div className="user-prescriptions-container">
      <div className="user-prescriptions-content">
        <div className="user-prescriptions-header">
          <h1 className="user-prescriptions-title">Your Prescriptions</h1>
          <p className="user-prescriptions-subtitle">View your current medication prescriptions</p>
          <div className="patient-info-badge">
            <UserIcon />
            Patient ID: {uid}
          </div>
        </div>
        
        <div className="user-prescriptions-card">
          {message.text && (
            <div className={`message ${message.type}-message`}>
              {message.text}
            </div>
          )}
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your prescriptions...</p>
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="no-data-state">
              <p>No Prescriptions Found</p>
              <p>Please contact your healthcare provider if you believe this is an error.</p>
            </div>
          ) : (
            <PrescriptionList prescriptions={prescriptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPrescriptions;