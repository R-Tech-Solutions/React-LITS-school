const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1gb' })); // Support for Base64 image uploads
app.use(express.urlencoded({ limit: '1gb', extended: true })); // Support for form data

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
const visionMissionRoutes = require("./routes/visionMissionRoutes");
const heroTextRoutes = require("./routes/heroTextRoutes");
const heroImageRoutes = require("./routes/heroImageRoutes");
const footerRoutes = require("./routes/footerRoutes");
const blogRoutes = require('./routes/blogRoutes');
const galleryRoutes = require("./routes/galleryRoutes");

app.use('/api/mail', mailRoutes);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/subcourses", subCourseRoutes);
app.use('/api', contactRoutes);
app.use("/api/vision-mission", visionMissionRoutes);
app.use("/api/hero-text", heroTextRoutes);
app.use("/api/hero-image", heroImageRoutes);
app.use("/api/footer", footerRoutes);
app.use('/api/blog', blogRoutes);
app.use("/api/gallery", galleryRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
