// frontend/src/components/ContactSubmissions.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/contact-submissions'); // Adjust the URL if necessary
        setSubmissions(response.data.contactSubmissions);
      } catch (err) {
        setError('Error fetching contact submissions');
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contact-submissions/${id}`);
      setSubmissions(submissions.filter(submission => submission._id !== id));
    } catch (err) {
      setError('Error deleting contact submission');
    }
  };

  return (
    <div>
      <h2>Contact Form Submissions</h2>
      {error && <p>{error}</p>}
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>Name</th>
            <th style={{ border: '1px solid black' }}>Email</th>
            <th style={{ border: '1px solid black' }}>Phone</th>
            <th style={{ border: '1px solid black' }}>Message</th>
            <th style={{ border: '1px solid black' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td style={{ border: '1px solid black' }}>{submission.name}</td>
              <td style={{ border: '1px solid black' }}>{submission.email}</td>
              <td style={{ border: '1px solid black' }}>{submission.phone}</td>
              <td style={{ border: '1px solid black' }}>{submission.message}</td>
              <td style={{ border: '1px solid black' }}>
                <button onClick={() => handleDelete(submission._id)}>
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

export default ContactSubmissions;
