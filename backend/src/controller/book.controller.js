import Book from '../models/book.model.js';
import User from '../models/user.model.js';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

//get all books with optional filters
export const getAllBooks = async(req, res)=>{
    try {
        const { genre, author, title } = req.query;
        const filter = {};
    
        if (genre) filter.genre = genre;
        if (title) filter.title = new RegExp(title, 'i');
        if (author) filter.authors = author; // expects author id
    
        const books = await Book.find(filter).populate('authors', 'name');
        res.json(books);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
};

//get a single book by ID
export const getBookById = async(req, res)=>{
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId).populate('authors', 'name');
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}

//protected:- create a new book
export const createBook = async(req, res)=>{
    try {
        console.log(req.body);
        const {
          title,
          coAuthorIdentifiers = [], // usernames/emails provided for co-authors
          genre,
          price,
          stock,
          publishedDate,
          description,
          ISBN
        } = req.body;
    
        // Validate required fields
        if (!title || !price || !stock) {
          return res.status(400).json({ message: 'Missing required fields: title, price, or stock' });
        }
    
        // Collect author IDs array
        const authorIds = [];
    
        // If creator is an author, add their ID automatically
        if (req.user.role === 'author') {
          authorIds.push(req.user._id.toString());
        }
    
        // If admin is creating the book → admin’s ID should NOT be included
        // Instead, they only provide author emails/usernames
    
        // Find co-authors from identifiers (username/email)
        if (Array.isArray(coAuthorIdentifiers) && coAuthorIdentifiers.length > 0) {
          const coAuthors = await User.find({
            $or: [
              { email: { $in: coAuthorIdentifiers } },
              { username: { $in: coAuthorIdentifiers } }
            ],
            role: 'author'
          }).select('_id');
    
          if (coAuthors.length !== coAuthorIdentifiers.length) {
            return res.status(400).json({ message: 'One or more co-authors are not registered authors' });
          }
    
          coAuthors.forEach(a => authorIds.push(a._id.toString()));
        }
    
        // Ensure no duplicates
        const uniqueAuthorIds = [...new Set(authorIds)];
    
    
        // Create and save book
        const book = new Book({
          title,
          authors: uniqueAuthorIds,
          genre,
          price,
          stock,
          publishedDate,
          description,
          ISBN
        });
    
        await book.save();
    
        // Populate authors for response
        await book.populate('authors', 'username fullName email');
    
        res.status(201).json(book);
      } catch (err) {
        console.error('Error creating book:', err);
        if (err.code === 11000) {
          return res.status(400).json({ message: 'ISBN must be unique' });
        }
        res.status(500).json({ message: 'Server error' });
      }
}

//protected:- update book details (only by authors of the book or admin)

export const updateBook = async (req, res) => {
    try {
    const { id } = req.params;        // bookId
    const userId = req.user._id;      // logged-in user
    const userRole = req.user.role;   // role: author/admin

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // If user is author, ensure they are one of the book authors
    if (userRole === 'author' && 
        !book.authors.some(authorId => authorId.toString() === userId.toString())) {
      return res.status(403).json({ message: 'Forbidden: You can update only your own books' });
    }

    // Allowed fields for update
    const updatableFields = [
      'title',
      'genre',
      'price',
      'stock',
      'publishedDate',
      'description',
      'ISBN',
      'coverImageUrl',
      'previewPagesUrls'
    ];

    // Apply updates only for allowed fields
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        book[field] = req.body[field];
      }
    });

    await book.save();

    return res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    console.error('Error updating book:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

//protected:- Delete a book (only by authors of the book)

export const deleteBookByAuthor = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id; // logged-in author

    // Find the book and check ownership
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Only delete if the logged-in author is one of the book's authors
    if (!book.authors.some(authorId => authorId.toString() === userId.toString())) {
      return res.status(403).json({ message: 'Forbidden: You can delete only your own books' });
    }

    await Book.deleteOne({ _id: bookId });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book by author:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

//upload book cover image (single File)

export const uploadBookCover = async (req, res) => {
  
  try {
    const bookId = req.params.id;
    const user = req.user; // from JWT

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 1. Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2. Authorization check → user must be admin OR one of the authors
    if (
      user.role !== "admin" &&
      !book.authors.some(authorId => authorId.toString() === user._id.toString())
    ) {
      return res.status(403).json({ message: "Not allowed to update this book" });
    }

    // 3. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "bookstore/books/covers",
    });
  
    // 4. Update cover URL
    book.coverImageUrl = result.secure_url;
    await book.save();

    // 5. Remove local file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Cover image uploaded successfully",
      url: result.secure_url,
      book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}


//upload preview pages (multiple files)

export const uploadPreviewPages = async (req, res) => {
    try {
    const bookId = req.params.id;
    const user = req.user;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // 1. Find book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2. Authorization check
    if (
      user.role !== "admin" &&
      !book.authors.some(authorId => authorId.toString() === user._id.toString())
    ) {
      return res.status(403).json({ message: "Not allowed to update this book" });
    }

    // 3. Upload all preview images
    const uploadedUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "bookstore/books/previews",
      });
      uploadedUrls.push(result.secure_url);

      // Delete local copy after upload
      fs.unlinkSync(file.path);
    }

    // 4. Append previews
    book.previewPagesUrls = [...(book.previewPagesUrls || []), ...uploadedUrls];
    await book.save();

    res.json({
      message: "Preview images uploaded successfully",
      urls: uploadedUrls,
      book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}
