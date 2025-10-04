import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

export const metadata = {
  title: "Klinik Mekar - Online Appointment Booking",
  description: "Experience seamless healthcare with Klinik Mekar. Book appointments with trusted doctors online, manage your healthcare needs, and receive quality medical care.",
  keywords: "clinic, doctor appointment, healthcare, medical booking, online appointment",
  authors: [{ name: "Klinik Mekar" }],
  creator: "Klinik Mekar",
  publisher: "Klinik Mekar",
  openGraph: {
    title: "Klinik Mekar - Online Appointment Booking",
    description: "Book appointments with trusted doctors online. Quality healthcare made convenient.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Mekar - Online Appointment Booking",
    description: "Book appointments with trusted doctors online. Quality healthcare made convenient.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>

        {/* Header - always visible */}
        <Header />

        {/* Main content area */}
        <main
          id="main-content"
          className="flex-1 w-full pt-18"
          role="main"
        >
          {children}
        </main>


        {/* Footer */}
        <Footer />

        {/* Back to top button - Client Component */}
        <BackToTop />
      </body>
    </html>
  );
}