import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // optional

export const metadata = {
  title: "Clinic Booking System",
  description: "Book appointments with doctors easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Header always visible */}
        <Header />

        {/* Page content */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* Footer (optional) */}
        <Footer />
      </body>
    </html>
  );
}
