// File: src/components/EmptyCartIllustration.jsx
import React from "react";

const EmptyCartIllustration = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" stroke="#E5E7EB" strokeWidth="2" />
    <path 
      d="M70 70L50 150H150L130 70H70Z" 
      stroke="#E5E7EB" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    <circle cx="75" cy="65" r="15" stroke="#E5E7EB" strokeWidth="2" />
    <circle cx="125" cy="65" r="15" stroke="#E5E7EB" strokeWidth="2" />
    <path 
      d="M100 50C100 55.5228 95.5228 60 90 60C84.4772 60 80 55.5228 80 50C80 44.4772 84.4772 40 90 40C95.5228 40 100 44.4772 100 50Z" 
      stroke="#D1D5DB" 
      strokeWidth="2"
    />
    <rect x="85" y="85" width="30" height="30" rx="15" fill="#E5E7EB" />
    <path 
      d="M85 100H115" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export default EmptyCartIllustration;