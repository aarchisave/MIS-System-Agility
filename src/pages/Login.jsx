import React from 'react';
import { Factory, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agility-green rounded-xl flex items-center justify-center shadow-lg shadow-agility-green/20">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Agility Food Products</h2>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enterprise MIS & Operations Dashboard
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-agility-green focus:border-agility-green sm:text-sm"
                      placeholder="admin@agilityfoods.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-agility-green focus:border-agility-green sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-agility-green focus:ring-agility-green border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-agility-green hover:text-green-600">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-agility-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agility-green transition-colors"
                  >
                    Sign in to Workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden lg:block relative w-0 flex-1 bg-agility-dark">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-agility-dark to-gray-900 opacity-90"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
          src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Manufacturing facility"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-24 text-white z-10">
          <div className="w-16 h-1 bg-agility-green mb-8 rounded-full"></div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Intelligent Operations <br/>
            <span className="text-agility-green">Control Center</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Streamline your food manufacturing, track inventory in real-time, and monitor batch production efficiency with our comprehensive MIS platform.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="border-l-2 border-agility-green pl-4">
              <div className="text-3xl font-bold">99.8%</div>
              <div className="text-sm text-gray-400 mt-1">Uptime SLA</div>
            </div>
            <div className="border-l-2 border-agility-green pl-4">
              <div className="text-3xl font-bold">Real-time</div>
              <div className="text-sm text-gray-400 mt-1">Data Synchronization</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
