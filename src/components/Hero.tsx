import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';

const heroLines = [
  ['Finishing,', 'Refined.'],
  ['Where', 'Print', 'Becomes', 'Object.'],
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 240]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleMark = useTransform(scrollY, [0, 700], [1, 1.6]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-word-inner', { yPercent: 110 });
      gsap.set('.hero-fade', { opacity: 0, y: 26 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({ delay: 0.35 });
      tl.to('.hero-word-inner', {
        yPercent: 0,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.08,
      })
        .to(
          '.hero-rule',
          { scaleX: 1, duration: 1.1, ease: 'expo.out' },
          '-=0.7',
        )
        .to(
          '.hero-fade',
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
          '-=0.7',
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-screen overflow-hidden grain"
    >
      {/* Background gradient */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,122,26,0.18),transparent_60%),radial-gradient(60%_50%_at_85%_90%,rgba(212,164,55,0.12),transparent_70%)]"
      />
      <div className="absolute inset-0 -z-10 stripes opacity-50" />

      {/* Sun motif */}
      <motion.div
        style={{ scale: scaleMark, opacity }}
        className="pointer-events-none absolute right-[-8%] top-[14%] -z-0 h-[36rem] w-[36rem] rounded-full bg-[conic-gradient(from_180deg,rgba(255,122,26,0.0),rgba(255,122,26,0.6),rgba(212,164,55,0.4),rgba(255,122,26,0.0))] blur-2xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 md:px-10 pt-36 md:pt-40 pb-16">
        <div>
          <div className="hero-fade flex items-center gap-4 text-xs font-mono uppercase tracking-[0.3em] text-bone/60">
            <span className="inline-block h-1.5 w-1.5 animate-shimmer rounded-full bg-sun" />
            <span>Est. 2008 — Post Press Studio</span>
          </div>

          <h1 className="mt-8 font-display font-light leading-[0.92] tracking-tight text-balance text-[12vw] md:text-[8.5vw]">
            {heroLines[0].map((w, i) => (
              <span key={i} className="word-mask mr-[0.18em]">
                <span className="word-inner hero-word-inner">{w}</span>
              </span>
            ))}
            <br />
            {heroLines[1].map((w, i) => (
              <span
                key={i}
                className={`word-mask mr-[0.18em] ${
                  w === 'Object.' ? 'italic text-sun' : ''
                }`}
              >
                <span className="word-inner hero-word-inner">{w}</span>
              </span>
            ))}
          </h1>

          <div className="hero-rule mt-10 h-px w-full bg-bone/15" />

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="hero-fade md:col-start-7 md:col-span-6 text-bone/70 text-base md:text-lg leading-relaxed max-w-xl">
              Surya Post Press Solution is a finishing house for printers, agencies
              and brands. Foiling, embossing, die-cutting, lamination and binding
              — done with the patience of a workshop and the precision of a press.
            </p>
          </div>
        </div>

        <div className="hero-fade mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <a
            href="#services"
            className="group inline-flex items-center gap-3 text-bone hover:text-sun transition-colors"
            data-cursor-hover
          >
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 group-hover:border-sun/60 transition-colors">
              <span className="block h-2 w-2 rounded-full bg-sun group-hover:scale-150 transition-transform" />
            </span>
            <span className="text-sm tracking-wider uppercase">
              Explore Services
            </span>
          </a>

          <div className="flex items-end gap-10 text-sm text-bone/60">
            <Stat number="17+" label="Years of finishing" />
            <Stat number="420" label="Brands trusted" />
            <Stat number="2.4M" label="Sheets / month" />
          </div>
        </div>
      </div>

      {/* Scroll affordance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bone/50"
      >
        <span>Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-bone/60 to-transparent" />
      </motion.div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="hero-fade">
      <div className="font-display text-2xl md:text-3xl">{number}</div>
      <div className="mt-1 text-xs text-bone/50 tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}
