import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">My App</h1>
        <div>
          <Link to="/login" className="mr-4 hover:text-gray-200">
            Login
          </Link>
          <Link to="/signup" className="mr-4 hover:text-gray-200">
            Signup
          </Link>
          <Link to="/chart" className="hover:text-gray-200">
            Chart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
