import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Work = {
  title: string;
  client: string;
  tag: string;
  swatch: string;
  art: 'foil' | 'emboss' | 'die' | 'uv' | 'edge' | 'bind';
};

const works: Work[] = [
  {
    title: 'Solstice — Limited Cover',
    client: 'Folio Press',
    tag: 'Hot foil + Sculpted emboss',
    swatch: 'from-[#0e0e0e] via-[#1a1410] to-[#3a2410]',
    art: 'foil',
  },
  {
    title: 'Atelier Noir — Box Set',
    client: 'Maison Noir',
    tag: 'Soft-touch + Spot UV',
    swatch: 'from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a]',
    art: 'uv',
  },
  {
    title: 'Songbook — Slipcase',
    client: 'Karma Records',
    tag: 'Edge paint + Sewn case',
    swatch: 'from-[#231310] via-[#3b1a14] to-[#7a2a1a]',
    art: 'edge',
  },
  {
    title: 'Saffron Mark — Identity',
    client: 'Saffron Co.',
    tag: 'Cold foil + Die-cut',
    swatch: 'from-[#1a0e05] via-[#321606] to-[#6a3010]',
    art: 'die',
  },
  {
    title: 'Annual — Letterpress',
    client: 'Studio Form',
    tag: 'Letterpress + Wire-O',
    swatch: 'from-[#0e0e0e] via-[#181818] to-[#2a2a2a]',
    art: 'bind',
  },
  {
    title: 'Heritage — Embossed',
    client: 'Banyan Tea',
    tag: 'Multi-level emboss',
    swatch: 'from-[#1a160e] via-[#2a2316] to-[#5a4520]',
    art: 'emboss',
  },
];

export default function Gallery() {
  return (
    <section id="work" className="relative bg-ink py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-sun">
              04 — Selected Work
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
              Things we&rsquo;ve <span className="italic text-sun">put hands on.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="text-sm tracking-wider uppercase text-bone/70 hover:text-sun transition-colors"
            data-cursor-hover
          >
            Full archive →
          </a>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:gap-8">
          {works.map((w, i) => (
            <WorkCard key={w.title} work={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [60 + (index % 3) * 20, -60 - (index % 3) * 20],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  const span =
    index % 5 === 0
      ? 'col-span-12 md:col-span-8'
      : index % 5 === 1
      ? 'col-span-12 md:col-span-4'
      : index % 5 === 2
      ? 'col-span-12 md:col-span-5'
      : index % 5 === 3
      ? 'col-span-12 md:col-span-7'
      : 'col-span-12 md:col-span-6';

  const aspect =
    index % 3 === 0 ? 'aspect-[16/10]' : index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[5/4]';

  return (
    <motion.div ref={ref} style={{ y }} className={span}>
      <div
        data-cursor-hover
        className={`group relative overflow-hidden rounded-2xl border border-bone/10 bg-gradient-to-br ${work.swatch} ${aspect}`}
      >
        <motion.div
          style={{ scale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ArtPiece kind={work.art} />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-bone/50">
                {work.client}
              </div>
              <h3 className="mt-2 font-display text-xl md:text-2xl text-bone">
                {work.title}
              </h3>
            </div>
            <span className="rounded-full border border-bone/20 px-3 py-1 text-[10px] uppercase tracking-wider text-bone/70 backdrop-blur">
              {work.tag}
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/0 group-hover:ring-sun/40 transition" />
      </div>
    </motion.div>
  );
}

function ArtPiece({ kind }: { kind: Work['art'] }) {
  switch (kind) {
    case 'foil':
      return (
        <svg viewBox="0 0 200 200" className="h-2/3 w-2/3 text-gold">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ffd76b" />
              <stop offset="0.5" stopColor="#d4a437" />
              <stop offset="1" stopColor="#7a5520" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="60" fill="none" stroke="url(#g1)" strokeWidth="2" />
          <circle cx="100" cy="100" r="36" fill="url(#g1)" />
          <text x="100" y="106" textAnchor="middle" fontSize="20" fontFamily="serif" fill="#0a0a0a">S</text>
        </svg>
      );
    case 'emboss':
      return (
        <div className="relative h-3/4 w-3/4">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-bone/10 to-transparent" />
          <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-white/8 to-transparent shadow-[inset_2px_2px_8px_rgba(255,255,255,0.05),inset_-2px_-2px_8px_rgba(0,0,0,0.4)]" />
          <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-bone/15">B</div>
        </div>
      );
    case 'die':
      return (
        <svg viewBox="0 0 200 200" className="h-2/3 w-2/3">
          <path
            d="M100 20 L160 60 L160 140 L100 180 L40 140 L40 60 Z"
            fill="none"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx="100" cy="100" r="20" fill="#ff7a1a" />
        </svg>
      );
    case 'uv':
      return (
        <div className="relative h-2/3 w-2/3 rounded-full bg-gradient-to-br from-bone/5 to-transparent">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
          <div className="absolute inset-8 rounded-full border border-bone/20" />
        </div>
      );
    case 'edge':
      return (
        <div className="flex h-2/3 w-2/3 flex-col gap-1">
          <div className="h-2 rounded bg-sun" />
          <div className="flex-1 rounded bg-bone/10" />
          <div className="h-2 rounded bg-sun" />
        </div>
      );
    case 'bind':
      return (
        <div className="flex h-2/3 w-2/3 items-stretch gap-1">
          <div className="w-2 bg-bone/30" />
          <div className="flex-1 bg-bone/5" />
          <div className="w-2 bg-bone/30" />
        </div>
      );
  }
}
