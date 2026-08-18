"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen text-white">

        <Navbar />

        <section className="text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-100">
            About Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Empowering you to take control of your financial future with
            intelligent insights and smart tools.
          </p>
        </section>

        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-900 bg-opacity-80 rounded-xl mx-3 sm:mx-6 md:mx-16 mt-4 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-100">
            Our Mission 💡
          </h2>

          <p className="text-base sm:text-lg text-center max-w-3xl mx-auto text-gray-300 leading-relaxed">
            At Intelligent Personal Finance Manager, our mission is to
            simplify personal finance management and help users achieve their
            financial goals through intuitive tools, real-time analytics, and
            actionable insights.
          </p>
        </section>

        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800 bg-opacity-90 rounded-xl mx-3 sm:mx-6 md:mx-16 mt-4 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-100">
            Our Core Values ❤️
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-10">
            {[
              {
                title: "💎 Transparency",
                text: "We believe in open communication and clear insights to help you make informed financial decisions.",
              },
              {
                title: "🤝 Trust",
                text: "Your data is safe with us. Security and privacy are at the core of our platform.",
              },
              {
                title: "🚀 Innovation",
                text: "We continuously improve our platform with cutting-edge technology to give you the best experience.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-700 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-100">
                  {value.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800 bg-opacity-90 rounded-xl mx-3 sm:mx-6 md:mx-16 mt-4 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-100">
            Meet Our Team 👨‍💻
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-sm text-center bg-gray-700 p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">

              <Image
                src="/tushar.jpeg"
                alt="Tushar Shrivastav"
                width={180}
                height={180}
                className="rounded-full mx-auto mb-4 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-cover"
              />

              <h4 className="text-xl sm:text-2xl font-semibold text-gray-100">
                Tushar Shrivastav
              </h4>

              <p className="text-gray-400 font-medium mt-1 text-sm sm:text-base">
                Founder & Full Stack Developer
              </p>

              <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
                Tushar leads the development of CoinIQ, building and managing
                the platform frontend, backend, database, authentication,
                financial features, and AI-powered functionality.
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white text-center py-5 sm:py-6 mt-8 sm:mt-12 px-4">
          <p className="text-xs sm:text-sm">
            © 2025 Intelligent Personal Finance Manager. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default AboutUs;