"use client";
import { useBooking } from "@/context/BookingContext";

export default function StepConfirm() {
  const { form, setStep, setForm } = useBooking();

  const handleBack = () => setStep(2);

  const handleConfirm = () => {
    // For now, mock booking confirmation
    console.log("Booking confirmed:", form);

    // Simulate booking save
    alert("Your appointment has been confirmed!");

    // Move to completion step
    setStep(4);

    // Reset form if you want a fresh start after completion
    setForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      reason: form.reason,
      service: form.service,
      date: form.date,
      time: form.time,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Review Your Appointment</h2>

      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-2">
        <p>
          <span className="font-medium text-gray-700">Service:</span> {form.service}
        </p>
        <p>
          <span className="font-medium text-gray-700">Date:</span> {form.date}
        </p>
        <p>
          <span className="font-medium text-gray-700">Time:</span> {form.time}
        </p>
        <p>
          <span className="font-medium text-gray-700">Patient:</span> {form.name}
        </p>
        <p>
          <span className="font-medium text-gray-700">Email:</span> {form.email}
        </p>
        <p>
          <span className="font-medium text-gray-700">Phone:</span> {form.phone}
        </p>
        {form.reason && (
          <p>
            <span className="font-medium text-gray-700">Reason:</span> {form.reason}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
