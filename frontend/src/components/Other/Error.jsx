import React from 'react'
import { NavLink } from 'react-router';


const Error = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-8">
            {/* 404 Number */}
            <h1 className="text-9xl font-bold text-gray-900 animate-bounce">
              404
            </h1>
            
            {/* Emoji and Heading */}
            <div className="space-y-4">
              <div className="text-7xl">😵</div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Page Not Found
              </h2>
            </div>
    
            {/* Description */}
            <p className="text-gray-600 text-lg">
              Oops! The page you're looking for seems to have vanished into the void.
            </p>
    
            {/* Home Button */}
            <NavLink
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
              hover:bg-blue-700 transition-colors duration-300"
            >
              Return to Homepage
            </NavLink>
          </div>
        </div>
      );
    };
    

export default Error