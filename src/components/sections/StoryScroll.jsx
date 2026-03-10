import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const panels = [
  {
    step: '01',
    title: 'Vision',
    body: 'Every great site begins with intent. We align your brand story with motion design that speaks before a word is read.',
    color: '#7c5cfc',
  },
  {
    step: '02',
    title: 'Motion',
    body: 'Scroll depth drives narrative. Elements emerge, transform, and interact — turning passive scrolling into active exploration.',
    color: '#00d9ff',
  },
  {
    step: '03',
    title: 'Impact',
    body: 'The result: an experience users remember, share, and return to. Metrics that reflect the feeling — not just the function.',
    color: '#ec4899',
  },
]

export default function StoryScroll() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-panel',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'bottom 30%',
            scrub: 1.2,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* BG accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#00d9ff]/8 blur-[120px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-[#00d9ff]">
            Our Process
          </p>
          <h2
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="text-4xl font-semibold leading-tight md:text-5xl"
          >
            How we turn scroll into{' '}
            <span className="glow-text">story</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {panels.map((p) => (
            <div
              key={p.step}
              className="story-panel glass rounded-3xl p-8"
              style={{ opacity: 0 }}
            >
              <span
                className="mb-6 block text-6xl font-bold leading-none"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: p.color,
                  opacity: 0.2,
                }}
              >
                {p.step}
              </span>
              <h3
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: p.color }}
                className="mb-3 text-2xl font-semibold"
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{p.body}</p>
              <div
                className="mt-8 h-[2px] w-12 rounded-full"
                style={{ background: p.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
