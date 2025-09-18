import express from 'express';
import Order from '../models/Order.js';
import Book from '../models/Book.js';
import authenticateJWT from '../middleware/auth.js';

const router = express.Router();
// Create order (authenticated)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items required' });
    }

    if (!shippingAddress || !shippingAddress.phone) {
      return res.status(400).json({ message: 'Recipient phone number is required in shipping address' });
    }

    // Calculate total and check stock
    let totalAmount = 0;
    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) return res.status(400).json({ message: `Book not found: ${item.bookId}` });
      if (book.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for book: ${book.title}` });
      }
      totalAmount += book.price * item.quantity;
    }

    // Reduce stock
    for (const item of items) {
      await Book.findByIdAndUpdate(item.bookId, { $inc: { stock: -item.quantity } });
    }

    // Create order items with price at purchase
    const orderItems = items.map(item => ({
      bookId: item.bookId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase || 0 // fallback if not provided
    }));

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders for logged in user
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.bookId', 'title price');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
