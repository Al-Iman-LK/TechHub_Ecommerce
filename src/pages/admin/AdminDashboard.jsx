import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`);
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { stats, recentOrders, lowStockProducts } = dashboardData || {};

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ChartBarIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: UsersIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders?.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.user?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.totalAmount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              )) || <p className="text-gray-500">No recent orders</p>}
            </div>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
              Low Stock Alert
            </h2>
            <div className="space-y-4">
              {lowStockProducts?.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </div>
                  <div>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-200 text-orange-800 rounded-full">
                      {product.quantity} left
                    </span>
                  </div>
                </div>
              )) || <p className="text-gray-500">All products are well stocked</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
