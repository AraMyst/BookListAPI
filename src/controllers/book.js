// controllers/book.js

const Book = require('../models/Book');
const { buildAmazonUrl, getRecommendations } = require('../services/amazon');

/**
 * Create a new book entry, including Amazon link and recommendations.
 */
const createBook = async (req, res) => {
  try {
    const { title, author, read = false } = req.body;
    const amazonUrl = buildAmazonUrl(title, author);
    const recommendations = await getRecommendations(author);

    const book = new Book({
      title,
      author,
      read,
      amazon: amazonUrl,
      recs: recommendations
    });
    await book.save();

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve all books in the database.
 */
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve a single book by its ID.
 */
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing book. If title or author changes, refresh Amazon link and recommendations.
 */
const updateBook = async (req, res) => {
  try {
    const { title, author, read } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (author !== undefined) updates.author = author;
    if (read !== undefined) updates.read = read;

    if (title || author) {
      updates.amazon = buildAmazonUrl(
        updates.title ?? (await Book.findById(req.params.id)).title,
        updates.author ?? (await Book.findById(req.params.id)).author
      );
      updates.recs = await getRecommendations(updates.author || (await Book.findById(req.params.id)).author);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a book by its ID.
 */
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
