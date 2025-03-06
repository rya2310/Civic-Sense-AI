import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to Civic Sense AI</p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search complaints..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Notification Bell */}
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </div>
          
          {/* Sign Up and Sign In Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/register"
              className="bg-[#10B981] text-white px-4 py-2 rounded-md hover:bg-[#059669] transition-colors"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;