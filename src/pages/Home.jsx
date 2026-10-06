import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Products API
        const productsResponse = await fetch(
          "https://dummyjson.com/products"
        );

        const productsData = await productsResponse.json();

        setProducts(productsData.products);

        // Categories API
        const categoriesResponse = await fetch(
          "https://dummyjson.com/products/categories"
        );

        const categoriesData = await categoriesResponse.json();

        setCategories(categoriesData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
<section className="relative h-[350px] overflow-hidden bg-gray-100">

  <img
    src={heroImage}
    alt="ShopZone"
    className="absolute inset-0 h-full w-full object-cover object-top"
  />

  <div className="absolute inset-0 flex items-center">
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="max-w-lg">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Welcome to ShopZone
        </p>

        <h1 className="mb-5 text-5xl font-bold leading-tight text-gray-900">
          Shop Smart.
          <br />
          Live Better.
        </h1>

        <p className="mb-7 text-lg text-gray-600">
          Discover amazing products at the best prices.
        </p>

        <Link
          to="/shop"
          className="inline-block rounded-md bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Shop Now
        </Link>

      </div>
    </div>
  </div>

</section>

      {/* ================= FEATURES ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4 px-6 py-6">
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-5">
            <div className="text-3xl">🚚</div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Free Shipping
              </h3>

              <p className="text-sm text-gray-500">
                On orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-5">
            <div className="text-3xl">🔒</div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Secure Payments
              </h3>

              <p className="text-sm text-gray-500">
                100% secure payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-5">
            <div className="text-3xl">↩️</div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Easy Returns
              </h3>

              <p className="text-sm text-gray-500">
                30 day return policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-5">
            <div className="text-3xl">🎧</div>

            <div>
              <h3 className="font-semibold text-gray-900">
                24/7 Support
              </h3>

              <p className="text-sm text-gray-500">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </section>


{/* ================= SHOP BY CATEGORIES ================= */}
<section className="mx-auto max-w-7xl px-6 py-12">

  <div className="mb-7 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">
      Shop by Categories
    </h2>

    <Link
      to="/categories"
      className="font-medium text-blue-600 hover:text-blue-700"
    >
      View All →
    </Link>
  </div>

  {loading ? (
    <p className="text-center text-gray-500">
      Loading categories...
    </p>
  ) : (
    <div className="grid grid-cols-4 gap-6">

      {/* MEN */}
      <Link
to="/category-group/men"

className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <div className="flex h-40 items-center justify-center bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-700">
            Men
          </h3>
        </div>

        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">
            Shirts, Shoes, Watches
          </p>
        </div>
      </Link>


      {/* WOMEN */}
      <Link
        to="/category-group/women"
        className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <div className="flex h-40 items-center justify-center bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-700">
            Women
          </h3>
        </div>

        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">
            Dresses, Shoes, Watches
          </p>
        </div>
      </Link>


      {/* API CATEGORIES */}
      {categories
        .filter(
          (category) =>
            !category.slug.startsWith("mens-") &&
            !category.slug.startsWith("womens-")
        )
        .slice(0, 2)
        .map((category) => {

          const categoryProduct = products.find(
            (product) => product.category === category.slug
          );

          return (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
            >

              <div className="h-40 overflow-hidden bg-gray-100">
                <img
                  src={categoryProduct?.thumbnail}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold capitalize text-gray-900">
                  {category.name}
                </h3>
              </div>

            </Link>
          );
        })}

    </div>
  )}

</section>



    {/* ================= BEST SELLING PRODUCTS ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Best Selling Products
            </h2>

            <Link
              to="/shop"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading products...
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {[...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4)
  .map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="h-56 overflow-hidden bg-gray-100">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      {product.category}
                    </p>

                    <h3 className="mb-2 line-clamp-1 font-semibold text-gray-900">
                      {product.title}
                    </h3>

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
        </div>
      </section>
    </main>
  );
};