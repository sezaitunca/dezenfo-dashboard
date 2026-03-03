# Dezenformasyon Bülteni 2025 Almanak — Dashboard

Bu repo, React + Vite + Recharts ile hazırlanmış tek sayfa bir dashboard içerir.
GitHub Pages üzerinde yayınlamak için hazır paketlenmiştir.

## 1) Kurulum
```bash
npm install
npm run dev
```

## 2) GitHub Pages Ayarı (ÖNEMLİ)
1. GitHub'da repo adı ne ise, `vite.config.js` içindeki `base` değerini ona göre ayarlayın:
   - Repo adı `dezenfo-dashboard` ise: `base: "/dezenfo-dashboard/"`
2. `package.json` içindeki `homepage` alanını kendi kullanıcı adınızla düzeltin:
   - `https://KULLANICI_ADINIZ.github.io/dezenfo-dashboard`

## 3) Deploy
```bash
npm run deploy
```

Sonra GitHub:
- Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / `(root)`

Site:
`https://KULLANICI_ADINIZ.github.io/dezenfo-dashboard/`
