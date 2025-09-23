import express from 'express';
import { getAllBooks, getBookById , createBook, deleteBookByAuthor , uploadBookCover , uploadPreviewPages, updateBook} from '../controller/book.controller.js';
import authenticateJWT from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';
import upload from '../config/multer.js'

const router = express.Router();

//get all books with optional filters
router.get('/', getAllBooks);

//Public: Get a single book by ID
router.get('/:id', getBookById);

//protected: create a new book
router.post('/', authenticateJWT, authorizeRoles('admin', 'author'), createBook);

//protected: update a book
router.put('/:id',authenticateJWT, authorizeRoles('author'),updateBook);

//Delete book by Author
router.delete('/:id', authenticateJWT, authorizeRoles('author'), deleteBookByAuthor);

//upload book cover image
router.put('/:id/cover', authenticateJWT, upload.single('coverImage'), uploadBookCover);

//upload book preview pages
router.put('/:id/previews', authenticateJWT, upload.array('previewPages', 5), uploadPreviewPages);

export default router;