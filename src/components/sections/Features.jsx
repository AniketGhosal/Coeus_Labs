import { motion } from 'framer-motion'

const features = [
  {
    emoji: '🌐',
    title: 'Real-time 3D',
    text: 'Interactive WebGL scenes rendered directly in the browser with React Three Fiber and no performance compromise.',
    color: '#7c5cfc',
  },
  {
    emoji: '🎬',
    title: 'Scroll Storytelling',
    text: 'Sections reveal with cinematic pacing, GSAP ScrollTrigger choreography, and layered parallax transitions.',
    color: '#00d9ff',
  },
  {
    emoji: '⚡',
    title: 'Blazing Fast',
    text: 'Vite-powered build, lazy-loaded 3D, image optimisation and zero-runtime CSS — every byte matters.',
    color: '#f59e0b',
  },
  {
    emoji: '✨',
    title: 'Premium Motion',
    text: 'Framer Motion powers every micro-interaction: hover tilts, stagger reveals, and spring physics transitions.',
    color: '#ec4899',
  },
  {
    emoji: '🧩',
    title: 'Modular Architecture',
    text: 'Fully componentised sections, reusable hooks and a clean folder structure aligned with your Vite blueprint.',
    color: '#10b981',
  },
  {
    emoji: '📱',
    title: 'Fully Responsive',
    text: 'Desktop, tablet, and mobile — each breakpoint feels native. Accessible contrast and reduced-motion support included.',
    color: '#f97316',
  },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c5cfc]/40 to-transparent" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-[#7c5cfc]">
            Features
          </p>
          <h2
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            Designed for{' '}
            <span className="glow-text">premium interactions</span>
          </h2>
          <p className="mt-4 text-white/55 text-base leading-relaxed">
            Every feature is crafted to push the boundaries of what a modern
            marketing site can feel like.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={card}
              transition={{ duration: 0.55 }}
              whileHover={{ scale: 1.025, rotateX: -2, rotateY: 2 }}
              className="glass rounded-3xl p-7 cursor-default group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}22`, boxShadow: `0 0 20px ${f.color}33` }}
              >
                {f.emoji}
              </div>
              <h3
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className="mb-2.5 text-lg font-semibold"
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{f.text}</p>
              {/* Bottom accent line */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
