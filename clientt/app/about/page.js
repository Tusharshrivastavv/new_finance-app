"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-black bg-opacity-80 min-h-screen text-white">

        <Navbar />

        <section className="text-center py-24 px-8">
          <h1 className="text-5xl font-bold mb-6 text-gray-100">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Empowering you to take control of your financial future with intelligent insights and smart tools.
          </p>
        </section>

        <section className="py-20 px-8 bg-gray-900 bg-opacity-80 rounded-xl mx-4 md:mx-16 mt-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">Our Mission 💡</h2>
          <p className="text-lg text-center max-w-3xl mx-auto text-gray-300">
            At Intelligent Personal Finance Manager, our mission is to simplify personal finance management and help users achieve their financial goals through intuitive tools, real-time analytics, and actionable insights.
          </p>
        </section>

        <section className="py-20 px-8 bg-gray-800 bg-opacity-90 rounded-xl mx-4 md:mx-16 mt-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">Our Core Values ❤️</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "💎 Transparency", text: "We believe in open communication and clear insights to help you make informed financial decisions." },
              { title: "🤝 Trust", text: "Your data is safe with us. Security and privacy are at the core of our platform." },
              { title: "🚀 Innovation", text: "We continuously improve our platform with cutting-edge technology to give you the best experience." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">{value.title}</h3>
                <p className="text-gray-300">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-8 bg-gray-800 bg-opacity-90 rounded-xl mx-4 md:mx-16 mt-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">Meet Our Team 👨‍💻👩‍💻</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: "Tushar Shrivastav", role: "Founder & Backend Specialist", img: "/tushar.jpeg", desc: "Tushar leads the backend development, ensuring a robust and secure platform." },
              { name: "Sudhanshu Mall", role: "Co-Founder & Frontend Specialist", img: "/sudhanshu.jpeg", desc: "Sudhanshu designs intuitive and user-friendly interfaces for seamless experiences." },
              { name: "Sujal Waighnakar", role: "Co-Founder & AI Engineer", img: "/sujal.jpeg", desc: "Sujal harnesses AI for intelligent insights and financial predictions." }
            ].map((member, index) => (
              <div key={index} className="text-center bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <Image src={member.img} alt={member.name} width={160} height={160} className="rounded-full mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-100">{member.name}</h4>
                <p className="text-gray-400 font-medium">{member.role}</p>
                <p className="text-sm text-gray-300 mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-gray-900 text-white text-center py-6 mt-12">
          <p className="text-sm">© 2025 Intelligent Personal Finance Manager. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default AboutUs;
