import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";


export const Header = () => {
  const navigate = useNavigate();
  

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("EN");
  const [showLanguages, setShowLanguages] = useState(false);

  const { user } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleSearch = () => {
    if (search.trim()) {
      navigate(
        `/shop?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowLanguages(false);
  };

  return (
    <header>

      {/* ================= TOP BAR ================= */}
      <div className="relative z-9999 bg-gray-900 text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">

          {/* Shipping */}
          <p className="text-sm">
            Free Shipping on all orders over $50!
          </p>

          {/* Right Side */}
          <div className="flex items-center gap-3 text-sm">

            {/* Track Order */}
            <Link
              to="/track-order"
              className="hover:text-blue-400"
            >
              Track Order
            </Link>

            <span>|</span>

            {/* Help */}
            <Link
              to="/help-support"
              className="hover:text-blue-400"
            >
              Help & Support
            </Link>

           

          </div>
        </div>
      </div>


      {/* ================= MAIN HEADER ================= */}
      <div className="relative z-10 border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-gray-900"
          >
            Shop<span className="text-blue-600">Zone</span>
          </Link>


          {/* ================= SEARCH ================= */}
          <div className="flex h-11 max-w-2xl flex-1">

            {/* Category Button */}
            <button
              type="button"
              className="border border-gray-300 bg-gray-50 px-4 text-sm"
            >
              All Categories
            </button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="
                flex-1
                border-y
                border-gray-300
                px-4
                text-sm
                outline-none
                focus:border-blue-500
              "
            />

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="
                w-12
                bg-blue-600
                text-white
                hover:bg-blue-700
              "
            >
              🔍
            </button>

          </div>


          {/* ================= ICONS ================= */}
          <div className="flex items-center gap-6">

            {/* User */}
            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-2"
              >
                <span className="text-2xl">
                  👤
                </span>

                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="cursor-pointer text-2xl"
              >
                👤
              </Link>
            )}


            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="
                relative
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              ♡

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-[11px]
                    font-bold
                    text-white
                  "
                >
                  {wishlistCount}
                </span>
              )}
            </Link>


            {/* Cart */}
            <Link
              to="/cart"
              className="
                relative
                cursor-pointer
                text-2xl
              "
            >
              🛒

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-xs
                    text-white
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>


      {/* ================= NAVIGATION ================= */}
      <nav className="relative z-0 border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6">

          <ul className="flex h-12 items-center gap-9">

            {/* Home */}
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Home
              </NavLink>
            </li>


            {/* Shop */}
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Shop
              </NavLink>
            </li>


            {/* Categories */}
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Categories 
              </NavLink>
            </li>


            {/* Deals */}
            <li>
              <NavLink
                to="/deals"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Deals
              </NavLink>
            </li>


            {/* New Arrivals */}
            <li>
              <NavLink
                to="/new-arrivals"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                New Arrivals
              </NavLink>
            </li>


            {/* Brands */}
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Brands
              </NavLink>
            </li>


            {/* Blog */}
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Blog
              </NavLink>
            </li>


            {/* Contact */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-blue-600"
                    : "text-sm font-medium text-gray-700 hover:text-blue-600"
                }
              >
                Contact Us
              </NavLink>
            </li>

          </ul>

        </div>
      </nav>

    </header>
  );
};