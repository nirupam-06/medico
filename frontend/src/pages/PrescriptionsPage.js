import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import PrescriptionList from '../components/PrescriptionList';
import '../CSS/Prescription.css';

const Prescriptions = () => {
  const { uid } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [formData, setFormData] = useState({
    uid: uid,
    medication: '',
    dosage: '',
    instructions: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_URI}/api/prescriptions/by-uid/${uid}`);
        setPrescriptions(response.data);
      } catch (error) {
        setMessage({ text: 'Error fetching prescription data', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchPrescriptions();
    }
  }, [uid]);

  useEffect(() => {
    if (editingPrescription) {
      setFormData({
        uid: editingPrescription.uid,
        medication: editingPrescription.medication,
        dosage: editingPrescription.dosage,
        instructions: editingPrescription.instructions
      });
    }
  }, [editingPrescription]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingPrescription) {
        await axios.put(`${process.env.REACT_APP_URI}/api/prescriptions/by-uid/${uid}`, formData);
        setPrescriptions(prescriptions.map(prescription =>
          prescription._id === editingPrescription._id ? { ...prescription, ...formData } : prescription
        ));
        setMessage({ text: 'Prescription updated successfully!', type: 'success' });
        setEditingPrescription(null);
      } else {
        const response = await axios.post(`${process.env.REACT_APP_URI}/api/prescriptions/by-uid/${uid}`, formData);
        setPrescriptions([...prescriptions, response.data]);
        setMessage({ text: 'Prescription added successfully!', type: 'success' });
      }
      resetForm();
    } catch (error) {
      setMessage({ text: 'Error saving prescription', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const resetForm = () => {
    setFormData({
      uid: uid,
      medication: '',
      dosage: '',
      instructions: ''
    });
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_URI}/api/prescriptions/by-uid/${uid}`);
        setPrescriptions(prescriptions.filter(prescription => prescription._id !== id));
        setMessage({ text: 'Prescription deleted successfully!', type: 'success' });
      } catch (error) {
        setMessage({ text: 'Error deleting prescription', type: 'error' });
      }
    }
  };

  return (
    <div className="prescriptions-container">
      <div className="prescriptions-content">
        <div className="prescriptions-header">
          <h1 className="prescriptions-title">Manage Prescriptions</h1>
          <p className="prescriptions-subtitle">Add, edit, and manage patient prescriptions</p>
        </div>
        
        {message.text && (
          <div className={`message ${message.type === 'success' ? 'success-message' : 'error-message'}`}>
            {message.text}
          </div>
        )}
        
        <div className="prescriptions-layout">
          {/* Prescription List Section */}
          <div className="prescriptions-card">
            <h2>Prescription List</h2>
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                Loading prescriptions...
              </div>
            ) : prescriptions.length === 0 ? (
              <div className="empty-state">
                <p>No prescriptions found. Add your first prescription below.</p>
              </div>
            ) : (
              <PrescriptionList 
                onPrescriptionEdit={handleEdit} 
                onPrescriptionDelete={handleDelete} 
                prescriptions={prescriptions} 
              />
            )}
          </div>
          
          {/* Add/Edit Prescription Section */}
          <div className="prescriptions-card">
            <h2>{editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}</h2>
            <form onSubmit={handleSubmit} className="prescriptions-form">
              <div className="form-group">
                <label className="form-label">Medication</label>
                <input
                  type="text"
                  className="form-input"
                  name="medication"
                  value={formData.medication}
                  onChange={handleInputChange}
                  placeholder="Enter medication name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Dosage</label>
                <input
                  type="text"
                  className="form-input"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="Enter dosage (e.g., 500mg, 2 tablets)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Instructions</label>
                <textarea
                  className="form-input"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  placeholder="Enter detailed instructions for use"
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingPrescription ? 'Update Prescription' : 'Add Prescription')}
                </button>
                
                {editingPrescription && (
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => {
                      setEditingPrescription(null);
                      resetForm();
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;