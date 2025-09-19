import express from 'express';
import Book from '../models/Book.js';
import authenticateJWT from '../middleware/auth.js';
import parser from '../config/multer.js'
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();
// Public: Get all books with optional filters
router.get('/', async (req, res) => {
  try {
    const { genre, author, title } = req.query;
    const filter = {};

    if (genre) filter.genre = genre;
    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.authorIds = author; // expects author id

    const books = await Book.find(filter).populate('authorIds', 'name');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

///Public: Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('authorIds', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Create a new book
router.post('/', authenticateJWT, authorizeRoles('author', 'admin'), async (req, res) => {
  try {
    console.log(req.body);
    const { title, authorIds, genre, price, stock, publishedDate, description, ISBN } = req.body;
    if (!title || !authorIds || !price || !stock) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const book = new Book({
      title,
      authorIds,
      genre,
      price,
      stock,
      publishedDate,
      description,
      ISBN
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'ISBN must be unique' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Update a book by ID
router.put('/:id', authenticateJWT, authorizeRoles('author', 'admin'), async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Delete a book by ID
router.delete('/:id', authenticateJWT, authorizeRoles('author', 'admin'), async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.findByIdAndDelete(bookId);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Upload cover image (single file)
router.post('/:id/cover', authenticateJWT, authorizeRoles('author', 'admin'), parser.single('coverImage'), async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Cloudinary URL is in req.file.path
    const coverImageUrl = req.file.path;

    const book = await Book.findByIdAndUpdate(bookId, { coverImageUrl }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Cover image uploaded', coverImageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload preview pages (multiple files)
router.post('/:id/previews', authenticateJWT, authorizeRoles('author', 'admin'), parser.array('previewPages', 10), async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No files uploaded' });

    const previewPagesUrls = req.files.map(file => file.path);

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.previewPagesUrls = book.previewPagesUrls ? book.previewPagesUrls.concat(previewPagesUrls) : previewPagesUrls;
    await book.save();

    res.json({ message: 'Preview pages uploaded', previewPagesUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;