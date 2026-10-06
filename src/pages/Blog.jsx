import React from "react";

const blogs = [
  {
    id: 1,
    title: "10 Tips for Smart Online Shopping",
    description:
      "Learn simple tips to find better products, compare prices, and shop safely online.",
    category: "Shopping Tips",
    date: "Aug 20, 2026",
  },
  {
    id: 2,
    title: "How to Choose the Right Product",
    description:
      "A simple guide to checking product quality, reviews, price, and features before buying.",
    category: "Buying Guide",
    date: "Aug 18, 2026",
  },
  {
    id: 3,
    title: "Top Fashion Trends This Season",
    description:
      "Discover the latest fashion trends and find the right styles for your wardrobe.",
    category: "Fashion",
    date: "Aug 15, 2026",
  },
  {
    id: 4,
    title: "Best Ways to Save Money While Shopping",
    description:
      "Use these practical shopping strategies to find great deals and save more money.",
    category: "Deals",
    date: "Aug 12, 2026",
  },
  {
    id: 5,
    title: "Why Product Reviews Matter",
    description:
      "Understand how customer reviews and ratings can help you make better purchasing decisions.",
    category: "Shopping Tips",
    date: "Aug 10, 2026",
  },
  {
    id: 6,
    title: "Guide to Buying Beauty Products",
    description:
      "Things you should check before choosing beauty and personal care products online.",
    category: "Beauty",
    date: "Aug 08, 2026",
  },
];

export const Blog = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Our Blog
        </h1>

        <p className="mt-2 text-gray-500">
          Shopping tips, guides, trends and more.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-3 gap-6">

        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >

            {/* Image Placeholder */}
            <div className="flex h-48 items-center justify-center bg-gray-100">
              <span className="text-5xl">
                📝
              </span>
            </div>

            {/* Content */}
            <div className="p-5">

              <p className="mb-2 text-xs font-semibold uppercase text-blue-600">
                {blog.category}
              </p>

              <h2 className="mb-3 text-xl font-bold text-gray-900">
                {blog.title}
              </h2>

              <p className="mb-4 text-sm leading-6 text-gray-500">
                {blog.description}
              </p>

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-400">
                  {blog.date}
                </span>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Read More →
                </button>

              </div>

            </div>

          </article>
        ))}

      </div>

    </main>
  );
};