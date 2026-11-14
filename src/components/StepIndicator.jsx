export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center mb-6 w-full max-w-xs">
      {Array.from({ length: total }, (_, i) => i + 1).map((n, idx) => (
        <div key={n} className="flex items-center">
          {idx > 0 && (
            <div
              className="h-0.5 w-6 sm:w-9 transition-all duration-500"
              style={{
                background: n <= current
                  ? 'linear-gradient(90deg,#a855f7,#ec4899)'
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          )}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold transition-all duration-300"
            style={
              n === current
                ? { background: 'linear-gradient(135deg,#9333ea,#ec4899)', color: '#fff', boxShadow: '0 0 20px rgba(167,92,246,0.7)', transform: 'scale(1.15)' }
                : n < current
                ? { background: 'rgba(147,51,234,0.25)', color: '#d8b4fe', border: '1px solid rgba(147,51,234,0.5)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {n < current ? (
              <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : n}
          </div>
        </div>
      ))}
    </div>
  );
}
