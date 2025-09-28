"use client";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  title: string;
};

const steps: Step[] = [
  { id: 1, title: "Appointment Details" },
  { id: 2, title: "Patient Information" },
  { id: 3, title: "Confirmation" },
  { id: 4, title: "Completed" },
];

export default function StepsIndicator({ currentStep }: { currentStep: number }) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-center space-x-6">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <li key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold",
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}
              >
                {step.title}
              </span>

              {/* Connector Line */}
              {step.id < steps.length && (
                <span className="mx-3 h-px w-8 bg-gray-300"></span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
