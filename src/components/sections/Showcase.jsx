import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  { id: 1, title: 'Orbit Dashboard', category: 'SaaS', desc: 'A zero-latency analytics platform with scroll-driven charts and live WebGL heatmaps.', gradient: 'from-[#7c5cfc] to-[#00d9ff]', tag: 'Featured' },
  { id: 2, title: 'Lumina Brand',    category: 'Marketing', desc: 'Award-winning landing page with 3D product viewer and cinematic hero entrance.', gradient: 'from-[#ec4899] to-[#f59e0b]', tag: 'Award' },
  { id: 3, title: 'Nexus Finance',   category: 'FinTech',   desc: 'Premium fintech portal blending glassmorphism, live tickers, and particle backgrounds.', gradient: 'from-[#10b981] to-[#00d9ff]', tag: 'Case Study' },
  { id: 4, title: 'Vertex Studio',   category: 'Creative',  desc: '3D portfolio for a design agency — full-screen canvas scenes per project.', gradient: 'from-[#f97316] to-[#ec4899]', tag: 'Live' },
  { id: 5, title: 'Aria AI',         category: 'AI',        desc: 'Conversational AI product page with animated neural-net background and demo embed.', gradient: 'from-[#7c5cfc] to-[#ec4899]', tag: 'New' },
  { id: 6, title: 'Solstice Event',  category: 'Events',    desc: 'Immersive event microsite with countdown, venue 3D flythrough, and RSVP flow.', gradient: 'from-[#00d9ff] to-[#10b981]', tag: 'Live' },
]

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Showcase() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="showcase" className="relative py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ec4899]/40 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#ec4899]/8 blur-[100px]" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-[#ec4899]">
              Showcase
            </p>
            <h2
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              className="text-4xl font-semibold leading-tight md:text-5xl"
            >
              Work that <span className="glow-text">speaks</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-[#7c5cfc] text-white shadow-lg shadow-[#7c5cfc]/30'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl overflow-hidden group cursor-default"
              >
                {/* Gradient banner */}
                <div className={`h-40 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')]" />
                  <span className="absolute top-4 right-4 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <span className="absolute bottom-4 left-4 text-xs text-white/60 uppercase tracking-widest">
                    {p.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    className="mb-2 text-lg font-semibold"
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{p.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors duration-200">
                    View case study
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
