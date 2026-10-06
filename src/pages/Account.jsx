import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // If user is not logged in
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Please login first
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Account
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account information
          </p>
        </div>

        {/* User Info */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="mt-1 text-lg font-medium text-gray-900">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-1 text-lg font-medium text-gray-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Username
            </p>

            <p className="mt-1 text-lg font-medium text-gray-900">
              {user.username}
            </p>
          </div>

        </div>


        {/* Orders */}
<div className="mt-8 border-t border-gray-200 pt-6">

  <h2 className="text-xl font-semibold text-gray-900">
    My Orders
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    View your previous orders and order details.
  </p>

  <button
    onClick={() => navigate("/orders")}
    className="mt-4 rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
  >
    View My Orders
  </button>

</div>

        {/* Logout */}
        <div className="mt-8 border-t border-gray-200 pt-6">

          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
};