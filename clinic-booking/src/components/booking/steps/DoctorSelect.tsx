// src/components/booking/steps/DoctorSelect.tsx

"use client";

import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";
import { Star, Award, Users } from "lucide-react";

// Enhanced mock doctor data
const doctors = [
  { 
    id: "dr_smith", 
    name: "Dr. John Smith", 
    specialty: "General Medicine", 
    photo: "/images/doctors/smith.jpg",
    rating: 4.9,
    patients: 1200,
    experience: "15+ years",
    badge: "Top Rated"
  },
  { 
    id: "dr_lee", 
    name: "Dr. Alice Lee", 
    specialty: "Pediatrics", 
    photo: "/images/doctors/lee.jpg",
    rating: 4.8,
    patients: 950,
    experience: "12+ years",
    badge: "Child Specialist"
  },
  { 
    id: "dr_patel", 
    name: "Dr. Raj Patel", 
    specialty: "Dermatology", 
    photo: "/images/doctors/raj.jpg",
    rating: 4.9,
    patients: 800,
    experience: "10+ years",
    badge: "Skin Expert"
  },
];

export default function DoctorSelect() {
  const { form, setForm } = useBooking();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {doctors.map((doc) => {
        const isSelected = form.doctor === doc.id;
        return (
          <button
            key={doc.id}
            type="button"
            onClick={() => setForm({ doctor: doc.id })}
            className={cn(
              "relative group rounded-2xl border-2 p-6 flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105",
              "bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-red-50",
              isSelected 
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-red-50 shadow-lg ring-4 ring-blue-100" 
                : "border-gray-200 hover:border-blue-300"
            )}
          >
            {/* Badge */}
            <div className={cn(
              "absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold",
              isSelected 
                ? "bg-gradient-to-r from-blue-600 to-red-600 text-white" 
                : "bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white"
            )}>
              {doc.badge}
            </div>

            {/* Doctor Photo */}
            <div className="relative mb-4">
              <div className={cn(
                "w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300",
                isSelected 
                  ? "border-blue-400 shadow-lg" 
                  : "border-gray-200 group-hover:border-blue-400"
              )}>
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a colored circle with initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-blue-400 to-red-400 flex items-center justify-center text-white font-bold text-xl">
                        ${doc.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    `;
                  }}
                />
              </div>
              
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-800 transition-colors">
                {doc.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {doc.specialty}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700">{doc.rating}</span>
                <span className="text-xs text-gray-500">({doc.patients} patients)</span>
              </div>

              {/* Experience */}
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
                <Award className="w-3 h-3" />
                <span>{doc.experience}</span>
              </div>
            </div>

            {/* Selection Indicator */}
            {isSelected && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Hover Effect Overlay */}
            <div className={cn(
              "absolute inset-0 rounded-2xl transition-opacity duration-300",
              "bg-gradient-to-br from-blue-600/5 to-red-600/5 opacity-0 group-hover:opacity-100"
            )} />
          </button>
        );
      })}
    </div>
  );
}