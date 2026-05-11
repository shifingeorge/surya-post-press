import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    num: '01',
    title: 'Brief',
    body: 'Share artwork, stocks, run lengths and the hand-feel you want. We respond with a route.',
  },
  {
    num: '02',
    title: 'Sample',
    body: 'A finished sample on your stock. Foil chips, deboss depths, UV gloss compared in person.',
  },
  {
    num: '03',
    title: 'Tooling',
    body: 'Brass dies, magnesium plates and forme cutters made in-house — protected for re-runs.',
  },
  {
    num: '04',
    title: 'Press',
    body: 'A lead pressman runs your job. Quality checks every 250 sheets, never delegated.',
  },
  {
    num: '05',
    title: 'Finish',
    body: 'Trim, bind, edge-paint, pack. Photographed on delivery so you can show your client.',
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.proc-step');

      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.6,
            },
          },
        );
      });

      gsap.to('.proc-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 65%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={root}
      className="relative bg-bone text-ink px-6 md:px-10 py-32 md:py-44 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 md:sticky md:top-32 self-start">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-crimson">
            03 — Process
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            From brief to <span className="italic">box-out.</span>
          </h2>
          <p className="mt-6 text-ink/70 max-w-sm text-sm md:text-base leading-relaxed">
            Five gates. Each one a chance to refine. Every job is logged so the
            tenth re-run looks like the first.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-ink/10 hidden md:block">
            <div
              className="proc-progress origin-top h-full w-px bg-crimson"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20 md:pl-12">
            {steps.map((s) => (
              <div key={s.num} className="proc-step relative">
                <div className="absolute -left-[3.4rem] top-2 hidden md:flex h-3 w-3 items-center justify-center rounded-full bg-crimson ring-4 ring-bone" />
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs tracking-[0.3em] text-crimson">
                    {s.num}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl leading-tight">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-ink/70 text-base md:text-lg max-w-xl leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
