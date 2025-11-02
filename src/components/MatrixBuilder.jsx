import React, { useMemo, useState } from 'react';
import { Lightbulb, Wand2 } from 'lucide-react';

const PRECEDENCE = ['Low', 'Medium', 'High'];
const DOMAIN = ['In‑domain', 'Out‑of‑domain'];

function cellKey(r, c) {
  return `${r}-${c}`;
}

export default function MatrixBuilder({ subProblem, onGenerate }) {
  const [selected, setSelected] = useState(() => new Set());
  const [ideas, setIdeas] = useState([]);

  const toggle = (r, c) => {
    const key = cellKey(r, c);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const canGenerate = selected.size > 0;

  const generate = () => {
    const picks = Array.from(selected).map((k) => k.split('-').map(Number));
    const synthesized = picks.map(([r, c]) => {
      const d = DOMAIN[c];
      const p = PRECEDENCE[r];
      const verb = d === 'In‑domain' ? 'adapt' : 'borrow';
      return `${verb} a ${p.toLowerCase()}‑precedence approach from ${d.toLowerCase()} to address: ${subProblem}`;
    });
    const unique = Array.from(new Set(synthesized));
    setIdeas(unique);
    onGenerate && onGenerate(unique);
  };

  const cells = useMemo(() => {
    return PRECEDENCE.map((p, r) => (
      <div key={p} className="contents">
        {DOMAIN.map((d, c) => {
          const key = cellKey(r, c);
          const isOn = selected.has(key);
          return (
            <button
              key={key}
              onClick={() => toggle(r, c)}
              className={`h-20 rounded-xl border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isOn
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span>{d}</span>
                <span className="opacity-80">{p} precedence</span>
              </div>
            </button>
          );
        })}
      </div>
    ));
  }, [selected]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6">
        <div className="text-sm text-indigo-700 mb-1">Selected sub‑problem</div>
        <div className="text-lg font-semibold text-indigo-900">{subProblem}</div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold">In‑domain vs Out‑of‑domain precedence</h3>
          </div>
          <button
            onClick={generate}
            disabled={!canGenerate}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
              canGenerate
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Wand2 className="w-4 h-4" /> Generate ideas
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cells}
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Tip: Click multiple cells to combine strategies and create more novel directions.
        </p>
      </div>

      {ideas.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Generated directions</h4>
          <ul className="space-y-2 list-disc pl-5">
            {ideas.map((idea, i) => (
              <li key={i} className="text-gray-800">{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
