"use client";

import React, { useState } from "react";
import { Filter, Search, Plus, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { format, isAfter, parseISO, isWithinInterval } from "date-fns";
import { Promotion } from "@/types/promotion";

const DatePickerWrapper = dynamic(
  () => import("react-datepicker").then((mod) => {
    const DatePicker = mod.default;
    return ({ value, onChange, ...props }: any) => (
      <DatePicker
        selected={value?.[0]}
        startDate={value?.[0]}
        endDate={value?.[1]}
        onChange={onChange}
        {...props}
      />
    );
  }),
  { ssr: false }
);

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: 1,
    image: "/images/klinik-mekar-outside.jpg",
    title: "Comprehensive Health Screening Package",
    description: "Complete health check-up with modern equipment and experienced medical professionals",
    discount: "30% OFF",
    validUntil: "2025-12-31",
    buttonText: "Book Now",
    buttonLink: "/book-screening",
    badge: "Popular",
  },
  {
    id: 2,
    image: "/images/klinik-mekar-interior-2.jpg",
    title: "Vaccination Campaign",
    description: "Protect yourself and your family with our comprehensive vaccination program",
    discount: "FREE Consultation",
    validUntil: "2025-11-30",
    buttonText: "Learn More",
    buttonLink: "/vaccination",
    badge: "Limited Time",
  },
  {
    id: 3,
    image: "/images/klinik-mekar-patient-room.jpg",
    title: "Specialist Consultation Discount",
    description: "Expert medical consultation with our board-certified specialists",
    discount: "25% OFF",
    validUntil: "2025-10-31",
    buttonText: "Schedule Visit",
    buttonLink: "/consultation",
    badge: "New",
  },
];

// Interface for form data when adding/editing promotions
interface PromotionFormData {
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
  image: string;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [filter, setFilter] = useState("All");
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<PromotionFormData>({
    title: "",
    description: "",
    discount: "",
    validUntil: format(new Date(), "yyyy-MM-dd"),
    buttonText: "",
    buttonLink: "",
    badge: "",
    image: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Filter and search logic
  const filteredPromotions = promotions
    .filter((promo) => filter === "All" || 
      (filter === "Active" && isAfter(parseISO(promo.validUntil), new Date())) ||
      (filter === "Expired" && !isAfter(parseISO(promo.validUntil), new Date())))
    .filter((promo) => badgeFilter === "All" || promo.badge === badgeFilter)
    .filter((promo) => dateFilter === "All" || 
      (dateFilter === "Custom" && startDate && endDate && 
        isWithinInterval(parseISO(promo.validUntil), { start: startDate, end: endDate }))
    )
    .filter((promo) =>
      promo.title.toLowerCase().includes(search.toLowerCase()) ||
      promo.description.toLowerCase().includes(search.toLowerCase()) ||
      promo.badge.toLowerCase().includes(search.toLowerCase())
    );

  // Handle form submission for add/edit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      // Update promotion
      setPromotions(
        promotions.map((p) =>
          p.id === editId ? { ...p, ...formData, id: editId } : p
        )
      );
    } else {
      // Add new promotion
      const newPromotion: Promotion = {
        ...formData,
        id: promotions.length + 1,
      };
      setPromotions([...promotions, newPromotion]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      setPromotions(promotions.filter((p) => p.id !== id));
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discount: "",
      validUntil: format(new Date(), "yyyy-MM-dd"),
      buttonText: "",
      buttonLink: "",
      badge: "",
      image: "",
    });
    setEditId(null);
  };

  // Open form for editing
  const openEditForm = (promo: Promotion) => {
    setFormData({
      title: promo.title,
      description: promo.description,
      discount: promo.discount,
      validUntil: promo.validUntil,
      buttonText: promo.buttonText,
      buttonLink: promo.buttonLink,
      badge: promo.badge,
      image: promo.image,
    });
    setEditId(promo.id);
    setIsFormOpen(true);
  };

  return (
    <div className="relative">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Promotions Management</h1>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-teal-400"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          {/* Add New Promotion Button */}
          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 focus:ring-2 focus:ring-teal-400"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Promotion
          </button>

          {/* Filter Modal */}
          {isFilterOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/30 z-20"
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="absolute z-30 mt-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-4 left-0 sm:left-64 lg:left-64 xl:left-64 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-semibold text-gray-900">Filter Promotions</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    &times;
                  </button>
                </div>

                {/* Status Filters */}
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Active", "Expired"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          filter === status ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badge Filters */}
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Badge</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Popular", "New", "Limited Time"].map((badge) => (
                      <button
                        key={badge}
                        onClick={() => setBadgeFilter(badge)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          badgeFilter === badge ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Date Range</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["All", "Custom"].map((dateOption) => (
                      <button
                        key={dateOption}
                        onClick={() => setDateFilter(dateOption)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          dateFilter === dateOption ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {dateOption}
                      </button>
                    ))}
                  </div>
                  {dateFilter === "Custom" && (
                    <div className="mt-2">
                      <DatePickerWrapper
                        value={dateRange}
                        onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                        selectsRange
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:ring-2 focus:ring-teal-400"
                        placeholderText="Select date range"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, description, or badge"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Promotion Modal */}
      {isFormOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-20"
            onClick={() => setIsFormOpen(false)}
          ></div>
          <div className="fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{editId ? "Edit Promotion" : "Add Promotion"}</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount</label>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                  <DatePickerWrapper
                    value={[parseISO(formData.validUntil)]}
                    onChange={(date: Date) => setFormData({ ...formData, validUntil: format(date, "yyyy-MM-dd") })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    dateFormat="yyyy-MM-dd"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Link</label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Badge</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  >
                    <option value="">Select Badge</option>
                    <option value="Popular">Popular</option>
                    <option value="New">New</option>
                    <option value="Limited Time">Limited Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Promotions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPromotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.discount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.validUntil}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      promo.badge === "Popular"
                        ? "bg-blue-100 text-blue-700"
                        : promo.badge === "New"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {promo.badge}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditForm(promo)}
                      className="text-teal-500 hover:text-teal-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                    <Link
                      href={promo.buttonLink}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}