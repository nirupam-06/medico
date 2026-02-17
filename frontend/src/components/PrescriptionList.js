import React from 'react';
import '../CSS/PrescriptionList.css';

const PrescriptionList = ({ prescriptions, onPrescriptionEdit, onPrescriptionDelete, loading = false }) => {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        Loading prescriptions...
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="empty-state">
        <p>No prescriptions found</p>
        <p>Add a new prescription using the form</p>
      </div>
    );
  }

  return (
    <div className="prescription-list-container">
      <table className="prescription-table">
        <thead>
          <tr>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Instructions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td className="medication-cell">{prescription.medication}</td>
              <td className="dosage-cell">{prescription.dosage}</td>
              <td className="instructions-cell">{prescription.instructions}</td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button
                    onClick={() => onPrescriptionEdit(prescription)}
                    className="btn-edit"
                    aria-label={`Edit ${prescription.medication} prescription`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onPrescriptionDelete(prescription._id)}
                    className="btn-delete"
                    aria-label={`Delete ${prescription.medication} prescription`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionList;