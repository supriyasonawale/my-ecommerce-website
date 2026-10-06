import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export const Shop = () => {
  const location = useLocation();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FILTER DRAWER =================

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ================= SEARCH =================

  const searchFromUrl =
    new URLSearchParams(location.search).get("search") || "";

  const [search, setSearch] = useState(searchFromUrl);

  // ================= FILTERS =================

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedRating, setSelectedRating] =
    useState("all");

  const [sort, setSort] = useState("default");

  // ================= PRODUCTS =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=0"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= CATEGORIES =================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ================= URL SEARCH =================

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  // ================= FILTER =================

  let filteredProducts = products.filter((product) => {
    // Search
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Category
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    // Minimum Price
    const matchesMinPrice =
      minPrice === "" ||
      product.price >= Number(minPrice);

    // Maximum Price
    const matchesMaxPrice =
      maxPrice === "" ||
      product.price <= Number(maxPrice);

    // Rating
    const matchesRating =
      selectedRating === "all" ||
      product.rating >= Number(selectedRating);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });

  // ================= SORT =================

  if (sort === "price-low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "name-a-z") {
    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "name-z-a") {
    filteredProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  // ================= CLEAR FILTERS =================

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating("all");
    setSort("default");
  };

  // ================= ACTIVE FILTER COUNT =================

  const activeFilterCount = [
    selectedCategory !== "all",
    minPrice !== "",
    maxPrice !== "",
    selectedRating !== "all",
    sort !== "default",
  ].filter(Boolean).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

      {/* ================= HEADING ================= */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Shop All Products
        </h1>

        <p className="mt-2 text-gray-500">
          Discover our latest products
        </p>
      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">

        {/* Search */}

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Filter Button */}

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition hover:border-blue-600 hover:text-blue-600"
        >
          <span className="text-lg">☰</span>

          <span>
            Filters
          </span>

          {activeFilterCount > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= FILTER OVERLAY ================= */}

      {isFilterOpen && (
  <div
    className="fixed inset-x-0 bottom-0 top-16 z-50 bg-black/40"
    onClick={() => setIsFilterOpen(false)}
  />
)}

      {/* ================= FILTER SIDEBAR ================= */}

 <aside
  className={`fixed left-0 top-16 z-[60] h-[calc(100%-4rem)] w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
    isFilterOpen
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>

        {/* Sidebar Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Filters
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Refine your products
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close filters"
          >
            ×
          </button>

        </div>

        {/* Sidebar Content */}

        <div className="h-[calc(100%-145px)] overflow-y-auto px-6 py-6">

          {/* ================= CATEGORY ================= */}

          <div className="border-b border-gray-200 pb-6">

            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Category
            </h3>

            <div className="space-y-3">

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-700">
                  All Categories
                </span>
              </label>

              {categories.map((category) => (
                <label
                  key={category.slug}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={
                      selectedCategory === category.slug
                    }
                    onChange={(e) =>
                      setSelectedCategory(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-sm capitalize text-gray-700">
                    {category.name}
                  </span>
                </label>
              ))}

            </div>
          </div>

          {/* ================= PRICE ================= */}

          <div className="border-b border-gray-200 py-6">

            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Price Range
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="mb-2 block text-xs text-gray-500">
                  Minimum
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="$ Min"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-500">
                  Maximum
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="$ Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-600"
                />
              </div>

            </div>
          </div>

          {/* ================= RATING ================= */}

          <div className="border-b border-gray-200 py-6">

            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Customer Rating
            </h3>

            <div className="space-y-3">

              {[
                { value: "all", label: "All Ratings" },
                { value: "4", label: "★ 4 & above" },
                { value: "3", label: "★ 3 & above" },
                { value: "2", label: "★ 2 & above" },
                { value: "1", label: "★ 1 & above" },
              ].map((rating) => (
                <label
                  key={rating.value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={
                      selectedRating === rating.value
                    }
                    onChange={(e) =>
                      setSelectedRating(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-sm text-gray-700">
                    {rating.label}
                  </span>
                </label>
              ))}

            </div>
          </div>

          {/* ================= SORT ================= */}

          <div className="py-6">

            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Sort By
            </h3>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-blue-600"
            >
              <option value="default">
                Recommended
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rating
              </option>

              <option value="name-a-z">
                Name: A to Z
              </option>

              <option value="name-z-a">
                Name: Z to A
              </option>
            </select>

          </div>

        </div>

        {/* ================= SIDEBAR FOOTER ================= */}

        <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-gray-200 bg-white p-5">

          <button
            onClick={clearFilters}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Clear All
          </button>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Apply Filters
          </button>

        </div>

      </aside>

      {/* ================= RESULT COUNT ================= */}

      {!loading && !error && (
        <div className="mb-5 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}

        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="py-20 text-center">
          <p className="text-gray-500">
            Loading products...
          </p>
        </div>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center">

          <h2 className="text-xl font-semibold text-red-700">
            Something went wrong
          </h2>

          <p className="mt-2 text-red-600">
            {error}
          </p>

        </div>
      )}

      {/* ================= EMPTY STATE ================= */}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      {/* ================= PRODUCT GRID ================= */}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => {

              const wishlistActive =
                isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Product Image */}

                  <Link to={`/product/${product.id}`}>

                    <div className="h-56 overflow-hidden bg-gray-100">

                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                    </div>

                  </Link>

                  {/* Product Details */}

                  <div className="p-4">

                    <p className="mb-1 text-xs uppercase text-gray-400">
                      {product.category}
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                    >
                      <h2 className="mb-2 line-clamp-1 font-semibold text-gray-900 hover:text-blue-600">
                        {product.title}
                      </h2>
                    </Link>

                    <div className="flex items-center justify-between">

                      <span className="text-lg font-bold text-blue-600">
                        ${product.price}
                      </span>

                      <span className="text-sm text-yellow-500">
                        ★ {product.rating}
                      </span>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex gap-2 border-t border-gray-100 p-4">

                    {/* Add To Cart */}

                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                      className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>

                    {/* Wishlist */}

                    <button
                      onClick={() => {
                        if (wishlistActive) {
                          removeFromWishlist(
                            product.id
                          );
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      aria-label={
                        wishlistActive
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className={`rounded-md border px-4 py-2 text-lg ${
                        wishlistActive
                          ? "border-red-500 text-red-500"
                          : "border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500"
                      }`}
                    >
                      {wishlistActive
                        ? "♥"
                        : "♡"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

    </main>
  );
};