import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Back */}
      <Link
        to="/shop"
        className="mb-8 inline-block text-sm font-medium text-blue-600"
      >
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-2 gap-12">

        {/* ================= IMAGES ================= */}
        <div>

          {/* Main Image */}
          <div className="flex h-[500px] items-center justify-center rounded-lg bg-gray-100">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-4">
            {product.images?.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className="h-20 w-20 overflow-hidden rounded-md border border-gray-200 bg-gray-100"
              >
                <img
                  src={image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div>

          {/* Category */}
          <p className="mb-2 text-sm uppercase text-gray-400">
            {product.category}
          </p>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mb-5 flex items-center gap-2">
            <span className="text-yellow-500">
              ★ {product.rating}
            </span>

            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
          </div>

          {/* Description */}
          <p className="mb-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Stock */}
          <p className="mb-6 text-sm text-gray-600">
            <span className="font-semibold">
              Stock:
            </span>{" "}
            {product.stock} available
          </p>

          {/* Quantity */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-900">
              Quantity
            </label>

            <div className="flex items-center gap-3">
  <button
    type="button"
    onClick={() =>
      setQuantity((previous) => Math.max(1, previous - 1))
    }
    className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-xl font-semibold hover:bg-gray-100"
  >
    −
  </button>

  <span className="flex h-10 w-12 items-center justify-center rounded-md border border-gray-300 font-semibold">
    {quantity}
  </span>

  <button
    type="button"
    onClick={() => setQuantity((previous) => previous + 1)}
    className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-xl font-semibold hover:bg-gray-100"
  >
    +
  </button>
</div>
          </div>
          
          <button
  onClick={() => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }}
  className="mb-3 w-full rounded-md border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
>
  {isInWishlist(product.id)
    ? "❤️ Remove from Wishlist"
    : "♡ Add to Wishlist"}
</button>

          {/* Add To Cart */}
         <button
 onClick={() => addToCart(product, quantity)}
  className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  Add to Cart
</button>

        </div>

      </div>

    </main>
  );
};