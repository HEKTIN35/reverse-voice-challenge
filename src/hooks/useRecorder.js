import { useCallback, useEffect, useRef, useState } from 'react';

function getSupportedMimeType() {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg',
    'audio/mp4',
  ];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) ?? '';
}

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState(null);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const animRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    clearTimeout(timerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    ctxRef.current?.close();
    ctxRef.current = null;
    setLevel(0);
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    setAudioBlob(null);
    chunksRef.current = [];

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (err) {
      setError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Mikrofon izni reddedildi. Tarayıcı adres çubuğundaki kilit simgesine tıklayarak izin verin.'
          : `Mikrofon açılamadı: ${err.message}`
      );
      return;
    }

    streamRef.current = stream;

    // AudioContext — must be created after user gesture (Safari requirement)
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') await ctx.resume();

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    ctx.createMediaStreamSource(stream).connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setLevel(avg / 255);
      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    const mimeType = getSupportedMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
      setAudioBlob(blob);
      setIsRecording(false);
      cleanup();
    };

    recorder.start(100);
    setIsRecording(true);

    // Auto-stop after 5 seconds
    timerRef.current = setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
    }, 5000);
  }, [cleanup]);

  const stopRecording = useCallback(() => {
    clearTimeout(timerRef.current);
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
    }
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  return { isRecording, audioBlob, level, error, startRecording, stopRecording };
}
