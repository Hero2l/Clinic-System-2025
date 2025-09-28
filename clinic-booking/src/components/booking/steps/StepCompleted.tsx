"use client";
import { useBooking } from "@/context/BookingContext";
import { CheckCircle2 } from "lucide-react";

export default function StepCompleted() {
  const { form, reset, setStep } = useBooking();

  const handleNewBooking = () => {
    reset();
    setStep(1);
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
      </div>

      {/* Confirmation Message */}
      <h2 className="text-2xl font-bold text-gray-800">
        Appointment Confirmed!
      </h2>
      <p className="text-gray-600">
        Thank you, <span className="font-medium">{form.name}</span>. <br />
        Your appointment for{" "}
        <span className="font-medium">{form.service}</span> on{" "}
        <span className="font-medium">{form.date}</span> at{" "}
        <span className="font-medium">{form.time}</span> has been booked.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <button
          onClick={handleNewBooking}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
}
