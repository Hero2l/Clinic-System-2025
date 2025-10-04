"use client";

import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

export default function ContactPage() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const center = useMemo(() => ({ lat: 3.036736, lng: 101.707301 }), []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <BackgroundHeroLayout heightClassName="min-h-[20vh]">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We’re here to assist you with appointments, inquiries, and general
                        information about Klinik Mekar.
                    </p>
                </div>
            </BackgroundHeroLayout>
            {/* <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We’re here to assist you with appointments, inquiries, and general
                        information about Klinik Mekar.
                    </p>
                </div>
            </section> */}

            {/* Contact Info Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
                        <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                            📞
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                        <p className="text-gray-600">
                            <a href="tel:+60123456789" className="hover:text-teal-600">
                                +60 12-345 6789
                            </a>
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
                        <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                            📧
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">
                            <a href="mailto:info@klinikmekar.com" className="hover:text-teal-600">
                                info@klinikmekar.com
                            </a>
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
                        <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                            📍
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Visit Us</h3>
                        <p className="text-gray-600">
                            No. 123, Seri Kembangan,<br />Selangor, Malaysia
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-2xl">
                            🕒
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 text-center">Open 24/7</h3>
                        <p className="text-gray-600 text-center">
                            Available 24 hours a day, <br /> 7 days a week
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-6 max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Send Us a Message
                    </h2>
                    <form className="bg-white shadow-md rounded-xl p-8 space-y-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="tel"
                            placeholder="Your Phone"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Google Map */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {!isLoaded ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Loading Map...</p>
                            </div>
                        ) : (
                            <GoogleMap
                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                center={center}
                                zoom={15}
                            >
                                <Marker position={center} />
                            </GoogleMap>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
