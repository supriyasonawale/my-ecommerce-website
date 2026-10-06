import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="mt-2 text-gray-500">
          Review your items before checkout
        </p>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
          <div className="mb-4 text-5xl">
            🛒
          </div>

          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mb-6 text-gray-500">
            Add some products to your cart.
          </p>

          <Link
            to="/shop"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 rounded-lg border border-gray-200 bg-white p-5"
              >

                {/* Product Image */}
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between">

                  <div>
                    <p className="text-xs uppercase text-gray-400">
                      {item.category}
                    </p>

                    <h2 className="mt-1 font-semibold text-gray-900">
                      {item.title}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between">

                    {/* Quantity */}
                    <div className="flex items-center rounded-md border border-gray-300">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-4 py-1">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                    {/* Price */}
                    <p className="font-bold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border border-gray-200 bg-white p-6">

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mb-4 flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="mb-4 flex justify-between text-gray-600">
              <span>Shipping</span>

              <span>
                Free
              </span>
            </div>

            <div className="my-4 border-t border-gray-200" />

            <div className="mb-6 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>

              <span>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
  to="/checkout"
  className="block rounded-md bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  Proceed to Checkout
</Link>

          </div>

        </div>
      )}

    </main>
  );
};