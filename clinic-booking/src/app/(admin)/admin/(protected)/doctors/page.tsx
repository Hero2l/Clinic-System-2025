"use client";

import React, { useState } from "react";
import { Users, Search, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock doctor data
const doctors = [
  {
    id: "dr1",
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
    id: "dr2",
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
    id: "dr3",
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter and search logic
  const filteredDoctors = doctors
    .filter((doc) => filter === "All" || doc.specialty === filter)
    .filter((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 p-5">

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
          {["All", "General Practitioner", "Dentist", "Dermatologist"].map((specialty) => (
            <button
              key={specialty}
              onClick={() => setFilter(specialty)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === specialty ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image src={doc.image} alt={doc.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                    </div>
                    <span className="ml-3 text-sm text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.specialty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/doctors/edit/${doc.id}`} className="text-teal-500 hover:text-teal-600">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Doctor Button */}
      <div className="mt-6">
        <Link
          href="/admin/doctors/add"
          className="inline-flex items-center px-4 py-2 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Doctor
        </Link>
      </div>
    </div>
  );
}