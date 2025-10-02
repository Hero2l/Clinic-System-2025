"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";
import { apiClient } from "../../lib/api";
import { Promotion } from "../../types/promotion";

const promotions = [
  {
    id: 1,
    image: "/images/klinik-mekar-outside.jpg",
    title: "Comprehensive Health Screening Package",
    description: "Complete health check-up with modern equipment and experienced medical professionals",
    discount: "30% OFF",
    validUntil: "December 31, 2025",
    buttonText: "Book Now",
    buttonLink: "/book-screening",
    badge: "Popular"
  },
  {
    id: 2,
    image: "/images/klinik-mekar-interior-2.jpg",
    title: "Vaccination Campaign",
    description: "Protect yourself and your family with our comprehensive vaccination program",
    discount: "FREE Consultation",
    validUntil: "November 30, 2025",
    buttonText: "Learn More",
    buttonLink: "/vaccination",
    badge: "Limited Time"
  },
  {
    id: 3,
    image: "/images/klinik-mekar-patient-room.jpg",
    title: "Specialist Consultation Discount",
    description: "Expert medical consultation with our board-certified specialists",
    discount: "25% OFF",
    validUntil: "October 31, 2025",
    buttonText: "Schedule Visit",
    buttonLink: "/consultation",
    badge: "New"
  }
];

export default function PromoCarousel() {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // Ensure component is mounted before rendering Swiper
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize autoplay config to prevent object recreation
  const autoplayConfig = useMemo(
    () => ({
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }),
    []
  );

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      if (isAutoplay) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
      setIsAutoplay((prev) => !prev);
    }
  };

  const goToSlide = (index: number) => {
    const swiper = swiperRef.current;
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Latest Promotions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our exclusive healthcare offers designed to keep you and your family healthy
          </p>
        </div>
        <div className="relative h-[500px] lg:h-[600px] bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Latest Promotions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't miss out on our exclusive healthcare offers designed to keep you and your family healthy
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
            renderBullet: (index: number, className: string) => {
              return `<span class="${className} w-3 h-3 bg-white/50 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/80"></span>`;
            },
          }}
          autoplay={isAutoplay ? autoplayConfig : false}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="rounded-2xl shadow-2xl overflow-hidden group"
        >
          {promotions.map((promo, index) => (
            <SwiperSlide key={promo.id}>
              <div className="relative h-[500px] lg:h-[600px]">
                {/* Background Image */}
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl text-white">
                      {/* Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white mb-4 animate-pulse">
                        {promo.badge}
                      </div>

                      {/* Discount */}
                      <div className="text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                        {promo.discount}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                        {promo.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed">
                        {promo.description}
                      </p>

                      {/* Valid Until */}
                      <p className="text-sm text-gray-300 mb-6">
                        Valid until: <span className="font-semibold text-yellow-400">{promo.validUntil}</span>
                      </p>

                      {/* CTA Button */}
                      <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                        {promo.buttonText}
                        <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2"></div>

        {/* Autoplay Control */}
        <button
          onClick={toggleAutoplay}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {isAutoplay ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <span className="text-gray-600 text-sm">
          {currentSlide + 1} of {promotions.length}
        </span>

        {/* Thumbnail Navigation */}
        <div className="hidden md:flex space-x-2">
          {promotions.map((promo, index) => (
            <button
              key={promo.id}
              onClick={() => goToSlide(index)}
              className={`w-16 h-10 rounded overflow-hidden border-2 transition-all duration-300 ${
                currentSlide === index
                  ? "border-blue-600 shadow-lg scale-110"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Image
                src={promo.image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={40}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / promotions.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}