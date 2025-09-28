// BookingContext.tsx
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
    const [form, setFormState] = useState<BookingForm>({
        doctor: "",
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        reason: "",
    });
    const [currentStep, setCurrentStep] = useState(1);

    const setForm = (data: Partial<BookingForm>) => {
        setFormState((prev) => ({ ...prev, ...data }));
    };

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

export const useBooking = () => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBooking must be used within BookingProvider");
    return ctx;
};
