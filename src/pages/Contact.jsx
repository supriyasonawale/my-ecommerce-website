import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Us
        </h1>

        <p className="mt-2 text-gray-500">
          Have a question? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10">

        {/* Contact Information */}
        <div className="rounded-lg bg-gray-50 p-8">

          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold text-gray-900">
                📍 Address
              </h3>

              <p className="mt-1 text-gray-500">
                Pune,Maharashtra
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                📧 Email
              </h3>

              <p className="mt-1 text-gray-500">
                support@shopzone.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                📞 Phone
              </h3>

              <p className="mt-1 text-gray-500">
                +91 8010516363
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                🕐 Working Hours
              </h3>

              <p className="mt-1 text-gray-500">
                Monday - Sunday: 24/7
              </p>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="rounded-lg border border-gray-200 bg-white p-8">

          {submitted ? (
            <div className="py-16 text-center">

              <div className="mb-4 text-5xl">
                ✅
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Message Sent!
              </h2>

              <p className="mt-2 text-gray-500">
                Thank you for contacting us. We'll get back to you soon.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Send Another Message
              </button>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Send Message
              </button>

            </form>
          )}

        </div>

      </div>

    </main>
  );
};