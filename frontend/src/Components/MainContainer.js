import React from "react";


const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "₹499",
    cover:
      "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: "₹399",
    cover:
      "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: "₹699",
    cover:
      "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg",
  },
];

const MainContainer = () => {
  return (
    <>
    <main className="container mx-auto px-6 py-10">
     
      <h2 className="text-2xl font-bold mb-6">📚 Available Books</h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-lg"
          >
            <figure>
              <img
                src={book.cover}
                alt={book.title}
                className="h-56 w-full object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-lg font-semibold text-primary">{book.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Buy Now</button>
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    </>
  );
};

export default MainContainer;
