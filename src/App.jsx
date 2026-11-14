import { useState } from 'react';
import StepIndicator from './components/StepIndicator';
import { reverseAudioBlob } from './utils/reverseAudio';
import Step1Record from './steps/Step1Record';
import Step2Listen from './steps/Step2Listen';
import Step3Mimic from './steps/Step3Mimic';
import Step4Guess from './steps/Step4Guess';
import Step5Result from './steps/Step5Result';

const TOTAL_STEPS = 5;

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [originalBlob, setOriginalBlob] = useState(null);
  const [originalReversed, setOriginalReversed] = useState(null);
  const [mimicReversed, setMimicReversed] = useState(null);

  const handleStep1Done = async (blob) => {
    setLoading(true);
    const reversed = await reverseAudioBlob(blob);
    setOriginalBlob(blob);
    setOriginalReversed(reversed);
    setLoading(false);
    setStep(2);
  };

  const handleStep3Done = async (blob) => {
    setLoading(true);
    const reversed = await reverseAudioBlob(blob);
    setMimicReversed(reversed);
    setLoading(false);
    setStep(4);
  };

  const handleRestart = () => {
    setStep(1);
    setOriginalBlob(null);
    setOriginalReversed(null);
    setMimicReversed(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-3 pt-10 pb-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight gradient-text mb-1">
          Reverse Voice
        </h1>
        <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">Challenge</p>
      </div>

      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/* Gradient border card */}
      <div className="card-border w-full max-w-sm shadow-2xl">
        <div className="card-inner p-6 sm:p-8">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-10 text-zinc-400">
              <div className="w-10 h-10 border-[3px] border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Ses işleniyor…</p>
            </div>
          ) : (
            <>
              {step === 1 && <Step1Record onDone={handleStep1Done} />}
              {step === 2 && <Step2Listen reversedBuffer={originalReversed} onDone={() => setStep(3)} />}
              {step === 3 && <Step3Mimic onDone={handleStep3Done} />}
              {step === 4 && <Step4Guess mimicReversedBuffer={mimicReversed} onDone={() => setStep(5)} />}
              {step === 5 && <Step5Result originalBlob={originalBlob} onRestart={handleRestart} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
