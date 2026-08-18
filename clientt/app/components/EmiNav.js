import Link from 'next/link';

export default function EmiNav() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-4xl font-bold tracking-tight cursor-pointer hover:text-gray-400 transition-colors duration-300">
            CoinIQ
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/dashboard">
            <span className="text-white text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer">
              Back
            </span>
          </Link>
          <Link href="/">
            <span className="text-white text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer">
              Logout
            </span>
          </Link>
          {/* <Link href="/family">
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-400 transition duration-300 cursor-pointer">
              family Mode
            </span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
