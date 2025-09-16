import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white py-8 mt-16">
    <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="font-geist-sans font-bold text-lg tracking-tight">
  WhatsApp 2.0 &copy; {new Date().getFullYear()}
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="#" className="hover:underline hover:text-gray-100 transition-colors duration-150">Privacy Policy</a>
        <a href="#" className="hover:underline hover:text-gray-100 transition-colors duration-150">Terms of Service</a>
        <a href="#" className="hover:underline hover:text-gray-100 transition-colors duration-150">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
