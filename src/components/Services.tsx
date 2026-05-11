import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Service = {
  num: string;
  title: string;
  blurb: string;
  bullets: string[];
  accent: string;
};

const services: Service[] = [
  {
    num: '01',
    title: 'Foil Stamping',
    blurb:
      'Hot and cold foil — gold, silver, holographic, pigment. Crisp registration on stocks from 90gsm to greyboard.',
    bullets: ['Hot stamp', 'Cold transfer', 'Hologram', 'Sculpted dies'],
    accent: 'from-gold/40 to-sun/10',
  },
  {
    num: '02',
    title: 'Emboss & Deboss',
    blurb:
      'Multi-level brass dies for tactile depth. Registered to print, foil, or blind on cover stocks.',
    bullets: ['Sculpted', 'Multi-level', 'Combination', 'Blind'],
    accent: 'from-crimson/30 to-sun/10',
  },
  {
    num: '03',
    title: 'Die-Cutting & Forme',
    blurb:
      'Custom forme cutting, kiss-cuts, perforation, scoring. Laser-cut precision available for fine work.',
    bullets: ['Forme cut', 'Laser cut', 'Kiss-cut', 'Score & fold'],
    accent: 'from-sun/30 to-gold/10',
  },
  {
    num: '04',
    title: 'Lamination & UV',
    blurb:
      'Matt, gloss, soft-touch, anti-scuff films. Spot UV, raised UV, sandy UV with tight registration.',
    bullets: ['Soft-touch', 'Anti-scuff', 'Spot UV', 'Raised UV'],
    accent: 'from-bone/20 to-sun/10',
  },
  {
    num: '05',
    title: 'Binding & Finish',
    blurb:
      'Perfect bind, saddle stitch, Wire-O, sewn case bind. Edge paint, ribbons, head-bands, slipcases.',
    bullets: ['Perfect bind', 'Sewn case', 'Wire-O', 'Edge paint'],
    accent: 'from-gold/30 to-crimson/10',
  },
  {
    num: '06',
    title: 'Specialty',
    blurb:
      'Letterpress, screen-print varnish, flocking, glitter, thermography. Speak to us about the impossible.',
    bullets: ['Letterpress', 'Flocking', 'Thermo', 'Screen UV'],
    accent: 'from-sun/30 to-bone/10',
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card');
      const trackEl = track.current!;
      const sectionEl = root.current!;

      const totalWidth = trackEl.scrollWidth;
      const distance = totalWidth - window.innerWidth + 96;

      const horizontalTween = gsap.to(trackEl, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${distance + 200}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('.svc-anim'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'left center',
              containerAnimation: horizontalTween,
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative bg-ink py-24 md:py-0 md:h-screen md:overflow-hidden"
    >
      <div className="md:hidden mx-auto max-w-7xl px-6">
        <SectionHeader />
        <div className="grid gap-5 mt-10">
          {services.map((s) => (
            <Card key={s.num} svc={s} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex h-full w-full flex-col">
        <div className="px-10 pt-32 pb-8">
          <SectionHeader />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div ref={track} className="absolute inset-0 flex items-center gap-8 pl-10 pr-24 will-change-transform">
            {services.map((s) => (
              <Card key={s.num} svc={s} />
            ))}
            <FinalCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-end justify-between gap-8 flex-wrap">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-sun">
          02 — Services
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
          Six disciplines.{' '}
          <span className="italic text-sun">One press floor.</span>
        </h2>
      </div>
      <p className="max-w-sm text-bone/60 text-sm">
        Each station is run by a lead pressman. We schedule for craft, not
        throughput — though we still ship on time.
      </p>
    </div>
  );
}

function Card({ svc }: { svc: Service }) {
  return (
    <article
      className="svc-card group relative w-full md:w-[420px] flex-shrink-0 rounded-3xl border border-bone/10 bg-deep p-7 md:p-8 overflow-hidden h-auto md:h-[440px]"
      data-cursor-hover
    >
      <div
        className={`absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${svc.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-bone/50">
          <span className="svc-anim">— {svc.num}</span>
          <span className="svc-anim h-2 w-2 rounded-full bg-sun" />
        </div>

        <h3 className="svc-anim mt-10 font-display text-3xl md:text-4xl leading-tight">
          {svc.title}
        </h3>

        <p className="svc-anim mt-5 text-bone/60 text-sm md:text-[15px] leading-relaxed">
          {svc.blurb}
        </p>

        <div className="svc-anim mt-auto pt-8 flex flex-wrap gap-2">
          {svc.bullets.map((b) => (
            <span
              key={b}
              className="rounded-full border border-bone/15 px-3 py-1.5 text-[11px] tracking-wider uppercase text-bone/70"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="svc-anim mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sun group-hover:gap-3 transition-all">
          See sample <span aria-hidden>→</span>
        </div>
      </div>
    </article>
  );
}

function FinalCard() {
  return (
    <article className="relative w-[420px] flex-shrink-0 rounded-3xl border border-bone/10 bg-gradient-to-br from-sun/30 via-gold/15 to-ink p-8 h-[440px] flex flex-col justify-between">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-bone/70">
          — Brief us
        </span>
        <h3 className="mt-10 font-display text-3xl leading-tight">
          Have a job that needs a careful hand?
        </h3>
      </div>
      <a
        href="#contact"
        className="inline-flex items-center justify-center rounded-full bg-bone text-ink px-5 py-3 text-sm font-semibold w-fit"
        data-cursor-hover
      >
        Start a brief →
      </a>
    </article>
  );
}
