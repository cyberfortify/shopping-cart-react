// File: src/components/ProductCard.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = React.memo(({ product }) => {
  const { dispatch } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-center',
      duration: 1500,
      icon: '🛒',
    });
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <LazyLoadImage
          src={product.image}
          alt={product.name}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-500"
          wrapperClassName="w-full h-full"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex-grow">
          <h3 className="font-bold text-gray-900 line-clamp-2 h-12 flex items-center">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {product.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-lg font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={addToCart}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 active:scale-95 shadow-md hover:shadow-lg"
          >
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;