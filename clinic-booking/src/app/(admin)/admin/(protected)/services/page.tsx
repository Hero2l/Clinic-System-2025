"use client";

import React, { useState } from "react";
import { tableFilter } from "@/lib/hooks/tableFilter";
import { Pencil, Trash2 } from "lucide-react";
import ServiceModal from "../components/Modal/ServiceModal";
import TableSection from "../components/TableSection";
import { Service } from "@/types/services";

const initialServices: Service[] = [
    { id: 1, name: "General Consultation", deletedFlag: false },
    { id: 2, name: "Dental Cleaning", deletedFlag: false },
    { id: 3, name: "Physiotherapy", deletedFlag: true },
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const {
        filteredData,
        filter,
        setFilter,
        badgeFilter,
        setBadgeFilter,
        search,
        setSearch,
        resetFilters,
    } = tableFilter<Service>({
        data: services,
        searchFields: (s) => [s.name],
        getBadge: (s) => (s.deletedFlag ? "Deleted" : "Active"),
    });

    const handleSaveService = (service: Service | Omit<Service, "id">) => {
        if ("id" in service && service.id) {
            // Edit existing
            setServices((prev) =>
                prev.map((s) => (s.id === service.id ? (service as Service) : s))
            );
        } else {
            // Add new
            const newId =
                services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
            setServices((prev) => [
                ...prev,
                { ...(service as Omit<Service, "id">), id: newId },
            ]);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this service?")) {
            setServices((prev) =>
                prev.map((s) => (s.id === id ? { ...s, deleted: true } : s))
            );
        }
    };

    return (
        <>
            <TableSection
                title="Services Management"
                data={filteredData}
                columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Service Name" },
                    {
                        key: "deleted",
                        label: "Status",
                        render: (item) => (
                            <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${item.deletedFlag
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {item.deletedFlag ? "Deleted" : "Active"}
                            </span>
                        ),
                    },
                ]}
                actions={(item) => (
                    <div className="flex items-center gap-2 justify-end">
                        <button
                            onClick={() => {
                                setEditingService(item);
                                setModalOpen(true);
                            }}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
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
                showDateFilter={false}
                showStatusFilter={true}
                onAdd={() => {
                    setEditingService(null);
                    setModalOpen(true);
                }}
                addLabel="Add Service"
            />

            {/* Add/Edit Modal */}
            <ServiceModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveService}
                initialData={editingService}
            />
        </>
    );
}
