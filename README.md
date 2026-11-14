# Reverse Voice Challenge

Tarayıcıda çalışan, backend gerektirmeyen ses taklidi oyunu.

## Nasıl çalışır?

1. Bir ünlünün adını kaydet
2. Kaydın tersini dinle
3. O ters sesi taklit ederek yeniden kaydet
4. Tahmin ekranı: tahmin edecek kişi ters taklit sesini dinleyerek kimin söylendiğini tahmin eder
5. Sonuç: Gerçek isim girilir, tahminle karşılaştırılır

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## Teknik

- Vite + React (JavaScript)
- Tailwind CSS v4
- Web Audio API (ses ters çevirme, seviye ölçer)
- MediaRecorder API (kayıt, Safari uyumlu mimeType tespiti)
- Tüm işlem tarayıcıda — sunucuya ses gönderilmez
