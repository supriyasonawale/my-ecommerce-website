import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist
        </h1>

        <p className="mt-2 text-gray-500">
          Products you saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (

        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">

          <div className="mb-4 text-5xl">
            ♡
          </div>

          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Your wishlist is empty
          </h2>

          <p className="mb-6 text-gray-500">
            Save products you love here.
          </p>

          <Link
            to="/shop"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Products
          </Link>

        </div>

      ) : (

        <div className="grid grid-cols-4 gap-6">

          {wishlistItems.map((product) => (

            <div
              key={product.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >

              <Link to={`/product/${product.id}`}>

                <div className="h-56 overflow-hidden bg-gray-100">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />

                </div>

              </Link>

              <div className="p-4">

                <h2 className="mb-2 line-clamp-1 font-semibold text-gray-900">
                  {product.title}
                </h2>

                <p className="mb-4 text-lg font-bold text-blue-600">
                  ${product.price}
                </p>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
};