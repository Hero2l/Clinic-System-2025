"use client";

import React from "react";
import { Filter, Search } from "lucide-react";
import dynamic from "next/dynamic";

const DatePickerWrapper = dynamic(
    () =>
        import("react-datepicker").then((mod) => {
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

interface TableFilterPanelProps {
    /** Core filter state from the hook */
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
}


/**
 * Generic, reusable filter + search panel for data tables.
 */
export default function TableFilterPanel({
    filterState,
    badgeOptions = ["Popular", "New", "Limited Time"],
    showDateFilter = true,
    showStatusFilter = true,
}: TableFilterPanelProps) {
    const {
        filter,
        setFilter,
        badgeFilter,
        setBadgeFilter,
        dateFilter,
        setDateFilter,
        dateRange,
        setDateRange,
        search,
        setSearch,
        resetFilters,
    } = filterState;

    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 w-full sm:w-auto relative">
                {/* Filter Button */}
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-teal-400"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </button>

                {/* Filter Modal */}
                {isFilterOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/30 z-20"
                            onClick={() => setIsFilterOpen(false)}
                        ></div>
                        <div className="absolute z-30 mt-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-4 left-0 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm font-semibold text-gray-900">Filter Options</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 text-lg"
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Status Filter */}
                            {showStatusFilter && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                        Status
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["All", "Active", "Expired"].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => setFilter(status)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${filter === status
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Badge Filter */}
                            <div className="mb-4">
                                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Badge
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["All", ...badgeOptions].map((badge) => (
                                        <button
                                            key={badge}
                                            onClick={() => setBadgeFilter(badge)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${badgeFilter === badge
                                                ? "bg-teal-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {badge}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date Range Filter */}
                            {showDateFilter && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                        Date Range
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {["All", "Custom"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setDateFilter?.(option)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${dateFilter === option
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    {dateFilter === "Custom" && dateRange && setDateRange && (
                                        <DatePickerWrapper
                                            value={dateRange}
                                            onChange={(range: [Date | null, Date | null]) => setDateRange(range)}
                                            selectsRange
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:ring-2 focus:ring-teal-400"
                                            placeholderText="Select date range"
                                        />
                                    )}
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    resetFilters();
                                    setIsFilterOpen(false);
                                }}
                                className="mt-2 w-full text-center bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-lg py-2 font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </>
                )}

                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
