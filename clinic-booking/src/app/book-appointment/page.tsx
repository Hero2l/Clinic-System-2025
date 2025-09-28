import { BookingProvider } from "@/context/BookingContext";
import BookingForm from "./BookingForm";

export default function BookAppointmentPage() {
  return (
    <BookingProvider>
      <BookingForm />
    </BookingProvider>
  );
}