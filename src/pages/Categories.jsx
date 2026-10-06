import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
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

  const menCategories = categories.filter((category) =>
    category.slug.startsWith("mens-")
  );

  const womenCategories = categories.filter((category) =>
    category.slug.startsWith("womens-")
  );

  const otherCategories = categories.filter(
    (category) =>
      !category.slug.startsWith("mens-") &&
      !category.slug.startsWith("womens-")
  );

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Page Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          All Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Explore products by category
        </p>
      </div>

      {/* MEN */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Men
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {menCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="rounded-lg border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold capitalize text-gray-900">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-blue-600">
                View Products →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* WOMEN */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Women
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {womenCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="rounded-lg border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold capitalize text-gray-900">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-blue-600">
                View Products →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* OTHER CATEGORIES */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Other Categories
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {otherCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="rounded-lg border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold capitalize text-gray-900">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-blue-600">
                View Products →
              </p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
};