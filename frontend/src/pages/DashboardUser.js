import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../CSS/DashboardUser.css';

const DashboardUser = () => {
  const { uid } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_URI}/api/patients/${uid}`);
        // Handle both response structures
        const data = response.data.data ? response.data.data : response.data;
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('Error fetching patient data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [uid]);

  if (loading) {
    return (
      <div className="user-dashboard-container">
        <div className="user-dashboard">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h3>Loading Patient Information</h3>
            <p>Retrieving your medical data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-dashboard-container">
        <div className="user-dashboard">
          <div className="error-state">
            <h3>Unable to Load Patient Data</h3>
            <p>{error}</p>
            <p >
              Patient ID: <strong>{uid}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!patient || Object.keys(patient).length === 0) {
    return (
      <div className="user-dashboard-container">
        <div className="user-dashboard">
          <div className="no-data-state">
            <h3>No Patient Data Found</h3>
            <p>No patient information available for your account.</p>
            <div style={{ marginTop: '1rem', color: '#64748b' }}>
              Patient ID: <strong>{uid}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard">
        <div className="user-dashboard-header">
          <h2>Patient Dashboard</h2>
          <p>Your complete medical information</p>
          <div className="patient-id-badge">
            Patient ID: {uid}
          </div>
        </div>
        
        <div className="user-dashboard-card">
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              color: '#1e293b', 
              marginBottom: '1rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Personal Information
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Your registered medical details
            </p>
          </div>

          <table className="user-patient-table">
            <tbody>
              <tr>
                <td>FULL NAME</td>
                <td>{patient.name || 'Not provided'}</td>
              </tr>
              <tr>
                <td>AGE</td>
                <td>{patient.age || 'Not provided'}</td>
              </tr>
              <tr>
                <td>GENDER</td>
                <td>{patient.gender || 'Not provided'}</td>
              </tr>
              <tr>
                <td>ADDRESS</td>
                <td>{patient.otherFields?.address || 'Not provided'}</td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td>{patient.otherFields?.email || 'Not provided'}</td>
              </tr>
              <tr>
                <td>PHONE</td>
                <td>{patient.otherFields?.phone || 'Not provided'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;