import React from 'react';
import { Rocket, ChevronRight } from 'lucide-react';

const steps = [
  { id: 0, label: 'Define Problem' },
  { id: 1, label: 'Break Into Sub‑problems' },
  { id: 2, label: 'Matrix Builder' },
];

export default function StepperHeader({ currentStep }) {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Rocket className="w-6 h-6" />
          <span className="font-semibold tracking-tight">Innovation Builder</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`px-3 py-1 rounded-full border ${
                  currentStep === s.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : currentStep > s.id
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}
              >
                {s.label}
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
