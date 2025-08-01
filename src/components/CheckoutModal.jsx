// File: src/components/CheckoutModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
            <p className="text-gray-700">Thank you for your purchase. Your order will be processed shortly.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
    