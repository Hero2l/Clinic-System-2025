"use client";

import React from "react";
import { Bell, MessageSquare, ChevronDown, LogOut } from "lucide-react";

interface HeaderProps {
    title?: string;
    userName: string;
    userRole: string;
    avatarUrl: string;
    onLogout: () => void;
}

export default function Header({
    title = "Dashboard",
    userName,
    userRole,
    avatarUrl,
    onLogout,
}: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-6">
                    {/* Messages */}
                    <div className="relative">
                        <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                            <MessageSquare className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                5
                            </span>
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                                2
                            </span>
                        </button>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                        />
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">{userName}</p>
                            <p className="text-sm text-gray-500">{userRole}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Logout */}
                    <button
                        onClick={onLogout}
                        className="ml-4 p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
