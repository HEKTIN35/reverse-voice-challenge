import { isInAppBrowser, isMicrophoneAPIAvailable } from '../utils/browserCheck';

/**
 * Renders a full-screen warning when the app is opened in an in-app browser
 * or when the microphone API is not available. Otherwise renders children.
 */
export default function BrowserGate({ children }) {
  const inApp = isInAppBrowser();
  const noMicApi = !isMicrophoneAPIAvailable();

  if (!inApp && !noMicApi) return children;

  // Detect mobile OS for the right deeplink hint
  const isIOS = /iP(hone|ad|od)/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  const suggestion = isIOS
    ? 'Safari'
    : isAndroid
    ? 'Chrome'
    : 'Chrome veya Safari';

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="text-6xl">🚫</div>
      <h1 className="text-2xl font-bold text-white">Uygulama içi tarayıcı</h1>
      <p className="text-zinc-400 max-w-xs leading-relaxed">
        Bu oyun mikrofon erişimi gerektiriyor. Instagram, WhatsApp ve benzeri
        uygulamaların içindeki tarayıcılar mikrofon iznine izin vermiyor.
      </p>
      <div className="bg-zinc-800 rounded-2xl px-6 py-5 max-w-xs w-full">
        <p className="text-white font-semibold mb-1">Ne yapmalısın?</p>
        <p className="text-zinc-400 text-sm">
          Sayfanın bağlantısını kopyala ve{' '}
          <span className="text-purple-400 font-semibold">{suggestion}</span>'da aç.
        </p>
      </div>
      <button
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          }
        }}
        className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold transition-all duration-200 w-full max-w-xs"
      >
        Linki Kopyala
      </button>
    </div>
  );
}
