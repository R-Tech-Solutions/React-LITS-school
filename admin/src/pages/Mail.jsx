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
    <div>
      <h2>Submissions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Date</th>
            <th>Gender</th>
            <th>Guardian Name</th>
            <th>Guardian Relation</th>
            <th>Guardian Mobile</th>
            <th>Class</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.firstName} {submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.mobile}</td>
              <td>{submission.address}</td>
              <td>{submission.dob}</td>
              <td>{submission.gender}</td>
              <td>{submission.guardianName}</td>
              <td>{submission.guardianRelation}</td>
              <td>{submission.guardianMobile}</td>
              <td>{submission.classValue}</td>
              <td>{submission.sectionValue}</td>
              <td>
                <Trash2 onClick={() => handleDelete(submission._id)} style={{ cursor: 'pointer' }} />
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

export default SubmissionsList;
