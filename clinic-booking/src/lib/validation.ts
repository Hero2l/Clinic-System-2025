// validation.ts

import { z } from "zod";

// Step 1: Appointment Details
export const appointmentSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  reason: z.string().max(500).optional(),
});


// Step 2: Patient Info
export const patientSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Valid email is required")
    .max(254, "Email must be less than 254 characters"),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Valid phone number is required")
    .max(20, "Phone number must be less than 20 characters"),
});

// Full form (Step 3 / submission)
export const bookingFormSchema = appointmentSchema.merge(patientSchema);

export type AppointmentDetails = z.infer<typeof appointmentSchema>;
export type PatientInfo = z.infer<typeof patientSchema>;
export type BookingForm = z.infer<typeof bookingFormSchema>;
