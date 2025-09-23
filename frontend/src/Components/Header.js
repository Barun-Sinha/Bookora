import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {HomeIcon, ShoppingCart, UserCircle } from "lucide-react"; // you can use heroicons too
import { useSelector } from "react-redux";

const Header = () => {
 
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((store) => store.user);
  const cartSize  = useSelector((store) => store?.cart?.length);


  const navigate = useNavigate();

  const handelLogin = () => {
    // Implement login functionality here
    navigate('/login');
  }


  return (

    <header className="bg-base-100 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex w-full justify-between items-center">
        {/* Left side: Logo + Home */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <p className="btn btn-ghost text-2xl normal-case  hover:text-blue-500 transition-colors duration-200">📚 Book Khana</p>
          </Link>
        </div>

        {/* Right side: Cart + Profile */}
        <div className="flex  items-center gap-10">
          {/* Cart */}
         <div className="flex items-center gap-6">
        {/* Home Link */}
         <Link 
            to="/" 
           className="flex items-center gap-2 text-lg font-medium text-gray-100 hover:text-blue-500 transition-colors"
         >
            <HomeIcon size={22} />
                <span>Home</span>
        </Link>

        {/* Cart Link */}
        <Link 
          to="/cart" 
          className="relative flex items-center gap-2 text-lg font-medium text-gray-100 hover:text-blue-500 transition-colors"
          >
           <ShoppingCart size={22} />
             <span>Cart</span>

            {/* Badge */}
           <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {cartSize || 0}
           </span>
          </Link>
         </div>


          {/* Profile Dropdown on Hover */}
          <div className="dropdown dropdown-end cursor-pointer hover:text-blue-500 transition-colors duration-200">
            <div>
              { 
  userInfo ? (
    <div tabIndex={0} className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}

      >
        {/* User Button */}
        <div
          className="flex items-center gap-2 px-3 py-2 bg-gray-300 rounded-full cursor-pointer 
                     hover:bg-blue-100 transition-colors duration-200"
        >
          <UserCircle size={24} className="text-blue-600" />
          <p className="text-gray-700 font-medium">
            {userInfo?.user?.username}
          </p>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
            <ul className="flex flex-col">
              <Link to="/profile" className="no-underline">
              <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Profile</li>
              </Link>
              <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Wishlist</li>
              <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Sign Out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : (
    <button
      className="text-2xl bg-blue-500 px-4 py-2 border-2 rounded-2xl text-white font-bold flex items-center justify-center 
                 hover:bg-blue-600 hover:scale-105 transition-all duration-200 ease-in-out"
      onClick={handelLogin}
    >
      Login   
    </button>
  )
}

        

            </div>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
