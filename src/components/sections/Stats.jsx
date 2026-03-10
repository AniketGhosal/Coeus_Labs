import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 20000, suffix: '+', label: 'Developers worldwide', color: '#7c5cfc' },
  { value: 99.9,  suffix: '%', label: 'Uptime SLA',           color: '#00d9ff', decimal: 1 },
  { value: 4.9,   suffix: '★', label: 'Average rating',       color: '#f59e0b', decimal: 1 },
  { value: 180,   suffix: '+', label: 'Countries reached',    color: '#ec4899' },
]

function Counter({ to, suffix, decimal = 0, color, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((to * ease).toFixed(decimal)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, decimal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="glass rounded-3xl p-8 text-center group hover:border-white/15 transition-colors duration-300"
    >
      <div
        className="text-5xl font-bold md:text-6xl"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color }}
      >
        {decimal > 0 ? count.toFixed(decimal) : Math.round(count)}{suffix}
      </div>
      <p className="mt-3 text-sm text-white/50">{label}</p>
      <div
        className="mx-auto mt-6 h-px w-0 group-hover:w-16 transition-all duration-500 rounded-full"
        style={{ background: color }}
      />
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-28 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-[#7c5cfc]/8 blur-[100px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-[#7c5cfc]">
            By the numbers
          </p>
          <h2
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="text-4xl font-semibold leading-tight md:text-5xl"
          >
            Trusted at <span className="glow-text">global scale</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Counter key={s.label} to={s.value} suffix={s.suffix} decimal={s.decimal} color={s.color} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
