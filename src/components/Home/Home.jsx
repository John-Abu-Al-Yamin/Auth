import React from "react";
import { FaBuilding } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50">
        <div>
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <FaBuilding className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Our Platform
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
