import express from 'express';
import authenticateJWT from '../middleware/auth.js';
import { createOrder, getUserOrders } from '../controller/order.controller.js';

const router = express.Router();
// Create order (authenticated)
router.post('/', authenticateJWT, createOrder)

// Get orders for logged in user
router.get('/', authenticateJWT, getUserOrders);

export default router;
