"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const go = () => {
    router.push('/login');
  };

  const goo = () => {
    router.push('/about');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <section className="relative flex items-center justify-center min-h-[90vh] text-center px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.WEBP')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Manage Your Finances <br /> 
            <span className="text-purple-400">The Smart Way <span className=" bg-black text-white">💡</span></span>
          </h1>

          <p className="text-lg mt-4  text-white">
            Keep track of your income, expenses, and savings effortlessly with real-time analytics and insights.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <button
              onClick={go}
              className="px-8 py-4  bg-black text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-500"
            >
              Get Started
            </button>
            <button
              onClick={goo}
              className="px-8 py-4 border border-white text-white font-semibold rounded-full transition hover:bg-white hover:text-black"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-black">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Choose Our Finance Manager? 💰
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3">📊 Real-Time Analytics</h3>
            <p className="text-gray-400">Gain insights into your financial habits with detailed reports and graphs.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3">💰 Budgeting Made Easy</h3>
            <p className="text-gray-400">Set monthly budgets and track your expenses efficiently.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3">🔐 Secure & Private</h3>
            <p className="text-gray-400">We use industry-standard encryption to keep your data safe.</p>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white text-center py-6">
        <p className="text-sm">© 2025 Intelligent Personal Finance Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}
