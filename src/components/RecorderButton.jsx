export default function RecorderButton({ isRecording, onStart, onStop, disabled }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={isRecording ? onStop : onStart}
        disabled={disabled}
        className="relative w-36 h-36 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform duration-150"
        style={
          isRecording
            ? { background: 'linear-gradient(135deg,#ef4444,#b91c1c)', boxShadow: '0 0 40px rgba(239,68,68,0.6)' }
            : { background: 'linear-gradient(135deg,#9333ea,#6366f1)', boxShadow: '0 8px 40px rgba(147,51,234,0.55)' }
        }
      >
        {isRecording && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
            <span className="absolute -inset-3 rounded-full border-2 border-red-400/35 animate-pulse" />
            <span className="absolute -inset-7 rounded-full border border-red-400/15 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </>
        )}
        {!isRecording && (
          <>
            <span className="absolute -inset-3 rounded-full border border-purple-400/25 animate-pulse" />
            <span className="absolute -inset-7 rounded-full border border-purple-400/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        <span className="relative flex items-center justify-center">
          {isRecording ? (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="3"/>
            </svg>
          ) : (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="9" y="2" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round"/>
              <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>
      <span className="text-sm font-bold tracking-wide" style={{ color: isRecording ? '#f87171' : '#c084fc' }}>
        {isRecording ? '● Kaydediliyor…' : 'Kaydet'}
      </span>
    </div>
  );
}
