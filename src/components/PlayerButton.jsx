export default function PlayerButton({ onPlay, isPlaying, label = 'Dinle', disabled }) {
  return (
    <button
      onClick={onPlay}
      disabled={disabled || isPlaying}
      className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all duration-200 w-full max-w-xs"
    >
      {isPlaying ? '▶ Çalıyor…' : `▶ ${label}`}
    </button>
  );
}
