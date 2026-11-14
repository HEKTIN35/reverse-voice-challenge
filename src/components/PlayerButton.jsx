export default function PlayerButton({ onPlay, isPlaying, label = 'Dinle', disabled }) {
  return (
    <button
      onClick={onPlay}
      disabled={disabled || isPlaying}
      className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-200 w-full max-w-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed glow-indigo"
      style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
    >
      {isPlaying ? (
        /* animated equalizer bars */
        <span className="flex items-end gap-0.5 h-5">
          {[3, 5, 4, 5, 3].map((h, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.1}s`, height: `${h * 3}px` }}
              className="w-1 rounded-full bg-white/90 animate-bounce"
            />
          ))}
        </span>
      ) : (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.14v14l11-7-11-7z"/>
        </svg>
      )}
      <span>{isPlaying ? 'Çalıyor…' : label}</span>
    </button>
  );
}
