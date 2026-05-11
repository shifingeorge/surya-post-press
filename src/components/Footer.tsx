export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-bone/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="font-display text-5xl md:text-7xl leading-none">
              Surya<span className="text-sun">.</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-bone/60">
              Surya Post Press Solution — finishing studio for printers, agencies and
              brands. Founded 2008. Surat, Gujarat.
            </p>
          </div>

          <FooterCol
            title="Studio"
            items={[
              { label: 'Work', href: '#work' },
              { label: 'Services', href: '#services' },
              { label: 'Process', href: '#process' },
              { label: 'About', href: '#about' },
            ]}
          />
          <FooterCol
            title="Connect"
            items={[
              { label: 'Email', href: 'mailto:hello@suryapostpress.in' },
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'Behance', href: '#' },
            ]}
          />
          <FooterCol
            title="Visit"
            items={[
              { label: '42, Press Lane', href: '#' },
              { label: 'Katargam, Surat', href: '#' },
              { label: '395004 IN', href: '#' },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-bone/40 border-t border-bone/10 pt-6">
          <span>© {new Date().getFullYear()} Surya Post Press Solution. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-sun transition-colors">Privacy</a>
            <a href="#" className="hover:text-sun transition-colors">Terms</a>
            <a href="#" className="hover:text-sun transition-colors">Imprint</a>
          </div>
        </div>
      </div>

      {/* Big bg type */}
      <div className="pointer-events-none select-none overflow-hidden">
        <div className="font-display text-edge text-[26vw] leading-[0.78] tracking-tight whitespace-nowrap text-center -mb-[6vw]">
          POST · PRESS
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="col-span-6 md:col-span-2">
      <div className="text-[11px] uppercase tracking-[0.3em] text-bone/40 mb-4">
        {title}
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              className="text-sm text-bone/80 hover:text-sun transition-colors"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
