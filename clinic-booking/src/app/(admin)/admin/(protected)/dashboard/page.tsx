// src/app/(admin)/admin/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import {
  Search, Bell, MessageSquare, Calendar, Users, FileText, Settings, HelpCircle, ChevronDown, TrendingUp, TrendingDown,
  MoreHorizontal, X, BarChart3, Activity, User, Stethoscope, Building2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/useAuth';
// Mock data
const statsData = [
  {
    title: "New Patients",
    value: 8,
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Patients Left",
    value: 2,
    trend: "down",
    icon: TrendingDown,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Total Patients",
    value: 43,
    trend: "up",
    icon: Activity,
    color: "from-red-500 to-red-600"
  },
  {
    title: "Planned Surgeries",
    value: 3,
    trend: "up",
    icon: Stethoscope,
    color: "from-purple-500 to-purple-600"
  }
];

const chartData = [
  { day: "M", value: 35, label: "14" },
  { day: "T", value: 40, label: "15" },
  { day: "W", value: 38, label: "16" },
  { day: "T", value: 45, label: "17", isToday: true },
  { day: "F", value: 30, label: "18" },
  { day: "S", value: 25, label: "19" },
  { day: "S", value: 20, label: "20" }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Today');

  const { isAuthenticated, isLoading } = useAuth("/admin/login");

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Dashboard Content */}
      <main className="p-5">
        {/* Time Filter Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 w-fit">
            {['Today', 'Last week', 'Last month'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patients Overview Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patients Overview</h3>
                <p className="text-gray-500 text-sm">Thursday, 17 Nov 2023</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Chart Area */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between px-8">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 rounded-t-lg transition-all duration-300 ${item.isToday
                        ? 'bg-gradient-to-t from-red-500 to-blue-500'
                        : 'bg-gradient-to-t from-red-200 to-blue-200'
                        }`}
                      style={{ height: `${item.value * 4}px` }}
                    />
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.isToday
                      ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                      }`}>
                      {item.day} {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 20, 40, 60].map((line) => (
                  <div
                    key={line}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${100 - (line / 60 * 100)}%` }}
                  />
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
                <span>60</span>
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
            </div>

            <div className="mt-4 text-right">
              <span className="text-2xl font-bold text-gray-900">43</span>
              <span className="text-gray-500 ml-1">patients</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}