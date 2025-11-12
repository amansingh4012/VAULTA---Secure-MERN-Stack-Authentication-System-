import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/api/v1/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-wrap items-center justify-center">
        <div className="lg:w-3/5 md:w-1/2 p-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-tight">
            Join Our Awesome Community 🚀
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            Create your account and start exploring. Stay connected, secure, and
            enjoy a seamless authentication experience with us.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="lg:w-2/6 md:w-1/2 bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border border-gray-200"
        >
          <h2 className="text-gray-900 text-2xl font-semibold title-font mb-6 text-center">
            Create an Account
          </h2>

          <div className="relative mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-base outline-none text-gray-700 py-2 px-4 transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="relative mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-base outline-none text-gray-700 py-2 px-4 transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="relative mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-base outline-none text-gray-700 py-2 px-4 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <button
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-200 disabled:opacity-60"
            disabled={btnLoading}
          >
            {btnLoading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-500 mt-5 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-600 hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
