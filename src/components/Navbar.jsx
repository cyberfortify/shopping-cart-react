// File: src/components/Navbar.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Memoized Cart Icon component
const CartIcon = React.memo(({ totalItems }) => (
  <Link 
    to="/cart" 
    className="hover:underline relative transition-transform hover:scale-105"
    aria-label={`Cart (${totalItems} items)`}
  >
    <span className="flex items-center">
      🛒 Cart
      {totalItems > 0 && (
        <span 
          className="absolute -top-2 -right-3 bg-red-600 text-white text-xs min-w-[1.25rem] h-5 px-1.5 py-0.5 rounded-full flex items-center justify-center animate-pulse-once"
          aria-live="polite"
        >
          {totalItems}
        </span>
      )}
    </span>
  </Link>
));

// Main Navbar component
const Navbar = React.memo(() => {
  const { cart } = useCart();

  // Optimized total items calculation
  const totalItems = useMemo(() => (
    cart.reduce((sum, item) => sum + item.quantity, 0)
  ), [cart]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50 shadow-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-3 sm:mb-0 transition-all hover:scale-105">
        <Link to="/" className="flex items-center gap-2">
          🛍️ <span className="hidden sm:inline">Shopping Cart</span>
        </Link>
      </h1>

      <nav className="flex space-x-6 md:space-x-8 items-center">
        <Link 
          to="/products" 
          className="hover:underline transition-colors hover:text-blue-200 font-medium"
        >
          Products
        </Link>
        <CartIcon totalItems={totalItems} />
      </nav>
    </header>
  );
});

export default Navbar;
