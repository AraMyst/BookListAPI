// routes/books.js

const express = require('express');
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/book');

const router = express.Router();

// POST   /books      → create a new book
router.post('/', createBook);

// GET    /books      → list all books
router.get('/', getAllBooks);

// GET    /books/:id  → get a single book by ID
router.get('/:id', getBookById);

// PUT    /books/:id  → update a book by ID
router.put('/:id', updateBook);

// DELETE /books/:id  → delete a book by ID
router.delete('/:id', deleteBook);

module.exports = router;
