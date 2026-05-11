# Surya Post Press — Landing Page

A modern, animated landing page for **Surya Post Press**, built with React, TypeScript, and Vite.

## ✨ Features

- **Smooth scroll** powered by [Lenis](https://github.com/darkroomengineering/lenis)
- **Animations** via [GSAP](https://gsap.com/) and [Framer Motion](https://www.framer.com/motion/)
- **Custom cursor** with interactive effects
- **Preloader** animation on page load
- Fully responsive sections: Hero, Marquee, About, Services, Process, Gallery, Testimonials, Contact, Footer

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| GSAP | Scroll & timeline animations |
| Framer Motion | Component animations |
| Lenis | Smooth scrolling |

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Cursor.tsx
│   └── Preloader.tsx
├── hooks/
│   └── useLenis.ts
├── styles/
├── App.tsx
└── main.tsx
```

## 📄 License

© Surya Post Press. All rights reserved.
