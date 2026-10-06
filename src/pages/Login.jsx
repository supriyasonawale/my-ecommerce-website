import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const Login = () => {
    const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    // Check if user is registered
    if (!registeredUser) {
      setError("Account not found. Please sign up first.");
      setLoading(false);
      return;
    }

    // Check username and password
    if (
      registeredUser.username !== username ||
      registeredUser.password !== password
    ) {
      setError("Invalid username or password.");
      setLoading(false);
      return;
    }

    // Save logged-in user
  login(registeredUser);

setLoading(false);

navigate("/");
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 py-12">

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Login
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Login to your ShopZone account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </main>
  );
};