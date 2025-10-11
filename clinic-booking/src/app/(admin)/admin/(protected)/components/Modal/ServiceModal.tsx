"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Service } from "@/types/services";

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, "id"> | Service) => void; // ✅ id may not exist when adding new
  initialData?: Service | null;
}

export default function ServiceModal({
  open,
  onClose,
  onSave,
  initialData,
}: ServiceModalProps) {
  const [name, setName] = useState("");
  const [deleted, setDeleted] = useState(false);

  // Prefill data when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDeleted(initialData.deletedFlag);
    } else {
      setName("");
      setDeleted(false);
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      name,
      deletedFlag: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {initialData ? "Edit Service" : "Add New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
              placeholder="Enter service name"
              required
            />
          </div>

          {/* Deletion Flag */}
          <div className="flex items-center gap-2">
            <input
              id="deleted"
              type="checkbox"
              checked={deleted}
              onChange={(e) => setDeleted(e.target.checked)}
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
            />
            <label htmlFor="deleted" className="text-sm text-gray-700">
              Mark as deleted
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium"
            >
              {initialData ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
