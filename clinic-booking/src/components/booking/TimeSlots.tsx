"use client";

type Props = {
  availableSlots: string[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
};

export default function TimeSlots({ availableSlots, selectedTime, onSelectTime }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Time
      </label>
      {availableSlots.length === 0 ? (
        <p className="text-gray-500">No available slots for this date.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map((time) => (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`px-3 py-2 rounded-lg border ${
                selectedTime === time
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
