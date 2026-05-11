import { useState, FormEvent, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    brief: '',
    service: 'Foil',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = root.current!.querySelectorAll<HTMLElement>('.contact-char');
      gsap.fromTo(
        chars,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const headline = "Let's make something tactile.";

  return (
    <section
      id="contact"
      ref={root}
      className="relative bg-ink px-6 md:px-10 py-32 md:py-44 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-7">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-sun">
            06 — Contact
          </span>
          <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[1] tracking-tight">
            {headline.split('').map((c, i) => (
              <span key={i} className="word-mask align-baseline">
                <span className="word-inner contact-char inline-block">
                  {c === ' ' ? ' ' : c}
                </span>
              </span>
            ))}
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-xl">
            <ContactBlock label="Studio" value={'42, Press Lane\nKatargam, Surat 395004'} />
            <ContactBlock label="Hours" value={'Mon — Sat\n10:00 — 19:30 IST'} />
            <ContactBlock label="Email" value="hello@suryapostpress.in" link="mailto:hello@suryapostpress.in" />
            <ContactBlock label="Phone" value="+91 98257 00000" link="tel:+919825700000" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-bone/10 bg-deep p-7 md:p-8 flex flex-col gap-5"
          >
            {!submitted ? (
              <>
                <div className="text-xs uppercase tracking-[0.3em] text-bone/50">
                  Brief us
                </div>
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <Field
                  label="Company / Press"
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                />

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-bone/50">
                    Service of interest
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Foil', 'Emboss', 'Die-cut', 'UV', 'Bind'].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm({ ...form, service: s })}
                        className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                          form.service === s
                            ? 'bg-sun text-ink border-sun'
                            : 'border-bone/20 text-bone/70 hover:border-bone/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <Field
                  label="Tell us about your project"
                  value={form.brief}
                  onChange={(v) => setForm({ ...form, brief: v })}
                  textarea
                />

                <button
                  type="submit"
                  className="mt-2 group inline-flex items-center justify-center gap-3 rounded-full bg-bone text-ink px-6 py-4 text-sm font-semibold hover:bg-sun transition-colors"
                  data-cursor-hover
                >
                  Send brief
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4 py-8 text-center">
                <div className="font-display text-3xl">Thank you, {form.name || 'friend'}.</div>
                <p className="text-bone/60 text-sm">
                  We&rsquo;ll respond within one working day with a route, a sample
                  proposal and a rough timeline.
                </p>
                <div className="mt-4 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-sun">
                  <span className="h-1.5 w-1.5 rounded-full bg-sun animate-shimmer" />
                  Brief received
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.3em] text-bone/40">
        {label}
      </span>
      <span className="font-display text-lg text-bone whitespace-pre-line leading-snug">
        {value}
      </span>
    </div>
  );
  return link ? (
    <a href={link} className="hover:text-sun transition-colors" data-cursor-hover>
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.25em] text-bone/50">
        {label}
        {required && <span className="text-sun"> *</span>}
      </span>
      {textarea ? (
        <textarea
          required={required}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-bone/15 bg-ink/60 px-4 py-3 text-sm focus:border-sun focus:outline-none transition resize-none"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-bone/15 bg-ink/60 px-4 py-3 text-sm focus:border-sun focus:outline-none transition"
        />
      )}
    </label>
  );
}
