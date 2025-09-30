interface FeaturesSectionProps {
  isVisible: boolean;
}

const features = [
  {
    title: "Easy Scheduling",
    description: "Book appointments 24/7 with our intelligent booking system. Choose your preferred time, doctor, and get instant confirmations.",
    icon: (
      <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: "from-red-100 to-red-200",
    hoverBg: "from-red-200 to-red-300",
    borderColor: "border-red-100 hover:border-red-300",
    shadowColor: "hover:shadow-red-500/10",
    textColor: "group-hover:text-red-600",
    linkColor: "text-red-600 group-hover:text-red-700",
    gradientBg: "from-red-50/50",
    delay: "delay-400"
  },
  {
    title: "Trusted Care",
    description: "Licensed medical professionals with years of experience providing quality healthcare you can trust and depend on.",
    icon: (
      <svg className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bgColor: "from-blue-100 to-blue-200",
    hoverBg: "from-blue-200 to-blue-300",
    borderColor: "border-blue-100 hover:border-blue-300",
    shadowColor: "hover:shadow-blue-500/10",
    textColor: "group-hover:text-blue-600",
    linkColor: "text-blue-600 group-hover:text-blue-700",
    gradientBg: "from-blue-50/50",
    delay: "delay-600"
  },
  {
    title: "Fast Service",
    description: "Quick appointment confirmations, minimal waiting times, and efficient service that respects your valuable time.",
    icon: (
      <svg className="w-10 h-10 text-emerald-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: "from-emerald-100 to-emerald-200",
    hoverBg: "from-emerald-200 to-emerald-300",
    borderColor: "border-emerald-100 hover:border-emerald-300",
    shadowColor: "hover:shadow-emerald-500/10",
    textColor: "group-hover:text-emerald-600",
    linkColor: "text-emerald-600 group-hover:text-emerald-700",
    gradientBg: "from-emerald-50/50",
    delay: "delay-800"
  }
];

const stats = [
  { value: "10,000+", label: "Happy Patients", gradient: "from-red-600 to-pink-600" },
  { value: "15+", label: "Expert Doctors", gradient: "from-blue-600 to-indigo-600" },
  { value: "24/7", label: "Online Booking", gradient: "from-emerald-600 to-teal-600" },
  { value: "5 Years", label: "Experience", gradient: "from-purple-600 to-pink-600" }
];

export default function FeaturesSection({ isVisible }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200/30 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mb-4 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          </div>

          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-200`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Klinik Mekar?
            </span>
          </h2>

          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Experience healthcare reimagined with our commitment to excellence, innovation, and personalized care that puts you first
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border ${feature.borderColor} hover:shadow-2xl ${feature.shadowColor} transition-all duration-500 transform hover:-translate-y-3 md:col-span-${index === 2 ? '2' : '1'} lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${feature.delay}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradientBg} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:${feature.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                  {feature.icon}
                </div>

                <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${feature.textColor} transition-colors duration-300 text-center`}>
                  {feature.title}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-center leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex justify-center">
                  <div className={`inline-flex items-center ${feature.linkColor} font-semibold transition-colors duration-300`}>
                    <span className="mr-2">Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} delay-1000`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}