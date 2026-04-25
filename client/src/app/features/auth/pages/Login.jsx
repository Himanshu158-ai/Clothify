import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handelLogin } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await handelLogin({ email, password });
    console.log('Login attempt with:', { email });
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Form Section */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-md">
          {/* Logo / Brand Name */}
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-3xl font-light tracking-widest text-neutral-900">
              CLOTHIFY
            </h1>
            <p className="mt-2 text-sm text-neutral-500 uppercase tracking-widest">
              Exclusive Member Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-800"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border-b border-neutral-300 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-800"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border-b border-neutral-300 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:text-sm transition-colors duration-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center overflow-hidden bg-neutral-900 px-3 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-[#A68A64] transition-all duration-300 ease-out group-hover:h-full"></span>
                <span className="relative z-10 transition-colors duration-300">Sign In</span>
              </button>

              <button
                type="button"
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-neutral-300 bg-transparent px-3 py-4 text-sm font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-neutral-100 transition-all duration-300 ease-out group-hover:h-full"></span>
                <div className="relative z-10 flex items-center gap-3 transition-colors duration-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </div>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold leading-6 text-neutral-900 hover:text-neutral-700 underline underline-offset-4"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-neutral-100 mix-blend-multiply opacity-20 z-10"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover grayscale-[20%]"
          src="/model_poster.png"
          alt="Luxury fashion model poster"
        />
      </div>
    </div>
  );
};

export default Login;
