
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const HelpSupport = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "Go to Track Order from the top header and enter your Order ID to check your order status.",
    },
    {
      question: "How can I cancel my order?",
      answer:
        "Currently, order cancellation is not available. Please contact our support team for assistance.",
    },
    {
      question: "How can I return a product?",
      answer:
        "You can contact our support team with your Order ID and product details to request a return.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "You can choose from the available payment options during checkout.",
    },
    {
      question: "I did not receive my order. What should I do?",
      answer:
        "First check your order status from Track Order. If there is still a problem, contact our support team.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(
      openQuestion === index ? null : index
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Help & Support
        </h1>

        <p className="mt-2 text-gray-500">
          Find answers to common questions and get help with your orders.
        </p>
      </div>

      {/* Support Options */}
      <div className="mb-10 grid grid-cols-3 gap-6">

        {/* Orders */}
        <Link
          to="/orders"
          className="rounded-lg border border-gray-200 bg-white p-6 text-center transition hover:border-blue-500 hover:shadow-sm"
        >
          <div className="text-4xl">📦</div>

          <h2 className="mt-4 font-semibold text-gray-900">
            My Orders
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View your recent orders.
          </p>
        </Link>

        {/* Track */}
        <Link
          to="/track-order"
          className="rounded-lg border border-gray-200 bg-white p-6 text-center transition hover:border-blue-500 hover:shadow-sm"
        >
          <div className="text-4xl">🚚</div>

          <h2 className="mt-4 font-semibold text-gray-900">
            Track Order
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Check your order status.
          </p>
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          className="rounded-lg border border-gray-200 bg-white p-6 text-center transition hover:border-blue-500 hover:shadow-sm"
        >
          <div className="text-4xl">💬</div>

          <h2 className="mt-4 font-semibold text-gray-900">
            Contact Support
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Get help from our support team.
          </p>
        </Link>

      </div>

      {/* FAQ */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200">

          {faqs.map((faq, index) => (
            <div key={index}>

              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>

                <span className="text-xl text-gray-500">
                  {openQuestion === index ? "−" : "+"}
                </span>
              </button>

              {openQuestion === index && (
                <p className="pb-5 pr-8 text-sm leading-6 text-gray-500">
                  {faq.answer}
                </p>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* Contact Support */}
      <div className="mt-8 rounded-lg bg-gray-900 p-8 text-center text-white">

        <h2 className="text-2xl font-bold">
          Still Need Help?
        </h2>

        <p className="mt-2 text-gray-300">
          Our support team is ready to help you.
        </p>

        <Link
          to="/contact"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Contact Us
        </Link>

      </div>

    </main>
  );
};
