import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between px-6 py-2 items-center bg-white drop-shadow">
        <h1 className="font-semibold text-xl  text-black py-2 ">
          Task Management App
        </h1>
        <div className="flex space-x-4">
          <Link
            to={"/login"}
            className="bg-gray-700 p-2 rounded text-white  cursor-pointer hover:bg-gray-800"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="bg-gray-700 p-2 rounded text-white  cursor-pointer hover:bg-gray-800"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
