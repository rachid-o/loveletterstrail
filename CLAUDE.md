# Love Letters Trail

Een GPS-puzzeltocht PWA gebouwd als cadeau voor een stel dat 20 jaar samen is. Ze worden via een kompas-pijl langs persoonlijke locaties geleid en moeten per stop een raadsel oplossen.

## Dev-commando's

```bash
npm run dev      # dev server (localhost:5173)
npm run build    # productie-build naar dist/
npm run preview  # preview van de build lokaal
```

Deployment gaat automatisch via GitHub Actions bij een push naar `main`. Live op: `https://rachid-o.github.io/loveletterstrail/`

## Configuratie aanpassen

**Alles wat inhoudelijk aangepast moet worden staat in één bestand:**

```
src/config/trail.js
```

Dit bestand bevat:
- `PIN` — de toegangscode (string, bijv. `"2005"`)
- `WELCOME` — titel, persoonlijk bericht, optioneel pad naar foto (`public/photo.jpg`)
- `STOPS[]` — array van stops, elk met: `lat`/`lng`, `arrivalRadius` (meter), `puzzle` (question/answer/hint), `completeMessage`
- `FINAL` — coördinaten en bericht van de eindlocatie

Antwoorden worden case-insensitief vergeleken — invullen in kleine letters is prima.

## Architectuur

```
src/
├── config/trail.js          enige bestand voor inhoud
├── components/              één component per scherm
├── hooks/
│   ├── useGeolocation.js    GPS via watchPosition
│   ├── useCompass.js        DeviceOrientationEvent (iOS permission ingebouwd)
│   └── useProgress.js       localStorage — voortgang blijft bewaard
└── utils/geo.js             haversineDistance + calculateBearing
```

Schermvolgorde: `pin → welcome → navigate → puzzle → stopComplete → (herhaal) → final → finalArrived`

De `screen`-waarde in localStorage bepaalt waar de app opent. Reset via `localStorage.clear()` in de browser-console.

## GPS & kompas testen in de browser

Open DevTools → **More tools → Sensors**:
- **Location** → stel een nep-locatie in om afstand/pijl te testen
- De kompas-pijl werkt alleen op een echt mobiel apparaat (DeviceOrientationEvent)

## PWA / offline

De service worker (`vite-plugin-pwa` + Workbox) cached alle assets na het eerste laden. Na een build en deploy wordt de SW automatisch bijgewerkt.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) bouwt en deployt automatisch bij een push naar `main`. Vite gebruikt `base: '/loveletterstrail/'` alleen in de GitHub Actions-omgeving (`GITHUB_ACTIONS=true`), lokaal is de base `/`.

## Voor elke commit

Voer altijd beide commando's uit en zorg dat ze slagen vóór je commit en pusht:

```bash
npm run test   # 16 tests in src/test/
npm run build  # Vite + PWA/Workbox build
```

Laat de codebase nooit achter in een staat waarbij `npm run test` of `npm run build` faalt.

## Tests

Testbestanden staan in `src/test/`. Vitest met jsdom-omgeving en `@testing-library/react`.

- `geo.test.js` — unit tests voor `haversineDistance`, `calculateBearing`, `formatDistance`
- `useProgress.test.js` — hook-tests voor localStorage opslaan, laden en resetten

Watchmode tijdens ontwikkeling:

```bash
npm run test:watch
```
