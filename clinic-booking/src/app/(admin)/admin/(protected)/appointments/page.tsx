"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, startOfToday, startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";
import TableFilterPanel from "../components/TableFilterPanel";
import { tableFilter } from "@/lib/hooks/tableFilter";

// Mock appointment data
const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-15", time: "09:00", service: "General Consultation", status: "Confirmed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Raj Kumar", date: "2025-10-16", time: "11:00", service: "Dental Check-up", status: "Pending" },
  { id: "3", patient: "Alice Johnson", doctor: "Dr. Lee Kok Seng", date: "2025-10-17", time: "14:30", service: "Skin Screening", status: "Cancelled" },
  { id: "4", patient: "Bob Wilson", doctor: "Dr. Smith", date: format(startOfToday(), "yyyy-MM-dd"), time: "10:00", service: "Follow-up", status: "Confirmed" },
];

export default function AppointmentsPage() {

  // TODO: SERVICES PAGE ADMIN

  // Date filtering logic
  const today = startOfToday();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const [sortBy, setSortBy] = useState("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    filteredData: filteredAppointments,
    filter,
    setFilter,
    badgeFilter,
    setBadgeFilter,
    dateFilter,
    setDateFilter,
    dateRange,
    setDateRange,
    search,
    setSearch,
    resetFilters,
  } = tableFilter({
    data: appointments,
    searchFields: (appt) => [appt.patient, appt.doctor, appt.service],
    getDate: (appt) => appt.date,
    getBadge: (appt) => appt.status, // treat status as "badge"
  });


  return (
    <div className="relative">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Appointment Listing</h1>

      {/* Filters, Search, and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <TableFilterPanel
          filterState={{
            filter,
            setFilter,
            badgeFilter,
            setBadgeFilter,
            dateFilter,
            setDateFilter,
            dateRange,
            setDateRange,
            search,
            setSearch,
            resetFilters,
          }}
          badgeOptions={["Confirmed", "Pending", "Cancelled"]}
          showDateFilter={true}
          showStatusFilter={false} // appointments already have status
        />

        {/* Optional Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-teal-400"
        >
          <option value="date">Sort by Date</option>
          <option value="patient">Sort by Patient</option>
        </select>
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