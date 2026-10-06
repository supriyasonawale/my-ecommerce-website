
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export const Checkout = () => {
const { cartItems, clearCart } = useCart();  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Login protection
  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">

          <div className="text-5xl">🔐</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Please Login to Continue
          </h1>

          <p className="mt-2 text-gray-500">
            You need to login before placing an order.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const isEmpty = Object.values(formData).some(
    (value) => value.trim() === ""
  );

  if (isEmpty) {
    alert("Please fill all fields.");
    return;
  }

  const newOrder = {
    id: Date.now(),
    userId: user.username,
    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },
    items: cartItems,
    total: total,
    orderDate: new Date().toISOString(),
    status: "Placed",
  };

  const existingOrders = JSON.parse(
    localStorage.getItem("orders")
  ) || [];

  localStorage.setItem(
    "orders",
    JSON.stringify([...existingOrders, newOrder])
  );

  clearCart();

  setOrderPlaced(true);
};

  // Order success
  if (orderPlaced) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">

        <div className="text-6xl">✅</div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with ShopZone.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>

      </main>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="px-6 py-20 text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <Link
          to="/shop"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Go to Shop
        </Link>

      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Checkout
      </h1>

      <div className="grid grid-cols-3 gap-8">

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="col-span-2 rounded-lg border border-gray-200 bg-white p-6"
        >

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Shipping Information
          </h2>

          <div className="grid grid-cols-2 gap-5">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

          </div>

          {/* Address */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              rows="4"
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Place Order
          </button>

        </form>

        {/* Order Summary */}
        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6">

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

          </div>

          <div className="my-6 border-t border-gray-200" />

          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>

            <span className="text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>

        </div>

      </div>

    </main>
  );
};

