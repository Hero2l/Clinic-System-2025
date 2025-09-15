"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";

export default function HomePage() {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Using useMemo to prevent re-creating the center object on every render
  const center = useMemo(() => ({ lat: 3.036736, lng: 101.707301 }), []); // Klinik Mekar Coordinates


  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-teal-600">Klinik Mekar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience seamless healthcare with our modern appointment booking system.
              Connect with trusted doctors and schedule your visit online with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/book-appointment"
                className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
              <a
                href="/doctors"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-teal-600 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border-2 border-teal-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Find Doctors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Klinik Mekar?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services with modern convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments 24/7 with our user-friendly online booking system
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Care</h3>
              <p className="text-gray-600">
                Licensed professionals providing quality healthcare you can trust
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick appointment confirmations and minimal waiting times
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-teal-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust Klinik Mekar for their healthcare needs
          </p>
          <a
            href="/book-appointment"
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-teal-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule Your Appointment Today
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* --- NEW: Location / Google Map Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Find Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are conveniently located in the heart of Seri Kembangan. Visit us for your next appointment.
            </p>
          </div>

          {/* The Google Map component */}
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg overflow-hidden">
            {!isLoaded ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading Map...</p>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={15}
                options={{
                  disableDefaultUI: false, // Enable all default controls
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: true,
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            )}
          </div>

          {/* The clickable button to open in Google Maps */}
          <div className="mt-8 text-center">
            <a
              href="https://maps.app.goo.gl/BUFeXDcwqcegoREf6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open in Google Maps
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}