import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ReportsUser.css';

const UserReports = ({ uid }) => {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URI}/api/reports/by-uid/${uid}`);
      setReports(response.data);
      if (response.data.length === 0) {
        setMessage({ text: 'No reports available for your account.', type: 'info' });
      } else {
        setMessage({ text: '', type: '' });
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setMessage({ text: 'Error fetching reports. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
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

  const FileIcon = () => (
    <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="user-reports-container">
      <div className="user-reports-content">
        <div className="user-reports-header">
          <h1 className="user-reports-title">Your Medical Reports</h1>
          <p className="user-reports-subtitle">Access and view your medical reports</p>
          <div className="patient-info-badge">
            <UserIcon />
            Patient ID: {uid}
          </div>
        </div>
        
        <div className="user-reports-card">
          {message.text && (
            <div className={`message ${message.type}-message`}>
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="empty-state">
              <p>No Reports Available</p>
              <p>Your medical reports will appear here once they are available.</p>
            </div>
          ) : (
            <div className="reports-section">
              <h2 className="section-title">Your Reports</h2>
              <div className="reports-list">
                {reports.map((report) => (
                  <div key={report._id} className="report-item">
                    <div className="report-info">
                      <div className="report-name">
                        {report.name || report.originalFileName || 'Medical Report'}
                      </div>
                      {report.originalFileName && report.originalFileName !== report.name && (
                        <div className="report-file-name">
                          File: {report.originalFileName}
                        </div>
                      )}
                    </div>
                    
                    <div className="report-actions">
                      <a
                        href={`${process.env.REACT_APP_URI}/api/reports/file/${encodeURIComponent(report.fileName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-open"
                      >
                        <FileIcon />
                        Open
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReports;