export default function HomePage() {
  return (
    <section className="text-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to Clinic Booking System
      </h1>
      <p className="text-gray-600 mb-6">
        Book your appointments with ease. Choose your doctor and time slot online.
      </p>
      <div className="space-x-4">
        <a
          href="/doctors"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Find Doctors
        </a>
        <a
          href="/bookings"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
