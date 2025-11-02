import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ProblemInput({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">What problem are we solving?</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Describe the challenge in one or two sentences. We’ll help you break it down and explore solutions in and out of your domain.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full h-32 resize-none rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 outline-none"
              placeholder="e.g., Reduce customer support response times without compromising quality."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
