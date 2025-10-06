"use client";
import { BarChart3, Calendar, MessageSquare, Users, FileText, Building2, Settings, HelpCircle, X, User } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 z-10">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                <div className="relative">
                    <img
                        src="/logo/klinik-mekar-logo-only.png"
                        alt="Klinik Mekar Logo"
                        className="w-10 h-10 transition-transform duration-300"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                </div>
                <span className="font-bold text-xl text-gray-800">Klinik Mekar</span>
            </div>

            {/* Welcome */}
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
                            <p className="text-xs text-gray-600 mt-1">5 messages & 2 notifications</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="mt-4 space-y-2 px-4">
                {[
                    { icon: BarChart3, label: "Dashboard", active: true },
                    { icon: Calendar, label: "Appointments" },
                    { icon: MessageSquare, label: "Messages", badge: 5 },
                    { icon: Users, label: "Patients" },
                    { icon: FileText, label: "Reports" },
                    { icon: Building2, label: "Administration" },
                ].map(({ icon: Icon, label, active, badge }) => (
                    <a
                        key={label}
                        href="#"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${active
                            ? "bg-gradient-to-r from-red-500 to-blue-500 text-white"
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
                    </a>
                ))}
            </nav>

            <div className="px-4 mt-8 pt-4 border-t border-gray-100 space-y-2">
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help</span>
                </a>
            </div>
        </aside>
    );
}
