import React, { useEffect, useState } from "react";
import DisplayBook from "./DisplayBook";
import Carousel from "./Carousel";


const MainContainer = () => {

  const [bookItems, setBookItems] = useState([]);
  console.log("Book Items:", bookItems);

  // api call to fetch all books from backend 
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();
      setBookItems(data);
    }catch(error){
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);
  
  return (
    <>
    <main className="container mx-auto px-6 py-10">
      <Carousel/>
      <h2 className="text-3xl w-auto bg-base-300 p-2 shadow-md font-bold mb-6 text-left">📚 Available Books</h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {bookItems.map((book) => (
  
          <div
          key={book._id}
            className="card bg-base-300 shadow-md hover:shadow-xl transition rounded-lg"
          >
            <DisplayBook 
            id = {book._id}
            title={book.title} 
            price={book.price} 
            image = {book.coverImageUrl}
            />
          </div>
  
        ))}
      </div>
    </main>
    </>
  );
};

export default MainContainer;
