"use client";
import Link from "next/link";
import Image from "next/image";
import { doctors, staff } from "@/data/doctors-data";
import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <BackgroundHeroLayout heightClassName="min-h-[20vh]">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Our <span className="text-teal-600">Doctors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our team of dedicated and highly-qualified medical professionals, committed to providing you with the best care.
          </p>
        </div>
      </BackgroundHeroLayout>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={doctor.image}
                    alt={`Photo of ${doctor.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-teal-600 font-semibold mb-3">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {doctor.bio}
                  </p>
                  {/* <Link
                    href={`/book-appointment?doctor=${doctor.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Staff Section (optional) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Clinic Staff
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated team members who work tirelessly to ensure your visit is comfortable and efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {staff.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex-shrink-0 w-24 h-24 relative rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                  <Image
                    src={member.image}
                    alt={`Photo of ${member.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-teal-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}