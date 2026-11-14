export default function PlayerButton({ onPlay, isPlaying, label = 'Dinle', disabled }) {
  return (
    <button
      onClick={onPlay}
      disabled={disabled || isPlaying}
      className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed btn-play"
    >
      {isPlaying ? (
        <span className="flex items-end gap-1 h-6">
          {[4, 7, 5, 7, 4].map((h, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.1}s`, height: `${h * 3}px` }}
              className="w-1.5 rounded-full bg-white/90 animate-bounce"
            />
          ))}
        </span>
      ) : (
        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.14v14l11-7-11-7z"/>
        </svg>
      )}
      <span>{isPlaying ? 'Çalıyor…' : label}</span>
    </button>
  );
}
