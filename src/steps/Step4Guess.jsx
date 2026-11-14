import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playAudioBuffer } from '../utils/reverseAudio';

export default function Step4Guess({ mimicReversedBuffer, onDone }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState('');
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playerRef.current = playAudioBuffer(mimicReversedBuffer, () => setIsPlaying(false));
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">Tahmin et!</h2>
      <p className="text-zinc-400 max-w-xs">
        🎧 Kulaklığı tak ve dinle. Bu seste hangi ünlünün adı söyleniyor?
      </p>

      <PlayerButton
        onPlay={handlePlay}
        isPlaying={isPlaying}
        label="Dinle"
      />

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Ünlü kim?"
        className="w-full max-w-xs px-5 py-4 rounded-2xl bg-zinc-800 border border-zinc-600 text-white text-lg placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
      />

      <button
        disabled={!guess.trim()}
        onClick={() => onDone(guess.trim())}
        className="px-10 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg transition-all duration-200 w-full max-w-xs"
      >
        Tahminimi Gönder →
      </button>
    </div>
  );
}
