"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HomePage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Using useMemo to prevent re-creating the center object on every render
  const center = useMemo(() => ({ lat: 3.036736, lng: 101.707301 }), []); // Klinik Mekar Coordinates

  const [isOpen, setIsOpen] = useState(false);

  // Animation visibility states for each section
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    features: false,
    about: false,
    services: false,
    cta: false,
    location: false
  });

  // Refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Intersection Observer hook
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setVisibleSections((prev) => ({
              ...prev,
              [sectionName]: true,
            }));
          }
        }
      });
    }, observerOptions);

    const sections = [
      { ref: heroRef, name: 'hero' },
      { ref: featuresRef, name: 'features' },
      { ref: aboutRef, name: 'about' },
      { ref: servicesRef, name: 'services' },
      { ref: ctaRef, name: 'cta' },
      { ref: locationRef, name: 'location' },
    ];

    sections.forEach(({ ref, name }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', name);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Trigger hero animation immediately on mount
  useEffect(() => {
    setVisibleSections(prev => ({ ...prev, hero: true }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-gradient-to-br from-teal-50 to-blue-50 py-20 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight transition-all duration-1000 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Welcome to{" "}
              <span className="text-teal-600 inline-block hover:scale-105 transition-transform duration-300">
                Klinik Mekar ‧₊˚ ⋅
              </span>
            </h1>
            <p className={`text-xl text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-200 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Experience seamless healthcare with our modern appointment booking system.
              Connect with trusted doctors and schedule your visit online with just a few clicks.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <a
                href="/book-appointment"
                className="group inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
              <a
                href="/doctors"
                className="group inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-teal-600 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl border-2 border-teal-600 hover:border-teal-700 transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Find Doctors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-800 mb-4 transition-all duration-800 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Why Choose Klinik Mekar?
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto transition-all duration-800 delay-200 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              We're committed to providing exceptional healthcare services with modern convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`group text-center p-6 rounded-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-400`}>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 text-teal-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">Easy Scheduling</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Book appointments 24/7 with our user-friendly online booking system
              </p>
            </div>

            <div className={`group text-center p-6 rounded-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-600`}>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 text-teal-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">Trusted Care</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Licensed professionals providing quality healthcare you can trust
              </p>
            </div>

            <div className={`group text-center p-6 rounded-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-800`}>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 text-teal-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">Fast Service</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Quick appointment confirmations and minimal waiting times
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-teal-300 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-300 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-teal-300 rounded-full animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`transition-all duration-1000 ${visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At <span className="font-semibold text-teal-600 hover:text-teal-700 transition-colors duration-300">Klinik Mekar</span>, we believe healthcare should be
                simple, accessible, and reliable. Our team of licensed doctors and dedicated staff
                are committed to providing compassionate care with modern convenience.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From general consultations to specialized treatments, we're here to ensure you and
                your family receive the best medical attention, every step of the way.
              </p>

              {/* CTA Button */}
              <a
                href="/about"
                className="group inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                Learn More About Us
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Optimized Image */}
            <div className={`relative transition-all duration-1000 delay-300 ${visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
              <div className="relative group">
                <Image
                  src="/images/klinik-mekar-interior.jpg"
                  alt="Klinik Mekar Interior"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover w-full h-80 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-100 rounded-2xl -z-10 animate-float"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full -z-10 animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section ref={servicesRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-800 mb-4 transition-all duration-800 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>Our Services</h2>
            <p className={`text-gray-600 max-w-2xl mx-auto transition-all duration-800 delay-200 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Comprehensive healthcare solutions tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card */}
            <div className={`group bg-gray-50 p-6 rounded-xl shadow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-white ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-400`}>
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.992 1.992 0 01-.4 1.2l-2.1 2.6a2 2 0 01-1.6.8H8.7a2 2 0 01-1.6-.8l-2.1-2.6A1.992 1.992 0 014.6 15V9c0-1.1.9-2 2-2h10.8c1.1 0 2 .9 2 2v6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">General Consultation</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Comprehensive health check-ups and personalized medical advice for all ages.</p>
            </div>

            <div className={`group bg-gray-50 p-6 rounded-xl shadow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-white ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-600`}>
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.486 0 4.8.635 6.879 1.804M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707M17.657 17.657l.707-.707M6.343 6.343l-.707-.707" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">Specialist Care</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Access to certified specialists across multiple fields of medicine.</p>
            </div>

            <div className={`group bg-gray-50 p-6 rounded-xl shadow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-white ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-800`}>
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-1-2-1-2m2 4l1-2 1-2m-4 0h4a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v9a2 2 0 002 2h4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">Laboratory Services</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Quick and accurate diagnostic tests to support effective treatment.</p>
            </div>
          </div>

          {/* View All Services CTA */}
          <div className={`mt-12 text-center transition-all duration-800 delay-1000 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <a
              href="/services"
              className="group inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              View All Services
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <h2 className={`text-3xl font-bold text-white mb-4 transition-all duration-800 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            Ready to Get Started?
          </h2>
          <p className={`text-teal-100 text-lg mb-8 max-w-2xl mx-auto transition-all duration-800 delay-200 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            Join thousands of satisfied patients who trust Klinik Mekar for their healthcare needs
          </p>
          <a
            href="/book-appointment"
            className={`group inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-teal-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } delay-400`}
          >
            Schedule Your Appointment Today
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Location / Google Map Section */}
      <section ref={locationRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-800 mb-4 transition-all duration-800 ${visibleSections.location ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Find Us
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto transition-all duration-800 delay-200 ${visibleSections.location ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              We are conveniently located in the heart of Seri Kembangan. Visit us for your next appointment.
            </p>
          </div>

          {/* The Google Map component */}
          <div className={`w-full h-96 bg-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-500 ${visibleSections.location ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            } delay-400`}>
            {!isLoaded ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                  <p className="text-gray-500">Loading Map...</p>
                </div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={15}
                options={{
                  disableDefaultUI: false,
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
          <div className={`mt-8 text-center transition-all duration-800 delay-600 ${visibleSections.location ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <a
              href="https://maps.app.goo.gl/BUFeXDcwqcegoREf6"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom delay classes */
        .delay-400 {
          transition-delay: 0.4s;
        }
        
        .delay-600 {
          transition-delay: 0.6s;
        }
        
        .delay-800 {
          transition-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}