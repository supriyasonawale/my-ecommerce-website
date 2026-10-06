
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Orders = () => {
  const { user } = useAuth();

  const orders = JSON.parse(
    localStorage.getItem("orders")
  ) || [];

  // Only show current user's orders
  const myOrders = orders.filter(
    (order) => order.userId === user?.username
  );

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">

          <div className="text-5xl">🔐</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Please Login First
          </h1>

          <p className="mt-2 text-gray-500">
            Login to view your orders.
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
    <main className="mx-auto max-w-5xl px-6 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View your recent orders and order details.
        </p>
      </div>

      {myOrders.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-16 text-center">

          <div className="text-5xl">📦</div>

          <h2 className="mt-5 text-xl font-semibold text-gray-900">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Start Shopping
          </Link>

        </div>
      ) : (
        <div className="space-y-6">

          {myOrders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >

                {/* Order Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold text-gray-900">
                      #{order.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="font-medium text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                {/* Products */}
                <div className="space-y-4 py-5">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-16 w-16 rounded-md object-cover"
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
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                    </div>
                  ))}

                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-5">

                  <div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {order.status}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-blue-600">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                </div>

              </div>
            ))}

        </div>
      )}

    </main>
  );
};

