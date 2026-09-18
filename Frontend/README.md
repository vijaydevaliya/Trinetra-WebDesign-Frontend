# Trinetra Technoworld Group — Production React Animated Website

A production-ready, fully animated multi-page React website for **Trinetra Technoworld Pvt Ltd** and its three subsidiaries:
1. **Vasuki by Trinetra** — Housing Society & Apartment Complex Management
2. **Vishwakarma by Trinetra** — Interior Architecture & Turnkey Execution
3. **Tribond by Trinetra** — High-Performance Construction Adhesives & Chemical Mortars

---

## 🚀 Tech Stack

| Tech | Purpose |
|---|---|
| **React 18 + Vite** | High-performance React SPA bundler |
| **react-router-dom v6** | Declarative client-side routing |
| **Tailwind CSS** | Custom token color layer (Navy + Brand Blue palette) |
| **Framer Motion** | 3-Phase Orbit Hero, scroll triggers, shockwaves & page transitions |
| **Lucide React** | Crisp modern iconography |
| **Poppins Font** | Google Font (300, 400, 500, 600, 700) |
| **Dual Theme System** | Persisted Dark & Light theme with `<html class="dark">` strategy |

---

## 🛠️ Quick Start & Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Key Project Structure & Where to Edit Content

- **Single Source of Truth**: [`src/data/companies.js`](file:///c:/Vijay-Projects/Trinetra-templates-desgin/src/data/companies.js)
  - Edit parent company details, subsidiary names, taglines, positioning, services, product specs, and features here.
- **Logos Location**: `public/logos/`
  - `trinetra-technoworld.jpg`
  - `vasuki.jpg`
  - `vishwakarma.jpg`
  - `tribond.jpg`
- **Orbit Hero Component**: [`src/components/hero/OrbitHero.jsx`](file:///c:/Vijay-Projects/Trinetra-templates-desgin/src/components/hero/OrbitHero.jsx)
- **Interactive Subsidiary Widgets**:
  - Vasuki Dashboard Preview: [`src/components/company/DashboardPreview.jsx`](file:///c:/Vijay-Projects/Trinetra-templates-desgin/src/components/company/DashboardPreview.jsx)
  - Vishwakarma Before/After Slider: [`src/components/company/BeforeAfterSlider.jsx`](file:///c:/Vijay-Projects/Trinetra-templates-desgin/src/components/company/BeforeAfterSlider.jsx)
  - Tribond Coverage Calculator: [`src/components/company/CoverageCalculator.jsx`](file:///c:/Vijay-Projects/Trinetra-templates-desgin/src/components/company/CoverageCalculator.jsx)

---

## 🎨 Color Palette Reference

```js
navy: {
  950: '#04101F', // Darkest background (dark theme base)
  900: '#071A2E', // Dark surface card
  800: '#0C2440',
  700: '#123356',
},
brand: {
  900: '#0B3A8C', // Deep brand blue
  800: '#0F52BA',
  700: '#1565C0',
  600: '#1E88E5',
  500: '#2B9BE0', // Mid blue
  400: '#4FC0E8',
  300: '#7FD4F0',
  200: '#A9E4F7',
  100: '#D6F1FC',
  50:  '#EFF9FE', // Lightest wash (light theme base)
}
```

Signature Gradient:
```css
linear-gradient(90deg, #4FC0E8 0%, #2B9BE0 35%, #1565C0 70%, #0B3A8C 100%)
```

---

© Trinetra Technoworld Pvt Ltd. All rights reserved.
