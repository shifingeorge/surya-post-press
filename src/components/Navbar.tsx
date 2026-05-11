import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShrunk(v > 60));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5"
    >
      <motion.nav
        animate={{
          backgroundColor: shrunk ? 'rgba(10,10,10,0.72)' : 'rgba(10,10,10,0)',
          backdropFilter: shrunk ? 'blur(14px)' : 'blur(0px)',
          borderColor: shrunk ? 'rgba(243,239,230,0.08)' : 'rgba(243,239,230,0)',
        }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl flex items-center justify-between rounded-full border px-5 md:px-7 py-3"
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-sun/90 group-hover:scale-110 transition-transform" />
            <span className="relative h-2 w-2 rounded-full bg-ink" />
          </span>
          <span className="font-display text-[15px] tracking-tight">
            Surya<span className="text-sun">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-[13px] font-medium tracking-wide">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-block text-bone/80 hover:text-bone transition-colors after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:h-px after:w-0 after:bg-sun hover:after:w-full after:transition-all after:duration-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-bone text-ink px-4 py-2 text-[13px] font-semibold hover:bg-sun transition-colors"
        >
          Request Quote
          <span aria-hidden>→</span>
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 px-2 py-2"
        >
          <span className={`h-px w-6 bg-bone transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-bone transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-bone transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="md:hidden mx-auto max-w-7xl mt-3 overflow-hidden rounded-2xl border border-bone/10 bg-ink/80 backdrop-blur"
      >
        <ul className="flex flex-col p-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 text-bone/80 hover:text-sun text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="px-2 pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-bone text-ink px-4 py-2.5 text-sm font-semibold"
            >
              Request Quote
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
