import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playAudioBuffer } from '../utils/reverseAudio';

export default function Step4Guess({ mimicReversedBuffer, onDone }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playerRef.current = playAudioBuffer(mimicReversedBuffer, () => setIsPlaying(false));
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(99,102,241,0.2))', border: '1px solid rgba(110,231,183,0.3)' }}
      >
        🎧
      </div>

      <div>
        <h2 className="text-xl font-black text-white mb-1">Grubu dinlet!</h2>
        <p className="text-purple-200/50 text-sm leading-relaxed">
          Telefonu ortaya koy, herkese dinlet. Kim olduğunu tahmin etsinler!
        </p>
      </div>

      <PlayerButton onPlay={handlePlay} isPlaying={isPlaying} label="Sesi Çal" />

      <button
        onClick={onDone}
        className="w-full rounded-2xl text-white font-black text-xl active:scale-95 transition-transform"
        style={{ minHeight: '64px', background: 'linear-gradient(135deg,#9333ea,#ec4899)', boxShadow: '0 8px 32px rgba(147,51,234,0.45)' }}
      >
        Cevabı Göster →
      </button>
    </div>
  );
}
