"use client";

import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <BackgroundHeroLayout heightClassName="min-h-[20vh]">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Our <span className="text-teal-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a wide range of healthcare services designed to keep you
            and your family healthy, with trusted doctors and modern facilities.
          </p>
        </div>
      </BackgroundHeroLayout>
      {/* <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Our <span className="text-teal-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a wide range of healthcare services designed to keep you
            and your family healthy, with trusted doctors and modern facilities.
          </p>
        </div>
      </section> */}

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "General Consultation",
                desc: "Comprehensive health check-ups and consultations with our doctors.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.105-.895-2-2-2H7v4h3c1.105 0 2-.895 2-2zM15 11h1a2 2 0 010 4h-1v-4zM12 3a9 9 0 100 18 9 9 0 000-18z"
                  />
                ),
              },
              {
                title: "Pediatrics",
                desc: "Dedicated care for infants, children, and adolescents.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 21h6l-.75-4M12 3v4m0 0C9.238 7 7 9.238 7 12h10c0-2.762-2.238-5-5-5z"
                  />
                ),
              },
              {
                title: "Vaccinations",
                desc: "Protective immunizations for children and adults.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9V3m0 6a9 9 0 11-9 9h18a9 9 0 01-9-9z"
                  />
                ),
              },
              {
                title: "Health Screenings",
                desc: "Early detection tests for diabetes, cholesterol, and more.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
              },
              {
                title: "Minor Procedures",
                desc: "Safe and professional minor surgical treatments.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
              },
              {
                title: "Pharmacy",
                desc: "On-site pharmacy for quick and easy medication access.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 13l3 3 7-7"
                  />
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to book your visit?</h2>
          <a
            href="/book-appointment"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-700 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 shadow-lg"
          >
            Book Appointment Now
          </a>
        </div>
      </section>
    </div>
  );
}
