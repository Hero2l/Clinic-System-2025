"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Users,
  FileText,
  Building2,
  Settings,
  HelpCircle,
  X,
  User,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  // Types
  type MenuItem = {
    icon?: React.ElementType;
    label: string;
    href?: string;
    badge?: number;
    children?: MenuItem[];
  };

  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Toggle submenus
  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Menu structure with nested items
  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
    {
      icon: Users,
      label: "Doctors",
      children: [
        { label: "All Doctors", href: "/admin/doctors" },
        { label: "Add Doctor", href: "/admin/doctors/add" },
        { label: "Unavailable Slots", href: "/admin/doctors/unavailable" },
      ],
    },
    {
      icon: FileText,
      label: "Slots",
      children: [
        { label: "Manage Slots", href: "/admin/slots" },
        { label: "Bulk Import", href: "/admin/slots/bulk" },
      ],
    },
    {
      icon: Building2,
      label: "Bookings",
      children: [
        { label: "All Bookings", href: "/admin/bookings" },
        { label: "Cancelled", href: "/admin/bookings/cancelled" },
        { label: "Rescheduled", href: "/admin/bookings/rescheduled" },
      ],
    },
    {
      icon: Settings,
      label: "Services",
      children: [
        { label: "Service List", href: "/admin/services" },
        { label: "Add Service", href: "/admin/services/add" },
      ],
    },
    {
      icon: BarChart3,
      label: "Analytics",
      children: [
        { label: "Overview", href: "/admin/analytics" },
        { label: "Booking Trends", href: "/admin/analytics/bookings" },
        { label: "Doctor Utilization", href: "/admin/analytics/doctors" },
        { label: "No-show Rates", href: "/admin/analytics/noshow" },
      ],
    },
  ];



  // Recursive render for nested menu items
  const renderMenuItems = (items: MenuItem[], depth = 0) => {
    return items.map(({ icon: Icon, label, href, badge, children }) => {
      const isActive = pathname === href;
      const isOpen = openMenus[label];
      const hasChildren = children && children.length > 0;

      return (
        <div key={label} className="w-full">
          {href ? (
            <Link
              href={href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors w-full ${isActive
                ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
              {badge && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ) : (
            <button
              onClick={() => hasChildren && toggleMenu(label)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors w-full ${isOpen
                ? "bg-gray-100 text-gray-800"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
              <ChevronRight
                className={`w-4 h-4 ml-auto transform transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            </button>
          )}

          {/* Render children recursively */}
          {hasChildren && isOpen && (
            <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
              {renderMenuItems(children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 z-10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
        <div className="relative">
          <img
            src="/logo/klinik-mekar-logo-only.png"
            alt="Klinik Mekar Logo"
            className="w-10 h-10 transition-transform duration-300"
          />
        </div>
        <span className="font-bold text-xl text-gray-800">Klinik Mekar</span>
      </div>

      {/* Welcome message */}
      {showWelcome && (
        <div className="m-4 p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-xl relative">
          <button
            onClick={() => setShowWelcome(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Good Morning,</h3>
              <p className="font-bold text-lg text-gray-900">Lord Commander!</p>
              <p className="text-xs text-gray-600 mt-1">2 appointments</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-4 flex-1 overflow-y-auto">
        {renderMenuItems(menuItems)}
      </nav>

      {/* Footer */}
      <div className="px-4 mt-8 pt-4 border-t border-gray-100 space-y-2">
        <Link
          href="/admin/settings"
          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <Link
          href="/admin/help"
          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </Link>
      </div>
    </aside>
  );
}
