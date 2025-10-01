"use client";
// import PromoCarousel from "@/components/ui/PromoCarousel";
import HeroSection from "@/components/home/Hero";
import FeaturesSection from "@/components/home/Features";
import AboutSection from "@/components/home/About";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import ServicesSection from "@/components/home/Services";
import CTASection from "@/components/home/CTA";
import LocationSection from "@/components/home/Location";
import dynamic from "next/dynamic";

const PromoCarousel = dynamic(() => import("@/components/home/PromoCarousel"), {
  ssr: false,
});


export default function HomePage() {
  const { visibleSections, refs } = useSectionVisibility([
    'hero',
    'features',
    'about',
    'services',
    'cta',
    'location'
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={refs.hero}>
        <HeroSection isVisible={visibleSections.hero} />
      </div>

      {/* Features Section */}
      <div ref={refs.features}>
        <FeaturesSection isVisible={visibleSections.features} />
      </div>

      {/* Promotions Section */}
      <PromoCarousel />

      {/* About Us Section */}
      <div ref={refs.about}>
        <AboutSection isVisible={visibleSections.about} />
      </div>

      {/* Our Services Section */}
      <div ref={refs.services}>
        <ServicesSection isVisible={visibleSections.services} />
      </div>

      {/* Call to Action */}
      <div ref={refs.cta}>
        <CTASection isVisible={visibleSections.cta} />
      </div>

      {/* Location / Google Map Section */}
      <div ref={refs.location}>
        <LocationSection isVisible={visibleSections.location} />
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .delay-400 {
          transition-delay: 0.4s;
        }
        
        .delay-600 {
          transition-delay: 0.6s;
        }
        
        .delay-800 {
          transition-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}