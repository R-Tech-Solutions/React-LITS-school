// controllers/contactController.js

const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a transporter using your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address (sender)
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Compose the email message
  const mailOptions = {
    from: email, // Send from the user's email address
    to: process.env.EMAIL_USER, // Send to the admin email address
    subject: 'New Message from Contact Us Form',
    text: `
      You have received a new message from:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  // Send the email to the admin
  try {
    await transporter.sendMail(mailOptions);

    // Send a confirmation email back to the user
    const userConfirmationMail = {
      from: process.env.EMAIL_USER, // Send from your email address
      to: email, // Send to the user's email address
      subject: 'Thank you for contacting us',
      text: `
        Dear ${name},
        
        Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
        
        Best regards,
        The Team
      `,
    };

    await transporter.sendMail(userConfirmationMail);

    // Respond back with success
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email. Please try again later.' });
  }
};

module.exports = { sendEmail };
