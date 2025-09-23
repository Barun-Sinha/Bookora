import express from 'express';
import { getAllUsers , searchUsers , updateUserRole , deleteUser, deleteBook, deleteAuthor, getUserById, getAllAuthors} from '../controller/admin.controller.js';
import authenticateJWT from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';
import { createBook, updateBook } from '../controller/book.controller.js';

const router = express.Router();

//User Management Routes

// admin route to get all users
router.get('/users', authenticateJWT, authorizeRoles('admin'), getAllUsers);

//admin route to get user by id
router.get('/users/:id', authenticateJWT, authorizeRoles('admin'), getUserById);

//search users by email or username
router.get('/users/search', authenticateJWT, authorizeRoles('admin'), searchUsers);

// update user role
router.patch('/users/:id/role', authenticateJWT, authorizeRoles('admin'), updateUserRole);

//delete user
router.delete('/users/:id', authenticateJWT, authorizeRoles('admin'), deleteUser);

//Author Management Routes

//get All authors
router.get('/authors', authenticateJWT, authorizeRoles('admin'), getAllAuthors);

//delete author
router.delete('/authors/:id', authenticateJWT, authorizeRoles('admin'), deleteAuthor);

//Book Management Routes

//create a book
router.post('/books',authenticateJWT,authorizeRoles('admin'), createBook);

//update a book
router.put('/books/:id', authenticateJWT, authorizeRoles('admin'), updateBook)

//delete book by id
router.delete('/books/:id', authenticateJWT, authorizeRoles('admin'), deleteBook)


export default router;
