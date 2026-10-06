import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check existing user
    const existingUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (
      existingUser &&
      (existingUser.username === username ||
        existingUser.email === email)
    ) {
      setError("Username or email already exists.");
      return;
    }

    // Create user
    const user = {
      name,
      email,
      username,
      password,
    };

    // Save user
    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    setSuccess("Registration successful! Please login.");

    // Go to login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 py-12">

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Create your ShopZone account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Create username"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="rounded-md bg-green-50 p-3 text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
};