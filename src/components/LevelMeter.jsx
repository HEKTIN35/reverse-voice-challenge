export default function LevelMeter({ level }) {
  const bars = 18;
  const active = Math.round(level * bars);

  return (
    <div className="flex items-end gap-0.5 h-10 justify-center w-full">
      {Array.from({ length: bars }, (_, i) => {
        const mid = bars / 2;
        const dist = Math.abs(i - mid + 0.5);
        const heightPct = 20 + (1 - dist / mid) * 80;
        const isActive = i < active;
        // gradient: left = purple, right = pink
        const hue = 280 - (i / bars) * 60;
        return (
          <div
            key={i}
            style={{
              height: `${heightPct}%`,
              background: isActive
                ? `hsl(${hue}, 85%, 65%)`
                : 'rgba(255,255,255,0.07)',
            }}
            className="flex-1 rounded-full transition-colors duration-75"
          />
        );
      })}
    </div>
  );
}
