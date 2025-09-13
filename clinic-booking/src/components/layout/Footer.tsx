export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Clinic Booking System. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
