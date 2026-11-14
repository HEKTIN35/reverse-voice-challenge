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
    <div className="min-h-screen flex flex-col items-center px-4 pt-8 pb-16">

      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className="text-5xl font-black tracking-tight mb-1"
          style={{ background: 'linear-gradient(135deg,#e879f9,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          Reverse Voice
        </h1>
        <p className="text-purple-300/60 text-xs tracking-[0.25em] uppercase font-semibold">Challenge</p>
      </div>

      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/* Back button */}
      {step > 1 && !loading && (
        <div className="w-full max-w-sm mb-3">
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 text-purple-300/70 hover:text-white text-sm transition-colors active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Geri
          </button>
        </div>
      )}

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-3xl p-[1.5px]"
        style={{ background: 'linear-gradient(135deg,rgba(192,132,252,0.5),rgba(236,72,153,0.3),rgba(99,102,241,0.4))' }}
      >
        <div
          className="rounded-[22px] p-6"
          style={{ background: 'rgba(20,8,45,0.92)', backdropFilter: 'blur(20px)' }}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <div
                className="w-12 h-12 rounded-full border-[3px] border-t-transparent animate-spin"
                style={{ borderColor: 'rgba(192,132,252,0.3)', borderTopColor: '#c084fc' }}
              />
              <p className="text-purple-300 text-sm">Ses işleniyor…</p>
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
