export default function LevelMeter({ level }) {
  const bars = 20;
  const active = Math.round(level * bars);
  const mid = bars / 2;

  return (
    <div className="flex items-end gap-0.5 w-full" style={{ height: '44px' }}>
      {Array.from({ length: bars }, (_, i) => {
        const dist = Math.abs(i - mid + 0.5) / mid;
        const heightPct = 15 + (1 - dist) * 85;
        const isActive = i < active;
        const t = i / (bars - 1);
        const hue = Math.round(280 - t * 70);
        return (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors duration-75"
            style={{
              height: `${heightPct}%`,
              background: isActive
                ? `hsl(${hue},85%,65%)`
                : 'rgba(255,255,255,0.08)',
            }}
          />
        );
      })}
    </div>
  );
}
