import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AddPatient.css';

const Patients = () => {
  const [patientData, setPatientData] = useState({
    uid: '',
    name: '',
    age: '',
    gender: '',
    otherFields: {
      address: '',
      email: '',
      phone: '',
    }
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('otherFields')) {
      const fieldName = name.split('[')[1].split(']')[0];
      setPatientData({
        ...patientData,
        otherFields: {
          ...patientData.otherFields,
          [fieldName]: value
        }
      });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_URI}/api/patients`, patientData);
      setMessage({ text: 'Patient added successfully!', type: 'success' });
      resetForm();
    } catch (error) {
      setMessage({ 
        text: error.response ? error.response.data.message : 'Error adding patient', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPatientData({
      uid: '',
      name: '',
      age: '',
      gender: '',
      otherFields: {
        address: '',
        email: '',
        phone: '',
      }
    });
    setMessage({ text: '', type: '' });
  };

  // SVG Icons
  const UserIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const AgeIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const IdIcon = () => (
    <svg className="add-patient-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  );

  return (
    <div className="add-patient-container">
      <div className="add-patient-content">
        <div className="add-patient-header">
          <h2 className="add-patient-title">Patient Registration</h2>
          <p className="add-patient-subtitle">Complete all fields to register a new patient in the system</p>
        </div>

        {message.text && (
          <div className={`patients-message patients-${message.type}-message`}>
            <div className="patients-message-content">
              {message.text}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-patient-form">
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <IdIcon />
              PATIENT ID
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="text" 
                className="add-patient-input"
                name="uid" 
                value={patientData.uid}
                onChange={handleChange} 
                required 
                placeholder="PAT-001"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <UserIcon />
              FULL NAME
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="text" 
                className="add-patient-input"
                name="name" 
                value={patientData.name}
                onChange={handleChange} 
                required 
                placeholder="John Doe"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <AgeIcon />
              AGE
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="number" 
                className="add-patient-input"
                name="age" 
                value={patientData.age}
                onChange={handleChange} 
                required 
                placeholder="25"
                min="0"
                max="120"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              GENDER
            </label>
            <div className="add-patient-input-wrapper">
              <select 
                className="add-patient-form-select"
                name="gender" 
                value={patientData.gender}
                onChange={handleChange} 
                required
                disabled={isLoading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <LocationIcon />
              ADDRESS
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="text" 
                className="add-patient-input"
                name="otherFields[address]" 
                value={patientData.otherFields.address}
                onChange={handleChange} 
                placeholder="123 Main Street, City, State"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <EmailIcon />
              EMAIL
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="email" 
                className="add-patient-input"
                name="otherFields[email]" 
                value={patientData.otherFields.email}
                onChange={handleChange} 
                placeholder="john.doe@example.com"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <div className="add-patient-form-group">
            <label className="add-patient-form-label">
              <PhoneIcon />
              PHONE
            </label>
            <div className="add-patient-input-wrapper">
              <input 
                type="tel" 
                className="add-patient-input"
                name="otherFields[phone]" 
                value={patientData.otherFields.phone}
                onChange={handleChange} 
                placeholder="+1 (555) 123-4567"
                disabled={isLoading}
              />
              
            </div>
          </div>
          
          <button 
            type="submit" 
            className="add-patient-submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="add-patient-loading-content">
                <div className="add-patient-loading-spinner"></div>
                Processing...
              </div>
            ) : (
              'Register Patient'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Patients;