import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../CSS/Dashboard.css';

const Dashboard = () => {
  const { uid } = useParams();
  const [patient, setPatient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [updatingField, setUpdatingField] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (uid) {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_URI}/api/patients/${uid}`);
          const data = response.data.data ? response.data.data : response.data;
          setPatient(data);
          setUpdatedData({
            ...data,
            otherFields: data.otherFields || { address: '', email: '', phone: '' },
          });
        } catch (error) {
          console.error('Error fetching patient data:', error);
          setMessage({ 
            text: 'Error fetching patient data. Please try again.', 
            type: 'error' 
          });
          setPatient(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPatientData();
  }, [uid]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('otherFields')) {
      const fieldName = name.split('[')[1].slice(0, -1);
      setUpdatedData((prevData) => ({
        ...prevData,
        otherFields: {
          ...prevData.otherFields,
          [fieldName]: value,
        },
      }));
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleUpdateSubmit = async (field) => {
    setUpdatingField(field);
    try {
      let dataToSend;
      if (field.startsWith('otherFields.')) {
        const nestedField = field.split('.')[1];
        dataToSend = {
          otherFields: {
            ...updatedData.otherFields,
            [nestedField]: updatedData.otherFields[nestedField],
          },
        };
      } else {
        dataToSend = { [field]: updatedData[field] };
      }
      
      const response = await axios.put(`${process.env.REACT_APP_URI}/api/patients/${uid}`, dataToSend);
      if (response.status === 200) {
        setMessage({ text: 'Field updated successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        
        // Update local patient data
        setPatient(prev => ({
          ...prev,
          ...dataToSend
        }));
      }
    } catch (error) {
      setMessage({ 
        text: 'Error updating patient data. Please try again.', 
        type: 'error' 
      });
    } finally {
      setUpdatingField(null);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h3>Loading Patient Information</h3>
            <p>Retrieving data for patient ID: {uid}</p>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'error' && !patient) {
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="error-state">
            <h3>Unable to Load Patient Data</h3>
            <p>{message.text}</p>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>
              Patient ID: {uid}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!patient || Object.keys(patient).length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="no-data-state">
            <h3>No Patient Data Found</h3>
            <p>No patient information available for ID: {uid}</p>
            <div className="debug-info">
              <strong>Debug Information:</strong>
              <pre>{JSON.stringify(patient, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Patient Dashboard</h2>
          <p>Manage and update patient information</p>
          <div style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
            Patient ID: <strong>{uid}</strong>
          </div>
        </div>
        
        {message.text && (
          <div className={`status-message status-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="dashboard-card">
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              color: '#1e293b', 
              marginBottom: '1rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              Patient Information
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Update individual fields and save changes as needed
            </p>
          </div>

          <table className="dashboard-table">
            <tbody>
              <tr>
                <td>FULL NAME</td>
                <td>
                  <input 
                    type="text" 
                    className="dashboard-input"
                    name="name" 
                    value={updatedData.name || ''} 
                    onChange={handleUpdateChange} 
                    placeholder="Enter full name"
                  />
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('name')}
                    disabled={updatingField === 'name'}
                  >
                    {updatingField === 'name' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>AGE</td>
                <td>
                  <input 
                    type="number" 
                    className="dashboard-input"
                    name="age" 
                    value={updatedData.age || ''} 
                    onChange={handleUpdateChange} 
                    placeholder="Enter age"
                    min="0"
                    max="120"
                  />
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('age')}
                    disabled={updatingField === 'age'}
                  >
                    {updatingField === 'age' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>GENDER</td>
                <td>
                  <select 
                    className="dashboard-select"
                    name="gender" 
                    value={updatedData.gender || ''} 
                    onChange={handleUpdateChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('gender')}
                    disabled={updatingField === 'gender'}
                  >
                    {updatingField === 'gender' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>ADDRESS</td>
                <td>
                  <input
                    type="text"
                    className="dashboard-input"
                    name="otherFields[address]"
                    value={updatedData.otherFields?.address || ''}
                    onChange={handleUpdateChange}
                    placeholder="Enter full address"
                  />
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('otherFields.address')}
                    disabled={updatingField === 'otherFields.address'}
                  >
                    {updatingField === 'otherFields.address' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td>
                  <input
                    type="email"
                    className="dashboard-input"
                    name="otherFields[email]"
                    value={updatedData.otherFields?.email || ''}
                    onChange={handleUpdateChange}
                    placeholder="Enter email address"
                  />
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('otherFields.email')}
                    disabled={updatingField === 'otherFields.email'}
                  >
                    {updatingField === 'otherFields.email' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>PHONE</td>
                <td>
                  <input
                    type="tel"
                    className="dashboard-input"
                    name="otherFields[phone]"
                    value={updatedData.otherFields?.phone || ''}
                    onChange={handleUpdateChange}
                    placeholder="Enter phone number"
                  />
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleUpdateSubmit('otherFields.phone')}
                    disabled={updatingField === 'otherFields.phone'}
                  >
                    {updatingField === 'otherFields.phone' ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;