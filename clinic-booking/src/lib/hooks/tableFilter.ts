"use client";

import { useState, useMemo } from "react";
import { isAfter, parseISO, isWithinInterval } from "date-fns";

export interface TableFilterOptions<T> {
    /** The full dataset (e.g. promotions, products, etc.) */
    data: T[];
    /** Optional function to define how search is performed */
    searchFields?: (item: T) => string[];
    /** Optional function to define how to parse date */
    getDate?: (item: T) => string | null;
    /** Optional function to define how to read a badge-like field */
    getBadge?: (item: T) => string | null;
}

/** Hook return type */
export interface TableFilter<T> {
    filteredData: T[];
    filter: string;
    setFilter: (val: string) => void;
    badgeFilter: string;
    setBadgeFilter: (val: string) => void;
    dateFilter: string;
    setDateFilter: (val: string) => void;
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
    search: string;
    setSearch: (val: string) => void;
    resetFilters: () => void;
}

/**
 * A global reusable filtering hook that can work with any dataset.
 * It handles:
 *  - Status filter (Active/Expired/All)
 *  - Badge filter
 *  - Date range filter
 *  - Text search
 */
export function tableFilter<T>({
    data,
    searchFields,
    getDate,
    getBadge,
}: TableFilterOptions<T>): TableFilter<T> {
    const [filter, setFilter] = useState("All");
    const [badgeFilter, setBadgeFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [search, setSearch] = useState("");

    const [startDate, endDate] = dateRange;

    const filteredData = useMemo(() => {
        return data
            .filter((item) => {
                // Active/Expired filter
                if (filter === "All") return true;
                const dateStr = getDate ? getDate(item) : null;
                if (!dateStr) return false;
                const date = parseISO(dateStr);
                if (filter === "Active") return isAfter(date, new Date());
                if (filter === "Expired") return !isAfter(date, new Date());
                return true;
            })
            .filter((item) => {
                // Badge filter
                if (badgeFilter === "All") return true;
                const badge = getBadge ? getBadge(item) : null;
                return badge === badgeFilter;
            })
            .filter((item) => {
                // Date range filter
                if (dateFilter !== "Custom") return true;
                if (!startDate || !endDate || !getDate) return true;
                const dateStr = getDate(item);
                if (!dateStr) return false;
                const date = parseISO(dateStr);
                return isWithinInterval(date, { start: startDate, end: endDate });
            })
            .filter((item) => {
                // Search filter
                if (!search.trim() || !searchFields) return true;
                const searchValue = search.toLowerCase();
                return searchFields(item).some((field) =>
                    field.toLowerCase().includes(searchValue)
                );
            });
    }, [data, filter, badgeFilter, dateFilter, startDate, endDate, search]);

    const resetFilters = () => {
        setFilter("All");
        setBadgeFilter("All");
        setDateFilter("All");
        setDateRange([null, null]);
        setSearch("");
    };


    return {
        filteredData,
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
    };
}
