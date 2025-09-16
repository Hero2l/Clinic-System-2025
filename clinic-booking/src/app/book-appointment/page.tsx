"use client";
import { useState } from "react";

// Mock data for available time slots by date
const mockAvailableSlots: { [key: string]: string[] } = {
  "2025-09-17": ["09:00", "10:30", "14:00", "15:30"],
  "2025-09-18": ["08:30", "11:00", "13:30", "16:00"],
  "2025-09-19": ["09:30", "11:30", "14:30", "16:30"],
  "2025-09-20": ["08:00", "10:00", "15:00", "17:00"],
  "2025-09-23": ["09:00", "11:00", "13:00", "15:00", "16:30"],
  "2025-09-24": ["08:30", "10:30", "14:00", "15:30"],
  "2025-09-25": ["09:00", "12:00", "14:30", "16:00"],
  "2025-09-26": ["10:00", "11:30", "13:30", "15:30"],
  "2025-09-27": ["08:00", "09:30", "14:00", "16:30"],
};

// Mock booked slots (to show unavailable times)
const bookedSlots: { [key: string]: string[] } = {
  "2025-09-17": ["11:30", "16:00"],
  "2025-09-18": ["09:00", "14:30"],
  "2025-09-19": ["10:00", "15:00"],
};

// Helper component for the steps indicator
const StepsIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Appointment Details", "Patient's Info", "Confirmation", "Completed"];

  return (
    <div className="flex items-center justify-center mb-12" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={4}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                  ${isCompleted ? "bg-teal-500 text-white" : ""}
                  ${isActive ? "bg-teal-500 text-white ring-4 ring-teal-200" : ""}
                  ${!isCompleted && !isActive ? "bg-white border-2 border-gray-300 text-gray-400" : ""}
                `}
                aria-label={`Step ${stepNumber}: ${step}`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <p
                className={`mt-2 text-sm font-medium text-center transition-all duration-300 ${
                  isActive || isCompleted ? "text-teal-600" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
            {stepNumber < steps.length && (
              <div className={`flex-auto border-t-2 mx-4 transition-all duration-300 ${isCompleted ? "border-teal-500" : "border-gray-300"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Calendar component for date selection
const Calendar = ({ selectedDate, onDateSelect, availableDates }: { 
  selectedDate: string; 
  onDateSelect: (date: string) => void;
  availableDates: string[];
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const formatDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toISOString().split('T')[0];
  };
  
  const isDateAvailable = (day: number) => {
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
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        
        {/* Days of the month */}
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

// Time slots component
const TimeSlots = ({ selectedDate, selectedTime, onTimeSelect }: {
  selectedDate: string;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}) => {
  const availableSlots = mockAvailableSlots[selectedDate] || [];
  const bookedForDate = bookedSlots[selectedDate] || [];
  
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

// Confirmation summary component
const ConfirmationSummary = ({ form }: { form: any }) => {
  const serviceLabels: { [key: string]: string } = {
    "general_consultation": "General Consultation",
    "dental_checkup": "Dental Check-up",
    "skin_screening": "Skin Screening",
    "vaccination": "Vaccination/Immunization",
    "pediatric_care": "Pediatric Care",
    "womens_health": "Women's Health Check",
    "mens_health": "Men's Health Check",
    "chronic_disease_management": "Chronic Disease Management",
    "minor_surgery": "Minor Surgery",
    "nutritional_counseling": "Nutritional Counseling",
    "student_enrollment_check_up": "Student Enrollment Check Up"
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Summary</h3>
      
      <div className="grid gap-4">
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Service:</span>
          <span className="text-gray-900">{serviceLabels[form.service] || form.service}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Date:</span>
          <span className="text-gray-900">{formatDate(form.date)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Time:</span>
          <span className="text-gray-900">{formatTime(form.time)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Patient:</span>
          <span className="text-gray-900">{form.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-gray-900">{form.email}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Phone:</span>
          <span className="text-gray-900">{form.phone}</span>
        </div>
        
        {form.reason && (
          <div className="pt-2 border-t border-gray-200">
            <span className="text-gray-600 font-medium block mb-2">Reason for Visit:</span>
            <p className="text-gray-900 text-sm">{form.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BookAppointmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDates = Object.keys(mockAvailableSlots);

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!form.service) newErrors.service = "Please select a service";
      if (!form.date) newErrors.date = "Date is required";
      if (!form.time) newErrors.time = "Time is required";
    } else if (currentStep === 2) {
      if (!form.name.trim()) newErrors.name = "Full name is required";
      if (form.name.length > 100) newErrors.name = "Name must be less than 100 characters";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
      if (form.email.length > 254) newErrors.email = "Email must be less than 254 characters";
      if (!form.phone.match(/^[\+]?[1-9][\d]{0,15}$/)) newErrors.phone = "Valid phone number is required";
      if (form.reason.length > 500) newErrors.reason = "Reason must be less than 500 characters";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply character limits
    let limitedValue = value;
    if (name === 'name' && value.length > 100) limitedValue = value.slice(0, 100);
    if (name === 'email' && value.length > 254) limitedValue = value.slice(0, 254);
    if (name === 'phone' && value.length > 20) limitedValue = value.slice(0, 20);
    if (name === 'reason' && value.length > 500) limitedValue = value.slice(0, 500);
    
    setForm({ ...form, [name]: limitedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleDateSelect = (date: string) => {
    setForm({ ...form, date, time: "" }); // Reset time when date changes
    if (errors.date) {
      setErrors({ ...errors, date: "" });
    }
  };

  const handleTimeSelect = (time: string) => {
    setForm({ ...form, time });
    if (errors.time) {
      setErrors({ ...errors, time: "" });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };
  
  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", reason: "" });
    setErrors({});
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      console.log("Form submitted:", form);
      setCurrentStep(4); // Move to completion screen
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Your Medical Appointment</h1>
      </header>
      
      <StepsIndicator currentStep={currentStep} />

      <main>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {currentStep === 1 && (
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
                  <span className="text-sm text-gray-500 font-normal ml-2">({form.reason.length}/500)</span>
                </label>
                <textarea 
                  id="reason"
                  name="reason" 
                  value={form.reason} 
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
          )}

          {currentStep === 2 && (
            <section aria-labelledby="step2-heading">
              <h2 id="step2-heading" className="sr-only">Patient Information</h2>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name *
                  <span className="text-sm text-gray-500 font-normal ml-2">({form.name.length}/100)</span>
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.name ? "border-red-400" : "border-gray-200"}`} 
                  required 
                  disabled={isSubmitting}
                  maxLength={100}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p id="name-error" className="text-red-400 text-sm mt-2" role="alert">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address *
                    <span className="text-sm text-gray-500 font-normal ml-2">({form.email.length}/254)</span>
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.email ? "border-red-400" : "border-gray-200"}`} 
                    required 
                    disabled={isSubmitting}
                    maxLength={254}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p id="email-error" className="text-red-400 text-sm mt-2" role="alert">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number *
                    <span className="text-sm text-gray-500 font-normal ml-2">({form.phone.length}/20)</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.phone ? "border-red-400" : "border-gray-200"}`} 
                    required 
                    disabled={isSubmitting}
                    placeholder="+1234567890"
                    maxLength={20}
                    aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                    aria-invalid={!!errors.phone}
                  />
                  <p id="phone-help" className="text-sm text-gray-500 mt-1">Include country code (e.g., +1 for US)</p>
                  {errors.phone && <p id="phone-error" className="text-red-400 text-sm mt-2" role="alert">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={handleBack} 
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-gray-200"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-teal-200"
                >
                  Review Appointment
                </button>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section aria-labelledby="step3-heading">
              <h2 id="step3-heading" className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Appointment</h2>
              
              <ConfirmationSummary form={form} />
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Please arrive 15 minutes early for your appointment. A confirmation email will be sent to your provided email address.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={handleBack} 
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-gray-200"
                  disabled={isSubmitting}
                >
                  Back to Edit
                </button>
                <button 
                  type="submit" 
                  className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-teal-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} 
                  disabled={isSubmitting}
                  aria-describedby={isSubmitting ? "submitting-status" : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      <span id="submitting-status">Booking Your Appointment...</span>
                    </>
                  ) : (
                    "Confirm & Book Appointment"
                  )}
                </button>
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section aria-labelledby="step4-heading" className="text-center py-10">
              <div className="w-20 h-20 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 id="step4-heading" className="text-3xl font-bold text-gray-900 mb-4">Appointment Successfully Booked!</h2>
              <div className="max-w-md mx-auto mb-8">
                <p className="text-gray-600 mb-2">
                  Thank you, <strong>{form.name}</strong>! Your appointment has been confirmed.
                </p>
                <p className="text-gray-600 mb-4">
                  A confirmation email with all the details has been sent to <strong>{form.email}</strong>.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-green-800 mb-2">Next Steps:</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Check your email for confirmation details</li>
                    <li>• Arrive 15 minutes early on your appointment day</li>
                    <li>• Bring a valid ID and insurance card</li>
                    <li>• Call us if you need to reschedule</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button 
                  type="button"
                  onClick={resetForm} 
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-teal-200"
                >
                  Book Another Appointment
                </button>
                <button 
                  type="button"
                  onClick={() => window.print()} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-gray-200"
                >
                  Print Confirmation
                </button>
              </div>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}