// controllers/book.js

const Book = require('../models/Book');
const { buildAmazonUrl, getRecommendations } = require('../services/amazon');

/**
 * Create a new book entry, using an Amazon UK search link by default,
 * unless the client provides a direct book URL.
 */
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      read = false,
      amazon: amazonInput
    } = req.body;

    // Use direct URL if provided, otherwise build a UK search URL
    const amazonUrl = amazonInput ||
      buildAmazonUrl(title, author, { region: 'uk', type: 'search' });

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
 * Update an existing book.  
 * Priority for Amazon link:
 * 1. If client supplies a direct URL, use it.
 * 2. Else if title or author changed, rebuild UK search link.
 * Recommendations are refreshed only if author changes.
 */
const updateBook = async (req, res) => {
  try {
    // Fetch current record
    const existing = await Book.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const {
      title,
      author,
      read,
      amazon: amazonInput
    } = req.body;

    const updates = {};

    if (title !== undefined)  updates.title  = title;
    if (author !== undefined) updates.author = author;
    if (read !== undefined)   updates.read   = read;

    // Determine Amazon URL
    if (amazonInput !== undefined) {
      // client provided a direct link
      updates.amazon = amazonInput;
    } else if (title !== undefined || author !== undefined) {
      // rebuild search link using new or existing title/author
      const newTitle  = updates.title  || existing.title;
      const newAuthor = updates.author || existing.author;
      updates.amazon = buildAmazonUrl(newTitle, newAuthor, { region: 'uk', type: 'search' });
    }

    // Refresh recommendations if author changed
    if (author !== undefined) {
      const recAuthor = updates.author || existing.author;
      updates.recs = await getRecommendations(recAuthor);
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

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
