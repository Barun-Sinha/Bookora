import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCart } from "../utils/cartSlice";
import QuantitySelector from "./QuontitySelector";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLogin = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const disp = useDispatch();
  
  const AddTocart = () => {
    
      if(!isLogin){
        navigate('/login');
      } 

      disp(addCart({
        id: book._id,
        title: book.title,
        price: book.price,
      }))
      
  }

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p className="text-center py-10">Loading book...</p>;
  if (!book) return <p className="text-center py-10">Book not found</p>;

  return (
    <main className="container mx-auto mt-12 px-6 py-10 p-6 rounded-lg shadow-lg bg-base-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Book Image */}
        <figure className="flex justify-center">
          <img
            src={
              book.coverImageUrl ||
              "https://www.quercusbooks.co.uk/wp-content/uploads/2019/01/Spines-website-asset-new-logo.jpg?w=1920&h=560&crop=1"
            }
            alt={book.title}
            className="h-96 w-auto object-cover rounded-lg shadow-lg"
          />
        </figure>

        {/* Right: Book Info */}
        <div className="flex flex-col gap-4 ">
          <h2 className="text-3xl font-bold">{book?.title}</h2>
          <p className="text-lg text-gray-700">Author: {book?.author}</p>
          <p className="text-lg text-gray-700">Genre: {book?.genre.toString(" ")}</p>
          <p className="text-xl font-semibold text-primary">
            Rs. {book.price}
          </p>

          <QuantitySelector/>

          <div className="flex gap-4 justify-center mt-2">
            <button className="btn btn-primary" onClick={()=>AddTocart()}>Add to Cart</button>
            <button className="btn btn-outline">Buy Now</button>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{book?.description} 
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetails;
