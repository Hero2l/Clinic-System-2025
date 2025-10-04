// components/Background.tsx
import { ReactNode } from "react";

type BackgroundProps = {
  children?: ReactNode;
  heightClassName?: string;
};

export default function BackgroundHeroLayout({ children, heightClassName  }: BackgroundProps) {
  return (
    <section
      className={`bg-gradient-to-br from-red-50 via-purple-50 to-blue-100 py-24 relative overflow-hidden flex items-center justify-center ${
        heightClassName ?? "min-h-screen"
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-bounce-slow"></div>
        <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-float-reverse"></div>
        <div className="absolute top-1/4 right-1/6 w-16 h-4 bg-green-400/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/6 w-4 h-16 bg-green-400/20 rounded-full"></div>
      </div>

      {/* Content on top of the background */}
      <div className="relative z-10 text-center">{children}</div>
    </section>
  );
}
