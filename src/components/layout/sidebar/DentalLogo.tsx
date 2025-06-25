
import React from 'react';

interface DentalLogoProps {
  className?: string;
}

export function DentalLogo({ className = "w-10 h-10" }: DentalLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill="url(#gradientBg)" 
        stroke="url(#gradientBorder)" 
        strokeWidth="2"
      />
      
      {/* Tooth shape */}
      <path 
        d="M35 25 C32 25, 28 28, 28 35 C28 42, 30 50, 32 55 C34 60, 36 65, 40 68 C42 70, 44 70, 46 68 C48 65, 50 60, 50 55 C50 60, 52 65, 54 68 C56 70, 58 70, 60 68 C64 65, 66 60, 68 55 C70 50, 72 42, 72 35 C72 28, 68 25, 65 25 C62 25, 60 27, 58 30 C56 32, 54 33, 52 33 C50 33, 48 32, 46 30 C44 27, 42 25, 39 25 Z" 
        fill="white" 
        opacity="0.95"
      />
      
      {/* Dental cross/plus symbol */}
      <rect x="46" y="35" width="8" height="3" fill="url(#gradientAccent)" rx="1"/>
      <rect x="48.5" y="32.5" width="3" height="8" fill="url(#gradientAccent)" rx="1"/>
      
      {/* Shine effect */}
      <ellipse 
        cx="42" 
        cy="32" 
        rx="6" 
        ry="3" 
        fill="white" 
        opacity="0.3" 
        transform="rotate(-20 42 32)"
      />
      
      <defs>
        <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        
        <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        
        <linearGradient id="gradientAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
