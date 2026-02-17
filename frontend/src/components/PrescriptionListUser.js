import React from 'react';
import '../CSS/PrescriptionListUser.css';

const PrescriptionListUser = ({ prescriptions }) => {
  if (prescriptions.length === 0) {
    return (
      <div className="empty-state-user">
        <p>No prescriptions found for your account.</p>
      </div>
    );
  }

  return (
    <div className="prescription-card-user">
      <div className="prescription-list-user-header">
        <h2 className="prescription-list-user-title">Your Medication List</h2>
      </div>
      
      <div className="prescription-list-user-container">
        <table className="prescription-table-user">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={prescription._id || index}>
                <td className="medication-cell-user">{prescription.medication}</td>
                <td className="dosage-cell-user">{prescription.dosage}</td>
                <td className="instructions-cell-user">{prescription.instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionListUser;