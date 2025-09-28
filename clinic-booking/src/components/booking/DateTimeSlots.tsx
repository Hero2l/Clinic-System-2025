// src/components/booking/steps/DateTimeSlots.tsx
"use client";

import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React from "react";

interface DateTimeSlotsProps {
  month: number;
  year: number;
  today: Date;
  selectedDate: Date | null;
  availableSlots: string[];
  form: { time: string };
  errors: { date?: string; time?: string };

  MONTHS: string[];
  DAYS: string[];

  firstDayOfMonth: number;
  daysInMonth: number;

  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  handleDateSelect: (day: number) => void;
  handleTimeSelect: (time: string) => void;
  isDayAvailable: (day: number) => boolean;
  getBookingCount: (day: number) => number;
}

export default function DateTimeSlots({
  month,
  year,
  today,
  selectedDate,
  availableSlots,
  form,
  errors,
  MONTHS,
  DAYS,
  firstDayOfMonth,
  daysInMonth,
  goToPreviousMonth,
  goToNextMonth,
  handleDateSelect,
  handleTimeSelect,
  isDayAvailable,
  getBookingCount,
}: DateTimeSlotsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-red-500 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Your Visit
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Pick your preferred date and time from available slots
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-blue-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h4 className="text-lg font-bold text-gray-800">
                {MONTHS[month]} {year}
              </h4>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-blue-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-gray-50 rounded-xl p-4">
              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-12" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(year, month, day);
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isPast = date < today;
                  const isSelected = selectedDate?.getDate() === day;
                  const isAvailable = isDayAvailable(day);
                  const bookingCount = getBookingCount(day);
                  const isFull = bookingCount >= 5;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={isPast || isFull}
                      className={`
                        relative h-12 text-sm font-medium rounded-lg transition-all duration-200
                        ${isPast ? "text-gray-300 cursor-not-allowed" : ""}
                        ${isFull && !isPast ? "bg-red-100 text-red-400 cursor-not-allowed" : ""}
                        ${isSelected ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-200" : ""}
                        ${!isPast && !isFull && !isSelected ? "text-gray-700 hover:bg-blue-50 hover:text-blue-700" : ""}
                        ${isToday && !isSelected ? "bg-blue-100 text-blue-600 font-bold" : ""}
                      `}
                    >
                      {day}
                      {!isPast && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                i < bookingCount
                                  ? "bg-red-400"
                                  : isSelected
                                  ? "bg-white/50"
                                  : "bg-green-400"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs">
              <Legend color="bg-green-400" label="Available" />
              <Legend color="bg-red-400" label="Booked" />
              <Legend color="bg-blue-600" label="Selected" />
            </div>

            {errors.date && (
              <ErrorMessage message={errors.date} />
            )}
          </div>

          {/* Time Slots Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-red-600" />
              <h4 className="text-lg font-semibold text-gray-800">
                Available Time Slots
              </h4>
            </div>

            {!selectedDate ? (
              <EmptyState
                icon={<Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
                title="Select a date first"
                subtitle="Choose a date from the calendar to see available time slots"
              />
            ) : availableSlots.length === 0 ? (
              <EmptyState
                icon={<Clock className="w-12 h-12 text-red-400 mx-auto mb-4" />}
                title="No slots available"
                subtitle="This date is fully booked. Please select another date."
                variant="error"
              />
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {availableSlots.length} slots available for{" "}
                  {selectedDate.toLocaleDateString()}
                </p>

                <SlotGroup
                  title="🌅 Morning"
                  slots={availableSlots.filter(
                    (slot) => parseInt(slot.split(":")[0]) < 12
                  )}
                  form={form}
                  handleTimeSelect={handleTimeSelect}
                  highlight="blue"
                />

                <SlotGroup
                  title="☀️ Afternoon"
                  slots={availableSlots.filter(
                    (slot) => parseInt(slot.split(":")[0]) >= 12
                  )}
                  form={form}
                  handleTimeSelect={handleTimeSelect}
                  highlight="red"
                />
              </div>
            )}

            {errors.time && <ErrorMessage message={errors.time} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center space-x-1">
      <div className={`w-3 h-3 ${color} rounded-full`}></div>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 text-sm font-medium">{message}</p>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  variant?: "error";
}) {
  return (
    <div
      className={`rounded-xl p-8 text-center ${
        variant === "error" ? "bg-red-50" : "bg-gray-50"
      }`}
    >
      {icon}
      <p
        className={`font-medium ${
          variant === "error" ? "text-red-600" : "text-gray-500"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-sm ${
          variant === "error" ? "text-red-500" : "text-gray-400"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function SlotGroup({
  title,
  slots,
  form,
  handleTimeSelect,
  highlight,
}: {
  title: string;
  slots: string[];
  form: { time: string };
  handleTimeSelect: (time: string) => void;
  highlight: "blue" | "red";
}) {
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-700 mb-2">{title}</h5>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              form.time === time
                ? `bg-${highlight}-600 text-white shadow-md ring-2 ring-${highlight}-200`
                : `bg-gray-100 text-gray-700 hover:bg-${highlight}-50 hover:text-${highlight}-700 border border-gray-200`
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
