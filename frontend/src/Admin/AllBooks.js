import React, { useState, useEffect, use } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");


  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books/", {
        withCredentials: true,
      });
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        withCredentials: true,
      });

      // Remove deleted book from local state
      setBooks((prev) => prev.filter((book) => book._id !== id)); 
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  // Filter books by title, genre, or ISBN
  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.genre?.join(", ").toLowerCase().includes(search.toLowerCase()) ||
      book.ISBN?.toString().includes(search)
  );

  // Export to Excel
  const exportToExcel = () => {
    const data = filteredBooks.map((book, index) => ({
      "#": index + 1,
      Title: book.title,
      Genre: book.genre?.join(", "),
      Price: book.price,
      Stock: book.stock,
      ISBN: book.ISBN,
      "Published Date": book.publishedDate
        ? new Date(book.publishedDate).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Books");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, "books.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Search and Export */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Title, Genre, ISBN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Stock</th>
              <th>ISBN</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.genre?.join(", ")}</td>
                  <td>₹{book.price}</td>
                  <td>{book.stock}</td>
                  <td>{book.ISBN}</td>
                  <td>
                    {book.publishedDate
                      ? new Date(book.publishedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTable;
