"use client";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import type { BookingForm } from "@/lib/validation";

export default function StepPatient() {
  const { form, setForm, setStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let limitedValue = value;
    if (name === 'name' && value.length > 100) limitedValue = value.slice(0, 100);
    if (name === 'email' && value.length > 254) limitedValue = value.slice(0, 254);
    if (name === 'phone' && value.length > 20) limitedValue = value.slice(0, 20);
    
    setForm({ [name]: limitedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleNext = () => {
    // const newErrors = {};
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (form.name.length > 100) newErrors.name = "Name must be less than 100 characters";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (form.email.length > 254) newErrors.email = "Email must be less than 254 characters";
    if (!form.phone.match(/^[\+]?[1-9][\d]{0,15}$/)) newErrors.phone = "Valid phone number is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStep(3);
  };

  return (
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
  );
}