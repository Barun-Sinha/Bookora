
import React from 'react'
import { Link } from 'react-router-dom'

// component to display individual book details 
const DisplayBook = ({id, title, price , image }) => { 


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
  
       
      </div>
    </>
  )
}

export default DisplayBook
