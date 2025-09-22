import Author from '../models/author.model.js';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';


//create author (existing user)
export const createAuthor = async (req, res) => {
    try {
    const { name, bio, birthDate, nationality } = req.body;
    const userId = req.user._id; // comes from authenticateJWT

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow customers to register as authors
    if (user.role !== 'customer') {
      return res.status(400).json({ message: 'Only customers can register as authors' });
    }

    // Check if an author profile already exists for this user
    const existingAuthor = await Author.findOne({ user: userId });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author profile already exists' });
    }

    // Create author profile linked to user
    const author = new Author({
      user: userId, // reference to User
      name,
      bio,
      birthDate,
      nationality,
    });

    await author.save();

    // Update user role to author
    user.role = 'author';
    await user.save();

    res.status(201).json({
      message: 'Author profile created successfully',
      author,
    });
  } catch (err) {
    console.error('Error creating author:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

//// GET /api/authors/search?query=someText

export const searchAuthors = async (req, res) => {
  
  const query = (req.query.query || '').trim();

  try {
    if (!query) {
      return res.json([]);
    }

    const authors = await User.find({
      role: 'author',
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id username fullName email')
    .limit(10); 

    res.json(authors);
  } catch (err) {
    console.error('Author search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}


/**
 * GET /api/books/my-books
 * Returns all books created by the logged-in author
 */

export const getMyBooks = async (req, res) => {
    try {
    const authorId = req.user._id;

    const books = await Book.find({ authors: authorId })
      .populate('authors', 'username fullName email')
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (err) {
    console.error('Error fetching author books:', err);
    res.status(500).json({ message: 'Server error' });
  }
}