import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../main";
import api from "../apiIntercepter";

const Dashboard = () => {
  const [content, setContent] = useState("");

  async function fetchAdminData() {
    try {
      const { data } = await api.get(`/api/v1/admin`, {
        withCredentials: true,
      });
      setContent(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
          Admin Dashboard ⚙️
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Manage users, monitor system activity, and access exclusive admin
          features all in one place.
        </p>

        {content && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-6 py-4 rounded-lg shadow-sm text-center mb-8">
            <p className="font-medium">{content}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">👥 User Management</h2>
            <p className="text-sm opacity-90">
              View and manage all registered users, assign roles, and control
              access.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">📊 Analytics</h2>
            <p className="text-sm opacity-90">
              Track system activity, user engagement, and performance metrics in
              real time.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">🔐 Security</h2>
            <p className="text-sm opacity-90">
              Keep your application safe with advanced authentication and role
              based access controls.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">⚡ Performance</h2>
            <p className="text-sm opacity-90">
              Ensure smooth operations with optimized backend and monitoring
              tools.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Built with ❤️ for Admins to manage the system effortlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
