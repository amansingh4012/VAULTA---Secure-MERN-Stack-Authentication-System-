
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/api/v1/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("email", email);
      navigate("/verifyotp");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 overflow-hidden">
        
        {/* Left Content */}
        <div className="md:w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-10">
          <h1 className="text-4xl font-bold mb-4 text-center leading-snug">
            Welcome Back 🚀
          </h1>
          <p className="text-center text-lg opacity-90">
            Sign in to access your account and continue your journey.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Login
          </h2>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full px-4 py-3 border rounded-xl text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-full px-4 py-3 border rounded-xl text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50"
            disabled={btnLoading}
          >
            {btnLoading ? "Submitting..." : "Login"}
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
