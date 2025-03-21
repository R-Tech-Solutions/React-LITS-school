import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react'; // Import the Trash2 icon from Lucide React

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/mail/contact-submissions') // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmissions(data.contactSubmissions);
        } else {
          setError('Failed to fetch submissions');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching submissions');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submissions</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Mobile</th>
            <th style={styles.tableHeader}>Address</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Gender</th>
            <th style={styles.tableHeader}>Guardian Name</th>
            <th style={styles.tableHeader}>Guardian Relation</th>
            <th style={styles.tableHeader}>Guardian Mobile</th>
            <th style={styles.tableHeader}>Class</th>
            <th style={styles.tableHeader}>Section</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} style={styles.tableRow}>
              <td style={styles.tableCell}>{submission.firstName} {submission.lastName}</td>
              <td style={styles.tableCell}>{submission.email}</td>
              <td style={styles.tableCell}>{submission.mobile}</td>
              <td style={styles.tableCell}>{submission.address}</td>
              <td style={styles.tableCell}>{submission.dob}</td>
              <td style={styles.tableCell}>{submission.gender}</td>
              <td style={styles.tableCell}>{submission.guardianName}</td>
              <td style={styles.tableCell}>{submission.guardianRelation}</td>
              <td style={styles.tableCell}>{submission.guardianMobile}</td>
              <td style={styles.tableCell}>{submission.classValue}</td>
              <td style={styles.tableCell}>{submission.sectionValue}</td>
              <td style={styles.tableCell}>
                <Trash2 
                  onClick={() => handleDelete(submission._id)} 
                  style={styles.deleteIcon}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id) {
    fetch(`http://localhost:3001/api/mail/contact-submissions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmissions(submissions.filter((submission) => submission._id !== id));
        } else {
          console.error('Failed to delete submission');
        }
      })
      .catch((error) => {
        console.error('Error deleting submission:', error);
      });
  }
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'hidden', // Added overflowX: 'hidden'
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    overflowX: 'hidden',
  },
  tableHeaderRow: {
    backgroundColor: '#4CAF50',
    color: 'white',
    overflowX: 'hidden',
  },
  tableHeader: {
    padding: '12px 15px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    overflowX: 'hidden',
  },
  tableCell: {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid #ddd',
    overflowX: 'hidden',
  },
  deleteIcon: {
    cursor: 'pointer',
    color: '#FF4D4D',
    fontSize: '20px',
    transition: 'color 0.3s',
    overflowX: 'hidden',
  },
};

export default SubmissionsList;
