"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { login } from '../utils/api';
import Authlogin from '../authcomponents/authlogin';
import Image from 'next/image'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      const response = await login({ email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const goToSignup = () => {
    router.push('/signup'); 
  };

  return (
    <div className="p-16 flex min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Authlogin/>
          <h1 className="text-3xl font-extrabold text-white mb-4">Login</h1>
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
            <button 
              onClick={goToSignup} 
              className="w-full mt-4 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300">
             Don&apos;t have an account? Sign Up
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
