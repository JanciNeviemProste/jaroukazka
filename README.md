# 🛍️ Moderný E-shop Frontend

Moderný, responzívny frontend e-shopu vytvorený s React, TypeScript a Tailwind CSS. Projekt je navrhnutý s dôrazom na čistý dizajn, prístupnosť a výbornú používateľskú skúsenosť.

## 🚀 Rýchly štart

### Inštalácia

```bash
npm install
```

### Spustenie vývojového servera

```bash
npm run dev
```

Aplikácia bude dostupná na [http://localhost:5173](http://localhost:5173)

### Build pre produkciu

```bash
npm run build
```

### Náhľad produkčného buildu

```bash
npm run preview
```

## 🏗️ Architektúra

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - typová bezpečnosť
- **Vite** - rýchly build tool
- **Tailwind CSS** - utility-first CSS framework
- **React Router DOM** - client-side routing

### Štruktúra projektu

```
src/
├── components/       # Znovupoužiteľné UI komponenty
├── pages/           # Stránky aplikácie
├── data/            # Lokálne dáta produktov
├── utils/           # Pomocné funkcie
└── types.ts         # TypeScript definície
```

### Komponenty

- **Header** - Hlavička s logom a vyhľadávaním
- **ProductCard** - Karta produktu s interaktívnymi stavmi
- **Filters** - Panel s možnosťami filtrovania
- **CartDrawer** - Vysúvací košík
- **ProductGallery** - Galéria obrázkov na detaile

### Routing

- `/` - Hlavná stránka s produktami
- `/produkt/:id` - Detail produktu
- `*` - 404 stránka

### Správa stavu

Aplikácia používa lokálny React state cez hooks:
- `useState` - lokálny stav komponentov
- `useMemo` - optimalizácia výpočtov
- `useEffect` - simulácia načítania

## 🎨 Dizajn a štýl

### Farebná paleta

Aplikácia používa **modrú farebnú schému** s odtieňmi definovanými v Tailwind:
- `primary-50` až `primary-900` - hlavné modré odtiene
- Gradienty pre pozadia a CTA prvky
- Vysoký kontrast pre prístupnosť (AA štandard)

### Responzívny dizajn

- Mobile-first prístup
- Breakpointy: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Flexibilný grid systém

## ♿ Prístupnosť

### Implementované funkcie

- **Semantické HTML** - správne použitie HTML5 elementov
- **ARIA atribúty** - labels, live regions, roles
- **Klávesová navigácia** - Tab, Enter, Escape support
- **Focus management** - viditeľné focus ringy
- **Screen reader support** - oznamy zmien cez aria-live

### Testovanie prístupnosti

Odporúčame testovať s:
- NVDA (Windows)
- VoiceOver (macOS/iOS)
- axe DevTools

## 📦 Dáta

Aplikácia používa **lokálne dáta** bez potreby backendu:
- 20 dummy produktov v `src/data/products.ts`
- Produkty obsahujú: názov, cenu, rating, kategóriu, tagy, varianty
- Všetky operácie (vyhľadávanie, filtrovanie) prebiehajú na klientovi

## 🔧 Konfigurácia

### Tailwind

Konfigurácia v `tailwind.config.ts`:
- Vlastné farby (primary paleta)
- Rozšírené tiene
- Animácie a prechody

### TypeScript

Striktná konfigurácia pre lepšiu typovú bezpečnosť:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

## 📝 Poznámky

- **Bez backendu** - všetko beží na frontende
- **Bez reálnych platieb** - len UI mockup
- **Lokalizácia** - aplikácia je v slovenčine
- **Inšpirácia** - vzdušný dizajn inšpirovaný modernými e-shopmi

## 🚢 Deployment

### Nahranie na GitHub

1. **Vytvorte nový repozitár na GitHub**
   - Choďte na [github.com/new](https://github.com/new)
   - Zadajte názov repozitára (napr. `eshop-frontend`)
   - Nechajte repozitár prázdny (bez README, .gitignore)

2. **Inicializujte Git a nahrajte kód**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern e-shop frontend"
   git branch -M main
   git remote add origin https://github.com/VASE_MENO/eshop-frontend.git
   git push -u origin main
   ```

### Hosting na Vercel

1. **Vytvorte účet na Vercel**
   - Choďte na [vercel.com](https://vercel.com)
   - Prihláste sa cez GitHub účet

2. **Importujte projekt**
   - Kliknite na "New Project"
   - Vyberte váš GitHub repozitár `eshop-frontend`
   - Vercel automaticky rozpozná Vite projekt

3. **Konfigurácia (automatická)**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Kliknite na "Deploy"
   - Čakajte 1-2 minúty na build
   - Váš e-shop bude live na `https://vase-meno.vercel.app`

### Automatické deploymenty

- Každý push do `main` vetvy automaticky spustí nový deployment
- Pull requesty dostanú preview URL
- Žiadna dodatočná konfigurácia nie je potrebná

## 🤝 Podpora

Pre otázky alebo pripomienky vytvorte issue v GitHub repozitári.