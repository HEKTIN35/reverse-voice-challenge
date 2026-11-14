/**
 * Returns true when running inside an in-app browser (Instagram, WhatsApp,
 * Facebook, TikTok, Twitter/X, Snapchat, LinkedIn, WeChat, Line, Telegram).
 * These browsers typically block getUserMedia or behave unpredictably with
 * the Web Audio API.
 */
export function isInAppBrowser() {
  const ua = navigator.userAgent || '';

  // Instagram: contains "Instagram"
  // WhatsApp: contains "WhatsApp"
  // Facebook: contains "FBAN" or "FBAV" (FB app) or "FB_IAB"
  // TikTok: contains "musical_ly" or "TikTok"
  // Twitter/X: contains "Twitter"
  // Snapchat: contains "Snapchat"
  // LinkedIn: contains "LinkedInApp"
  // WeChat: contains "MicroMessenger"
  // Line: contains "Line/"
  // Telegram: contains "Telegram"
  const inAppPattern =
    /Instagram|WhatsApp|FBAN|FBAV|FB_IAB|musical_ly|TikTok|Twitter|Snapchat|LinkedInApp|MicroMessenger|Line\/|Telegram/i;

  return inAppPattern.test(ua);
}

/**
 * Returns true when getUserMedia is simply unavailable (older iOS WebView,
 * HTTP without HTTPS, or restricted in-app browser context).
 */
export function isMicrophoneAPIAvailable() {
  return !!(
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}
