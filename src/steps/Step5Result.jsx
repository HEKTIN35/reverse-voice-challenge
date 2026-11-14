import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playBlob } from '../utils/reverseAudio';

export default function Step5Result({ originalBlob, onRestart }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playerRef.current = playBlob(originalBlob, () => setIsPlaying(false));
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Cevap zamanı!</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Orijinal kaydı çalarak doğru cevabı açıklayın.
        </p>
      </div>

      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
        🎉
      </div>

      <PlayerButton onPlay={handlePlay} isPlaying={isPlaying} label="Orijinal Kaydı Dinle" />

      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

      <button
        onClick={onRestart}
        className="w-full py-5 rounded-2xl text-zinc-300 font-bold text-lg glass transition-all duration-200 hover:bg-white/10 active:scale-97"
      >
        Yeniden Oyna
      </button>
    </div>
  );
}
