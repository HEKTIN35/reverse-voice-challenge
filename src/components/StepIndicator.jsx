export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center mb-8 w-full max-w-xs">
      {Array.from({ length: total }, (_, i) => i + 1).map((n, idx) => (
        <div key={n} className="flex items-center">
          {idx > 0 && (
            <div
              className="h-px w-6 sm:w-8 transition-all duration-500"
              style={{
                background: n <= current
                  ? 'linear-gradient(90deg, #8b5cf6, #ec4899)'
                  : '#27272a',
              }}
            />
          )}
          <div
            className="relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300"
            style={
              n === current
                ? { background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: '#fff', boxShadow: '0 0 18px rgba(167,92,246,0.6)', transform: 'scale(1.15)' }
                : n < current
                ? { background: 'rgba(139,92,246,0.25)', color: '#c084fc', border: '1px solid rgba(139,92,246,0.4)' }
                : { background: 'rgba(255,255,255,0.04)', color: '#52525b', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {n < current ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : n}
          </div>
        </div>
      ))}
    </div>
  );
}
