"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import PromoCarousel from "@/components/ui/PromoCarousel";
import HeroSection from "@/components/home/Hero";
import FeaturesSection from "@/components/home/Features";
import AboutSection from "@/components/home/About";

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
      <HeroSection isVisible={false} />

      {/* Features Section */}
      <FeaturesSection isVisible={false} />

      {/* Promotions Section */}
      <PromoCarousel />

      {/* About Us Section */}
      <AboutSection isVisible={false} />

      {/* Our Services Section */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-red-50/30 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-red-200/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-float"></div>

          {/* Medical pattern decorations */}
          <div className="absolute top-1/4 left-1/6 opacity-10">
            <div className="w-16 h-4 bg-red-400 rounded-full"></div>
            <div className="w-4 h-16 bg-red-400 rounded-full absolute top-0 left-6"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 opacity-10">
            <div className="w-20 h-5 bg-blue-400 rounded-full"></div>
            <div className="w-5 h-20 bg-blue-400 rounded-full absolute top-0 left-7"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          {/* Enhanced header section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-6 transition-all duration-800 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Healthcare Services</span>
            </div>

            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-800 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } delay-200`}>
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>

            <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Comprehensive healthcare solutions designed with your well-being in mind. From routine check-ups to specialized treatments,
              we're here for every step of your health journey.
            </p>
          </div>

          {/* Enhanced services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {/* Service Card 1: General Consultation */}
            <div className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-red-100 hover:border-red-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 transform hover:-translate-y-4 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-400`}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/80 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  General Consultation
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6">
                  Comprehensive health evaluations, preventive care, and personalized medical guidance for patients of all ages and health conditions.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                    <span className="mr-2">From RM50</span>
                  </div>
                  <div className="inline-flex items-center text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                    <span className="mr-2 text-sm">Book Now</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Service highlight badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Popular
              </div>
            </div>

            {/* Service Card 2: Specialist Care */}
            <div className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-4 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-600`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <svg className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Specialist Care
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6">
                  Expert consultation with board-certified specialists in cardiology, dermatology, orthopedics, and other medical fields.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    <span className="mr-2">From RM120</span>
                  </div>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    <span className="mr-2 text-sm">View Specialists</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Service highlight badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Expert
              </div>
            </div>

            {/* Service Card 3: Laboratory Services */}
            <div className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-4 md:col-span-2 lg:col-span-1 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } delay-800`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mb-6 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <svg className="w-10 h-10 text-emerald-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  Laboratory Services
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6">
                  State-of-the-art diagnostic testing including blood work, imaging, and specialized tests with fast, accurate results.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                    <span className="mr-2">From RM30</span>
                  </div>
                  <div className="inline-flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                    <span className="mr-2 text-sm">View Tests</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Service highlight badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Fast Results
              </div>
            </div>
          </div>

          {/* Additional services preview */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } delay-1000`}>
            <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Cardiology</h4>
              <p className="text-xs text-gray-600">Heart Health</p>
            </div>

            <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Dermatology</h4>
              <p className="text-xs text-gray-600">Skin Care</p>
            </div>

            <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Pediatrics</h4>
              <p className="text-xs text-gray-600">Child Care</p>
            </div>

            <div className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Orthopedics</h4>
              <p className="text-xs text-gray-600">Bone Health</p>
            </div>
          </div>

          {/* Enhanced View All Services CTA */}
          <div className={`text-center transition-all duration-800 delay-1200 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/services"
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 mr-3">View All Services</span>
                <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="/book-appointment"
                className="group inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border-2 border-emerald-500 hover:border-emerald-600 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
            </div>

            <p className="mt-4 text-gray-600">
              <span className="font-semibold">Need help choosing?</span> Call us at
              <a href="tel:+60123456789" className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300 ml-1">
                +60 12-345 6789
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-br from-red-600 via-purple-700 to-blue-700 relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary floating elements */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float-delayed"></div>
          <div className="absolute top-1/3 right-1/6 w-48 h-48 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>

          {/* Secondary decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/15 rounded-2xl rotate-45 animate-float-reverse"></div>

          {/* Medical cross patterns */}
          <div className="absolute top-1/4 left-1/6 opacity-20">
            <div className="w-20 h-5 bg-white rounded-full"></div>
            <div className="w-5 h-20 bg-white rounded-full absolute top-0 left-7"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 opacity-15">
            <div className="w-16 h-4 bg-emerald-300 rounded-full"></div>
            <div className="w-4 h-16 bg-emerald-300 rounded-full absolute top-0 left-6"></div>
          </div>

          {/* Geometric shapes */}
          <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-emerald-300/30 rounded-2xl rotate-45 animate-pulse"></div>
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          {/* Enhanced header section */}
          <div className="max-w-5xl mx-auto">

            <h2 className={`text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } delay-200`}>
              Ready to Transform Your{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Health Journey?
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
              </span>
            </h2>

            <p className={`text-white/90 text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Join over <span className="font-bold text-yellow-300">10,000+ satisfied patients</span> who have chosen Klinik Mekar
              for their healthcare needs. Experience the difference that personalized, professional care makes.
            </p>

            {/* Trust indicators */}
            <div className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-800 delay-400 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-medium text-sm">4.9/5 Patient Rating</span>
              </div>

              <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-white font-medium text-sm">MOH Certified</span>
              </div>

              <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-medium text-sm">24/7 Booking</span>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-10 transition-all duration-800 delay-500 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <a
                href="/book-appointment"
                className="group relative inline-flex items-center px-10 py-5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-110 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 mr-3 text-red-600 relative z-10 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Schedule Your Appointment</span>
                <svg className="w-5 h-5 ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 rounded-2xl ring-4 ring-white/50 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>

              <a
                href="tel:+60123456789"
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse relative z-10"></div>
                <svg className="w-6 h-6 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="relative z-10">Call Now: Emergency</span>
              </a>
            </div>

            {/* Contact alternatives */}
            <div className={`text-center transition-all duration-800 delay-600 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <p className="text-white/80 mb-4">
                Prefer other ways to connect? We're here for you.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/contact"
                  className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Visit Our Clinic
                </a>

                <a
                  href="mailto:info@klinikmekar.com"
                  className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>

                <a
                  href="/doctors"
                  className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Meet Our Doctors
                </a>
              </div>
            </div>
          </div>
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