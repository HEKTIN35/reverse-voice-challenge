import LevelMeter from '../components/LevelMeter';
import RecorderButton from '../components/RecorderButton';
import { useRecorder } from '../hooks/useRecorder';

export default function Step1Record({ onDone }) {
  const { isRecording, audioBlob, level, error, startRecording, stopRecording } = useRecorder();

  const handleDone = () => {
    if (audioBlob) onDone(audioBlob);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">Bir ünlünün adını söyle</h2>
      <p className="text-zinc-400 max-w-xs">
        Kaydet'e bas, aklındaki ünlünün ismini normal şekilde söyle, ardından Durdur'a bas.
        Maksimum 5 saniye.
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
          onClick={handleDone}
          className="mt-4 px-10 py-4 rounded-2xl bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-lg transition-all duration-200 w-full max-w-xs"
        >
          Devam Et →
        </button>
      )}
    </div>
  );
}
