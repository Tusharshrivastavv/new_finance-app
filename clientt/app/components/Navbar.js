'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-3xl font-extrabold tracking-wide cursor-pointer transition-transform duration-300 hover:scale-110">
            CoinIQ
          </span>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link href="/login">
            <span className="text-white font-medium text-lg px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition duration-300 shadow hover:shadow-md">
              Login
            </span>
          </Link>
          <Link href="/signup">
            <span className="text-white font-medium text-lg px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition duration-300 shadow hover:shadow-md">
              Signup
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
