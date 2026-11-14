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
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Grubu dinlet!</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Telefonu ortaya koy, herkese dinlet. Kim olduğunu tahmin etsinler!
        </p>
      </div>

      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
        🎧
      </div>

      <PlayerButton onPlay={handlePlay} isPlaying={isPlaying} label="Sesi Çal" />

      <button
        onClick={onDone}
        className="w-full py-5 rounded-2xl text-white font-bold text-lg btn-primary"
      >
        Cevabı Göster →
      </button>
    </div>
  );
}
