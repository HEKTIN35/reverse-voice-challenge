import LevelMeter from '../components/LevelMeter';
import RecorderButton from '../components/RecorderButton';
import { useRecorder } from '../hooks/useRecorder';

export default function Step3Mimic({ onDone }) {
  const { isRecording, audioBlob, level, error, startRecording, stopRecording } = useRecorder();

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg,rgba(236,72,153,0.3),rgba(147,51,234,0.2))', border: '1px solid rgba(249,168,212,0.3)' }}
      >
        🎭
      </div>

      <div>
        <h2 className="text-xl font-black text-white mb-1">Ters sesi taklit et</h2>
        <p className="text-purple-200/50 text-sm leading-relaxed">
          Az önce duyduğun ters sesi olabildiğince taklit ederek kaydet.
        </p>
      </div>

      {error && (
        <div className="w-full rounded-2xl px-4 py-3 text-sm text-left" style={{ background: 'rgba(127,29,29,0.5)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <LevelMeter level={level} />

      <RecorderButton isRecording={isRecording} onStart={startRecording} onStop={stopRecording} />

      {audioBlob && !isRecording && (
        <button
          onClick={() => onDone(audioBlob)}
          className="w-full rounded-2xl text-white font-black text-xl active:scale-95 transition-transform"
          style={{ minHeight: '64px', background: 'linear-gradient(135deg,#059669,#10b981)', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}
        >
          Devam Et →
        </button>
      )}
    </div>
  );
}
