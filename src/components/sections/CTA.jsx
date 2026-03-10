import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[#7c5cfc]/12 blur-[130px] animate-[glowPulse_4s_ease-in-out_infinite]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7c5cfc]/40 to-transparent" />

      <div className="section-container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-[#7c5cfc]">
            Get started today
          </p>
          <h2
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="mx-auto max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl xl:text-7xl"
          >
            Ready to build something{' '}
            <span className="glow-text">extraordinary?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/55 leading-relaxed">
            Join thousands of developers and studios pushing the boundaries of
            the web. Start free, scale infinitely.
          </p>

          {/* Email form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col sm:flex-row gap-3"
            >
              <input
                id="cta-email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full glass px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none focus:border-[#7c5cfc]/60 transition-colors"
              />
              <button
                id="cta-submit"
                type="submit"
                className="btn-shimmer rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7c5cfc]/25 hover:scale-105 transition-transform duration-200 whitespace-nowrap"
              >
                Let's Build →
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full glass px-8 py-4 text-sm text-[#10b981]"
            >
              <span className="text-xl">✓</span>
              You're on the list! We'll be in touch soon.
            </motion.div>
          )}

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-white/35">
            {['No credit card required', 'Free forever plan', 'Cancel any time'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#10b981]" />
                {t}
              </span>
            ))}
          </div>

          {/* Testimonials strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid gap-4 sm:grid-cols-3 text-left"
          >
            {[
              { q: '"NexaVerse transformed how we ship marketing sites. Clients are blown away every time."', name: 'Sarah K.', role: 'Creative Director' },
              { q: '"The 3D scene + GSAP combo is on another level. Shipped in days, not months."', name: 'Ali M.', role: 'Frontend Engineer' },
              { q: '"Premium animations, clean code, and it actually performs. My new go-to stack."', name: 'Jin P.', role: 'Indie Developer' },
            ].map((t) => (
              <div key={t.name} className="glass rounded-2xl p-5">
                <p className="text-sm leading-relaxed text-white/65 italic">{t.q}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7c5cfc] to-[#00d9ff] flex items-center justify-center text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
