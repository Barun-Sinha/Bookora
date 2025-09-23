import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Author from '../models/author.model.js';

// controller to get all users with optional role filter
export const getAllUsers = async(req, res)=>{
    try {
    const role = req.query.role;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// controller to search users by email or username

export const searchUsers = async(req, res)=>{
    try {
    const query = req.query.query || '';
    if (!query) return res.json([]);
    console.log('Search query:', query);

    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');

    res.json(users);
  } catch (err) {
    console.error('User search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// 3. Update user role (make user admin/author/customer)
export const updateUserRole = async(req, res)=>{
    try {
    const { role } = req.body;
    if (!['customer', 'author', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: `Role updated to ${role}`, user });
  } catch (err) {
    console.error('Error updating role:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

//delete user

export const deleteUser = async(req, res)=>{
    try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

//Get all authors
export const getAllAuthors = async (req, res) => {
    try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

//delete author

export const deleteAuthor = async(req, res)=>{
    try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    
    res.json({ message: 'Author deleted successfully' })
  } catch (err) {
    console.error('Error deleting author:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

//fetch all books
//need to think about it as we already have a route to fetch all books in book.routes.js

//create book - admin version.
//route is already there in book.routes.js

//update book - admin version

//delete book - admin version

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
    
        res.json({ message: 'Book deleted successfully' });
      } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Server error' });
      }
};

//trying to fix the castError 

//controller to get user by id

export const getUserById = async(req, res)=>{
    try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
}