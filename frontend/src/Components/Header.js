import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex w-full justify-between items-center">
        {/* Left side: Logo / Brand */}
        <Link to="/">
        <p className="btn btn-ghost text-2xl normal-case">Book Khana</p>
        </Link>

        {/* Right side: Login Button */}
        <Link to="/login">
        <button className="btn btn-primary">
            Login</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

