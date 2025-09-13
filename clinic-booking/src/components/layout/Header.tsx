"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          🏥 ClinicBooking
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/doctors" className="hover:underline">
            Doctors
          </Link>
          <Link href="/bookings" className="hover:underline">
            Book Now
          </Link>
          <Link href="/patients" className="hover:underline">
            My Account
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:underline">
            Home
          </Link>
          <Link href="/doctors" className="block hover:underline">
            Doctors
          </Link>
          <Link href="/bookings" className="block hover:underline">
            Book Now
          </Link>
          <Link href="/patients" className="block hover:underline">
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}
