import Link from "next/link";

export default function EmiNav() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-gray-400 transition-colors duration-300">
            CoinIQ
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/dashboard">
            <span className="text-white text-sm sm:text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer">
              Back
            </span>
          </Link>

          <Link href="/">
            <span className="text-white text-sm sm:text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}