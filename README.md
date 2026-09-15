# NEXA GROWTH — Digital Experience Platform

> Bi-Coastal Creative Strategy & Innovation Company operating across Singapore and New Zealand.

[![Live Site](https://img.shields.io/badge/Live%20Platform-nexa--growth.pages.dev-crimson?style=for-the-badge&logo=cloudflare)](https://nexa-growth.pages.dev)
[![Repository](https://img.shields.io/badge/GitHub-marketrix--nepal%2Fnexa--growth-181717?style=for-the-badge&logo=github)](https://github.com/marketrix-nepal/nexa-growth)

---

## 🏛️ Architectural Overview

An uncompromised, 60fps scroll-choreographed digital platform constructed with pure Vanilla JavaScript (ES Modules), physical WebGL 3D glass rendering, and strict progressive disclosure ergonomics.

- **Production URL**: [https://nexa-growth.pages.dev](https://nexa-growth.pages.dev)
- **Deployment Platform**: Cloudflare Pages
- **GitHub Repository**: [https://github.com/marketrix-nepal/nexa-growth](https://github.com/marketrix-nepal/nexa-growth)

---

## ⚡ Core Engineering & Design Systems

- **Zero Virtual DOM Overhead**: Pure ES Modules orchestrated via Vite with hardware-accelerated transforms.
- **Physical Glass 3D Monolith**: Three.js `MeshPhysicalMaterial` Torus with crown glass IOR 1.52, transmission 0.60, inner warm basic core (`#FF451A`), crimson and amber 3-point rim lighting, postprocessing bloom (`UnrealBloomPass`), and custom GLSL chromatic vignette shader.
- **Scroll Choreography**: Lenis smooth inertia scroll synchronized with GSAP `ScrollTrigger` master timeline across 6 spatial narrative acts.
- **Strict Anti-Pill Geometry**: Mathematical radii tokens (`--r-btn: 6px`, `--r-badge: 4px`, `--r-card: 10px`, `--r-modal: 14px`; zero 9999px pill shapes).
- **Progressive Disclosure**:
  - Pinned capability switcher with 3 focused commercial capability cards per discipline.
  - Smooth `0fr -> 1fr` CSS grid expansion drawers (`Friction / Architecture / Outcome`).
  - Deep hash-synchronized universal modal reader (`#service-...`, `#case-...`, `#lab-...`).
- **Live Bi-Coastal Clocks**: Real-time atomic time for Singapore (SGT) and New Zealand (NZST) driven by `Intl.DateTimeFormat` with active UTC offsets.
- **Interactive Scoping Terminal**: 3-step enterprise inquiry terminal (vector, stage, hub) with client-side validation and senior partner dispatch confirmation.

---

## 📂 Project Structure

```
nexa_revamp/
├── public/
│   ├── favicon.svg          # Vector favicon
│   ├── favicon.png          # PNG favicon
│   ├── logo.png             # Transparent high-res master identity
│   └── logo-mark.png        # Compact transparent brand mark
├── scripts/
│   ├── audit.js             # Headless Chrome visual verification
│   └── process_logo.py      # Computer vision alpha extractor
├── src/
│   ├── animations/
│   │   ├── cursor.js        # Magnetic physics cursor with difference blend
│   │   ├── scrollTimeline.js# GSAP master scroll choreography
│   │   └── smoothScroll.js  # Lenis inertia engine
│   ├── components/
│   │   ├── concierge.js     # Act 6 Scoping Terminal
│   │   ├── detailModal.js   # Universal hash-synchronized modal reader
│   │   ├── disciplines.js   # Act 3 Pinned capability blades
│   │   ├── dossiers.js      # Act 4 Institutional case studies
│   │   ├── footer.js        # Spatial coordinate ledger
│   │   ├── hero.js          # Act 1 Hero with live atomic clocks
│   │   ├── ideasLab.js      # Act 5 Speculative R&D inquiries
│   │   ├── manifesto.js     # Act 2 Scroll-illuminated scrub
│   │   └── navbar.js        # Fixed brand header
│   ├── data/                # Structured institutional repositories
│   ├── styles/              # Mathematical CSS token architecture
│   ├── webgl/               # Three.js glass rig, shaders, & postprocessing
│   └── main.js              # Application lifecycle entrypoint
├── index.html               # Semantic HTML5 & Open Graph metadata
├── vite.config.js           # Vite configuration (port 3000)
└── package.json
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Compile production bundle (dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Cloudflare Pages Deployment

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name nexa-growth --branch main
```
