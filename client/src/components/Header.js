import React from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user, handleSignUp, handleSignOut } = useAuth();

  return (
    <div className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo100.png" alt="Logo" className="h-8 w-8 mr-2" />

        <a href="/" className="text-xl font-bold">
          Chat with me
        </a>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={user.picture}
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleSignUp}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignUp}
            className="border-2 border-white text-white px-4 py-1.5 rounded-lg"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
