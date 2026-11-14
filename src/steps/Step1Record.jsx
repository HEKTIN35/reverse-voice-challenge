import LevelMeter from '../components/LevelMeter';
import RecorderButton from '../components/RecorderButton';
import { useRecorder } from '../hooks/useRecorder';

export default function Step1Record({ onDone }) {
  const { isRecording, audioBlob, level, error, startRecording, stopRecording } = useRecorder();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Bir ünlünün adını söyle</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Kaydet'e bas, aklındaki ünlünün adını normal şekilde söyle.
          Maks. 5 saniye.
        </p>
      </div>

      {error && (
        <div className="w-full bg-red-950/60 border border-red-800/60 text-red-400 rounded-2xl px-4 py-3 text-sm text-left">
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
          className="mt-2 w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 active:scale-95 btn-success"
        >
          Devam Et →
        </button>
      )}
    </div>
  );
}
