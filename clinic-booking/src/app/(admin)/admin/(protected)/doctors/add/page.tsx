"use client";

import React, { useState } from "react";
import { Users, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddDoctorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    image: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors({ ...errors, image: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.specialty) newErrors.specialty = "Specialty is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate form submission (replace with actual API call)
    console.log("Submitting doctor:", form);
    router.push("/admin/doctors");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Enter doctor's name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
          </div>

          {/* Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-gray-700 font-medium mb-2">
              Specialty *
            </label>
            <select
              id="specialty"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.specialty ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select a specialty</option>
              <option value="General Practitioner">General Practitioner</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Other">Other</option>
            </select>
            {errors.specialty && <p className="text-red-400 text-sm mt-2">{errors.specialty}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Enter doctor's email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.phone ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Enter doctor's phone"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Profile Image *
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all ${
                errors.image ? "border-red-400" : "border-gray-200"
              }`}
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}
            {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Doctor
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