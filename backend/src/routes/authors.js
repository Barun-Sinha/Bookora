import express from 'express';
import Author from '../models/Author.js';
import authenticateJWT from '../middleware/auth.js';

const router = express.Router();
// Public: Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Create author
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, bio, birthDate, nationality } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const author = new Author({ name, bio, birthDate, nationality });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
