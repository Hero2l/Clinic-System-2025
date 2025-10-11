"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, startOfToday, startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";
import TableFilterPanel from "../components/TableFilterPanel";
import { tableFilter } from "@/lib/hooks/tableFilter";
import TableDisplay from "../components/TableDisplay";
import StatusBadge from "../components/StatusBadge";

// Mock appointment data
const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-15", time: "09:00", service: "General Consultation", status: "Confirmed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Raj Kumar", date: "2025-10-16", time: "11:00", service: "Dental Check-up", status: "Pending" },
  { id: "3", patient: "Alice Johnson", doctor: "Dr. Lee Kok Seng", date: "2025-10-17", time: "14:30", service: "Skin Screening", status: "Cancelled" },
  { id: "4", patient: "Bob Wilson", doctor: "Dr. Smith", date: format(startOfToday(), "yyyy-MM-dd"), time: "10:00", service: "Follow-up", status: "Confirmed" },
];

export default function AppointmentsPage() {

  // TODO: SERVICES PAGE ADMIN
  // TODO: TABLE GLOBAL FOR ADMIN PAGE

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

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortBy === "patient") return a.patient.localeCompare(b.patient);
    if (sortBy === "date") return a.date.localeCompare(b.date);
    return 0;
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
      <TableDisplay
        columns={[
          { key: "patient", label: "Patient" },
          { key: "doctor", label: "Doctor" },
          { key: "date", label: "Date" },
          { key: "time", label: "Time" },
          { key: "service", label: "Service" },
          { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
        ]}
        data={sortedAppointments}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <Link
              href={`/admin/appointments/edit/${row.id}`}
              className="text-teal-500 hover:text-teal-600"
            >
              Edit
            </Link>
            <button className="text-red-500 hover:text-red-600">Cancel</button>
          </div>
        )}
      />

    </div>
  );
}