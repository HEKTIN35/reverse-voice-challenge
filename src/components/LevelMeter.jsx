export default function LevelMeter({ level }) {
  const bars = 16;
  const active = Math.round(level * bars);

  return (
    <div className="flex items-end gap-0.5 h-9 justify-center my-1 px-2">
      {Array.from({ length: bars }, (_, i) => {
        const heightPct = 25 + (i < bars / 2 ? i : bars - 1 - i) * 6;
        const isActive = i < active;
        const intensity = i / bars;
        return (
          <div
            key={i}
            style={{
              height: `${heightPct}%`,
              background: isActive
                ? `hsl(${280 - intensity * 60}, 80%, 65%)`
                : undefined,
            }}
            className={`w-1.5 rounded-full transition-colors duration-75 ${
              isActive ? '' : 'bg-zinc-800'
            }`}
          />
        );
      })}
    </div>
  );
}
