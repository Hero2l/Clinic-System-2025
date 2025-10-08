"use client";

import React, { useState } from "react";
import { Calendar, Clock, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data
const mockDoctors = [
  { id: "dr1", name: "Dr. Smith" },
  { id: "dr2", name: "Dr. Raj Kumar" },
  { id: "dr3", name: "Dr. Lee Kok Seng" },
];

const mockAvailableSlots = {
  "2025-10-15": ["09:00", "10:30", "14:00", "15:30"],
  "2025-10-16": ["08:30", "11:00", "13:30", "16:00"],
  "2025-10-17": ["09:30", "11:30", "14:30", "16:30"],
};

export default function DoctorUnavailableSlotsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    slots: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, doctorId: e.target.value, date: "", slots: [] });
    setErrors({ ...errors, doctorId: "" });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, date: e.target.value, slots: [] });
    setErrors({ ...errors, date: "" });
  };

  const handleSlotToggle = (slot: string) => {
    setForm((prev) => ({
      ...prev,
      slots: prev.slots.includes(slot)
        ? prev.slots.filter((s) => s !== slot)
        : [...prev.slots, slot],
    }));
    if (errors.slots) setErrors({ ...errors, slots: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.doctorId) newErrors.doctorId = "Doctor is required";
    if (!form.date) newErrors.date = "Date is required";
    if (form.slots.length === 0) newErrors.slots = "At least one slot must be selected";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate saving unavailable slots (replace with API call)
    console.log("Saving unavailable slots:", form);
    router.push("/admin/doctors");
  };

  const availableDates = Object.keys(mockAvailableSlots);
  const availableSlots = form.date ? mockAvailableSlots[form.date as keyof typeof mockAvailableSlots] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 p-5">

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Doctor Selection */}
          <div>
            <label htmlFor="doctorId" className="block text-gray-700 font-medium mb-2">
              Doctor *
            </label>
            <select
              id="doctorId"
              name="doctorId"
              value={form.doctorId}
              onChange={handleDoctorChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.doctorId ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select a doctor</option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.doctorId && <p className="text-red-400 text-sm mt-2">{errors.doctorId}</p>}
          </div>

          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={handleDateChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.date ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.date && <p className="text-red-400 text-sm mt-2">{errors.date}</p>}
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Unavailable Slots *</label>
            {form.date && availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSlotToggle(slot)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      form.slots.includes(slot)
                        ? "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Select a date to view available slots</p>
            )}
            {errors.slots && <p className="text-red-400 text-sm mt-2">{errors.slots}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Unavailable Slots
          </button>
          <Link
            href="/admin/doctors"
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-all"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}