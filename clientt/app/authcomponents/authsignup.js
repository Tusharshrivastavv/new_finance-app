import Link from 'next/link';
import React from 'react';

const AuthSignup = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-3xl font-extrabold tracking-wide cursor-pointer transition-transform transform hover:scale-105">
            CoinIQ
          </span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/about">
            <span className="text-white font-medium text-lg cursor-pointer transition duration-300 hover:text-gray-200 hover:underline">
              About Us
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthSignup;
