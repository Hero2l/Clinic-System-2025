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
    trend: "up",
    icon: Calendar,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "New Bookings",
    value: 5,
    trend: "up",
    icon: Users,
    color: "from-green-500 to-green-600"
  },
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
    <div className="relative">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
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
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Today Appointments</h3>
              {/* <p className="text-gray-500 text-sm">Latest booking activity</p> */}
            </div>
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
      </div>
    </div>
  );
}