const AudioCtx = () => new (window.AudioContext || window.webkitAudioContext)();

/**
 * Decodes an audio Blob and returns a new AudioBuffer with all channels reversed.
 */
export async function reverseAudioBlob(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const ctx = AudioCtx();

  const decoded = await ctx.decodeAudioData(arrayBuffer);

  const reversed = ctx.createBuffer(
    decoded.numberOfChannels,
    decoded.length,
    decoded.sampleRate
  );

  for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
    const src = decoded.getChannelData(ch);
    const dst = reversed.getChannelData(ch);
    for (let i = 0; i < src.length; i++) {
      dst[i] = src[src.length - 1 - i];
    }
  }

  // AudioBuffer holds its own data — safe to close the context
  await ctx.close();
  return reversed;
}

/**
 * Plays an AudioBuffer. Returns { stop } to cancel early.
 */
export function playAudioBuffer(audioBuffer, onEnded) {
  const ctx = AudioCtx();

  const start = () => {
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.onended = () => {
      ctx.close();
      onEnded?.();
    };
    source.start();
  };

  if (ctx.state === 'suspended') {
    ctx.resume().then(start);
  } else {
    start();
  }

  return { stop: () => ctx.close() };
}

/**
 * Plays a Blob directly via an <audio> element (for original recording).
 */
export function playBlob(blob, onEnded) {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.onended = () => {
    URL.revokeObjectURL(url);
    onEnded?.();
  };
  audio.play();
  return {
    stop: () => {
      audio.pause();
      URL.revokeObjectURL(url);
      onEnded?.();
    },
  };
}
