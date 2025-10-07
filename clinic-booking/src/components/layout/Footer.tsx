import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <div>
                  <img src="/logo/klinik-mekar-logo-only.png" alt="Klinik Mekar Logo" className="w-8 h-8" />
                </div>
                <span className="text-xl font-semibold text-[var(--foreground)]">Klinik Mekar</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Providing quality healthcare services with easy online appointment booking.
              Your health and convenience are our top priorities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61570849671649"
                className="text-gray-400 hover:text-teal-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6" />
              </a>

              <a
                href="https://www.tiktok.com/@klinikmekar24jam_serdang"
                className="text-gray-400 hover:text-teal-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/klinikmekar24jamserdang/"
                className="text-gray-400 hover:text-teal-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>


          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/doctors" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/book-appointment" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-teal-600 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Klinik Mekar. All rights reserved.
            </p>
            <a
              href="/admin/login"
              className="bg-teal-600 text-white text-xs px-3 py-1 rounded-lg shadow hover:bg-teal-700 transition"
            >
              Admin Login
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
            <span>📞 (555) 123-4567</span>
            <span>✉️ info@medicareclinic.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}