const footerLinks = {
  Product: ['Features', 'Showcase', 'Pricing', 'Changelog'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
}

const socials = [
  { label: 'Twitter / X', href: '#', icon: 'X' },
  { label: 'GitHub',      href: '#', icon: 'GH' },
  { label: 'LinkedIn',    href: '#', icon: 'in' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#050505]">
      {/* Glow top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c5cfc]/60 to-transparent" />

      <div className="section-container py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#00d9ff] flex items-center justify-center text-xs font-bold">
                NX
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-base font-semibold tracking-widest uppercase">
                NexaVerse
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Build immersive digital experiences with motion, depth, and
              cinematic precision. Where web meets dimension.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl glass text-xs font-bold hover:border-[#7c5cfc]/50 hover:text-[#7c5cfc] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/8 pt-8">
          <p className="text-xs text-white/35">
            © 2025 NexaVerse Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            Crafted with React · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
