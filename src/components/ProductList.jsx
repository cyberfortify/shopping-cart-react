// File: src/components/ProductList.jsx
import React, { useState, useEffect } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for skeleton effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleFilter = (cat) => {
    setCategory(cat);
    if (cat === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === cat));
    }
  };

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Our Collection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of premium products
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

// Hide scrollbar for category filter
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default ProductList;