const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support for Base64 image uploads

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error(err));

// Routes
const lecturerRoutes = require('./routes/lecturerRoutes');
const mailRoutes = require('./routes/mailRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subCourseRoutes = require("./routes/subCourseRoutes");
const contactRoutes = require('./routes/contactRoutes');


app.use('/api/mail', mailRoutes);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/subcourses", subCourseRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
