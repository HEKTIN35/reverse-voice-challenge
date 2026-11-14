import LevelMeter from '../components/LevelMeter';
import RecorderButton from '../components/RecorderButton';
import { useRecorder } from '../hooks/useRecorder';

export default function Step3Mimic({ onDone }) {
  const { isRecording, audioBlob, level, error, startRecording, stopRecording } = useRecorder();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">Ters sesi taklit et</h2>
      <p className="text-zinc-400 max-w-xs">
        Az önce duyduğun ters sesi olabildiğince taklit ederek kaydet.
        Yanlış sesleri doğru çıkarmak zor — dene!
      </p>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-xl p-4 text-sm max-w-xs">
          {error}
        </div>
      )}

      <LevelMeter level={level} />

      <RecorderButton
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
      />

      {audioBlob && !isRecording && (
        <button
          onClick={() => onDone(audioBlob)}
          className="mt-4 px-10 py-4 rounded-2xl bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-lg transition-all duration-200 w-full max-w-xs"
        >
          Devam Et →
        </button>
      )}
    </div>
  );
}
