import React, { useState } from 'react';
import StepperHeader from './components/StepperHeader';
import ProblemInput from './components/ProblemInput';
import SubProblemPicker from './components/SubProblemPicker';
import MatrixBuilder from './components/MatrixBuilder';

export default function App() {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState('');
  const [selectedSubProblem, setSelectedSubProblem] = useState(null);

  const goToSubProblems = (p) => {
    setProblem(p);
    setStep(1);
  };

  const goToMatrix = (sp) => {
    setSelectedSubProblem(sp);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <StepperHeader currentStep={step} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {step === 0 && <ProblemInput onSubmit={goToSubProblems} />}

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-sm text-gray-600 mb-1">Problem</div>
              <div className="font-semibold">{problem}</div>
            </div>
            <SubProblemPicker problem={problem} onSelect={goToMatrix} />
          </div>
        )}

        {step === 2 && selectedSubProblem && (
          <MatrixBuilder
            subProblem={selectedSubProblem}
            onGenerate={() => {}}
          />
        )}
      </main>

      <footer className="py-10 text-center text-sm text-gray-500">
        Built with curiosity • Explore in‑domain and out‑of‑domain strategies
      </footer>
    </div>
  );
}
