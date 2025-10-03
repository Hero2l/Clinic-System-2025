"use client";
import { BookingForm } from "@/lib/validation";
import { createContext, useContext, useState, ReactNode } from "react";

type BookingContextType = {
  form: BookingForm;
  setForm: (data: Partial<BookingForm>) => void;
  currentStep: number;
  setStep: (step: number) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // ✅ Strongly type form with BookingForm
  const [form, setFormState] = useState<BookingForm>({
    doctor: "",
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    reason: "", // ✅ default empty string so it's always safe in UI
  });

  const [currentStep, setCurrentStep] = useState(1);

  // ✅ Accept Partial<BookingForm> safely
  const setForm = (data: Partial<BookingForm>) => {
    setFormState((prev) => ({ ...prev, ...data }));
  };

  // ✅ Reset clears everything and goes back to step 1
  const reset = () => {
    setFormState({
      doctor: "",
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      reason: "",
    });
    setCurrentStep(1);
  };

  return (
    <BookingContext.Provider
      value={{ form, setForm, currentStep, setStep: setCurrentStep, reset }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// ✅ Safer hook with context guard
export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
