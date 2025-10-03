import React, { useState } from "react";

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    coAuthorIdentifiers: "",
    genre: "",
    price: "",
    stock: "",
    publishedDate: "",
    description: "",
    ISBN: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // <-- error state

  const handleAddNewBook = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset error

    try {
      // Prepare payload
      const payload = {
        title: bookData.title.trim(),
        coAuthorIdentifiers: bookData.coAuthorIdentifiers
          ? bookData.coAuthorIdentifiers.split(",").map((i) => i.trim())
          : [],
        genre: bookData.genre
          ? bookData.genre.split(",").map((i) => i.trim())
          : [],
        price: Number(bookData.price),
        stock: Number(bookData.stock),
        publishedDate: new Date(bookData.publishedDate).toISOString(),
        description: bookData.description.trim(),
        ISBN: bookData.ISBN.trim(),
      };

      console.log("Payload being sent:\n", JSON.stringify(payload, null, 2));

      const response = await fetch("http://localhost:5000/api/admin/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add token if required:
          // "Authorization": `Bearer YOUR_TOKEN_HERE`
        },
        body: JSON.stringify(payload),
        credentials: "include", // if server requires cookies
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        data = await response.text();
      }

      if (!response.ok) {
        // Display the backend error in the UI
        setErrorMessage(data?.message || data || "An error occurred");
        return;
      }

      // Reset form
      setBookData({
        title: "",
        coAuthorIdentifiers: "",
        genre: "",
        price: "",
        stock: "",
        publishedDate: "",
        description: "",
        ISBN: "",
      });
    } catch (error) {
      setErrorMessage("Error adding book. Please try again.");
      console.error("Error adding book:", error);
    }

    alert("Book added successfully!");
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Book</h2>

      {/* Display error message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleAddNewBook} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Co-Authors */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Co-Authors (comma separated)
          </label>
          <input
            type="text"
            name="coAuthorIdentifiers"
            value={bookData.coAuthorIdentifiers}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Genre (comma separated)
          </label>
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={bookData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Published Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Published Date
          </label>
          <input
            type="date"
            name="publishedDate"
            value={bookData.publishedDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            required
          ></textarea>
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">ISBN</label>
          <input
            type="text"
            name="ISBN"
            value={bookData.ISBN}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
