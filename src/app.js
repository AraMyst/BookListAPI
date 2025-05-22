// src/app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Mount book routes under /books
app.use('/books', booksRouter);

// Basic health-check endpoint
app.get('/', (req, res) => {
  res.send('BookListAPI is up and running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
