import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1600;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDone(true), 280);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[200] bg-ink flex items-end"
        >
          <div className="w-full px-6 md:px-10 pb-10">
            <div className="flex items-end justify-between text-bone">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-display text-5xl md:text-8xl leading-none tracking-tight"
              >
                Surya<span className="text-sun">.</span>
              </motion.div>
              <div className="font-mono text-2xl md:text-5xl tabular-nums">
                {String(progress).padStart(3, '0')}
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-bone/15 overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-sun"
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-bone/50">
              <span>Calibrating press</span>
              <span>Surya Post Press Solution</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
