import Link from "next/link";

export default function Navbarr() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-gray-400 transition-colors duration-300">
            CoinIQ
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <Link href="/family">
            <span className="text-white text-xs sm:text-base lg:text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer whitespace-nowrap">
              Family Mode
            </span>
          </Link>

          <Link href="/">
            <span className="text-white text-xs sm:text-base lg:text-lg font-medium hover:text-gray-400 transition duration-300 cursor-pointer">
              Logout
            </span>
          </Link>

          <Link href="/emi">
            <span className="bg-yellow-500 text-black px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm hover:bg-yellow-400 transition duration-300 cursor-pointer whitespace-nowrap">
              Add EMI
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}