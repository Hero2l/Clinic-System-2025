"use client";
import React, { useState } from 'react';
import {
  Calendar, Users, DollarSign, Clock, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, XCircle, Clock3, User, Stethoscope,
  Bell, Package, Wrench, Activity, BarChart3, ArrowUpRight, AlertTriangle
} from 'lucide-react';

// Mock data
const quickStats = [
  {
    title: "Today's Appointments",
    value: 12,
    change: "+2 from yesterday",
    trend: "up",
    icon: Calendar,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "New Bookings",
    value: 5,
    change: "Last 24 hours",
    trend: "up",
    icon: Users,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Revenue",
    value: "$1,200",
    change: "+15% from yesterday",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Open Slots",
    value: 45,
    change: "Available today",
    trend: "neutral",
    icon: Clock,
    color: "from-orange-500 to-orange-600"
  }
];

const recentAppointments = [
  { id: 1, patient: "Sarah Johnson", doctor: "Dr. Smith", time: "09:00 AM", status: "Confirmed", service: "General Checkup" },
  { id: 2, patient: "Michael Chen", doctor: "Dr. Williams", time: "09:30 AM", status: "Confirmed", service: "Dental" },
  { id: 3, patient: "Emma Davis", doctor: "Dr. Smith", time: "10:00 AM", status: "Cancelled", service: "Consultation" },
  { id: 4, patient: "James Wilson", doctor: "Dr. Brown", time: "10:30 AM", status: "Confirmed", service: "Follow-up" },
  { id: 5, patient: "Olivia Martinez", doctor: "Dr. Williams", time: "11:00 AM", status: "Pending", service: "Vaccination" },
];

const doctorLoad = [
  { name: "Dr. Smith", filled: 8, total: 10, percentage: 80, status: "normal" },
  { name: "Dr. Williams", filled: 9, total: 10, percentage: 90, status: "high" },
  { name: "Dr. Brown", filled: 6, total: 10, percentage: 60, status: "normal" },
  { name: "Dr. Johnson", filled: 10, total: 10, percentage: 100, status: "full" },
];

const alerts = [
  { id: 1, type: "warning", icon: AlertTriangle, title: "Potential No-Show", message: "3 patients haven't confirmed today's appointments", time: "5 min ago" },
  { id: 2, type: "error", icon: Package, title: "Low Stock Alert", message: "Paracetamol stock below minimum threshold", time: "1 hour ago" },
  { id: 3, type: "info", icon: Wrench, title: "Maintenance Reminder", message: "Equipment calibration due next week", time: "2 hours ago" },
  { id: 4, type: "warning", icon: Calendar, title: "Overbooking Alert", message: "Dr. Johnson has exceeded capacity", time: "3 hours ago" },
];

const bookingTrendsData = [
  { day: "Mon", bookings: 25, service1: 10, service2: 8, service3: 7 },
  { day: "Tue", bookings: 32, service1: 12, service2: 11, service3: 9 },
  { day: "Wed", bookings: 28, service1: 11, service2: 9, service3: 8 },
  { day: "Thu", bookings: 35, service1: 14, service2: 12, service3: 9 },
  { day: "Fri", bookings: 30, service1: 12, service2: 10, service3: 8 },
  { day: "Sat", bookings: 22, service1: 9, service2: 7, service3: 6 },
  { day: "Sun", bookings: 18, service1: 7, service2: 6, service3: 5 },
];

export default function AdminDashboardPage() {
  const [timeFilter, setTimeFilter] = useState('Today');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock3 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white rounded-xl p-1 w-fit border border-gray-200 shadow-sm">
          {['Today', 'This Week', 'This Month'].map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeFilter(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === tab
                  ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend === 'up' && (
                <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                </div>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
            <p className="text-gray-400 text-xs">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
              <p className="text-gray-500 text-sm">Latest booking activity</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Service</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{appointment.patient}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{appointment.doctor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{appointment.service}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{appointment.time}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span>{appointment.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
              <p className="text-gray-500 text-sm">Important notifications</p>
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border ${getAlertColor(alert.type)} transition-all hover:shadow-md`}>
                <div className="flex items-start space-x-3">
                  <alert.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1">{alert.title}</p>
                    <p className="text-xs opacity-80 mb-2">{alert.message}</p>
                    <p className="text-xs opacity-60">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Booking Trends</h3>
              <p className="text-gray-500 text-sm">Weekly overview by service</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          {/* Chart */}
          <div className="relative h-64 mb-4">
            <div className="absolute inset-0 flex items-end justify-between px-4">
              {bookingTrendsData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full max-w-16 space-y-1">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-blue-400 to-blue-500"
                      style={{ height: `${(item.service1 / 15) * 120}px` }}
                    />
                    <div
                      className="w-full bg-gradient-to-t from-purple-400 to-purple-500"
                      style={{ height: `${(item.service2 / 15) * 120}px` }}
                    />
                    <div
                      className="w-full rounded-b bg-gradient-to-t from-pink-400 to-pink-500"
                      style={{ height: `${(item.service3 / 15) * 120}px` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{item.day}</span>
                  <span className="text-xs font-bold text-gray-900">{item.bookings}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
              <span className="text-xs text-gray-600">General Checkup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-500" />
              <span className="text-xs text-gray-600">Dental</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500" />
              <span className="text-xs text-gray-600">Consultation</span>
            </div>
          </div>
        </div>

        {/* Doctor Load */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Doctor Load</h3>
              <p className="text-gray-500 text-sm">Staff capacity today</p>
            </div>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {doctorLoad.map((doctor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 text-sm">{doctor.name}</span>
                  <span className="text-xs font-semibold text-gray-600">
                    {doctor.filled}/{doctor.total}
                  </span>
                </div>
                <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                      doctor.status === 'full'
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : doctor.status === 'high'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                    style={{ width: `${doctor.percentage}%` }}
                  />
                </div>
                {doctor.status === 'full' && (
                  <div className="flex items-center space-x-1 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Fully booked</span>
                  </div>
                )}
                {doctor.status === 'high' && (
                  <div className="flex items-center space-x-1 text-orange-600 text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    <span>High capacity</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}