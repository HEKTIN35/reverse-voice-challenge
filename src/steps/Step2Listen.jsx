import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playAudioBuffer } from '../utils/reverseAudio';

export default function Step2Listen({ reversedBuffer, onDone }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setPlayCount((c) => c + 1);
    playerRef.current = playAudioBuffer(reversedBuffer, () => setIsPlaying(false));
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Tersini dinle</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          İstediğin kadar dinle. Bu sesi aklında tutmaya çalış!
        </p>
      </div>

      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
        🔄
      </div>

      <PlayerButton
        onPlay={handlePlay}
        isPlaying={isPlaying}
        label="Tersini Dinle"
      />

      {playCount > 0 && (
        <p className="text-zinc-600 text-xs">{playCount}× dinlendi</p>
      )}

      <button
        onClick={onDone}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 active:scale-95 btn-primary"
      >
        Hazırım →
      </button>
    </div>
  );
}
