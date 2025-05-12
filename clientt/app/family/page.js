"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { loginn } from '../utils/api';
import Authlogin from '../authcomponents/authlogin';
import Image from 'next/image'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true); 
    
    try {
      const response = await loginn({ email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        router.push('/index');
      } else {
        setErrorMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again later.');
    } finally {
      setIsLoading(false); 
    }
  };

  const goToSignup = () => {
    router.push('/signup'); 
  };

  return (
    <div className="p-16 flex min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Authlogin />
          <h1 className="text-3xl font-extrabold text-white mb-4">Family Login</h1>
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
            <button
              type="submit"
              className={`w-full p-3 rounded-lg ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'} text-white transition duration-300`}
              disabled={isLoading} 
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            <button
              onClick={goToSignup}
              type="button"
              className="w-full mt-4 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Dont have an account? Sign Up
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
