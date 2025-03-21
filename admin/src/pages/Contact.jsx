import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { backEndURL } from "../Backendurl";

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/contact-submissions`);
        setSubmissions(response.data.contactSubmissions);
      } catch (err) {
        setError('Error fetching contact submissions');
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backEndURL}/api/contact-submissions/${id}`);
      setSubmissions(submissions.filter(submission => submission._id !== id));
    } catch (err) {
      setError('Error deleting contact submission');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Form Submissions</h2>
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Phone</th>
            <th style={styles.tableHeader}>Message</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} style={styles.tableRow}>
              <td style={styles.tableCell}>{submission.name}</td>
              <td style={styles.tableCell}>{submission.email}</td>
              <td style={styles.tableCell}>{submission.phone}</td>
              <td style={styles.tableCell}>{submission.message}</td>
              <td style={styles.tableCell}>
                <button style={styles.deleteButton} onClick={() => handleDelete(submission._id)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1000px',
    margin: '20px auto',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
};

export default ContactSubmissions;
