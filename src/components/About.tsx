import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function About() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headline.current!.querySelectorAll<HTMLElement>('.about-word');
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: headline.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const text =
    'We are a finishing studio that lives at the seam between machine and craft. Our pressmen translate ideas into tactile, lasting things — built to be touched, opened, traded, and kept.';

  return (
    <section id="about" ref={root} className="relative px-6 md:px-10 py-32 md:py-44">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-sun">
            01 — Studio
          </span>
          <p className="text-bone/60 text-sm md:text-base max-w-sm leading-relaxed">
            Built around three principles: respect the substrate, respect the
            artwork, and respect the time it takes to do either justice.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone/50"
          >
            <span className="inline-block h-px w-10 bg-sun" />
            Surat, India
          </motion.div>
        </div>

        <h2
          ref={headline}
          className="col-span-12 md:col-span-7 font-display font-light text-3xl md:text-5xl leading-[1.2] text-balance"
        >
          {text.split(' ').map((w, i) => (
            <span key={i} className="about-word inline-block mr-[0.32em]">
              {w}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
