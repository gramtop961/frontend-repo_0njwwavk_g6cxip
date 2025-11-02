import React, { useMemo, useState } from 'react';
import { ArrowRight, ListChecks, Plus, Sparkles } from 'lucide-react';

function deriveSubProblems(problem) {
  // Simple heuristic: split by conjunctions and punctuation, fallback to templates
  const parts = problem
    .split(/[,;]|\band\b|\bor\b|\bbut\b/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 160);

  const unique = Array.from(new Set(parts)).slice(0, 5);

  if (unique.length >= 2) return unique;

  // Fallback scaffold if not enough parts
  const base = problem.replace(/\.$/, '');
  return [
    `Define success metrics for: ${base}`,
    `Map current workflow for: ${base}`,
    `Identify constraints for: ${base}`,
    `Explore alternatives outside domain for: ${base}`,
  ];
}

export default function SubProblemPicker({ problem, onSelect }) {
  const initial = useMemo(() => deriveSubProblems(problem), [problem]);
  const [items, setItems] = useState(initial);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(null);

  const addItem = () => {
    const v = input.trim();
    if (!v) return;
    setItems((arr) => [...arr, v]);
    setInput('');
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Break it into sub‑problems</h2>
          </div>
          <p className="text-gray-600 mb-6">
            We suggested a few starting points. Select one to dive deeper, or add your own.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {items.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(sp)}
                className={`text-left rounded-xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  selected === sp
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900">{sp}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Opportunity area
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a custom sub‑problem"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex justify-end">
            <button
              disabled={!selected}
              onClick={() => selected && onSelect(selected)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow ${
                selected
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
