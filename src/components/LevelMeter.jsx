export default function LevelMeter({ level }) {
  // level: 0–1 float
  const bars = 12;
  const active = Math.round(level * bars);

  return (
    <div className="flex items-end gap-1 h-8 justify-center my-3">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          style={{ height: `${40 + i * 5}%` }}
          className={`w-2 rounded-sm transition-colors duration-75 ${
            i < active ? 'bg-red-500' : 'bg-zinc-700'
          }`}
        />
      ))}
    </div>
  );
}
