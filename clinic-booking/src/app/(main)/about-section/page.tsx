"use client";

import BackgroundHeroLayout from "@/components/ui/BackgroundHeroLayout";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero*/}
            <BackgroundHeroLayout heightClassName="min-h-[20vh]">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        About <span className="text-teal-600">Klinik Mekar</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Dedicated to delivering compassionate healthcare with modern
                        convenience — putting patients at the heart of everything we do.
                    </p>
                </div>
            </BackgroundHeroLayout>
            {/* <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
                <div className="container mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        About <span className="text-teal-600">Klinik Mekar</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Dedicated to delivering compassionate healthcare with modern
                        convenience — putting patients at the heart of everything we do.
                    </p>
                </div>
            </section> */}

            {/* Mission */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-6 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        To provide accessible, compassionate, and high-quality healthcare
                        for every patient by combining trusted medical expertise with
                        innovative technology.
                    </p>
                </div>
            </section>

            {/* Vision */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-6 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        To become the most trusted healthcare provider in our community,
                        where every patient feels valued, cared for, and supported on their
                        journey to wellness.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The principles that guide us in delivering excellent care
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Compassion",
                                desc: "We treat every patient with empathy, kindness, and respect.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                ),
                            },
                            {
                                title: "Integrity",
                                desc: "We uphold honesty, ethics, and transparency in every interaction.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2z"
                                    />
                                ),
                            },
                            {
                                title: "Excellence",
                                desc: "We strive for the highest standards in medical care and service.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6l-2 4h4l-2 4m0 0v6"
                                    />
                                ),
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                            >
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-teal-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {value.icon}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story - Timeline */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A journey of care, growth, and innovation over the years
                        </p>
                    </div>

                    <div className="relative border-l border-teal-200 max-w-3xl mx-auto">
                        {[
                            {
                                year: "2015",
                                title: "Klinik Mekar Founded",
                                desc: "We opened our doors with a mission to provide accessible healthcare in Seri Kembangan.",
                            },
                            {
                                year: "2018",
                                title: "Expanded Services",
                                desc: "Introduced specialist consultations and modern diagnostic facilities.",
                            },
                            {
                                year: "2021",
                                title: "Digital Transformation",
                                desc: "Launched our online appointment booking system to simplify patient access.",
                            },
                            {
                                year: "2023",
                                title: "Community Outreach",
                                desc: "Started wellness programs and free health check-up events for the community.",
                            },
                        ].map((event, index) => (
                            <div key={index} className="mb-10 ml-6">
                                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-600 rounded-full ring-8 ring-white"></span>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <span className="text-sm text-teal-600 font-semibold">
                                        {event.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 mt-2">{event.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
