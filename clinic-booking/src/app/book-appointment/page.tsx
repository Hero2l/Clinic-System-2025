"use client";
import { useState } from "react";

// Helper component for the steps indicator
const StepsIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Appointment Details", "Patient's Info", "Completed Submission"];

  return (
    <div className="flex items-center justify-center mb-12">
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

export default function BookAppointmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!form.service) newErrors.service = "Please select a service";
      if (!form.date) newErrors.date = "Date is required";
      if (!form.time) newErrors.time = "Time is required";
    } else if (currentStep === 2) {
      if (!form.name.trim()) newErrors.name = "Full name is required";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
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
    setErrors({}); // Clear errors when going back
  };
  
  const resetForm = () => {
    setForm({ name: "", email: "", service: "", date: "", time: "", reason: "" });
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
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      console.log("Form submitted:", form);
      setCurrentStep(3); // Move to completion screen
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Your Appointment</h2>
      
      <StepsIndicator currentStep={currentStep} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Choose Service</label>
              <select name="service" value={form.service} onChange={handleChange} className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.service ? "border-red-400" : "border-gray-200"}`} required>
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
                <option value="student_enrollment_check_up">Student enrollment check up</option>
              </select>
              {errors.service && <p className="text-red-400 text-sm mt-2">{errors.service}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.date ? "border-red-400" : "border-gray-200"}`} required />
                {errors.date && <p className="text-red-400 text-sm mt-2">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} min="08:00" max="17:00" step="1800" className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.time ? "border-red-400" : "border-gray-200"}`} required />
                {errors.time && <p className="text-red-400 text-sm mt-2">{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Reason for Visit (Optional)</label>
              <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300" />
            </div>
            
            <div className="pt-4">
              <button onClick={handleNext} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.name ? "border-red-400" : "border-gray-200"}`} required disabled={isSubmitting} />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className={`w-full border-2 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-300 ${errors.email ? "border-red-400" : "border-gray-200"}`} required disabled={isSubmitting} />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button type="button" onClick={handleBack} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300">
                Back
              </button>
              <button type="submit" className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 flex items-center justify-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Booking...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
            <div className="text-center py-10">
                <div className="w-20 h-20 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
                <p className="text-gray-600 mb-6">
                    Thank you, {form.name}. A confirmation email has been sent to {form.email}.
                </p>
                <button onClick={resetForm} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300">
                    Book Another Appointment
                </button>
            </div>
        )}
      </form>
    </div>
  );
}