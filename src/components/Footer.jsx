// File: src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center text-sm text-gray-700 py-4 mt-8">
      © {new Date().getFullYear()} Shopping Cart App. All rights reserved.
    </footer>
  );
};

export default Footer;
    