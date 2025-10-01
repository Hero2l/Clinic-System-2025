interface ServicesSectionProps {
  isVisible: boolean;
}

const mainServices = [
  {
    title: "General Consultation",
    description: "Comprehensive health evaluations, preventive care, and personalized medical guidance for patients of all ages and health conditions.",
    price: "From RM50",
    badge: "Popular",
    badgeColor: "from-red-500 to-pink-500",
    icon: (
      <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-red-100 to-red-200",
      hoverBg: "from-red-200 to-red-300",
      borderColor: "border-red-100 hover:border-red-300",
      shadowColor: "hover:shadow-red-500/10",
      textColor: "group-hover:text-red-600",
      linkColor: "text-red-600 group-hover:text-red-700",
      gradientBg: "from-red-50/80"
    },
    delay: "delay-400"
  },
  {
    title: "Specialist Care",
    description: "Expert consultation with board-certified specialists in cardiology, dermatology, orthopedics, and other medical fields.",
    price: "From RM120",
    badge: "Expert",
    badgeColor: "from-blue-500 to-indigo-500",
    icon: (
      <svg className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-blue-100 to-blue-200",
      hoverBg: "from-blue-200 to-blue-300",
      borderColor: "border-blue-100 hover:border-blue-300",
      shadowColor: "hover:shadow-blue-500/10",
      textColor: "group-hover:text-blue-600",
      linkColor: "text-blue-600 group-hover:text-blue-700",
      gradientBg: "from-blue-50/80"
    },
    delay: "delay-600"
  },
  {
    title: "Laboratory Services",
    description: "State-of-the-art diagnostic testing including blood work, imaging, and specialized tests with fast, accurate results.",
    price: "From RM30",
    badge: "Fast Results",
    badgeColor: "from-emerald-500 to-teal-500",
    icon: (
      <svg className="w-10 h-10 text-emerald-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    colorScheme: {
      bgColor: "from-emerald-100 to-emerald-200",
      hoverBg: "from-emerald-200 to-emerald-300",
      borderColor: "border-emerald-100 hover:border-emerald-300",
      shadowColor: "hover:shadow-emerald-500/10",
      textColor: "group-hover:text-emerald-600",
      linkColor: "text-emerald-600 group-hover:text-emerald-700",
      gradientBg: "from-emerald-50/80"
    },
    delay: "delay-800"
  }
];

const additionalServices = [
  {
    title: "Cardiology",
    subtitle: "Heart Health",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    bgColor: "from-red-100 to-red-200",
    borderColor: "border-gray-100 hover:border-red-200"
  },
  {
    title: "Dermatology",
    subtitle: "Skin Care",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    bgColor: "from-blue-100 to-blue-200",
    borderColor: "border-gray-100 hover:border-blue-200"
  },
  {
    title: "Pediatrics",
    subtitle: "Child Care",
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: "from-emerald-100 to-emerald-200",
    borderColor: "border-gray-100 hover:border-emerald-200"
  },
  {
    title: "Orthopedics",
    subtitle: "Bone Health",
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bgColor: "from-purple-100 to-purple-200",
    borderColor: "border-gray-100 hover:border-purple-200"
  }
];

export default function ServicesSection({ isVisible }: ServicesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-red-50/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-red-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/4 left-1/6 opacity-10">
          <div className="w-16 h-4 bg-red-400 rounded-full"></div>
          <div className="w-4 h-16 bg-red-400 rounded-full absolute top-0 left-6"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-10">
          <div className="w-20 h-5 bg-blue-400 rounded-full"></div>
          <div className="w-5 h-20 bg-blue-400 rounded-full absolute top-0 left-7"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Healthcare Services</span>
          </div>

          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-200`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>

          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Comprehensive healthcare solutions designed with your well-being in mind. From routine check-ups to specialized treatments,
            we're here for every step of your health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border ${service.colorScheme.borderColor} shadow-lg hover:shadow-2xl ${service.colorScheme.shadowColor} transition-all duration-500 transform hover:-translate-y-4 md:col-span-${index === 2 ? '2' : '1'} lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${service.delay}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.colorScheme.gradientBg} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.colorScheme.bgColor} rounded-3xl flex items-center justify-center mb-6 group-hover:${service.colorScheme.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                  {service.icon}
                </div>

                <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${service.colorScheme.textColor} transition-colors duration-300`}>
                  {service.title}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${service.colorScheme.linkColor} font-semibold transition-colors duration-300`}>
                    <span className="mr-2">{service.price}</span>
                  </div>
                  <div className={`inline-flex items-center ${service.colorScheme.linkColor} font-semibold transition-colors duration-300`}>
                    <span className="mr-2 text-sm">Book Now</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {service.badge}
              </div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} delay-1000`}>
          {additionalServices.map((service, index) => (
            <div key={index} className={`group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border ${service.borderColor} hover:shadow-lg transition-all duration-300`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{service.title}</h4>
              <p className="text-xs text-gray-600">{service.subtitle}</p>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-800 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/services" className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 mr-3">View All Services</span>
              <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a href="/book-appointment" className="group inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border-2 border-emerald-500 hover:border-emerald-600 transform hover:scale-105">
              <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </a>
          </div>

          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Need help choosing?</span> Call us at
            <a href="tel:+60123456789" className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300 ml-1">
              +60 12-345 6789
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}