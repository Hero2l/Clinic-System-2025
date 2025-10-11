"use client";

import React, { useState } from "react";
import { format, startOfToday } from "date-fns";
import { Edit, Trash } from "lucide-react";

import TableSection from "../components/TableSection";
import StatusBadge from "../components/StatusBadge";
import { tableFilter } from "@/lib/hooks/tableFilter";
import AppointmentModal from "../components/Modal/AppointmentModal";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

// ✅ Mock appointment data
const mockAppointments: Appointment[] = [
  { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-15", time: "09:00", service: "General Consultation", status: "Confirmed" },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Raj Kumar", date: "2025-10-16", time: "11:00", service: "Dental Check-up", status: "Pending" },
  { id: 3, patient: "Alice Johnson", doctor: "Dr. Lee Kok Seng", date: "2025-10-17", time: "14:30", service: "Skin Screening", status: "Cancelled" },
  { id: 4, patient: "Bob Wilson", doctor: "Dr. Smith", date: format(startOfToday(), "yyyy-MM-dd"), time: "10:00", service: "Follow-up", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // 🧮 Filtering logic
  const {
    filteredData,
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
  } = tableFilter<Appointment>({
    data: appointments,
    searchFields: (appt) => [appt.patient, appt.doctor, appt.service],
    getDate: (appt) => appt.date,
    getBadge: (appt) => appt.status,
  });

  // 💾 Handle Save (Add/Edit)
  const handleSave = (data: Omit<Appointment, "id"> & { id?: number }) => {
    if (selectedAppointment) {
      // Update existing
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, ...data, id: selectedAppointment.id } : appt
        )
      );
    } else {
      // Add new
      const newAppt: Appointment = {
        ...data,
        id: appointments.length > 0 ? Math.max(...appointments.map((a) => a.id)) + 1 : 1,
      };
      setAppointments((prev) => [...prev, newAppt]);
    }
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // ❌ Delete
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <>
      <TableSection
        title="Appointments Management"
        data={filteredData}
        columns={[
          { key: "patient", label: "Patient" },
          { key: "doctor", label: "Doctor" },
          { key: "date", label: "Date" },
          { key: "time", label: "Time" },
          { key: "service", label: "Service" },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setSelectedAppointment(row);
                setIsModalOpen(true);
              }}
              className="text-teal-500 hover:text-teal-600"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        )}
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
        showDateFilter
        showStatusFilter={false}
        onAdd={() => {
          setSelectedAppointment(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Appointment"
      />

      {/* 🪟 Modal for Add/Edit */}
      <AppointmentModal
        isOpen={isModalOpen}
        initialData={selectedAppointment}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
