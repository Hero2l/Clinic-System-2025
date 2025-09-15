import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
