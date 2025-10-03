"use client";
import { useBooking } from "@/context/BookingContext";

export default function StepCompleted() {
  const { form, reset } = useBooking();

  const handleBookAnother = () => {
    reset();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
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
          onClick={handleBookAnother} 
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-teal-200"
        >
          Book Another Appointment
        </button>
        <button 
          type="button"
          onClick={handlePrint} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300 focus:ring-4 focus:ring-gray-200"
        >
          Print Confirmation
        </button>
      </div>
    </section>
  );
}