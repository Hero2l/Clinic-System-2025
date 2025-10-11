"use client";

import React from "react";
import TableFilterPanel from "./TableFilterPanel";
import TableDisplay from "./TableDisplay";
import { Plus } from "lucide-react";

interface TableSectionProps<T> {
    title: string;
    columns: {
        key: keyof T | string;
        label: string;
        render?: (item: T) => React.ReactNode;
        className?: string;
    }[];
    data: T[];
    actions?: (item: T) => React.ReactNode;

    /** Props passed to the filter panel */
    filterState: {
        filter: string;
        setFilter: (v: string) => void;
        badgeFilter: string;
        setBadgeFilter: (v: string) => void;
        dateFilter?: string;
        setDateFilter?: (v: string) => void;
        dateRange?: [Date | null, Date | null];
        setDateRange?: (v: [Date | null, Date | null]) => void;
        search: string;
        setSearch: (v: string) => void;
        resetFilters: () => void;
    };

    badgeOptions?: string[];
    showDateFilter?: boolean;
    showStatusFilter?: boolean;
    emptyMessage?: string;

    /** Optional Add button */
    onAdd?: () => void;
    addLabel?: string;
}

export default function TableSection<T>({
    title,
    columns,
    data,
    actions,
    filterState,
    badgeOptions,
    showDateFilter = true,
    showStatusFilter = true,
    emptyMessage = "No records found.",
    onAdd,
    addLabel = "Add New",
}: TableSectionProps<T>) {
    return (
        <div className="relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Filter Panel and Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div className="w-full sm:w-auto flex-grow">
                    <TableFilterPanel
                        filterState={filterState}
                        badgeOptions={badgeOptions}
                        showDateFilter={showDateFilter}
                        showStatusFilter={showStatusFilter}
                    />
                </div>
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 focus:ring-2 focus:ring-teal-400"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {addLabel}
                    </button>
                )}
            </div>

            {/* Table */}
            <TableDisplay
                columns={columns}
                data={data}
                actions={actions}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
