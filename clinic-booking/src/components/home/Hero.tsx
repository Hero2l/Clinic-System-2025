interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-red-50 via-purple-50 to-blue-100 py-24 relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-bounce-slow"></div>
        <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-float-reverse"></div>
        <div className="absolute top-1/4 right-1/6 w-16 h-4 bg-green-400/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/6 w-4 h-16 bg-green-400/20 rounded-full"></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className={`text-5xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Health,
            </span>
            <br />
            <span className="text-gray-800">Our Priority at</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 relative">
              Klinik Mekar
              <span className="absolute -right-8 top-0 text-emerald-500 animate-pulse">✚</span>
            </span>
          </h1>

          <p className={`text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed transition-all duration-1000 delay-200 max-w-3xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Experience <span className="font-semibold text-red-600">premium healthcare</span> with our
            <span className="font-semibold text-blue-600"> digital-first approach</span>.
            Book appointments, connect with specialists, and manage your health journey seamlessly.
          </p>

          <div className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 font-medium">24/7 Online Booking</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 font-medium">Expert Specialists</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 font-medium">Modern Facilities</span>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="/book-appointment" className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 via-red-700 to-pink-600 hover:from-red-700 hover:via-red-800 hover:to-pink-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:scale-110 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">Book Appointment</span>
              <div className="absolute inset-0 rounded-2xl ring-4 ring-red-300/50 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            <a href="/doctors" className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:bounce relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="relative z-10">Find Doctors</span>
              <div className="absolute inset-0 rounded-2xl ring-4 ring-blue-300/50 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            <a href="tel:+60123456789" className="group relative inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-emerald-500 hover:border-emerald-600 transform hover:scale-105">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Emergency
            </a>
          </div>

          <div className={`mt-12 pt-8 border-t border-white/30 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gray-600 mb-4 text-sm uppercase tracking-wider font-semibold">Trusted by 10,000+ patients</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">4.9</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-gray-500">•</div>
              <div className="text-gray-600 font-medium">MOH Certified</div>
              <div className="text-gray-500">•</div>
              <div className="text-gray-600 font-medium">ISO 9001:2015</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}