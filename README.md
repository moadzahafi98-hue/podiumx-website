# PodiumX Performance Center — MPA React Starter (Vite + Tailwind)

A modern multi-page React site scaffold (Vite) matching the PodiumX spec: SEO-friendly MPA, Tailwind theme, Lucide icons, framer-motion, bilingual-ready, and pages for Home, About, Programs, Schedule, Facility, Pricing, Blog, Contact, FAQ, Login.

---

## 🗂️ Arborescence
```
podiumx/
├── index.html
├── about.html
├── programs.html
├── schedule.html
├── facility.html
├── pricing.html
├── blog.html
├── contact.html
├── faq.html
├── login.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.cjs
├── tailwind.config.cjs
├── public/
│   ├── logo.svg
│   ├── hero.mp4
│   └── images/
│       ├── training-zone.jpg
│       ├── cardio.jpg
│       ├── recovery.jpg
│       └── lockers.jpg
└── src/
    ├── styles/index.css
    ├── lib/config.ts
    ├── lib/i18n.ts
    ├── components/
    │   ├── Layout.tsx
    │   ├── NavBar.tsx
    │   ├── Footer.tsx
    │   ├── CTAButton.tsx
    │   ├── Section.tsx
    │   ├── LanguageSwitch.tsx
    │   ├── Testimonial.tsx
    │   ├── PriceCard.tsx
    │   ├── Timetable.tsx
    │   └── Guarded.tsx
    └── pages/
        ├── home/
        │   ├── Home.tsx
        │   └── main.tsx
        ├── about/
        │   ├── About.tsx
        │   └── main.tsx
        ├── programs/
        │   ├── Programs.tsx
        │   └── main.tsx
        ├── schedule/
        │   ├── Schedule.tsx
        │   └── main.tsx
        ├── facility/
        │   ├── Facility.tsx
        │   └── main.tsx
        ├── pricing/
        │   ├── Pricing.tsx
        │   └── main.tsx
        ├── blog/
        │   ├── Blog.tsx
        │   └── main.tsx
        ├── contact/
        │   ├── Contact.tsx
        │   └── main.tsx
        ├── faq/
        │   ├── FAQ.tsx
        │   └── main.tsx
        └── login/
            ├── Login.tsx
            └── main.tsx
```

---

## 📦 package.json
```json
{
  "name": "podiumx-mpa",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 5173"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "framer-motion": "^11.2.10",
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.3",
    "vite": "^5.4.9"
  }
}
```

---

## ⚙️ Vite (multi-page)
```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        facility: resolve(__dirname, 'facility.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        faq: resolve(__dirname, 'faq.html'),
        login: resolve(__dirname, 'login.html')
      }
    }
  },
  server: { port: 5173 }
});
```

---

## 🎨 Tailwind & Styles
```js
// tailwind.config.cjs
module.exports = {
  content: [
    './index.html', './about.html', './programs.html', './schedule.html', './facility.html', './pricing.html', './blog.html', './contact.html', './faq.html', './login.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        px: {
          black: '#000000',
          green: '#00FF5E',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        display: ['Montserrat', 'Bebas Neue', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'Open Sans', 'system-ui', 'sans-serif']
      },
      borderRadius: { '2xl': '1.25rem' }
    }
  },
  plugins: []
};
```

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

```css
/* src/styles/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
body { @apply bg-px-black text-px-white font-body antialiased; }
.a11y-focus:focus { @apply outline-none ring-2 ring-px-green ring-offset-2 ring-offset-px-black; }
.btn { @apply inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition; }
.btn-primary { @apply bg-px-green text-px-black hover:opacity-90; }
.container { @apply mx-auto max-w-7xl px-4; }
.section { @apply py-12 md:py-20; }
.h1 { @apply text-4xl md:text-6xl font-extrabold font-display tracking-tight; }
.h2 { @apply text-2xl md:text-4xl font-bold font-display; }
.p { @apply text-base md:text-lg text-white/80; }
.card { @apply bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur; }
```

---

## 🌍 Pages HTML (MPA entries)
> Chaque page a un `div#root` et charge son bundle React dédié.
```html
<!-- index.html -->
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PodiumX Performance Center | Casablanca</title>
    <meta name="description" content="Élevez votre performance. Coaching individuel, small-group, récupération (sauna & bains froids). Casablanca." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/src/styles/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/home/main.tsx"></script>
  </body>
</html>
```

> Répétez le même squelette pour les autres pages :
`about.html → /src/pages/about/main.tsx`, `programs.html → /src/pages/programs/main.tsx`, etc.

```html
<!-- about.html (exemple) -->
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>À propos | PodiumX</title>
    <link rel="stylesheet" href="/src/styles/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/about/main.tsx"></script>
  </body>
</html>
```

---

## 🧩 Lib & Config
```ts
// src/lib/config.ts
export const BRAND = {
  name: 'PodiumX Performance Center',
  tagline: 'Élevez votre performance • Chaque niveau, chaque session',
  location: 'Casablanca, Morocco',
  email: 'info@podiumx.ma',
  phone: '+212 (0) XX XXX XXXX',
  socials: {
    instagram: '#',
    facebook: '#',
    linkedin: '#'
  },
  colors: { black: '#000000', green: '#00FF5E', white: '#FFFFFF' }
};

export const PROGRAMS = [
  { name: 'Small-Group Training', freq: '3 séances / semaine', price: 549, desc: 'Sessions fonctionnelles coachées (10 pers. max).' },
  { name: 'Coaching Individuel – 2x/sem', freq: '2 séances / semaine', price: 799, desc: 'Plan personnalisé avec bilan & suivi.' },
  { name: 'Coaching Individuel – 4x/sem', freq: '4 séances / semaine', price: 1199, desc: 'Programme avancé pour résultats accélérés.' },
  { name: 'Recovery Add-on', freq: 'Illimité', price: 249, desc: 'Accès illimité bains froids + sauna.' }
];

export const SCHEDULE = [
  { day: 'Lun–Ven', morning: '06:00–10:00 (Elite Morning)', midday: '12:00–14:00 (Express Lunch)', evening: '17:00–21:00 (Prime Time)' },
  { day: 'Samedi', morning: '08:00–12:00 (Weekend Warrior)', midday: '—', evening: '—' },
  { day: 'Dimanche', morning: 'Zone Récup uniquement', midday: '—', evening: '—' }
];
```

```ts
// src/lib/i18n.ts (simple bilingual-ready switch)
export type Locale = 'fr' | 'en';
export const t = (key: string, locale: Locale = 'fr') => {
  const dict: Record<string, Record<Locale, string>> = {
    book_eval: { fr: 'Réserver une évaluation gratuite', en: 'Book Your Free Evaluation' }
  };
  return dict[key]?.[locale] ?? key;
};
```

---

## 🧱 Composants Partagés
```tsx
// src/components/Layout.tsx
import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

```tsx
// src/components/NavBar.tsx
import { Dumbbell, Menu } from 'lucide-react';
import { useState } from 'react';
import { BRAND } from '../lib/config';

const links = [
  { href: '/index.html', label: 'Accueil' },
  { href: '/about.html', label: 'À propos' },
  { href: '/programs.html', label: 'Programmes' },
  { href: '/schedule.html', label: 'Planning' },
  { href: '/facility.html', label: 'Espace' },
  { href: '/pricing.html', label: 'Tarifs' },
  { href: '/blog.html', label: 'Blog' },
  { href: '/contact.html', label: 'Contact' },
  { href: '/faq.html', label: 'FAQ' }
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <a href="/index.html" className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-px-green" />
          <span className="font-display font-extrabold tracking-tight">{BRAND.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="/login.html" className="btn btn-primary">Se connecter</a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="container py-4 grid gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} className="block text-white/80 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="/login.html" className="btn btn-primary">Se connecter</a>
          </div>
        </div>
      )}
    </header>
  );
}
```

```tsx
// src/components/Footer.tsx
import { BRAND } from '../lib/config';
export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="h2">{BRAND.name}</h3>
          <p className="p mt-2">{BRAND.tagline}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Coordonnées</h4>
          <p className="p">Centre Casablanca-Settat, Casablanca</p>
          <p className="p">Email: <a className="underline" href="mailto:info@podiumx.ma">info@podiumx.ma</a></p>
          <p className="p">Téléphone: {BRAND.phone}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Suivez-nous</h4>
          <div className="flex gap-4">
            <a href={BRAND.socials.instagram} className="underline">Instagram</a>
            <a href={BRAND.socials.facebook} className="underline">Facebook</a>
            <a href={BRAND.socials.linkedin} className="underline">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container py-6 text-sm text-white/60 border-t border-white/10">
        © {new Date().getFullYear()} PodiumX. Tous droits réservés.
      </div>
    </footer>
  );
}
```

```tsx
// src/components/CTAButton.tsx
import { ArrowRight } from 'lucide-react';
export default function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="btn btn-primary group">
      <span>{children}</span>
      <ArrowRight className="ml-2 transition -translate-x-0 group-hover:translate-x-1" />
    </a>
  );
}
```

```tsx
// src/components/Section.tsx
export default function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="container grid gap-4">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="p">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
```

```tsx
// src/components/Testimonial.tsx
export default function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <blockquote className="card">
      <p className="p">“{quote}”</p>
      <p className="mt-4 text-sm text-white/60">— {author}</p>
    </blockquote>
  );
}
```

```tsx
// src/components/PriceCard.tsx
export default function PriceCard({ title, price, freq, features, cta }: { title: string; price: number; freq: string; features: string[]; cta: string }) {
  return (
    <div className="card grid gap-3">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="text-4xl font-extrabold text-px-green">{price} <span className="text-base text-white/70">MAD/mois</span></div>
      <div className="text-white/70">{freq}</div>
      <ul className="grid gap-2 text-white/80">
        {features.map((f, i) => (<li key={i}>• {f}</li>))}
      </ul>
      <a href="/contact.html" className="btn btn-primary mt-2">{cta}</a>
    </div>
  );
}
```

```tsx
// src/components/Timetable.tsx
import { useState } from 'react';
import { SCHEDULE } from '../lib/config';

export default function Timetable() {
  const [dayIndex, setDayIndex] = useState(0);
  const days = [
    { label: 'Lun–Ven', idx: 0 },
    { label: 'Samedi', idx: 1 },
    { label: 'Dimanche', idx: 2 }
  ];
  const row = SCHEDULE[dayIndex];
  return (
    <div className="card">
      <div className="flex gap-2 mb-4">
        {days.map(d => (
          <button
            key={d.idx}
            onClick={() => setDayIndex(d.idx)}
            className={`btn ${dayIndex === d.idx ? 'btn-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <div className="text-white/60 text-sm">Matin</div>
          <div className="font-semibold">{row.morning}</div>
        </div>
        <div>
          <div className="text-white/60 text-sm">Midi</div>
          <div className="font-semibold">{row.midday}</div>
        </div>
        <div>
          <div className="text-white/60 text-sm">Soir</div>
          <div className="font-semibold">{row.evening}</div>
        </div>
      </div>
      <a href="https://calendly.com/" target="_blank" className="btn btn-primary mt-6">Réserver une séance</a>
    </div>
  );
}
```

```tsx
// src/components/Guarded.tsx (placeholder pour zone membre)
import { ReactNode } from 'react';
export default function Guarded({ children }: { children: ReactNode }) {
  const isAuthed = false; // TODO: connecter à Firebase/Supabase
  if (!isAuthed) return <div className="card">Veuillez vous connecter pour accéder à cette section.</div>;
  return <>{children}</>;
}
```

---

## 🏠 Home
```tsx
// src/pages/home/Home.tsx
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import CTAButton from '../../components/CTAButton';
import Section from '../../components/Section';
import Testimonial from '../../components/Testimonial';

export default function Home() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center">
        <video className="absolute inset-0 w-full h-full object-cover opacity-20" autoPlay muted loop playsInline src="/hero.mp4"/>
        <div className="container relative z-10">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="h1 max-w-3xl">
            Élevez votre performance
          </motion.h1>
          <p className="p mt-4 max-w-2xl">Coaching haut niveau, recovery de pointe, communauté engagée. Chaque niveau, chaque session.</p>
          <div className="mt-8">
            <CTAButton href="/contact.html">Réserver une évaluation gratuite</CTAButton>
          </div>
        </div>
      </section>

      <Section title="Pourquoi PodiumX" subtitle="Performance • Précision • Progrès • Communauté">
        <div className="grid md:grid-cols-4 gap-4">
          {['Coachs experts','Méthodologie fiable','Suivi & data','Espace premium'].map((b,i)=> (
            <div key={i} className="card">{b}</div>
          ))}
        </div>
      </Section>

      <Section title="Témoignages">
        <div className="grid md:grid-cols-3 gap-4">
          <Testimonial quote="Des progrès visibles dès 4 semaines !" author="Sara, membre"/>
          <Testimonial quote="Coaching précis, ambiance motivante." author="Yassine, athlète"/>
          <Testimonial quote="Recovery game-changer (bain froid + sauna)." author="Adam, triathlète"/>
        </div>
      </Section>

      <Section title="Prêt à commencer ?">
        <CTAButton href="/pricing.html">Voir les offres</CTAButton>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/home/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
```

---

## 🧪 Programs
```tsx
// src/pages/programs/Programs.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import PriceCard from '../../components/PriceCard';
import { PROGRAMS } from '../../lib/config';

export default function Programs(){
  return (
    <Layout>
      <Section title="Programmes & Offres" subtitle="Choisissez le format qui vous convient">
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAMS.slice(0,3).map(p => (
            <PriceCard key={p.name} title={p.name} price={p.price} freq={p.freq} features={[p.desc,'Bilan initial','Suivi mensuel']} cta="Je m'inscris"/>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <PriceCard title={PROGRAMS[3].name} price={PROGRAMS[3].price} freq={PROGRAMS[3].freq} features={[PROGRAMS[3].desc,'Accès sauna','Accès bains froids']} cta="Ajouter au plan"/>
          <div className="card md:col-span-2">
            <h3 className="text-xl font-bold mb-2">Offres spéciales</h3>
            <ul className="p">
              <li>• 10% de réduction pour engagement 12 mois</li>
              <li>• Programme de parrainage</li>
            </ul>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/programs/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Programs from './Programs';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Programs />
  </React.StrictMode>
);
```

---

## 🗓️ Schedule (planning interactif)
```tsx
// src/pages/schedule/Schedule.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Timetable from '../../components/Timetable';

export default function Schedule(){
  return (
    <Layout>
      <Section title="Planning Hebdomadaire" subtitle="Réservez directement la session qui vous convient">
        <Timetable />
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/schedule/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Schedule from './Schedule';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Schedule />
  </React.StrictMode>
);
```

---

## 🏟️ Facility
```tsx
// src/pages/facility/Facility.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';

const ZONES = [
  { title: 'Training Zone (100 m²)', img: '/images/training-zone.jpg', desc: 'Rig fonctionnel, barres, kettlebells, box plyo, turf sled.' },
  { title: 'Cardio & Accueil (100 m²)', img: '/images/cardio.jpg', desc: 'Tapis, assault bikes, rameurs; lounge premium & shop.' },
  { title: 'Recovery (30 m²)', img: '/images/recovery.jpg', desc: '2 bains froids inox, sauna vitré, banc de relaxation.' },
  { title: 'Vestiaires (15 m²)', img: '/images/lockers.jpg', desc: 'Casiers sécurisés, douches, bancs et miroirs.' }
];

export default function Facility(){
  return (
    <Layout>
      <Section title="Espace & Équipements" subtitle="Un terrain de jeu conçu pour la performance">
        <div className="grid md:grid-cols-2 gap-6">
          {ZONES.map(z => (
            <figure key={z.title} className="card">
              <img src={z.img} alt={z.title} className="w-full h-56 object-cover rounded-xl"/>
              <figcaption className="mt-3">
                <div className="font-bold">{z.title}</div>
                <p className="p">{z.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/facility/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Facility from './Facility';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Facility />
  </React.StrictMode>
);
```

---

## 💵 Pricing
```tsx
// src/pages/pricing/Pricing.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import PriceCard from '../../components/PriceCard';

const tiers = [
  { title: 'Small-Group Training', price: 549, freq: '3 séances / sem', features: ['10 pers. max', 'Bilan initial', 'Suivi mensuel'] },
  { title: 'Individuel – 2x/sem', price: 799, freq: '2 séances / sem', features: ['Plan perso', 'Bilan & progress', 'Priorité planning'] },
  { title: 'Individuel – 4x/sem', price: 1199, freq: '4 séances / sem', features: ['Coaching avancé', 'Suivi serré', 'Accélérateur de résultats'] }
];

export default function Pricing(){
  return (
    <Layout>
      <Section title="Tarifs & Abonnements" subtitle="Transparents, flexibles, orientés résultats">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(t => (
            <PriceCard key={t.title} {...t} cta="Choisir ce plan" />
          ))}
        </div>
        <div className="card mt-8">
          <div className="font-bold mb-2">Add-on Recovery</div>
          <p className="p">Illimité bains froids + sauna — 249 MAD / mois</p>
        </div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/pricing/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Pricing from './Pricing';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Pricing />
  </React.StrictMode>
);
```

---

## 📇 Contact
```tsx
// src/pages/contact/Contact.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) });

type FormData = z.infer<typeof schema>;

export default function Contact(){
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    // TODO: intégrer un backend (SendGrid/Mailchimp) ou service functions
    alert('Merci! Nous vous répondrons rapidement.');
    console.log(data);
  };
  return (
    <Layout>
      <Section title="Contact" subtitle="Parlez-nous de vos objectifs">
        <form onSubmit={handleSubmit(onSubmit)} className="card grid gap-4 max-w-2xl">
          <input className="card bg-white/10 p-3" placeholder="Nom" {...register('name', { required: true, minLength: 2 })} />
          {errors.name && <span className="text-red-400 text-sm">Nom requis</span>}
          <input className="card bg-white/10 p-3" placeholder="Email" {...register('email', { required: true })} />
          {errors.email && <span className="text-red-400 text-sm">Email invalide</span>}
          <textarea className="card bg-white/10 p-3" rows={6} placeholder="Message" {...register('message', { required: true, minLength: 10 })} />
          {errors.message && <span className="text-red-400 text-sm">Message trop court</span>}
          <button className="btn btn-primary w-fit" type="submit">Envoyer</button>
          {isSubmitSuccessful && <div className="text-px-green">Message envoyé ✔</div>}
        </form>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/contact/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Contact from './Contact';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Contact />
  </React.StrictMode>
);
```

---

## 🧠 Autres pages (stubs rapides)
```tsx
// src/pages/about/About.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
export default function About(){
  return (
    <Layout>
      <Section title="Notre Histoire" subtitle="Mission: transformer le potentiel en performance durable.">
        <div className="card">PodiumX combine coaching d’élite, technologies de suivi et espace premium.</div>
      </Section>
      <Section title="Coachs">
        <div className="grid md:grid-cols-3 gap-4">
          {['Head Coach','Strength Coach','Recovery Specialist'].map((r,i)=> (
            <div key={i} className="card">{r}</div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/blog/Blog.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
export default function Blog(){
  return (
    <Layout>
      <Section title="Blog PodiumX" subtitle="Force, récupération, nutrition">
        <div className="card">Bientôt: articles optimisés SEO.</div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/faq/FAQ.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
export default function FAQ(){
  return (
    <Layout>
      <Section title="FAQ">
        <div className="card">
          <p className="p"><strong>Q:</strong> Puis-je essayer une séance ?</p>
          <p className="p"><strong>R:</strong> Oui, réservez une évaluation gratuite.</p>
        </div>
      </Section>
    </Layout>
  );
}
```

```tsx
// src/pages/login/Login.tsx
import Layout from '../../components/Layout';
import Section from '../../components/Section';
export default function Login(){
  return (
    <Layout>
      <Section title="Espace Membre">
        <div className="card">Intégration prochaine: Firebase/Supabase Auth + portail client (sessions, progrès, factures).</div>
      </Section>
    </Layout>
  );
}
```

```tsx
// GENERIC mains
// src/pages/about/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import About from './About';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><About/></React.StrictMode>);

// src/pages/blog/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Blog from './Blog';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Blog/></React.StrictMode>);

// src/pages/faq/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import FAQ from './FAQ';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><FAQ/></React.StrictMode>);

// src/pages/facility/main.tsx already above
// src/pages/login/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Login/></React.StrictMode>);
```

---

## 🧰 TypeScript & Configs
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": "."
  },
  "include": ["src"],
  "references": []
}
```

---

## 🚀 Lancement & Déploiement
```bash
# 1) Installation
pnpm install   # ou: npm i / yarn

# 2) Dev local
pnpm dev       # http://localhost:5173

# 3) Build
pnpm build     # génère dist/ avec toutes les pages

# 4) Preview
pnpm preview
```

**Déploiement**: Vercel/Netlify détectent Vite automatiquement.
- Build command: `pnpm build`
- Output: `dist`

**Env. variables (futures intégrations)**
- `VITE_BOOKING_URL` (Calendly/Google Calendar/custom backend)
- `VITE_MAILCHIMP_KEY` / `VITE_SENDGRID_KEY`
- `VITE_AUTH_PROVIDER` (firebase | supabase)

---

## 🔌 Hooks d’intégration (placeholders)
- Booking: dans `Timetable.tsx`, remplacez le lien Calendly par votre URL.
- Newsletter: créer un composant `NewsletterForm` branché sur Mailchimp/SendGrid.
- Auth & Portail: remplacez `Guarded` par un wrapper Firebase/Supabase et créez des pages protégées.

---

## ♿ Accessibilité
- Contraste élevé par défaut (fond noir, texte blanc/vert).
- Focus styles (`.a11y-focus`).
- Navigation clavier ok (components simples, liens visibles).

---

## ✅ À faire ensuite
1) Brancher votre URL de réservation.
2) Ajouter les vraies photos/vidéos (dans `public/images`).
3) Rédiger les contenus SEO (Blog, About, FAQ).
4) Activer l’auth (Firebase/Supabase) et portail membre.
5) Mettre en place analytics (Plausible/GA4) & sitemap/robots.txt.

---

> Ce starter est prêt à l’emploi et respecte l’identité PodiumX (noir mat, vert électrique, typo bold/clean) tout en restant extensible. Bon build !

