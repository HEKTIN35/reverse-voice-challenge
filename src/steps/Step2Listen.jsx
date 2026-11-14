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
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(147,51,234,0.2))', border: '1px solid rgba(165,180,252,0.3)' }}
      >
        🔄
      </div>

      <div>
        <h2 className="text-xl font-black text-white mb-1">Tersini dinle</h2>
        <p className="text-purple-200/50 text-sm leading-relaxed">
          İstediğin kadar dinle. Bu sesi aklında tutmaya çalış!
        </p>
      </div>

      <PlayerButton onPlay={handlePlay} isPlaying={isPlaying} label="Tersini Dinle" />

      {playCount > 0 && (
        <p className="text-purple-400/50 text-xs">{playCount}× dinlendi</p>
      )}

      <button
        onClick={onDone}
        className="w-full rounded-2xl text-white font-black text-xl active:scale-95 transition-transform"
        style={{ minHeight: '64px', background: 'linear-gradient(135deg,#9333ea,#ec4899)', boxShadow: '0 8px 32px rgba(147,51,234,0.45)' }}
      >
        Hazırım →
      </button>
    </div>
  );
}
