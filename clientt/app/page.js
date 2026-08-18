"use client";

import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Home() {
  const router = useRouter();

  const go = () => {
    router.push("/login");
  };

  const goo = () => {
    router.push("/about");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navbar />

      <section className="relative flex items-center justify-center min-h-[85vh] md:min-h-[90vh] text-center px-4 sm:px-6 bg-gradient-to-r from-gray-900 to-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/background.WEBP')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        <div className="relative z-10 w-full max-w-3xl text-white py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Manage Your Finances <br />
            <span className="text-purple-400">
              The Smart Way{" "}
              <span className="bg-black text-white">💡</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg mt-5 text-white max-w-2xl mx-auto leading-relaxed">
            Keep track of your income, expenses, and savings effortlessly with
            real-time analytics and insights.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button
              onClick={go}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-500"
            >
              Get Started
            </button>

            <button
              onClick={goo}
              className="w-full sm:w-auto px-8 py-4 border border-white text-white font-semibold rounded-full transition hover:bg-white hover:text-black"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-black">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 sm:mb-12">
          Why Choose Our Finance Manager? 💰
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              📊 Real-Time Analytics
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Gain insights into your financial habits with detailed reports
              and graphs.
            </p>
          </div>

          <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              💰 Budgeting Made Easy
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Set monthly budgets and track your expenses efficiently.
            </p>
          </div>

          <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              🔐 Secure & Private
            </h3>

            <p className="text-gray-400 leading-relaxed">
              We use industry-standard encryption to keep your data safe.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white text-center py-6 px-4">
        <p className="text-xs sm:text-sm">
          © 2025 Intelligent Personal Finance Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}