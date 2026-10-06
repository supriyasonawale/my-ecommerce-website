import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const BrandProducts = () => {
  const { brand } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=0"
        );

        const data = await response.json();

        const decodedBrand = decodeURIComponent(brand);

        const filteredProducts = data.products.filter(
          (product) => product.brand === decodedBrand
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-gray-900">
          {decodeURIComponent(brand)}
        </h1>

        <p className="mt-2 text-gray-500">
          Products from this brand
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="py-20 text-center text-gray-500">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          No products found for this brand.
        </p>
      ) : (
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