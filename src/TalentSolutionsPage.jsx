import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  CheckCircle, Target, ClipboardList, Rocket, LifeBuoy,
  Calendar, Users, Briefcase, Cog, Phone, Zap, Globe, Shield, Star, TrendingUp, Brain, Cpu
} from 'lucide-react'
import { CustomCursor, BackToTopButton, ThreeDBackground } from './SharedComponents'

/* ── Magnetic button ──────────────────────────────────────────── */
const MagneticBtn = ({ children, className = '', onClick }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return <motion.button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={className}>{children}</motion.button>
}

/* ── 3D tilt card ─────────────────────────────────────────────── */
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 20 })
  const sry = useSpring(ry, { stiffness: 150, damping: 20 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ── Floating orb ─────────────────────────────────────────────── */
const Orb = ({ size, color, style = {} }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, background: color, filter: 'blur(80px)', opacity: 0.15, ...style }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
)

/* ── Rotating 3D ring ─────────────────────────────────────────── */
const Ring3D = ({ size, color = 'rgba(6,182,212,0.15)', style = {}, reverse = false, delay = 0 }) => (
  <div className="absolute pointer-events-none" style={{ width: size, height: size, ...style }}>
    <motion.div className="w-full h-full rounded-full border-2"
      style={{ borderColor: color }}
      animate={{ rotate: reverse ? [0, -360] : [0, 360] }}
      transition={{ duration: 12 + delay * 3, repeat: Infinity, ease: 'linear', delay }} />
  </div>
)

/* ── Data ─────────────────────────────────────────────────────── */
const coreOfferings = [
  {
    title: 'Corporate Training Programs',
    description: 'Comprehensive training on drone operation, data analysis, and system maintenance for your full team.',
    icon: <Calendar size={28} />,
    features: ['Certified Trainers', 'Hands-on Workshops', 'Custom Curriculum', 'Ongoing Support'],
    accent: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    title: 'Strategic Consultation',
    description: 'Expert guidance on implementing drone monitoring solutions to transform your operations and ROI.',
    icon: <Users size={28} />,
    features: ['Strategy Development', 'Technology Assessment', 'Implementation Planning', 'ROI Analysis'],
    accent: 'from-blue-500 to-purple-500',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    title: 'Specialized Staffing',
    description: 'Access to vetted drone & AI professionals for project-based, temporary, or permanent needs.',
    icon: <Briefcase size={28} />,
    features: ['Quick Deployment', 'Vetted Professionals', 'Flexible Terms', 'Quality Assurance'],
    accent: 'from-violet-500 to-purple-600',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    title: 'Custom Solution Development',
    description: "Tailored programs and integrations built precisely for your organization's specific drone ecosystem.",
    icon: <Cog size={28} />,
    features: ['Needs Assessment', 'Custom Development', 'Integration Support', 'Continuous Maintenance'],
    accent: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.3)',
  },
]

const partnershipProcess = [
  { icon: <Target size={28} />,       title: 'Discovery & Assessment',      description: 'We start by deeply understanding your challenges, goals, and existing infrastructure.',     color: 'from-cyan-500 to-blue-600',    num: '01' },
  { icon: <ClipboardList size={28} />,title: 'Customized Planning',          description: "A bespoke solution is designed—training modules, staffing plan, or a full tech roadmap.",    color: 'from-blue-500 to-purple-600',  num: '02' },
  { icon: <Rocket size={28} />,       title: 'Implementation & Deployment', description: "We execute the plan, delivering training, placing talent, or building custom solutions.",     color: 'from-purple-500 to-pink-600',  num: '03' },
  { icon: <LifeBuoy size={28} />,     title: 'Support & Evolution',         description: 'Ongoing partnership ensures long-term success and continuous adaptation to new challenges.',   color: 'from-emerald-500 to-cyan-600', num: '04' },
]

const whyBenefits = [
  { icon: <Brain size={20} />,      text: 'Deep technical expertise in drone & AI integration' },
  { icon: <Zap size={20} />,        text: 'Agile & lean — zero corporate red tape, fast decisions' },
  { icon: <Users size={20} />,      text: 'Direct access to senior experts on every engagement' },
  { icon: <Star size={20} />,       text: 'Innovative first-principles approach to every challenge' },
  { icon: <Cog size={20} />,        text: 'Every solution built from scratch — truly bespoke' },
  { icon: <Globe size={20} />,      text: 'Flexible models — startups to enterprise, any scale' },
  { icon: <Shield size={20} />,     text: 'Quality-first mindset with rigorous delivery standards' },
  { icon: <TrendingUp size={20} />, text: 'Founder-led commitment to your long-term success' },
]



/* ══════════════════════════════════════ COMPONENT ══════════════════════════════════════ */
export default function TalentSolutionsPage() {
  const [activeOff, setActiveOff] = useState(-1)

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />

      <main className="w-full px-4 py-12 pt-28 relative z-10">
        <div className="mx-auto max-w-7xl">

          {/* ════════════════════════════════ HERO ════════════════════════════════ */}
          <section className="text-center mb-28 relative" style={{ perspective: '1200px' }}>
            {/* Orbs */}
            <Orb size="500px" color="radial-gradient(circle,#06b6d4,transparent)" style={{ top: '-20%', left: '-10%' }} />
            <Orb size="400px" color="radial-gradient(circle,#7c3aed,transparent)" style={{ top: '-10%', right: '-8%' }} />
            <Orb size="300px" color="radial-gradient(circle,#3b82f6,transparent)" style={{ bottom: '-10%', left: '35%' }} />

            {/* 3D floating rings */}
            <Ring3D size="420px" style={{ top: '-60px', left: '-80px' }} color="rgba(6,182,212,0.1)" delay={0} />
            <Ring3D size="300px" style={{ top: '0px', right: '-50px' }} color="rgba(124,58,237,0.1)" reverse delay={1} />
            <Ring3D size="200px" style={{ bottom: '-40px', left: '20%' }} color="rgba(59,130,246,0.08)" delay={0.5} />

            {/* Mini floating data nodes */}
            {[
              { icon: <Cpu size={14} />, label: 'AI / ML', top: '10%', right: '12%' },
              { icon: <Globe size={14} />, label: 'IoT Systems', top: '70%', left: '6%' },
              { icon: <Shield size={14} />, label: 'SAP BTP', top: '15%', left: '8%' },
              { icon: <Zap size={14} />, label: 'Edge AI', bottom: '10%', right: '10%' },
            ].map(({ icon, label, ...pos }, i) => (
              <motion.div key={i}
                className="absolute hidden md:flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-cyan-500/20 rounded-lg px-3 py-2 text-cyan-300 text-xs font-medium z-10"
                style={pos}
                animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}>
                {icon} {label}
              </motion.div>
            ))}

            {/* Heading */}
            <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm relative z-10"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium tracking-wide">Empowering Your Workforce</span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight relative z-10"
              style={{ letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-200">Advanced</span>{' '}
              <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 glow-text">Talent Solutions</span>
            </motion.h1>

            <motion.p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 relative z-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              Bridge the skills gap in emerging technologies with specialized training, staffing, and consultation for advanced drone and AI monitoring systems.
            </motion.p>


          </section>

          {/* ════════════════════════════════ CORE OFFERINGS ════════════════════════════════ */}
          <section className="py-16 mb-16 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <Orb size="350px" color="radial-gradient(circle,#06b6d4,transparent)" style={{ top: '0', right: '0' }} />
            </div>

            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Our Core Offerings</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">Tailored solutions to accelerate your team's capabilities</p>
            </motion.div>

            {/* Grid of offering cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {coreOfferings.map((s, i) => (
                <TiltCard key={i} className={`cursor-pointer`}>
                  <motion.div
                    onClick={() => setActiveOff(activeOff === i ? -1 : i)}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 90 }}
                    className={`relative rounded-2xl p-7 border overflow-hidden transition-all duration-300 group ${
                      activeOff === i && i >= 0
                        ? 'bg-slate-900/80 border-cyan-400/50 shadow-2xl'
                        : 'glass border-cyan-500/15 hover:border-cyan-400/35'
                    }`}>

                    {/* Active glow bg — fixed: use inline opacity so Tailwind purge doesn't drop it */}
                    {activeOff === i && i >= 0 && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${s.accent} pointer-events-none`}
                        style={{ opacity: 0.07 }}
                      />
                    )}
                    {/* Top accent stripe */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.accent} transition-opacity ${activeOff === i && i >= 0 ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'}`} />

                    {/* Icon + title row */}
                    <div className="flex items-start gap-5 mb-5">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${s.accent} text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        style={{ boxShadow: activeOff === i && i >= 0 ? `0 0 24px ${s.glow}` : 'none' }}>
                        {s.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 transition-colors ${activeOff === i && i >= 0 ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{s.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                      </div>
                    </div>

                    {/* Expandable features — CSS max-height (100% reliable, no framer quirks) */}
                    <div style={{
                      maxHeight: activeOff === i ? '240px' : '0px',
                      opacity: activeOff === i ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                    }}>
                      <ul className="space-y-2 mt-3 pb-2">
                        {s.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${s.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                              <CheckCircle size={12} className="text-white" />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expand hint */}
                    <div className={`mt-4 text-xs font-medium flex items-center gap-1 transition-colors ${activeOff === i && i >= 0 ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      <motion.span animate={{ rotate: activeOff === i ? 180 : 0 }} transition={{ duration: 0.3 }}>▾</motion.span>
                      {activeOff === i && i >= 0 ? 'Collapse' : 'View details'}
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════ PARTNERSHIP PROCESS ════════════════════════════════ */}
          <section className="py-16 mb-16 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <Orb size="400px" color="radial-gradient(circle,#7c3aed,transparent)" style={{ bottom: '-10%', right: '10%' }} />
            </div>

            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Our Partnership Process</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">From first discovery to long-term support — a clear, proven journey.</p>
            </motion.div>

            {/* Vertical timeline — mobile; Horizontal row — desktop */}
            <div className="relative flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
              {/* ── Animated connector line ── */}
              <div className="absolute top-12 left-0 right-0 hidden md:block" style={{ height: '2px' }}>
                {/* Base line — draws left to right on scroll */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.5), rgba(59,130,246,0.5), rgba(124,58,237,0.5), rgba(16,185,129,0.5))' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
                {/* Traveling light — loops left→right forever */}
                <motion.div
                  className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                  style={{
                    width: '120px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(6,182,212,0.9), white, rgba(6,182,212,0.9), rgba(255,255,255,0.15), transparent)',
                    filter: 'blur(1px)',
                  }}
                  animate={{ x: ['-120px', 'calc(100vw)'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                />
              </div>

              {partnershipProcess.map((step, i) => (
                <motion.div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 90, damping: 14 }}>

                  {/* Icon circle */}
                  <motion.div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-2xl relative cursor-pointer`}
                    whileHover={{ scale: 1.15, rotate: 8, boxShadow: '0 20px 60px rgba(6,182,212,0.4)' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16 }}>
                    {step.icon}
                    {/* Outer ring */}
                    <div className={`absolute -inset-3 rounded-full border border-white/10 animate-spin-very-slow`} />
                    {/* Glow */}
                    <motion.div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-xl opacity-30`}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }} />
                  </motion.div>

                  {/* Card */}
                  <TiltCard className="w-full">
                    <motion.div
                      className="glass rounded-2xl p-6 border border-cyan-500/15 hover:border-cyan-400/40 transition-all relative overflow-hidden group"
                      whileHover={{ boxShadow: '0 20px 50px rgba(6,182,212,0.2)' }}>
                      {/* Top accent */}
                      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${step.color.replace('from-', 'via-')} to-transparent`} />
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════ WHY PARTNER ════════════════════════════════ */}
          <section className="py-16 mb-16 relative">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Why Partner With Us?</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">What we bring to the table — fresh thinking, deep expertise, and unwavering dedication to your success.</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}>
              {whyBenefits.map((b, i) => (
                <motion.div key={i}
                  variants={{ hidden: { opacity: 0, y: 30, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } } }}
                  whileHover={{ y: -10, scale: 1.03, boxShadow: '0 24px 60px rgba(6,182,212,0.2)', borderColor: 'rgba(6,182,212,0.5)' }}
                  className="glass rounded-2xl p-5 border border-cyan-500/15 flex flex-col items-center text-center gap-3 relative overflow-hidden group cursor-default"
                  style={{ transformStyle: 'preserve-3d', perspective: '600px' }}>
                  {/* BG glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900/70 to-blue-900/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                    {b.icon}
                    <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors relative z-10 leading-snug">{b.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ════════════════════════════════ CTA ════════════════════════════════ */}
          <motion.section
            className="py-20 mb-14 rounded-3xl overflow-hidden relative text-white text-center border border-cyan-400/30 shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 18 }}>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-purple-900/60" />

            {/* Animated mesh overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />

            {/* 3D rings */}
            <Ring3D size="500px" color="rgba(255,255,255,0.04)" style={{ top: '-100px', left: '-100px' }} delay={0} />
            <Ring3D size="350px" color="rgba(6,182,212,0.08)" style={{ bottom: '-80px', right: '-80px' }} reverse delay={1} />

            {/* Orbs */}
            <Orb size="300px" color="radial-gradient(circle,rgba(6,182,212,0.4),transparent)" style={{ top: '-20%', left: '20%' }} />
            <Orb size="250px" color="radial-gradient(circle,rgba(124,58,237,0.3),transparent)" style={{ bottom: '-20%', right: '20%' }} />

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <motion.div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
                animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Ready When You Are</span>
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
                Transform Your Team's
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">Capabilities Today</span>
              </h3>
              <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
                Empower your organization with tomorrow's skills. Let's discuss how our talent solutions drive measurable results.
              </p>

              <Link to="/#contact"
                className="inline-flex items-center gap-3 bg-white text-cyan-700 font-black py-4 px-12 rounded-xl shadow-2xl hover:shadow-cyan-400/40 interactive transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-lg">
                <Phone size={22} /> Schedule a Consultation
              </Link>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  )
}
