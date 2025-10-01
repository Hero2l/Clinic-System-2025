interface CTASectionProps {
  isVisible: boolean;
}

export default function CTASection({ isVisible }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-purple-700 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/6 w-48 h-48 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/15 rounded-2xl rotate-45 animate-float-reverse"></div>
        <div className="absolute top-1/4 left-1/6 opacity-20">
          <div className="w-20 h-5 bg-white rounded-full"></div>
          <div className="w-5 h-20 bg-white rounded-full absolute top-0 left-7"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-15">
          <div className="w-16 h-4 bg-emerald-300 rounded-full"></div>
          <div className="w-4 h-16 bg-emerald-300 rounded-full absolute top-0 left-6"></div>
        </div>
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-emerald-300/30 rounded-2xl rotate-45 animate-pulse"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-200`}>
            Ready to Transform Your{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Health Journey?
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
            </span>
          </h2>

          <p className={`text-white/90 text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Join over <span className="font-bold text-yellow-300">10,000+ satisfied patients</span> who have chosen Klinik Mekar
            for their healthcare needs. Experience the difference that personalized, professional care makes.
          </p>

          <div className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-medium text-sm">4.9/5 Patient Rating</span>
            </div>

            <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-white font-medium text-sm">MOH Certified</span>
            </div>

            <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-medium text-sm">24/7 Booking</span>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-10 transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="/book-appointment" className="group relative inline-flex items-center px-10 py-5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-110 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-6 h-6 mr-3 text-red-600 relative z-10 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">Schedule Your Appointment</span>
              <svg className="w-5 h-5 ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 rounded-2xl ring-4 ring-white/50 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            <a href="tel:+60123456789" className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse relative z-10"></div>
              <svg className="w-6 h-6 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="relative z-10">Call Now: Emergency</span>
            </a>
          </div>

          <div className={`text-center transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/80 mb-4">
              Prefer other ways to connect? We're here for you.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="/contact" className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Visit Our Clinic
              </a>

              <a href="mailto:info@klinikmekar.com" className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>

              <a href="/doctors" className="group inline-flex items-center text-white/90 hover:text-white font-medium transition-colors duration-300">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Meet Our Doctors
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}