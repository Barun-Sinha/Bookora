import React from "react";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex w-full justify-between items-center">
        {/* Left side: Logo / Brand */}
        <p className="btn btn-ghost text-2xl normal-case">Book Khana</p>

        {/* Right side: Login Button */}
        <button className="btn btn-primary">Login</button>
      </div>
    </header>
  );
};

export default Header;

