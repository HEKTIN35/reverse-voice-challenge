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
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg,rgba(251,191,36,0.25),rgba(236,72,153,0.2))', border: '1px solid rgba(253,230,138,0.3)' }}
      >
        🎉
      </div>

      <div>
        <h2 className="text-xl font-black text-white mb-1">Cevap zamanı!</h2>
        <p className="text-purple-200/50 text-sm leading-relaxed">
          Orijinal kaydı çalarak doğru cevabı açıklayın.
        </p>
      </div>

      <PlayerButton onPlay={handlePlay} isPlaying={isPlaying} label="Orijinal Kaydı Dinle" />

      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(192,132,252,0.25),transparent)' }} />

      <button
        onClick={onRestart}
        className="w-full rounded-2xl font-black text-xl active:scale-95 transition-transform"
        style={{ minHeight: '64px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(192,132,252,0.25)', color: '#d8b4fe' }}
      >
        Yeniden Oyna
      </button>
    </div>
  );
}
