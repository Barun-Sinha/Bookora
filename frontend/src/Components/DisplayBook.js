
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// component to display individual book details 
const DisplayBook = ({id, title, price , image }) => { 

  const isAdmin = useSelector((state) => state.user.user?.role === 'admin'); 

  const handelDelte  = async(id) => {
    try {
      axios.delete(`http://localhost:5000/api/admin/books/${id}`, { withCredentials: true });
      // Optionally, you might want to refresh the book list or give user feedback here
      alert("Book deleted successfully");
      // window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <>
      {/* Wrap the whole card in a Link for details navigation */}
      <Link to={`/book/${id}`} className="no-underline">
        <figure>
          <img
            src= {image} 
             alt={title}
            className="h-56 w-full object-cover object-center rounded-t-lg"
          />
        </figure>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="text-sm text-gray-600">by J.K. Rowling</p>
          <p className="text-lg font-semibold text-primary">Rs.{price}</p>
        </div>
      </Link>

      {/* Actions outside of Link */}
      <div className="card-actions justify-center mb-4 gap-4">
        <button className="btn btn-primary btn-sm">Add To Cart</button>
        <Link to={`/book/${id}`} className="btn btn-outline btn-sm">
          Details
        </Link>
        {
          isAdmin && (
        <div>
           <button className="btn btn-primary bg-red-500 btn-sm" onClick={() => handelDelte(id)}>Delete Book</button>
        </div>
          )
        }
       
      </div>
    </>
  )
}

export default DisplayBook
