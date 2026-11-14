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
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-2 text-purple-400">
        Reverse Voice Challenge
      </h1>
      <p className="text-zinc-500 text-sm mb-8">Tersine ses taklidi</p>

      <StepIndicator current={step} total={TOTAL_STEPS} />

      <div className="w-full max-w-sm">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-zinc-400">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p>Ses işleniyor…</p>
          </div>
        )}

        {!loading && step === 1 && <Step1Record onDone={handleStep1Done} />}
        {!loading && step === 2 && <Step2Listen reversedBuffer={originalReversed} onDone={() => setStep(3)} />}
        {!loading && step === 3 && <Step3Mimic onDone={handleStep3Done} />}
        {!loading && step === 4 && <Step4Guess mimicReversedBuffer={mimicReversed} onDone={() => setStep(5)} />}
        {!loading && step === 5 && (
          <Step5Result
            originalBlob={originalBlob}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
