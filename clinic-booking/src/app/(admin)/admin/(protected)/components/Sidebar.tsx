"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  FileText,
  Building2,
  Settings,
  HelpCircle,
  X,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(true);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages", badge: 5 },
    { icon: Users, label: "Patients", href: "/admin/patients" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: Building2, label: "Administration", href: "/admin/administration" },
  ];

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

      {/* Welcome Message */}
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
              <p className="font-bold text-lg text-gray-900">Lora!</p>
              <p className="text-xs text-gray-600 mt-1">
                5 messages & 2 notifications
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="mt-4 space-y-1 px-4 flex-1 overflow-y-auto">
        {menuItems.map(({ icon: Icon, label, href, badge }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Links */}
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
