import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const CategoryProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${slug}`
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
  }, [slug]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-gray-900">
          {slug.replaceAll("-", " ")}
        </h1>

        <p className="mt-2 text-gray-500">
          Explore products in this category
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading products...
        </p>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-4 gap-6">

          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
            >

              {/* Image */}
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-4">

                <p className="mb-1 text-xs uppercase text-gray-400">
                  {product.category}
                </p>

                <h2 className="mb-2 line-clamp-1 font-semibold text-gray-900">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-blue-600">
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

      {/* Empty */}
      {!loading && products.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No products found.
        </p>
      )}

    </main>
  );
};