export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div
          key={n}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            n === current
              ? 'bg-purple-500 text-white scale-110'
              : n < current
              ? 'bg-purple-900 text-purple-300'
              : 'bg-zinc-800 text-zinc-500'
          }`}
        >
          {n}
        </div>
      ))}
      <span className="ml-2 text-zinc-400 text-sm">{current}/{total}</span>
    </div>
  );
}
