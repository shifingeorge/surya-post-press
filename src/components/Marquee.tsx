const items = [
  'Hot Foil',
  'Cold Foil',
  'Spot UV',
  'Emboss',
  'Deboss',
  'Die-Cut',
  'Edge Paint',
  'Soft-Touch',
  'Lamination',
  'Perfect Bind',
  'Saddle Stitch',
  'Score & Fold',
];

export default function Marquee() {
  const repeated = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-ink py-6">
      <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-3xl md:text-5xl">
        {repeated.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-bone/80">
            {t}
            <span className="inline-block h-2 w-2 rounded-full bg-sun" />
          </span>
        ))}
      </div>
    </div>
  );
}
