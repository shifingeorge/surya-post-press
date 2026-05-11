import { motion } from 'framer-motion';

const quotes = [
  {
    body: 'They held a foil registration on a 110gsm uncoated that two other finishers said was impossible. We send them every cover that matters now.',
    author: 'Maya R.',
    role: 'Production Director, Folio Press',
  },
  {
    body: 'The samples come back the next day, the runs come back perfect. Surya is the part of the chain we never have to worry about.',
    author: 'Devansh P.',
    role: 'Creative Director, Studio Form',
  },
  {
    body: 'Edge paint, sewn case, hot foil, debossed slipcase — five finishing techniques on one limited edition. Flawless execution.',
    author: 'Aanya K.',
    role: 'Founder, Karma Records',
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-deep py-32 md:py-44 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,122,26,0.10),transparent_60%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-sun">
              05 — Words
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
              From the people who <span className="italic text-sun">hand us their work.</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:gap-8 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-3xl border border-bone/10 bg-ink/60 backdrop-blur p-8 flex flex-col justify-between min-h-[280px]"
            >
              <span className="font-display text-7xl leading-none text-sun/40">&ldquo;</span>
              <blockquote className="mt-3 text-bone/85 text-[15px] md:text-base leading-relaxed">
                {q.body}
              </blockquote>
              <figcaption className="mt-8 border-t border-bone/10 pt-5">
                <div className="font-display text-base">{q.author}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-bone/50">
                  {q.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
