"use client";

import "../../../globals.css";
import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "react-datepicker/dist/react-datepicker.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, handleLogout } = useAuth("/admin/login");
  const pathname = usePathname();

  // ✅ sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Right side (Header + content) */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } min-h-screen`}
      >
        <Header
          userName="Lora Hudson"
          // userRole="Cardiologist"
          avatarUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // send toggle to Header
        />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
