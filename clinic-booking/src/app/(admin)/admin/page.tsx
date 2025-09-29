// src/app/(admin)/admin/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import {
  Search, Bell, MessageSquare, Calendar, Users, FileText, Settings, HelpCircle, ChevronDown, TrendingUp, TrendingDown,
  MoreHorizontal, X, BarChart3, Activity, User, Stethoscope, Building2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
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

const teamMembers = [
  {
    id: 1,
    name: "Lora Hudson",
    role: "Cardiologist",
    isYou: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Leatrice Handler",
    role: "Clinical Assistant Professor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Geoffrey Charlebois",
    role: "Clinical Associate Director",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Hannah Burress",
    role: "Nurse Practitioner",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Clark Kent",
    role: "Consultant Cardiologist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Louis Bellefeuille",
    role: "Electrophysiologist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Cyndy Lillibridge",
    role: "Nurse Practitioner",
    avatar: "CL",
    isInitials: true
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

export default function AdminDashboard() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('Today');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('isAdminAuthenticated');
      if (!authenticated) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

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
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 z-10">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-gray-800">MedAdmin</span>
          </div>
        </div>

        {/* Welcome Card */}
        {showWelcome && (
          <div className="m-4 p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-xl relative">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Good Morning,</h3>
                <p className="font-bold text-lg text-gray-900">Lora!</p>
                <p className="text-xs text-gray-600 mt-1">You have</p>
                <p className="text-sm text-blue-600 font-semibold">5 messages &</p>
                <p className="text-sm text-blue-600 font-semibold">2 notifications</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4">
          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-xl font-medium">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors relative">
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
              <span className="absolute right-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Users className="w-5 h-5" />
              <span>Patients</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Building2 className="w-5 h-5" />
              <span>Administration</span>
            </a>
          </div>

          <div className="px-4 mt-8 pt-4 border-t border-gray-100 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                  <MessageSquare className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
                </button>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                </button>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Lora Hudson</p>
                  <p className="text-sm text-gray-500">Cardiologists</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Your Today's Team</h3>
                  <p className="text-gray-500 text-sm">{teamMembers.length} people</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    {member.isInitials ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {member.avatar}
                      </div>
                    ) : (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {member.name} {member.isYou && <span className="text-blue-600">(You)</span>}
                      </p>
                      <p className="text-gray-500 text-xs truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}