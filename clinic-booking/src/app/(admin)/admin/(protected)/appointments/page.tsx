"use client";

import React, { useState } from "react";
import { Calendar, Users, FileText, Search, ChevronDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Mock appointment data
const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-15", time: "09:00", service: "General Consultation", status: "Confirmed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Raj Kumar", date: "2025-10-16", time: "11:00", service: "Dental Check-up", status: "Pending" },
  { id: "3", patient: "Alice Johnson", doctor: "Dr. Lee Kok Seng", date: "2025-10-17", time: "14:30", service: "Skin Screening", status: "Cancelled" },
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filter and search logic
  const filteredAppointments = appointments
    .filter((appt) => filter === "All" || appt.status === filter)
    .filter((appt) =>
      appt.patient.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      appt.service.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortBy === "date" ? a.date.localeCompare(b.date) : a.patient.localeCompare(b.patient)));

  return (
    <div className="min-h-screen bg-gray-50 p-5">

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, doctor, or service"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-400"
          >
            <option value="date">Sort by Date</option>
            <option value="patient">Sort by Patient</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appt.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appt.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.service}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      appt.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/appointments/edit/${appt.id}`}
                      className="text-teal-500 hover:text-teal-600"
                    >
                      Edit
                    </Link>
                    <button className="text-red-500 hover:text-red-600">Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}