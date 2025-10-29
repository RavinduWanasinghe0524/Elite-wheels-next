'use client';

import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-lg animate-fade-in-down text-text-primary">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-4 py-2 font-bold rounded-full ${isLogin ? 'bg-accent text-white' : 'bg-gray-600'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-full ${!isLogin ? 'bg-accent text-white' : 'bg-gray-600'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        {isLogin ? (
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-text-primary">Username</label>
              <input
                id="username"
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div>
              <label htmlFor="password"className="text-sm font-medium text-text-primary">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-primary">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-accent hover:text-blue-500">Forgot your password?</a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Sign In
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6">
            <div>
              <label htmlFor="username-up" className="text-sm font-medium text-text-primary">Username</label>
              <input
                id="username-up"
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div>
              <label htmlFor="email-up" className="text-sm font-medium text-text-primary">Email Address</label>
              <input
                id="email-up"
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div>
              <label htmlFor="password-up" className="text-sm font-medium text-text-primary">Password</label>
              <input
                id="password-up"
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div>
              <label htmlFor="confirm-password-up" className="text-sm font-medium text-text-primary">Confirm Password</label>
              <input
                id="confirm-password-up"
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent bg-primary"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}