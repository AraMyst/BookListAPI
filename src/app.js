// src/app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Health-check endpoint
app.get('/', (req, res) => {
  res.send('BookListAPI is up and running');
});

// Mount our /books routes
app.use('/books', booksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to MongoDB Atlas, then start the server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
