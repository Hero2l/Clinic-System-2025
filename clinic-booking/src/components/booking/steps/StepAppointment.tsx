"use client";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import type { BookingForm } from "@/lib/validation";

// Mock data for available time slots by date
const mockAvailableSlots = {
  "2025-10-15": ["09:00", "10:30", "14:00", "15:30"],
  "2025-10-16": ["08:30", "11:00", "13:30", "16:00"],
  "2025-10-17": ["09:30", "11:30", "14:30", "16:30"],
  "2025-10-18": ["08:00", "10:00", "15:00", "17:00"],
  "2025-10-21": ["09:00", "11:00", "13:00", "15:00", "16:30"],
  "2025-10-22": ["08:30", "10:30", "14:00", "15:30"],
  "2025-10-23": ["09:00", "12:00", "14:30", "16:00"],
  "2025-10-24": ["10:00", "11:30", "13:30", "15:30"],
  "2025-10-25": ["08:00", "09:30", "14:00", "16:30"],
};

const bookedSlots = {
  "2025-10-15": ["11:30", "16:00"],
  "2025-10-16": ["09:00", "14:30"],
  "2025-10-17": ["10:00", "15:00"],
};

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  availableDates: string[];
}

const Calendar = ({ selectedDate, onDateSelect, availableDates }: CalendarProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const formatDate = (day: number | undefined) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toISOString().split('T')[0];
  };
  
  const isDateAvailable = (day: number | undefined) => {
    const dateStr = formatDate(day);
    const date = new Date(currentYear, currentMonth, day);
    return date >= today && availableDates.includes(dateStr);
  };
  
  const isDateSelected = (day: number) => {
    return selectedDate === formatDate(day);
  };
  
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const available = isDateAvailable(day);
          const selected = isDateSelected(day);
          
          return (
            <button
              key={day}
              type="button"
              onClick={() => available && onDateSelect(formatDate(day))}
              disabled={!available}
              className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                selected 
                  ? "bg-teal-500 text-white font-semibold" 
                  : available 
                    ? "hover:bg-teal-100 text-gray-700" 
                    : "text-gray-300 cursor-not-allowed"
              }`}
              aria-label={`${available ? 'Select' : 'Unavailable'} ${monthNames[currentMonth]} ${day}, ${currentYear}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface TimeSlotsProps {
  selectedDate: string;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlots = ({ selectedDate, selectedTime, onTimeSelect }: TimeSlotsProps) => {
  const availableSlots = mockAvailableSlots[selectedDate as keyof typeof mockAvailableSlots] || [];
  const bookedForDate = bookedSlots[selectedDate as keyof typeof bookedSlots] || [];
  
  if (!selectedDate) {
    return (
      <div className="text-center text-gray-500 py-8">
        Please select a date first
      </div>
    );
  }
  
  if (availableSlots.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No available slots for this date
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {availableSlots.map((time) => {
        const isBooked = bookedForDate.includes(time);
        const isSelected = selectedTime === time;
        
        return (
          <button
            key={time}
            type="button"
            onClick={() => !isBooked && onTimeSelect(time)}
            disabled={isBooked}
            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-teal-500 text-white border-teal-500"
                : isBooked
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
            }`}
            aria-label={`${isBooked ? 'Unavailable' : isSelected ? 'Selected' : 'Available'} time slot at ${time}`}
          >
            {time}
            {isBooked && <span className="block text-xs mt-1">Booked</span>}
          </button>
        );
      })}
    </div>
  );
};

export default function StepAppointment() {
  const { form, setForm, setStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDates = Object.keys(mockAvailableSlots);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let limitedValue = value;
    if (name === 'reason' && value.length > 500) limitedValue = value.slice(0, 500);
    
    setForm({ [name]: limitedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleDateSelect = (date: any) => {
    setForm({ date, time: "" });
    if (errors.date) {
      setErrors({ ...errors, date: "" });
    }
  };

  const handleTimeSelect = (time: any) => {
    setForm({ time });
    if (errors.time) {
      setErrors({ ...errors, time: "" });
    }
  };

  const handleNext = () => {
    // const newErrors = {};
    const newErrors: Record<string, string> = {};
    if (!form.service) newErrors.service = "Please select a service";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStep(2);
  };

  return (
    <section aria-labelledby="step1-heading">
      <h2 id="step1-heading" className="sr-only">Appointment Details</h2>
      
      <div className="mb-6">
        <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
          Choose Service *
        </label>
        <select 
          id="service"
          name="service" 
          value={form.service} 
          onChange={handleChange} 
          className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.service ? "border-red-400" : "border-gray-200"}`} 
          required
          aria-describedby={errors.service ? "service-error" : undefined}
          aria-invalid={!!errors.service}
        >
          <option value="">Select a service</option>
          <option value="general_consultation">General Consultation</option>
          <option value="dental_checkup">Dental Check-up</option>
          <option value="skin_screening">Skin Screening</option>
          <option value="vaccination">Vaccination/Immunization</option>
          <option value="pediatric_care">Pediatric Care</option>
          <option value="womens_health">Women's Health Check</option>
          <option value="mens_health">Men's Health Check</option>
          <option value="chronic_disease_management">Chronic Disease Management</option>
          <option value="minor_surgery">Minor Surgery</option>
          <option value="nutritional_counseling">Nutritional Counseling</option>
          <option value="student_enrollment_check_up">Student Enrollment Check Up</option>
        </select>
        {errors.service && <p id="service-error" className="text-red-400 text-sm mt-2" role="alert">{errors.service}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Date *</label>
          <Calendar 
            selectedDate={form.date}
            onDateSelect={handleDateSelect}
            availableDates={availableDates}
          />
          {errors.date && <p className="text-red-400 text-sm mt-2" role="alert">{errors.date}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Time *</label>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 min-h-[300px]">
            <TimeSlots 
              selectedDate={form.date}
              selectedTime={form.time}
              onTimeSelect={handleTimeSelect}
            />
          </div>
          {errors.time && <p className="text-red-400 text-sm mt-2" role="alert">{errors.time}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
          Reason for Visit (Optional)
          <span className="text-sm text-gray-500 font-normal ml-2">({(form.reason || "").length}/500)</span>
        </label>
        <textarea 
          id="reason"
          name="reason" 
          value={form.reason || ""} 
          onChange={handleChange} 
          rows={4} 
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300"
          placeholder="Please describe the reason for your visit..."
          maxLength={500}
        />
      </div>
      
      <div className="pt-4">
        <button 
          type="button"
          onClick={handleNext} 
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-teal-200"
        >
          Next Step
        </button>
      </div>
    </section>
  );
}