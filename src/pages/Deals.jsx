import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=0"
        );

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Products with discount 10% or more
  const dealProducts = products.filter(
    (product) => product.discountPercentage >= 10
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Today's Deals
        </h1>

        <p className="mt-2 text-gray-500">
          Grab amazing products at discounted prices.
        </p>
      </div>

      {loading ? (
        <p className="py-20 text-center text-gray-500">
          Loading deals...
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">

          {dealProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  {Math.round(product.discountPercentage)}% OFF
                </span>

              </div>

              <div className="p-4">

                <p className="mb-1 text-xs uppercase text-gray-400">
                  {product.category}
                </p>

                <h2 className="mb-2 line-clamp-1 font-semibold text-gray-900">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">

                  <span className="font-bold text-blue-600">
                    ${product.price}
                  </span>

                  <span className="text-sm text-yellow-500">
                    ★ {product.rating}
                  </span>

                </div>

              </div>
            </Link>
          ))}

        </div>
      )}

    </main>
  );
};