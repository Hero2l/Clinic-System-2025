"use client";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { BookingForm } from "@/lib/validation";

interface ConfirmationSummaryProps {
  form: BookingForm;
}

const ConfirmationSummary = ({ form }: ConfirmationSummaryProps) => {
  const serviceLabels: Record<string, string> = {
    general_consultation: "General Consultation",
    dental_checkup: "Dental Check-up",
    skin_screening: "Skin Screening",
    vaccination: "Vaccination/Immunization",
    pediatric_care: "Pediatric Care",
    womens_health: "Women's Health Check",
    mens_health: "Men's Health Check",
    chronic_disease_management: "Chronic Disease Management",
    minor_surgery: "Minor Surgery",
    nutritional_counseling: "Nutritional Counseling",
    student_enrollment_check_up: "Student Enrollment Check Up"
  };


  const formatDate = (dateStr: string | number | Date) => {
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

export default function StepConfirm() {
  const { form, setStep } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", form);
      setStep(4);
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          type="button"
          onClick={handleSubmit}
          className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-teal-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? "submitting-status" : undefined}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
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
  );
}