export default function RecorderButton({ isRecording, onStart, onStop, disabled }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={isRecording ? onStop : onStart}
        disabled={disabled}
        className={`relative w-28 h-28 rounded-full font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 ${
          isRecording
            ? 'bg-red-600 scale-105'
            : 'btn-primary'
        }`}
      >
        {/* outer pulse ring when recording */}
        {isRecording && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25" />
            <span className="absolute -inset-2 rounded-full border border-red-500/40 animate-pulse" />
          </>
        )}

        {/* mic icon */}
        <span className="relative flex flex-col items-center gap-1">
          {isRecording ? (
            /* stop square */
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          ) : (
            /* mic */
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="2" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round"/>
              <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>

      <span className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
        isRecording ? 'text-red-400' : 'text-zinc-400'
      }`}>
        {isRecording ? '● Kaydediliyor' : 'Kaydet'}
      </span>
    </div>
  );
}
