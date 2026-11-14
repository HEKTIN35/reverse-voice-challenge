export default function RecorderButton({ isRecording, onStart, onStop, disabled }) {
  return (
    <button
      onClick={isRecording ? onStop : onStart}
      disabled={disabled}
      className={`relative w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        isRecording
          ? 'bg-red-600 scale-105'
          : 'bg-purple-600 hover:bg-purple-500 active:scale-95'
      }`}
    >
      {isRecording && (
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
      )}
      <span className="relative">{isRecording ? 'Durdur' : 'Kaydet'}</span>
    </button>
  );
}
