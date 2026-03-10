import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const SceneCanvas = lazy(() => import('../three/SceneCanvas'))

const words = ['motion,', 'depth,', 'precision.']

export default function Hero3D() {
  const parallax = useMouseParallax(0.025)

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pt-24 overflow-hidden"
    >
      {/* Background radials */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#7c5cfc]/15 blur-[120px]"
          style={{ transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)` }}
        />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#00d9ff]/10 blur-[100px]"
          style={{ transform: `translate(${-parallax.x * 0.3}px, ${-parallax.y * 0.3}px)` }}
        />
        {/* Grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04] animate-[gridDrift_20s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="200%" height="200%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="section-container relative grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7c5cfc]/30 bg-[#7c5cfc]/10 px-4 py-1.5 text-xs uppercase tracking-widest text-[#7c5cfc]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
            Interactive 3D Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl xl:text-7xl"
          >
            Build immersive digital stories with{' '}
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.12 }}
                className="glow-text"
              >
                {w}{' '}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            A cinematic React experience powered by real-time 3D rendering,
            scroll storytelling, and Apple-level polish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              id="hero-explore-btn"
              href="#features"
              className="btn-shimmer rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7c5cfc]/25 hover:scale-105 transition-transform duration-200"
            >
              Explore Now
            </a>
            <a
              id="hero-watch-btn"
              href="#showcase"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium hover:bg-white/5 transition-colors duration-200"
            >
              See Showcase →
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/35"
          >
            {['20k+ Developers', 'Award Winning', 'Open Source'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#7c5cfc]" />
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          }}
        >
          <Suspense fallback={
            <div className="flex h-[55vh] items-center justify-center">
              <div className="h-16 w-16 rounded-full border-2 border-[#7c5cfc] border-t-transparent animate-spin" />
            </div>
          }>
            <SceneCanvas />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
      >
        <span>Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent animate-[floatSlow_2s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  )
}
