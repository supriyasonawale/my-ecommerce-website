
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const TrackOrder = () => {
  const { user } = useAuth();

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();

    setError("");
    setOrder(null);

    if (!orderId.trim()) {
      setError("Please enter your Order ID.");
      return;
    }

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = orders.find(
      (item) =>
        String(item.id) === orderId.trim() &&
        item.userId === user?.username
    );

    if (!foundOrder) {
      setError("Order not found.");
      return;
    }

    setOrder(foundOrder);
  };

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">

          <div className="text-5xl">🔐</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Please Login First
          </h1>

          <p className="mt-2 text-gray-500">
            Login to track your orders.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Track Your Order
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your Order ID to check your order status.
        </p>
      </div>

      {/* Search Order */}
      <form
        onSubmit={handleTrack}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Order ID
        </label>

        <div className="flex gap-3">

          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Track Order
          </button>

        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
      </form>

      {/* Order Result */}
      {order && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-200 pb-5">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="font-semibold text-gray-900">
                #{order.id}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {order.status}
            </span>

          </div>

          <div className="py-5">

            <p className="text-sm text-gray-500">
              Order Date
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>

          </div>

          <div className="border-t border-gray-200 pt-5">

            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Order Items
            </h2>

            <div className="space-y-4">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-14 w-14 rounded-md object-cover"
                    />

                    <div>
                      <p className="font-medium text-gray-900">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                  </div>

                  <p className="font-semibold text-gray-900">
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">

            <span className="text-lg font-bold text-gray-900">
              Total
            </span>

            <span className="text-xl font-bold text-blue-600">
              ${order.total.toFixed(2)}
            </span>

          </div>

        </div>
      )}

    </main>
  );
};
