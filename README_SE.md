# _“Pajparadiset”_

Tillgängliga språk:
[English](./README.md) | [Svenska](./README_SE.md)

---

## Hemsida

![G5 - Bild på Hemsida](https://github.com/user-attachments/assets/ac130678-f304-4061-a632-5119efa8fe67)

## Receptsida

![G5 - Bild på Receptsida](https://github.com/user-attachments/assets/ac130678-f304-4061-a632-5119efa8fe67)

---

**Frontend-webbapplikation** utvecklad inom ramen för ITHS-utbildningen i _System- och webbutveckling (Java & JavaScript)_.
Projektet implementerar en komplett receptsajt byggd med **React**, enligt principerna för **SSDLC (Secure Software Development Life Cycle)** och testad med **Vitest**, **React Testing Library** och **Playwright**.
Applikationen är fullt integrerad med **GitHub Actions (CI/CD)** och distribueras via **Netlify**.

---

## Innehållsförteckning

- [_“Pajparadiset”_](#pajparadiset)
  - [Hemsida](#hemsida)
  - [Receptsida](#receptsida)
  - [Innehållsförteckning](#innehållsförteckning)
  - [Projektöversikt](#projektöversikt)
    - [Huvudvyer](#huvudvyer)
  - [Teknikstack](#teknikstack)
  - [Funktionalitet](#funktionalitet)
    - [🎯 Användarflöden](#-användarflöden)
    - [💡 Felhantering och UX-resiliens](#-felhantering-och-ux-resiliens)
  - [Säkerhet och SSDLC](#säkerhet-och-ssdlc)
  - [Tester och kvalitetssäkring](#tester-och-kvalitetssäkring)
  - [Utvecklingsflöde (CI/CD)](#utvecklingsflöde-cicd)
  - [Projektstruktur](#projektstruktur)
  - [Team och roller](#team-och-roller)
  - [Licens](#licens)

---

## Projektöversikt

**G5-Recipes (“Pajparadiset”)** är en responsiv webbapplikation som hämtar receptdata via ett externt REST-API och renderar dem dynamiskt med React.
Användaren kan bläddra bland recept, söka, filtrera efter kategori, läsa instruktioner, betygsätta recept och lämna kommentarer.

### Huvudvyer

|  #  | Vy               | Route                       | Beskrivning                                      |
| :-: | :--------------- | :-------------------------- | :----------------------------------------------- |
|  1  | **Startsida**    | `/`                         | Visar alla recept, sökfält och kategorier        |
|  2  | **Kategorisida** | `/categories/:categoryName` | Filtrerar recept efter vald kategori             |
|  3  | **Receptsida**   | `/recipes/:recipeId`        | Detaljvy med ingredienser, betyg och kommentarer |
|  4  | **404-sida**     | `*`                         | Fångar ogiltiga rutter                           |

---

## Teknikstack

|  #  | Område              | Teknologi / Ramverk                                |
| :-: | :------------------ | :------------------------------------------------- |
|  1  | **Frontend**        | React 19 + React Router 7                          |
|  2  | **Byggmiljö**       | Vite 7                                             |
|  3  | **Tester**          | Vitest + React Testing Library + Playwright        |
|  4  | **CI/CD**           | GitHub Actions + Netlify                           |
|  5  | **Kodkvalitet**     | ESLint 9 + Prettier 3                              |
|  6  | **Säkerhetsanalys** | OWASP ZAP Baseline Scan (automatisk i CI)          |
|  7  | **Deploy**          | Netlify (Cache-Control headers och säker leverans) |

---

## Funktionalitet

### 🎯 Användarflöden

1. **Bläddra recept** – startsidan listar alla recept med namn, bild, betyg och tid.
2. **Sökfunktion** – filtrering i realtid via querystring (`?search=`).
3. **Filtrering per kategori** – klick leder till kategorisidan och markerar vald kategori.
4. **Receptdetalj** – visar namn, beskrivning, ingredienser, svårighetsgrad och tid.
5. **Betygssättning** – användaren kan ge 1–5 stjärnor; tackmeddelande visas efter inskick.
6. **Kommentering** – formulär med validering, sanering och tydliga felmeddelanden. Kommentarer listas med namn och datum.

### 💡 Felhantering och UX-resiliens

- Tydliga felmeddelanden (ex: _“Kunde inte hämta recept.”_)
- **Försök-igen-knappar** tillåter återförsök utan sidomladdning.
- Skeleton-komponenter vid långsamma API-svar.
- 404-vy för ogiltiga länkar.

---

## Säkerhet och SSDLC

Säkerhetsarbetet följer principerna i **TESTPLAN_SSDLC_RECEPTSAJTEN** och **G5 – Hotbildsanalys**.

|  #  | Säkerhetsområde                           | Kontroll / Implementation                                                            | Ramverk            |
| :-: | :---------------------------------------- | :----------------------------------------------------------------------------------- | :----------------- |
|  1  | **OWASP A03 – XSS / Injection**           | Input-validering (`inputPolicies.js`), sanering (`sanitizeInput.js`), React-escaping | OWASP / STRIDE (I) |
|  2  | **OWASP A05 – Security Misconfiguration** | CSP & CORS, säkra Netlify-headers, ingen känslig data i `localStorage`               | OWASP              |
|  3  | **OWASP A08 – Supply Chain Integrity**    | `npm audit --audit-level=high`, versionslåsning (`package-lock.json`)                | OWASP              |
|  4  | **STRIDE S – Spoofing**                   | `sanitizeSearchQuery()` + React-escaping hindrar förfalskade query-strängar          | STRIDE             |
|  5  | **STRIDE T – Tampering**                  | DTO-validering (`Recipe.fromJSON()`) säkerställer oförvanskad API-data               | STRIDE             |
|  6  | **STRIDE I – Information Disclosure**     | Generiska UI-fel; DTO filtrerar fält; stacktrace döljs i UI                          | STRIDE             |
|  7  | **DoS-resiliens**                         | Asynkrona anrop och retry-logik minskar effekten av långsamma svar                   | SSDLC              |

**Tillitgränser:**
Webbläsare ↔ Frontend ↔ Backend-API

**Förbättringspunkter:**

- Delvis skydd mot _provenance spoofing_ (ursprungskontroll)
- Minska loggutskrifter i produktion

---

## Tester och kvalitetssäkring

Projektet har komplett täckning för **enhetstester**, **integrationstester** och **end-to-end-tester**, samt **automatiska säkerhetsskanningar**.

|  #  | Testnivå                | Ramverk                     | Fokus                                                      |
| :-: | :---------------------- | :-------------------------- | :--------------------------------------------------------- |
|  1  | **Enhetstester (Unit)** | Vitest                      | Hjälpfunktioner, DTO:er, validering och sanering           |
|  2  | **Integrationstester**  | React Testing Library       | Komponentflöden – SearchBar, CommentForm, RecipeCard m.fl. |
|  3  | **E2E-tester**          | Playwright (Chromium)       | Användarflöden – sökning, retry, kategori, XSS-skydd       |
|  4  | **Säkerhetstester**     | OWASP ZAP Baseline          | Automatisk sårbarhetsskanning i CI                         |
|  5  | **Kvalitetskontroller** | ESLint, Prettier, npm audit | Kodstandard, formatering och beroendesäkerhet              |

> ✅ Alla tester körs automatiskt i **GitHub Actions** vid varje push till `dev`.

---

## Utvecklingsflöde (CI/CD)

1. **Push → CI-pipeline**
   - Lint → Prettier → npm audit → Build → Unit & E2E → ZAP-scan

2. **Pull Request Review**
   - Kod- och säkerhetsgranskning innan merge

3. **Deploy → Netlify**
   - Automatisk publicering med säkra headers

4. **Incidenthantering**
   - IMY-anmälan inom 72 timmar vid dataintrång

---

## Projektstruktur

Förenklad översikt (se `docs/[~TREE~].MD` för fullständig struktur):

```
G5-Recipes/
├── src/
│   ├── pages/          # HomePage, CategoryPage, RecipePage, NotFoundPage
│   ├── components/     # UI-komponenter (RecipeCard, CommentForm, Header, etc.)
│   ├── api/            # API-klient + DTO-klasser
│   ├── utils/          # Hjälpfunktioner: validering, sanering, filtrering
│   ├── test/           # unit/, integration/, e2e/
│   └── styles/         # tokens.css, base.css, layout.css
├── .github/workflows/ci.yml
├── netlify.toml
└── package.json
```

---

## Team och roller

**Projektledning**

- Chiman Delwood
- Jonas Rosen
- Kelly Fredriksson
- Nabila Zekry

**Utvecklare**

- Belle Sangthong
- Max Eriksson
- Sandra Boerma
- Sirak Kahsay

---

## Licens

**MIT-licens © 2025 G5-Recipes-teamet**

---
