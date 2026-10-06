import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Brands = () => {
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

  // Get unique brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter((brand) => brand)
    ),
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Shop by Brands
        </h1>

        <p className="mt-2 text-gray-500">
          Explore products from popular brands.
        </p>
      </div>

      {loading ? (
        <p className="py-20 text-center text-gray-500">
          Loading brands...
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">

          {brands.map((brand) => {

            const brandProduct = products.find(
              (product) => product.brand === brand
            );

            return (
              <Link
                key={brand}
                to={`/brands/${encodeURIComponent(brand)}`}
                className="rounded-lg border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-24 items-center justify-center rounded-md bg-gray-100">

                  <span className="text-xl font-bold capitalize text-gray-800">
                    {brand}
                  </span>

                </div>

                <p className="text-sm text-blue-600">
                  View Products →
                </p>

              </Link>
            );
          })}

        </div>
      )}

    </main>
  );
};