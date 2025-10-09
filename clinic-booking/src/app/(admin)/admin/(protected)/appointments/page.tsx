"use client";

import React, { useState } from "react";
import { Calendar, Users, FileText, Search, ChevronDown, MoreHorizontal, Filter } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { format, startOfToday, startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";

const DatePickerWrapper = dynamic(
  () => import("react-datepicker").then((mod) => {
    const DatePicker = mod.default;
    return ({ value, onChange, ...props }: any) => (
      <DatePicker
        selected={value?.[0]}
        startDate={value?.[0]}
        endDate={value?.[1]}
        onChange={onChange}
        {...props}
      />
    );
  }),
  { ssr: false }
);

// Rest of your code stays the same...

// Mock appointment data
const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-15", time: "09:00", service: "General Consultation", status: "Confirmed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Raj Kumar", date: "2025-10-16", time: "11:00", service: "Dental Check-up", status: "Pending" },
  { id: "3", patient: "Alice Johnson", doctor: "Dr. Lee Kok Seng", date: "2025-10-17", time: "14:30", service: "Skin Screening", status: "Cancelled" },
  { id: "4", patient: "Bob Wilson", doctor: "Dr. Smith", date: format(startOfToday(), "yyyy-MM-dd"), time: "10:00", service: "Follow-up", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [dateFilter, setDateFilter] = useState("All");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Date filtering logic
  const today = startOfToday();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const filteredAppointments = appointments
    .filter((appt) => filter === "All" || appt.status === filter)
    .filter((appt) =>
      appt.patient.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      appt.service.toLowerCase().includes(search.toLowerCase())
    )
    .filter((appt) => {
      const apptDate = parseISO(appt.date);
      if (dateFilter === "Today") {
        return format(apptDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      } else if (dateFilter === "This Week") {
        return isWithinInterval(apptDate, { start: weekStart, end: weekEnd });
      } else if (dateFilter === "Custom" && startDate && endDate) {
        return isWithinInterval(apptDate, { start: startDate, end: endDate });
      }
      return true; // "All" shows all appointments
    })
    .sort((a, b) => (sortBy === "date" ? a.date.localeCompare(b.date) : a.patient.localeCompare(b.patient)));

  return (
    <div className="relative">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Appointment Listing</h1>

      {/* Filters and Search */}
      <div className="flex justify-between items-center gap-4 mb-6">
        {/* Left: Filter Button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-teal-400"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          {/* Floating Filter Card */}
          {isFilterOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/30 z-20"
                onClick={() => setIsFilterOpen(false)}
              ></div>
              {/* Filter Card */}
              <div className="absolute z-30 mt-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-4 left-0 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-semibold text-gray-900">Filter Appointments</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    &times;
                  </button>
                </div>

                {/* Status Filters */}
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${filter === status ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filters */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Date</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["All", "Today", "This Week", "Custom"].map((dateOption) => (
                      <button
                        key={dateOption}
                        onClick={() => setDateFilter(dateOption)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${dateFilter === dateOption ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {dateOption}
                      </button>
                    ))}
                  </div>
                  {dateFilter === "Custom" && (
                    <div className="mt-2">
                      <DatePickerWrapper
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:ring-2 focus:ring-teal-400"
                        placeholderText="Select date range"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Search Input and Sort */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
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
                    className={`px-2 py-1 text-xs font-medium rounded-full ${appt.status === "Confirmed"
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