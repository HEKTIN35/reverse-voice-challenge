export default function RecorderButton({ isRecording, onStart, onStop, disabled }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={isRecording ? onStop : onStart}
        disabled={disabled}
        className={`relative w-32 h-32 rounded-full font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform duration-150 ${
          isRecording ? 'btn-stop' : 'btn-record'
        }`}
      >
        {isRecording && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
            <span className="absolute -inset-3 rounded-full border-2 border-red-400/30 animate-pulse" />
            <span className="absolute -inset-6 rounded-full border border-red-400/15 animate-pulse" style={{ animationDelay: '0.3s' }} />
          </>
        )}
        {!isRecording && (
          <span className="absolute -inset-3 rounded-full border border-purple-400/20 animate-pulse" />
        )}

        <span className="relative flex items-center justify-center">
          {isRecording ? (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2.5"/>
            </svg>
          ) : (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="9" y="2" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round"/>
              <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>

      <span className={`text-sm font-semibold tracking-wide ${isRecording ? 'text-red-400' : 'text-purple-300'}`}>
        {isRecording ? '● Kaydediliyor…' : 'Kaydet'}
      </span>
    </div>
  );
}
