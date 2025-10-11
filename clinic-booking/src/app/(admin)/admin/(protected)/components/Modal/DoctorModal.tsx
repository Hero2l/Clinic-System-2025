"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface Doctor {
  id: number;
  name: string;
  image: string;
  specialty: string;
  email: string;
  phone: string;
  unavailableSlots: Record<string, string[]>;
}

interface DoctorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (doctor: Doctor | Omit<Doctor, "id">) => void;
  initialData?: Doctor | null;
}

export default function DoctorModal({
  open,
  onClose,
  onSave,
  initialData,
}: DoctorModalProps) {
  const [form, setForm] = useState<Omit<Doctor, "id" | "unavailableSlots">>({
    name: "",
    image: "",
    specialty: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      const { id, unavailableSlots, ...rest } = initialData;
      setForm(rest);
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoctor: Doctor | Omit<Doctor, "id"> = initialData
      ? { ...initialData, ...form }
      : {
          ...form,
          id: Math.floor(Math.random() * 100000),
          unavailableSlots: {},
        };

    onSave(newDoctor);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", label: "Full Name" },
            { key: "specialty", label: "Specialty" },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone" },
            { key: "image", label: "Profile Image URL" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                value={form[f.key as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          ))}

          {/* Image Preview */}
          {form.image && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border">
              <Image
                src={form.image}
                alt={form.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

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
