"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { signup } from '../utils/api';
import Authsignup from '../authcomponents/authsignup';
import Image from 'next/image'; 

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });

      if (!response.data.success) {
        setErrorMessage(response.data.message);
      } else {
        localStorage.setItem('token', response.data.token);
        router.push('/login');
      }
    } catch (error) {
      setErrorMessage('Signup failed');
    }
  };

  const goToLogin = () => {
    router.push('/login'); 
  };

  return (
    <div className="flex min-h-screen p-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Authsignup />
          <h1 className="text-3xl font-extrabold text-white mb-4">Signup</h1>
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button type="submit" className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300">
              Signup
            </button>
            <button 
              onClick={goToLogin} 
              className="w-full mt-4 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              Already have an account? Login
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 hidden lg:block">
        <div className="relative w-full h-full">
          <Image
            src="/background.WEBP" 
            alt="Finance Image"
            layout="fill" 
            objectFit="cover" 
            className="w-full h-full rounded-r-lg opacity-80" 
          />
        </div>
      </div>
    </div>
  );
}
