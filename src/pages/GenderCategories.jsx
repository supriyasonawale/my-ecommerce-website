import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GenderCategories = () => {
  const { gender } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const genderCategories = categories.filter((category) => {
    if (gender === "men") {
      return category.slug.startsWith("mens-");
    }

    if (gender === "women") {
      return category.slug.startsWith("womens-");
    }

    return false;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold capitalize text-gray-900">
          {gender} Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Explore {gender}'s products
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">
          Loading categories...
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">

          {genderCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="group rounded-lg border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >

              <h2 className="text-xl font-semibold capitalize text-gray-900">
                {category.name}
              </h2>

              <p className="mt-3 text-sm font-medium text-blue-600">
                View Products →
              </p>

            </Link>
          ))}

        </div>
      )}

    </main>
  );
};