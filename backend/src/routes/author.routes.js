import express from 'express';
import authenticateJWT from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';
import { createAuthor, getMyBooks, searchAuthors } from '../controller/author.controller.js';

const router = express.Router();

// Protected: Create author
router.post('/', authenticateJWT, createAuthor);

// GET /api/authors/search?query=someText

router.get('/search', authenticateJWT, searchAuthors);


/**
 * GET /api/books/my-books
 * Returns all books created by the logged-in author
 */
router.get('/my-books', authenticateJWT, authorizeRoles('author'), getMyBooks);

export default router;
