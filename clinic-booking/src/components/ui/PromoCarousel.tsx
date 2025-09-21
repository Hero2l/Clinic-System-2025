import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function PromoCarousel() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Latest Promotions
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-xl shadow-lg overflow-hidden"
      >
        <SwiperSlide>
          <Image
            src="/images/promo1.jpg"
            alt="Health Screening Package"
            width={1200}
            height={500}
            className="object-cover w-full h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/promo2.jpg"
            alt="Vaccination Campaign"
            width={1200}
            height={500}
            className="object-cover w-full h-[400px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/promo3.jpg"
            alt="Specialist Consultation Discount"
            width={1200}
            height={500}
            className="object-cover w-full h-[400px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
