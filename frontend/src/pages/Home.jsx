import React from "react";
import { AppData } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-xl w-full p-10 text-center transform transition duration-500 hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">AuthApp</span> 🚀
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          A modern authentication system with secure login,  
          role-based access, and a smooth user experience.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            onClick={() => logoutUser(navigate)}
          >
            Logout
          </button>

          {user && user.role === "admin" && (
            <Link
              to="/dashboard"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="mt-10 text-gray-500 text-sm">
          <p>🔐 Secure Authentication System</p>
          <p>⚡ Fast & Reliable Access</p>
          <p>📊 Admin Dashboard for Role Management</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
