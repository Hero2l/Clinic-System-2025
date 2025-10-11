"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Promotion } from "@/types/promotion";

export type PromotionFormData = Omit<Promotion, "id">;

interface PromotionModalProps {
  isOpen: boolean;
  initialData?: Promotion | null;
  onSave: (data: PromotionFormData) => void;
  onClose: () => void;
}

export default function PromotionModal({
  isOpen,
  initialData,
  onSave,
  onClose,
}: PromotionModalProps) {
  const [form, setForm] = useState<PromotionFormData>({
    title: "",
    description: "",
    discount: "",
    validUntil: format(new Date(), "yyyy-MM-dd"),
    buttonText: "",
    buttonLink: "",
    badge: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      // Copy all fields except `id`
      const { id, ...rest } = initialData;
      setForm(rest);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Promotion" : "Add Promotion"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", textarea: true },
            { key: "discount", label: "Discount" },
            { key: "validUntil", label: "Valid Until", type: "date" },
            { key: "buttonText", label: "Button Text" },
            { key: "buttonLink", label: "Button Link" },
            { key: "badge", label: "Badge" },
            { key: "image", label: "Image URL" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700">
                {f.label}
              </label>
              {f.textarea ? (
                <textarea
                  value={form[f.key as keyof PromotionFormData] as string}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                  rows={3}
                  required
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.key as keyof PromotionFormData] as string}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                  required
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
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
