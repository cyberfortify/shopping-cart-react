// File: src/components/Cart.jsx
import React, { useMemo } from "react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import { useCart } from "../context/CartContext";
import { XCircleIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import EmptyCartIllustration from "./EmptyCartIllustration"; // You'll create this component

const Cart = () => {
  const { cart, dispatch } = useCart();

  const [showModal, setShowModal] = useState(false);


  const handleQuantityChange = (id, change) => {
    const item = cart.find(i => i.id === id);
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Calculate totals efficiently
  const { total, itemsCount } = useMemo(() => {
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { total, itemsCount };
  }, [cart]);

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
              {cart.length > 0
                ? `You have ${itemsCount} item${itemsCount !== 1 ? 's' : ''} in your cart`
                : "Let's fill it up!"}
            </p>
          </div>

          {cart.length > 0 && (
            <Link
              to="/products"
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </Link>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
            <EmptyCartIllustration className="w-64 h-64 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mt-6">Your Cart is Empty</h3>
            <p className="text-gray-600 mt-2 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 text-gray-600 font-medium p-4 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 items-center transition-all hover:bg-gray-50"
                  >
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-6 flex items-center">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-12 md:col-span-3 flex justify-center">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusCircleIcon className="w-6 h-6" />
                        </button>

                        <span className="px-3 text-lg font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusCircleIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-6 md:col-span-2 text-right font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-6 md:col-span-1 text-right">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <XCircleIcon className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{(total * 0.18).toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{(total * 1.18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                </button>

                <CheckoutModal isOpen={showModal} onClose={() => setShowModal(false)} />


                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Free shipping and 30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;