"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isBookingForm = pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with active state detection
  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-red-100'
        : 'bg-white shadow-lg border-b border-gray-100'
      }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Enhanced Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img
                src="/logo/klinik-mekar-logo-only.png"
                alt="Klinik Mekar Logo"
                className="w-10 h-10 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Klinik Mekar
              </span>
              <div className="text-xs text-gray-500 font-medium -mt-1">Healthcare Excellence</div>
            </div>
            <span className="sm:hidden text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Klinik Mekar
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              Home
            </Link>

            <Link
              href="/doctors-section"
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${isActive('/doctors-section')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              Doctors
            </Link>

            <Link
              href="/services-section"
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${isActive('/services-section')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              Services
            </Link>

            <Link
              href="/about-section"
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${isActive('/about-section')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              About
            </Link>

            <Link
              href="/contact-section"
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${isActive('/contact-section')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Enhanced Action Buttons & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Emergency Call Button - Desktop */}
            <a
              href="tel:+60123456789"
              className="hidden lg:inline-flex items-center px-3 py-2 text-emerald-600 hover:text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-300 group"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <svg className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden xl:inline text-sm">Emergency</span>
            </a>

            {/* Book Appointment Button */}
            {pathname !== '/book-appointment' && (
              <Link
                href="/book-appointment"
                className="hidden sm:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 hover:from-red-700 hover:via-pink-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 mr-2 relative z-10 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Book Now</span>
              </Link>
            )}

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : ''
                  }`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                  }`}></span>
                <span className={`absolute top-4.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : ''
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${isActive('/')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>

              <Link
                href="/doctors-section"
                className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${isActive('/doctors-section')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Doctors
              </Link>

              <Link
                href="/services-section"
                className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${isActive('/services-section')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Services
              </Link>

              <Link
                href="/about-section"
                className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${isActive('/about-section')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>

              <Link
                href="/contact-section"
                className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${isActive('/contact-section')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>

              {/* Mobile Emergency & Book Buttons */}
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
                <a
                  href="tel:+60123456789"
                  className="flex items-center justify-center px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium rounded-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Emergency Call
                </a>

                {pathname !== '/book-appointment' && (
                  <Link
                    href="/book-appointment"
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}