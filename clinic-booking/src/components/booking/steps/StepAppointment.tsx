"use client";

import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { appointmentSchema } from "@/lib/validation";
import DoctorSelect from "./DoctorSelect";
import { Calendar, Clock, FileText, User, ChevronLeft, ChevronRight } from "lucide-react";
import DateTimeSlots from "../DateTimeSlots";

// Mock booking data - in real app, this would come from your backend
const mockBookings: Record<string, string[]> = {
    "2025-09-30": ["09:00", "10:30", "14:00"],
    "2025-10-01": ["09:00", "10:30", "11:30", "14:00", "15:30"], // Full day
    "2025-10-02": ["14:00"],
    "2025-10-03": ["09:00", "15:30"],
    "2025-10-04": ["10:30", "14:00", "16:00"],
};

// Available time slots
const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StepAppointment() {
    const { form, setForm, setStep } = useBooking();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);

    // Get calendar data
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get days in month and first day of week
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Update available slots when date changes
    useEffect(() => {
        if (selectedDate) {
            const dateString = selectedDate.toISOString().split('T')[0];
            const bookedSlots = mockBookings[dateString] || [];
            const available = timeSlots.filter(slot => !bookedSlots.includes(slot));
            setAvailableSlots(available);
        }
    }, [selectedDate]);

    // Handle date selection
    const handleDateSelect = (day: number) => {
        const selected = new Date(year, month, day);
        if (selected < today) return; // Don't allow past dates

        setSelectedDate(selected);
        const dateString = selected.toISOString().split('T')[0];
        setForm({ date: dateString, time: "" }); // Reset time when date changes
    };

    // Handle time selection
    const handleTimeSelect = (time: string) => {
        setForm({ time });
    };

    // Check if a day is available (has less than 5 bookings)
    const isDayAvailable = (day: number) => {
        const date = new Date(year, month, day);
        if (date < today) return false;

        const dateString = date.toISOString().split('T')[0];
        const bookings = mockBookings[dateString] || [];
        return bookings.length < 5;
    };

    // Get booking count for a day
    const getBookingCount = (day: number) => {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];
        return mockBookings[dateString]?.length || 0;
    };

    // Navigation functions
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1));
        setSelectedDate(null);
        setForm({ date: "", time: "" });
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
        setSelectedDate(null);
        setForm({ date: "", time: "" });
    };

    const handleNext = () => {
        const result = appointmentSchema.safeParse(form);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                newErrors[field] = issue.message;
            });
            setErrors(newErrors);
            return;
        }
        setStep(2);
    };

    return (
        <div className="space-y-8">
            {/* Progress Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-red-50 rounded-full border border-blue-200/50">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Step 1: Choose Your Appointment Details</span>
                </div>
            </div>

            {/* Doctor Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-red-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <User className="w-6 h-6 mr-3" />
                        Choose Your Doctor
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">Select the medical professional you'd like to consult with</p>
                </div>
                <div className="p-6">
                    <DoctorSelect />
                    {errors.doctor && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{errors.doctor}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Service Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-blue-500 px-6 py-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Service Type
                    </h3>
                    <p className="text-red-100 text-sm mt-1">What type of consultation do you need?</p>
                </div>
                <div className="p-6">
                    <select
                        value={form.service}
                        onChange={(e) => setForm({ service: e.target.value })}
                        className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-base"
                    >
                        <option value="" className="text-gray-500">Select a service type</option>
                        <option value="general" className="text-gray-800">🩺 General Consultation</option>
                        <option value="dental" className="text-gray-800">🦷 Dental Checkup</option>
                        <option value="skin" className="text-gray-800">🧴 Skin Consultation</option>
                    </select>
                    {errors.service && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{errors.service}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Date & Time Selection Card */}
            return (
            <DateTimeSlots
                month={month}
                year={year}
                today={today}
                selectedDate={selectedDate}
                availableSlots={availableSlots}
                form={form}
                errors={errors}
                MONTHS={MONTHS}
                DAYS={DAYS}
                firstDayOfMonth={firstDayOfMonth}
                daysInMonth={daysInMonth}
                goToPreviousMonth={goToPreviousMonth}
                goToNextMonth={goToNextMonth}
                handleDateSelect={handleDateSelect}
                handleTimeSelect={handleTimeSelect}
                isDayAvailable={isDayAvailable}
                getBookingCount={getBookingCount}
            />
            );

            {/* Reason/Notes Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Additional Notes
                    </h3>
                    <p className="text-green-100 text-sm mt-1">Tell us more about your visit (optional)</p>
                </div>
                <div className="p-6">
                    <textarea
                        value={form.reason || ""}
                        onChange={(e) => setForm({ reason: e.target.value })}
                        rows={4}
                        placeholder="Describe your symptoms, concerns, or any specific requests..."
                        className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all duration-200 resize-none"
                    />
                    {errors.reason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{errors.reason}</p>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">This information helps your doctor prepare for your visit</p>
                </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-6">
                <button
                    onClick={handleNext}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-200"
                >
                    <span className="flex items-center">
                        Continue to Patient Details
                        <svg
                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}