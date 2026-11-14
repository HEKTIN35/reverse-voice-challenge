import { useEffect, useRef, useState } from 'react';
import PlayerButton from '../components/PlayerButton';
import { playBlob } from '../utils/reverseAudio';

export default function Step5Result({ guess, originalBlob, onRestart }) {
  const [realName, setRealName] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => () => playerRef.current?.stop(), []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playerRef.current = playBlob(originalBlob, () => setIsPlaying(false));
  };

  const isMatch =
    revealed &&
    realName.trim().toLowerCase() === guess.toLowerCase();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-white">Sonuç</h2>

      {!revealed ? (
        <>
          <p className="text-zinc-400 max-w-xs">
            Gerçek ismi girerek sonucu açıkla.
          </p>
          <input
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            placeholder="Gerçek isim neydi?"
            className="w-full max-w-xs px-5 py-4 rounded-2xl bg-zinc-800 border border-zinc-600 text-white text-lg placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            disabled={!realName.trim()}
            onClick={() => setRevealed(true)}
            className="px-10 py-4 rounded-2xl bg-green-600 hover:bg-green-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg transition-all duration-200 w-full max-w-xs"
          >
            Sonucu Göster
          </button>
        </>
      ) : (
        <>
          <div className="text-5xl">{isMatch ? '🎉' : '😅'}</div>

          <div className="flex gap-4 w-full max-w-xs">
            <div className="flex-1 bg-zinc-800 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs mb-1">TAHMİN</p>
              <p className="text-white font-bold text-lg">{guess}</p>
            </div>
            <div className="flex-1 bg-zinc-800 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs mb-1">GERÇEK</p>
              <p className="text-white font-bold text-lg">{realName.trim()}</p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm">
            {isMatch
              ? 'Mükemmel! Doğru tahmin!'
              : 'Yaklaşamamışsın ama iyi deneme!'}
          </p>

          <PlayerButton
            onPlay={handlePlay}
            isPlaying={isPlaying}
            label="Orijinal Kaydı Dinle"
          />

          <button
            onClick={onRestart}
            className="mt-2 px-10 py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 active:scale-95 text-white font-semibold text-lg transition-all duration-200 w-full max-w-xs"
          >
            Yeniden Oyna
          </button>
        </>
      )}
    </div>
  );
}
