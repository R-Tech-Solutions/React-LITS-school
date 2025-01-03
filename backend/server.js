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

app.use('/api', mailRoutes);
app.use('/api/lecturers', lecturerRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
