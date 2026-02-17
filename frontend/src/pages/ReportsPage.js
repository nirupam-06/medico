import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../CSS/Reports.css';

const ReportsPage = () => {
  const { uid, role } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [reports, setReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const fetchReports = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_URI}/api/reports/by-uid/${uid}`);
      setReports(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setMessage({ text: 'Failed to load reports', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setMessage({ text: 'Please provide both file and report name', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('originalFileName', file.name);

    try {
      await axios.post(`${process.env.REACT_APP_URI}/api/reports/by-uid/${uid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Report uploaded successfully', type: 'success' });
      setFile(null);
      setName('');
      document.getElementById('file-input').value = '';
      fetchReports();
    } catch (err) {
      console.error('Error adding report:', err);
      setMessage({ text: 'Error adding report', type: 'error' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name && !file) {
      setMessage({ text: 'Provide at least a name or new file to update', type: 'error' });
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (name) formData.append('name', name);

    try {
      await axios.put(
        `${process.env.REACT_APP_URI}/api/reports/by-uid/${uid}/${editingReportId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage({ text: 'Report updated successfully', type: 'success' });
      setFile(null);
      setName('');
      setEditingReportId(null);
      document.getElementById('file-input').value = '';
      fetchReports();
    } catch (err) {
      console.error('Error updating report:', err);
      setMessage({ text: 'Error updating report', type: 'error' });
    }
  };

  const handleEdit = (report) => {
    setEditingReportId(report._id);
    setName(report.name);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_URI}/api/reports/by-uid/${uid}/${id}`);
      setMessage({ text: 'Report deleted successfully', type: 'success' });
      fetchReports();
    } catch (err) {
      console.error('Error deleting report:', err);
      setMessage({ text: 'Error deleting report', type: 'error' });
    }
  };

  useEffect(() => {
    fetchReports();
  }, [uid]);

  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <div className="reports-container">
      <div className="reports-content">
        <div className="reports-header">
          <h1 className="reports-title">Medical Reports</h1>
          <p className="reports-subtitle">Upload and manage your medical reports</p>
          <div className="patient-badge">
            <UserIcon />
            Patient ID: {uid}
          </div>
        </div>
        
        <div className="reports-card">
          {message.text && (
            <div className={`message ${message.type}-message`}>
              {message.text}
            </div>
          )}

          {/* Upload / Update form */}
          <form onSubmit={editingReportId ? handleUpdate : handleSubmit} className="report-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Report File</label>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Report Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter report name"
                  className="text-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingReportId ? 'Update Report' : 'Add Report'}
              </button>
              
              {editingReportId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReportId(null);
                    setName('');
                    setFile(null);
                    document.getElementById('file-input').value = '';
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="reports-section">
            <h2 className="section-title">Existing Reports</h2>
            
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                Loading reports...
              </div>
            ) : reports.length === 0 ? (
              <div className="empty-state">
                <p>No reports found. Upload your first report above.</p>
              </div>
            ) : (
              <div className="reports-list">
                {reports.map((report) => (
                  <div key={report._id} className="report-item">
                    <div className="report-info">
                      <div className="report-name">{report.name || 'Untitled Report'}</div>
                      
                    </div>
                    
                    <div className="report-actions">
                      <button 
                        onClick={() => handleEdit(report)}
                        className="btn-action btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(report._id)}
                        className="btn-action btn-delete"
                      >
                        Delete
                      </button>
                      <a
                        href={`${process.env.REACT_APP_URI}/api/reports/file/${encodeURIComponent(report.fileName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-open"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;