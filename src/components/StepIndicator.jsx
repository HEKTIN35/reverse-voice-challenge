export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center mb-10 w-full max-w-xs">
      {Array.from({ length: total }, (_, i) => i + 1).map((n, idx) => (
        <div key={n} className="flex items-center">
          {/* connector line */}
          {idx > 0 && (
            <div
              className={`h-px w-6 sm:w-8 transition-all duration-500 ${
                n <= current ? 'bg-purple-500' : 'bg-zinc-800'
              }`}
            />
          )}

          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
              n === current
                ? 'bg-purple-600 text-white glow-purple scale-110'
                : n < current
                ? 'bg-purple-900/80 text-purple-300 border border-purple-700'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}
          >
            {n < current ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              n
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
