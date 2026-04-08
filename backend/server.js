const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const partRoutes = require('./src/routes/part.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carPartsTracker';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Car Parts Tracker API is running' });
});

app.use('/parts', partRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
