import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, ShoppingCart } from "lucide-react"; // you can use heroicons too
import { useSelector ,useDispatch} from "react-redux";
import { logout } from "../utils/userSlice.js";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user , isAuthenticated } = useSelector((state) => state.user);

  const handelLogin = () => {
    // Implement login functionality here
    navigate("/login");
  };

  const handelLogout = async() => {
    try {
      // Implement logout functionality here
      await axios.post("http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="bg-base-100 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex w-full justify-between items-center">
        {/* Left side: Logo + Home */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <p className="btn btn-ghost text-2xl normal-case  hover:text-blue-500 transition-colors duration-200">
              📚 Book Khana
            </p>
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
                0
              </span>
            </Link>
          </div>

          {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Admin
              </button>
            )}

          {/* Profile Dropdown on Hover */}
          {isAuthenticated ? (
            <div className="dropdown dropdown-end cursor-pointer hover:text-blue-500 transition-colors duration-200">
            <div>
              <button
                className="text-2xl bg-blue-500 px-4 py-2 border-2 rounded-2xl text-white font-bold flex items-center justify-center 
               hover:bg-blue-600 hover:scale-105 transition-all duration-200 ease-in-out"
                onClick={handelLogout}
              >
                Logout
              </button>
            </div>
          </div>
          ) : (
            <div className="dropdown dropdown-end cursor-pointer hover:text-blue-500 transition-colors duration-200">
            <div>
              <button
                className="text-2xl bg-blue-500 px-4 py-2 border-2 rounded-2xl text-white font-bold flex items-center justify-center 
               hover:bg-blue-600 hover:scale-105 transition-all duration-200 ease-in-out"
                onClick={handelLogin}
              >
                Login
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
