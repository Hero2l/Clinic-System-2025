"use client";

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { tableFilter } from "@/lib/hooks/tableFilter";
import TableSection from "../components/TableSection";
import DoctorModal, { Doctor } from "../components/Modal/DoctorModal";

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Smith",
    image: "/images/doctors/smith.jpg",
    specialty: "General Practitioner",
    email: "smith@klinikmekar.com",
    phone: "+60 3-1234 5678",
    unavailableSlots: {
      "2025-10-15": ["09:00", "14:00"],
      "2025-10-16": ["11:00", "13:30"],
    },
  },
  {
    id: 2,
    name: "Dr. Raj Kumar",
    image: "/images/doctors/raj.jpg",
    specialty: "Dentist",
    email: "raj@klinikmekar.com",
    phone: "+60 3-8765 4321",
    unavailableSlots: {
      "2025-10-15": ["10:30", "15:30"],
      "2025-10-17": ["11:30", "16:30"],
    },
  },
  {
    id: 3,
    name: "Dr. Lee Kok Seng",
    image: "/images/doctors/lee.jpg",
    specialty: "Dermatologist",
    email: "lee@klinikmekar.com",
    phone: "+60 3-2468 1357",
    unavailableSlots: {
      "2025-10-16": ["08:30", "16:00"],
      "2025-10-18": ["10:00", "15:00"],
    },
  },
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering logic (using reusable tableFilter hook)
  const {
    filteredData: filteredDoctors,
    filter,
    setFilter,
    badgeFilter,
    setBadgeFilter,
    search,
    setSearch,
    resetFilters,
  } = tableFilter<Doctor>({
    data: doctors,
    searchFields: (doc) => [doc.name, doc.email, doc.specialty],
    getBadge: (doc) => doc.specialty,
  });

  // Add / Edit doctor
  const handleSaveDoctor = (doctor: Doctor | Omit<Doctor, "id">) => {
    if ("id" in doctor) {
      // Update existing doctor
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctor.id ? doctor : d))
      );
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        ...doctor,
        id: Math.max(...doctors.map((d) => d.id)) + 1,
        unavailableSlots: {},
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  // Delete doctor
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="relative">
      {/* Doctor Table Section */}
      <TableSection
        title="Doctors Management"
        data={filteredDoctors}
        columns={[
          {
            key: "name",
            label: "Doctor",
            render: (doc) => (
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="text-gray-900">{doc.name}</span>
              </div>
            ),
          },
          { key: "specialty", label: "Specialty" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
        actions={(doc) => (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setSelectedDoctor(doc);
                setIsModalOpen(true);
              }}
              className="text-teal-500 hover:text-teal-600"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(doc.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        filterState={{
          filter,
          setFilter,
          badgeFilter,
          setBadgeFilter,
          search,
          setSearch,
          resetFilters,
        }}
        badgeOptions={[
          "General Practitioner",
          "Dentist",
          "Dermatologist",
          "Cardiologist",
        ]}
        showDateFilter={false}
        showStatusFilter={false}
        onAdd={() => {
          setSelectedDoctor(null);
          setIsModalOpen(true);
        }}
        addLabel="Add Doctor"
      />

      {/* Add/Edit Modal */}
      <DoctorModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoctor(null);
        }}
        onSave={handleSaveDoctor}
        initialData={selectedDoctor}
      />
    </div>
  );
}
