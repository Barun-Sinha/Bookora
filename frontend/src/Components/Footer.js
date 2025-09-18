import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-6 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold">📚 Book Khana</h2>
          <p className="text-sm mt-2">
            Your one-stop online bookstore for knowledge, stories, and imagination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/books" className="hover:underline">Books</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <p>Email: <a href="mailto:support@bookkhana.com" className="hover:underline">support@bookkhana.com</a></p>
          <p>Phone: +91 98765 43210</p>
          <div className="flex gap-4 mt-3">
            <p href="#" className="hover:text-blue-500">Facebook</p>
            <p href="#" className="hover:text-pink-500">Instagram</p>
            <p href="#" className="hover:text-sky-500">Twitter</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Book Khana. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
