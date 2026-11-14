import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playAudioBuffer } from '../utils/reverseAudio';

export default function Step2Listen({ reversedBuffer, onDone }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playerRef.current = playAudioBuffer(reversedBuffer, () => setIsPlaying(false));
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">Tersini dinle</h2>
      <p className="text-zinc-400 max-w-xs">
        Kaydın ters hali aşağıda. İstediğin kadar dinleyebilirsin. Bu sesi aklında tutmaya çalış!
      </p>

      <div className="text-6xl my-2">🔄</div>

      <PlayerButton
        onPlay={handlePlay}
        isPlaying={isPlaying}
        label="Tersini Dinle"
      />

      <button
        onClick={onDone}
        className="mt-4 px-10 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-lg transition-all duration-200 w-full max-w-xs"
      >
        Hazırım →
      </button>
    </div>
  );
}
