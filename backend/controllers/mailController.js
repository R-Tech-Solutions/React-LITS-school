const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (req, res) => {
    try {
        const { formData } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Use 587 if not using SSL
            secure: true, // Set to false if using port 587
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.RECEIVER_EMAIL, // Can be a fixed email or dynamic
            subject: 'New Admission Form Submission',
            text: `Form Details: \n\n ${JSON.stringify(formData, null, 2)}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
};

module.exports = { sendMail };
