// src/app/(admin)/layout.tsx
"use client";

import '../globals.css';
import React from "react";
import useAuth from "@/lib/hooks/useAuth";
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, handleLogout } = useAuth("/admin/login");

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Right side (Header + content) */}
      <div className="flex-1 ml-64 min-h-screen">
        <Header
          title="Dashboard"
          userName="Lora Hudson"
          userRole="Cardiologist"
          avatarUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          onLogout={handleLogout}
        />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
