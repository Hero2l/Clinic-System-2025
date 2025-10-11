"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  initialData?: Appointment | null;
  onSave: (data: Omit<Appointment, "id"> & { id?: number }) => void;
  onClose: () => void;
}

export default function AppointmentModal({
  isOpen,
  initialData,
  onSave,
  onClose,
}: AppointmentModalProps) {
  const [form, setForm] = useState<Omit<Appointment, "id">>({
    patient: "",
    doctor: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    service: "",
    status: "Pending",
  });

  // 🧠 Populate form when editing
  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(initialData ? { ...form, id: initialData.id } : form);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Appointment" : "Add Appointment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "patient", label: "Patient Name" },
            { key: "doctor", label: "Doctor" },
            { key: "service", label: "Service" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                value={form[field.key as keyof typeof form] as string}
                onChange={(e) =>
                  setForm({ ...form, [field.key]: e.target.value })
                }
                required
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
              />
            </div>
          ))}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
