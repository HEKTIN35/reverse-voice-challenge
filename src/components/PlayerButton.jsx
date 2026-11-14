export default function PlayerButton({ onPlay, isPlaying, label = 'Dinle', disabled }) {
  return (
    <button
      onClick={onPlay}
      disabled={disabled || isPlaying}
      className="w-full flex items-center justify-center gap-3 rounded-2xl text-white font-black text-xl active:scale-95 transition-transform duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        minHeight: '64px',
        background: 'linear-gradient(135deg,#4f46e5,#7c3aed,#9333ea)',
        boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
      }}
    >
      {isPlaying ? (
        <span className="flex items-end gap-1" style={{ height: '24px' }}>
          {[4, 7, 5, 8, 5, 7, 4].map((h, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.08}s`, height: `${h * 3}px`, background: 'rgba(255,255,255,0.9)', borderRadius: '99px', width: '4px' }}
              className="animate-bounce inline-block"
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
