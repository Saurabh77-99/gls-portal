"use client";

import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    console.log("Dashboard page loaded successfully!");
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Login Successful!
          </h1>
          <p className="text-lg mb-4">
            Welcome to the GLSBTECH Recruiter Dashboard
          </p>
          <p className="text-gray-600 mb-6">
            You have been successfully authenticated. The dashboard is working!
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;