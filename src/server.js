const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
  }));
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
