import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ArrowLeft, Briefcase, MapPin, Clock, ChevronDown, Sparkles, Users, Award, FileText, MessageSquare, Cpu, Zap, Globe, Shield } from 'lucide-react'
import { ThreeDBackground, CustomCursor, BackToTopButton } from './SharedComponents'
import {
  InnovateImpact, GrowthLearning, CollaborativeCulture, benefitsImage,
  ml_engineer, embeddedsystemengineer, iotsolution, sapbtp, productmanager, finopsmanager, remotedroneoperation
} from './assets/assetHelper'

/* ── Magnetic 3D button ────────────────────────────────────────── */
const MagneticBtn = ({ children, className = '', onClick, href, target, rel }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.25)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const props = { ref, onMouseMove: onMove, onMouseLeave: onLeave, style: { x: sx, y: sy }, className }
  if (href) return <motion.a href={href} target={target} rel={rel} {...props}>{children}</motion.a>
  return <motion.button onClick={onClick} {...props}>{children}</motion.button>
}

/* ── Floating image slot ───────────────────────────────────────── */
const ImgSlot = ({ src, alt, label, className = '' }) => {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const isPlaceholder = !src || src.startsWith('data:')
  if (isPlaceholder || failed) return (
    <div className={`img-placeholder ${className}`}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>{label || alt}</span>
    </div>
  )
  return (
    <div className={`relative ${className} overflow-hidden`}>
      {!loaded && <div className="img-placeholder absolute inset-0"><span>{label || alt}</span></div>}
      <img src={src} alt={alt} onLoad={() => setLoaded(true)} onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} loading="lazy" />
    </div>
  )
}

/* ── Floating 3D orb ────────────────────────────────────────────── */
const Orb = ({ size, color, top, left, delay = 0, blur = '3xl' }) => (
  <div className={`absolute rounded-full pointer-events-none animate-float-slow blur-${blur}`}
    style={{ width: size, height: size, background: color, top, left, animationDelay: `${delay}s`, opacity: 0.12 }} />
)

/* ── Animated counter ────────────────────────────────────────────── */
const AnimCounter = ({ to, label, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = () => {
          start += Math.ceil(to / 50)
          if (start >= to) { setCount(to); return }
          setCount(start); requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-blue-500">
        {count}{suffix}
      </div>
      <div className="text-slate-400 text-sm mt-1 font-medium tracking-wide">{label}</div>
    </div>
  )
}

/* ── Hero images/data ──────────────────────────────────────────── */
const heroSlides = [
  { src: InnovateImpact,       alt: 'Innovate and make an impact', label: 'Innovate & Impact' },
  { src: GrowthLearning,       alt: 'Growth and learning',         label: 'Growth & Learning' },
  { src: CollaborativeCulture, alt: 'Collaborative culture',       label: 'Collaborative Culture' },
  { src: benefitsImage,        alt: 'Benefits',                    label: 'Benefits' },
]

const jobListings = [
  { title: 'Machine Learning Engineer (AI / Data)', department: 'AI/Data Science', location: 'Hyderabad', type: 'Full-time', experience: "Bachelor's/Master's", description: 'Design, train, and deploy machine learning and deep learning models, working with large datasets to extract insights and improve model performance.', skills: ['Python', 'TensorFlow/PyTorch', 'Pandas', 'NumPy', 'Supervised Learning', 'Unsupervised Learning'], imageUrl: ml_engineer, imageLabel: 'ML Engineer Role', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdHytlju1zdCSo-AXPnNVy3Zuw9LKJHFcwbimCp8owEYRSgjg/viewform?usp=header', accent: 'from-cyan-500 to-blue-600' },
  { title: 'Embedded Systems Engineer (Edge AI / Drones)', department: 'Engineering', location: 'Remote', type: 'Full-time', experience: "Bachelor's", description: 'Develop firmware and embedded applications for AI-enabled edge or drone systems, optimizing models for real-time performance on resource-constrained hardware.', skills: ['C/C++', 'Embedded Python', 'RTOS', 'Edge Inference', 'Computer Vision', 'Signal Processing'], imageUrl: embeddedsystemengineer, imageLabel: 'Embedded Systems Engineer', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSecSnT5SJO2UbFGbGDSr-fsGtTJQw8ToCulFBxDaL8VwddaFA/viewform?usp=header', accent: 'from-blue-500 to-purple-600' },
  { title: 'IoT Solutions Architect', department: 'Architecture/Cloud', location: 'Kolkata', type: 'Full-time', experience: "Bachelor's", description: 'Design scalable IoT architectures connecting sensors, devices, and cloud platforms, ensuring data security and integration into analytics or AI pipelines.', skills: ['Azure IoT/AWS IoT/GCP IoT', 'MQTT/LoRaWAN/BLE', 'Networking', 'Cybersecurity', 'Encryption'], imageUrl: iotsolution, imageLabel: 'IoT Solutions Architect', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf9wGnE2NlVvBhphjsv3tQqussggRBjIjqlMlZYWOW076Vxcw/viewform?usp=header', accent: 'from-teal-500 to-cyan-600' },
  { title: 'SAP BTP Architect', department: 'IT/SAP', location: 'Hyderabad', type: 'Full-time', experience: '8+ years', description: 'Architect and implement SAP BTP solutions for integration, data, and extension use cases, leveraging SAP HANA, CAP, and Fiori/UI5.', skills: ['SAP BTP', 'Cloud Foundry/Kyma', 'CAP', 'SAP HANA', 'ABAP', 'CPI', 'REST APIs'], imageUrl: sapbtp, imageLabel: 'SAP BTP Architect', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfuH5JisO7tDZ4zaBctw9h8gS3C4yv_H9TR_8JtiFXPhMCq7A/viewform?usp=dialog', accent: 'from-blue-600 to-indigo-600' },
  { title: 'Product Manager (Tech)', department: 'Product Management', location: 'Remote', type: 'Full-time', experience: 'Proven Experience', description: 'Define and prioritize product roadmap, collaborate with engineering, design, and marketing to launch features, and analyze KPIs for decision-making.', skills: ['Product Lifecycle', 'SaaS', 'Agile/Scrum', 'Jira', 'Confluence', 'Analytics'], imageUrl: productmanager, imageLabel: 'Product Manager', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeJnRXCTmne5XGYkIjj5BMlAYZv8Zx_8f0G05uS9-bTT3V8pQ/viewform?usp=publish-editor', accent: 'from-violet-500 to-purple-600' },
  { title: 'FinOps Manager', department: 'Finance/Operations', location: 'California', type: 'Full-time', experience: "Bachelor's", description: 'Manage and optimize cloud and operational costs, partner with engineering/finance for monitoring/forecasting, and develop dashboards for cost visibility.', skills: ['Finance/Accounting', 'Cloud Costs (AWS/Azure/GCP)', 'Cost Modeling', 'Forecasting', 'KPI Reporting'], imageUrl: finopsmanager, imageLabel: 'FinOps Manager', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScy_ho_mh4ThB9Sp9USe4EsXdfoxxg-HBDFbK6NpRaBGgiUYw/viewform?usp=publish-editor', accent: 'from-emerald-500 to-teal-600' },
  { title: 'Remote Drone Operations Consultant', department: 'Consulting/Operations', location: 'Remote', type: 'Part-Time / Contract', experience: 'UAV Experience', description: 'Provide remote consulting on drone mission design, data analysis (imagery, LiDAR), hardware selection, operational procedures, and training.', skills: ['UAV Operations', 'FAA Part 107', 'Mission Planning Tools', 'Data Analysis', 'AI/IoT Integration'], imageUrl: remotedroneoperation, imageLabel: 'Drone Operations', applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdP4j5XnHNNHwHLbODScr3zhhq61ZZ5MqpyftsHxiywOSv1HA/viewform?usp=publish-editor', accent: 'from-orange-500 to-red-600' },
]

const hiringSteps = [
  { icon: <FileText size={28} />,     title: 'Application',         description: 'Show us your unique skills and vision. We personally review every submission.', color: 'from-cyan-500 to-blue-600' },
  { icon: <MessageSquare size={28} />,title: 'Initial Screening',   description: "Let's connect to learn about your ambitions and see if our missions align.",    color: 'from-blue-500 to-purple-600' },
  { icon: <Cpu size={28} />,          title: 'Technical Interview', description: 'Collaborate with our leads on a problem mirroring our daily work.',               color: 'from-purple-500 to-pink-600' },
  { icon: <Award size={28} />,        title: 'Final Offer',         description: "If it's a match, we'll extend an offer. Welcome to the mission!",                 color: 'from-emerald-500 to-cyan-600' },
]

const cultureCards = [
  { icon: <Sparkles size={32} className="text-cyan-400" />, title: 'Innovate & Impact', desc: 'Work on cutting-edge AI and drone tech solving real-world energy problems.', stat: '10+', statLabel: 'Patents Filed', color: 'cyan' },
  { icon: <Users size={32} className="text-blue-400" />,    title: 'Collaborative Culture', desc: 'Join a supportive team passionate about technology and sustainability.',   stat: '4',   statLabel: 'Global Offices', color: 'blue' },
  { icon: <Award size={32} className="text-purple-400" />,  title: 'Growth & Learning', desc: 'Professional development opportunities in a fast-growing industry.',          stat: '95%', statLabel: 'Retention Rate', color: 'purple' },
]

/* ── Animation variants ────────────────────────────────────────── */
const cardV = {
  enter: dir => ({ x: dir === 'next' ? 300 : -300, opacity: 0, scale: 0.88, rotateY: dir === 'next' ? 12 : -12 }),
  center: { x: 0, opacity: 1, scale: 1, rotateY: 0, transition: { type: 'spring', stiffness: 280, damping: 30 } },
  exit: dir => ({ x: dir === 'next' ? -300 : 300, opacity: 0, scale: 0.88, rotateY: dir === 'next' ? -12 : 12, transition: { duration: 0.35 } }),
}

const hiringV = {
  enter: dir => ({ rotateY: dir === 'next' ? 90 : -90, opacity: 0, scale: 0.82, z: -100 }),
  center: { rotateY: 0, opacity: 1, scale: 1, z: 0, transition: { type: 'spring', stiffness: 180, damping: 20 } },
  exit: dir => ({ rotateY: dir === 'next' ? -90 : 90, opacity: 0, scale: 0.82, z: -100, transition: { duration: 0.32 } }),
}

/* ══════════════════════════════════════ COMPONENT ══════════════════════════════════════ */
export default function CareersPage() {
  const [filter, setFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [jobIdx, setJobIdx] = useState(0)
  const [dir, setDir] = useState('next')
  const [hIdx, setHIdx] = useState(0)
  const [hDir, setHDir] = useState('next')
  const [heroIdx, setHeroIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(iv)
  }, [])

  const departments = useMemo(() => ['All', ...[...new Set(jobListings.map(j => j.department))].sort()], [])
  const locations   = useMemo(() => ['All Locations', ...[...new Set(jobListings.map(j => j.location))].sort()], [])
  const filtered = jobListings.filter(j =>
    (filter === 'All' || j.department === filter) &&
    (locationFilter === 'All Locations' || j.location === locationFilter)
  )
  useEffect(() => setJobIdx(0), [filter, locationFilter])

  const nextJob = () => { setDir('next'); setJobIdx(i => (i + 1) % filtered.length) }
  const prevJob = () => { setDir('prev'); setJobIdx(i => (i - 1 + filtered.length) % filtered.length) }
  const nextH   = () => { setHDir('next'); setHIdx(i => (i + 1) % hiringSteps.length) }
  const prevH   = () => { setHDir('prev'); setHIdx(i => (i - 1 + hiringSteps.length) % hiringSteps.length) }

  return (
    <div className="min-h-screen text-gray-100 font-sans w-full overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />

      <main className="w-full relative z-10 pt-20">

        {/* ════════════════════ HERO ════════════════════════════════════════════ */}
        <section className="relative min-h-[640px] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
          {/* Background image carousel */}
          <div className="absolute inset-0 z-0">
            {heroSlides.map((s, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}>
                {s.src && !s.src.startsWith('data:')
                  ? <img src={s.src} alt={s.alt} className="w-full h-full object-cover scale-105" loading={i === 0 ? 'eager' : 'lazy'} />
                  : <div className="w-full h-full img-placeholder" style={{ borderRadius: 0 }}><span>{s.label}</span></div>
                }
              </div>
            ))}
            {/* Multi-layer overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 z-10" />
          </div>

          {/* Floating 3D geometry */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Large orbs */}
            <Orb size="350px" color="radial-gradient(circle,#06b6d4,transparent)" top="5%" left="5%" delay={0} />
            <Orb size="280px" color="radial-gradient(circle,#7c3aed,transparent)" top="20%" left="75%" delay={2} />
            <Orb size="200px" color="radial-gradient(circle,#3b82f6,transparent)" top="60%" left="50%" delay={1} />

            {/* Concentric spinning rings — left cluster */}
            <div className="absolute top-1/4 left-12" style={{ perspective: '500px' }}>
              <div className="w-56 h-56 rounded-full border-2 border-cyan-500/20 animate-spin-very-slow" />
              <div className="absolute top-8 left-8 w-40 h-40 rounded-full border border-blue-400/15 animate-spin-reverse" />
              <div className="absolute top-16 left-16 w-24 h-24 rounded-full border border-cyan-300/20 animate-pulse-slow" />
              <div className="absolute top-22 left-22 w-12 h-12 rounded-full bg-cyan-500/10 animate-pulse" />
            </div>

            {/* Concentric spinning rings — right cluster */}
            <div className="absolute bottom-1/4 right-8">
              <div className="w-44 h-44 rounded-full border border-purple-500/15 animate-spin-very-slow" style={{ animationDirection: 'reverse' }} />
              <div className="absolute top-6 left-6 w-32 h-32 rounded-full border border-blue-400/10 animate-spin-slow" />
            </div>

            {/* Scan lines */}
            {[20, 45, 70].map((pct, i) => (
              <div key={i} className="absolute left-0 right-0 h-px animate-beam"
                style={{ top: `${pct}%`, background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.25),transparent)', animationDelay: `${i * 1.4}s` }} />
            ))}

            {/* Vertical light columns */}
            {[15, 35, 65, 85].map((pct, i) => (
              <div key={i} className="absolute top-0 bottom-0 w-px animate-beam"
                style={{ left: `${pct}%`, background: 'linear-gradient(to bottom,transparent,rgba(6,182,212,0.1),transparent)', animationDelay: `${i * 0.8}s` }} />
            ))}

            {/* Floating tech badges */}
            {[
              { icon: <Cpu size={18} />, label: 'AI', top: '18%', left: '8%', delay: 0 },
              { icon: <Globe size={18} />, label: 'IoT', top: '65%', left: '88%', delay: 1.5 },
              { icon: <Zap size={18} />, label: 'Edge', top: '80%', left: '12%', delay: 0.8 },
              { icon: <Shield size={18} />, label: 'SAP', top: '25%', left: '85%', delay: 2.2 },
            ].map(({ icon, label, top, left, delay }, i) => (
              <motion.div key={i}
                className="absolute flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-cyan-500/25 rounded-lg px-3 py-2 text-cyan-300 text-xs font-medium"
                style={{ top, left }}
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}>
                {icon} {label}
              </motion.div>
            ))}

            {/* Animated particles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div key={i}
                className="absolute rounded-full bg-cyan-400/40"
                style={{ width: `${Math.random() * 5 + 2}px`, height: `${Math.random() * 5 + 2}px`, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                transition={{ duration: Math.random() * 5 + 4, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }} />
            ))}
          </div>

          {/* Hero content */}
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            {/* Pill badge */}
            <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium tracking-wide">We're Hiring — Join the Mission</span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              style={{ letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">Powering a</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 glow-text">Smarter Future</span>
            </motion.h1>

            <motion.p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
              Join us at the nexus of AI, robotics, and energy to solve one of the world's most critical challenges.
            </motion.p>



            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <MagneticBtn
                onClick={() => {
                  const el = document.getElementById('openings')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="inline-flex items-center gap-3 shimmer-btn text-white font-bold py-4 px-12 rounded-full shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow interactive text-lg">
                View Open Positions <ArrowRight size={22} />
              </MagneticBtn>
            </motion.div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)}
                className={`rounded-full transition-all duration-500 ${i === heroIdx ? 'w-8 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`} />
            ))}
          </div>
        </section>



        <div className="mx-auto max-w-7xl px-4 py-12">

          {/* ════════════════════ WHY JOIN ════════════════════════════════════════ */}
          <section className="mb-28 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <Orb size="400px" color="radial-gradient(circle,#06b6d4,transparent)" top="-10%" left="-5%" blur="3xl" />
              <Orb size="300px" color="radial-gradient(circle,#7c3aed,transparent)" top="60%" left="80%" delay={2} blur="3xl" />
            </div>

            <motion.h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Why Join Us?
            </motion.h2>
            <motion.p className="text-center text-slate-400 mb-16 max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              Be part of a team reshaping energy infrastructure with cutting-edge technology.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cultureCards.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 90 }}
                  whileHover={{ y: -12, rotateY: 4, boxShadow: `0 30px 80px rgba(6,182,212,0.2)` }}
                  style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
                  className="glass rounded-3xl p-8 cursor-default relative overflow-hidden group border border-cyan-500/15 hover:border-cyan-400/40 transition-colors">
                  {/* Animated gradient fill on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 opacity-0 group-hover:opacity-100 rounded-3xl"
                    transition={{ duration: 0.4 }} />
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-${c.color}-400/70 to-transparent`} />
                  {/* Floating icon */}
                  <motion.div className={`w-18 w-[4.5rem] h-[4.5rem] rounded-2xl bg-${c.color}-900/30 border border-${c.color}-500/30 flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: 'spring', stiffness: 300 }}>
                    {c.icon}
                    <div className={`absolute inset-0 rounded-2xl bg-${c.color}-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{c.title}</h3>
                  <p className="text-slate-400 leading-relaxed relative z-10">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════════════════ OPENINGS ════════════════════════════════════════ */}
          <section id="openings" className="mb-28 relative">
            <motion.div className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-center mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Current Openings</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">Find your next opportunity. Every role helps power the future of energy.</p>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
              {[
                { value: filter, fn: setFilter, opts: departments, id: 'dept-filter', label: 'Department' },
                { value: locationFilter, fn: setLocationFilter, opts: locations, id: 'loc-filter', label: 'Location' },
              ].map((sel, si) => (
                <div key={si} className="relative w-full">
                  <select id={sel.id} value={sel.value} onChange={e => sel.fn(e.target.value)}
                    className="w-full appearance-none bg-slate-900/80 border border-cyan-500/30 text-cyan-100 text-center font-medium py-3.5 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer hover:border-cyan-400/60 transition-all backdrop-blur-sm">
                    {sel.opts.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Count + dots */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-slate-400 text-sm">
                {filtered.length > 0
                  ? <><span className="text-cyan-300 font-bold">{jobIdx + 1}</span> <span className="text-slate-500">of</span> <span className="text-cyan-300 font-bold">{filtered.length}</span> positions</>
                  : 'No positions match your filters.'}
              </span>
            </div>

            {/* ── Job card carousel (FIXED: buttons inside flex column, always visible) */}
            <div className="max-w-4xl mx-auto">
              {/* Card area */}
              <div className="relative" style={{ minHeight: '620px', perspective: '1200px' }}>
                <AnimatePresence mode="wait" custom={dir}>
                  {filtered.length > 0 && (() => {
                    const job = filtered[jobIdx]
                    if (!job) return null
                    return (
                      <motion.div key={job.title + jobIdx} custom={dir} variants={cardV} initial="enter" animate="center" exit="exit"
                        className="absolute inset-0 rounded-3xl overflow-hidden glass border border-cyan-500/20 group hover:border-cyan-400/50 transition-colors shadow-2xl"
                        style={{ transformStyle: 'preserve-3d' }}>
                        {/* Accent top bar matching job color */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${job.accent}`} />

                        {/* Image */}
                        <div className="relative w-full h-52 overflow-hidden">
                          <ImgSlot src={job.imageUrl} alt={job.title} label={job.imageLabel} className="w-full h-52" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent pointer-events-none" />
                          {/* Type badge */}
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            <span className={`bg-gradient-to-r ${job.accent} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                              {job.type}
                            </span>
                          </div>
                          {/* Scan line hover FX */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-down pointer-events-none" />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 text-center">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-tight">{job.title}</h3>
                          <div className="flex flex-wrap justify-center gap-4 text-slate-400 text-sm mb-4">
                            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-cyan-400" />{job.department}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-cyan-400" />{job.location}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-cyan-400" />{job.experience}</span>
                          </div>
                          {/* Gradient divider */}
                          <div className={`w-24 h-0.5 bg-gradient-to-r ${job.accent} mx-auto mb-4 opacity-70`} />
                          <p className="text-slate-400 max-w-xl mx-auto mb-5 leading-relaxed text-sm line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                            {job.skills.map(s => (
                              <span key={s} className="bg-slate-800/80 border border-cyan-400/25 text-cyan-300 py-1 px-3 rounded-full text-xs font-medium hover:border-cyan-300/50 transition-colors">
                                {s}
                              </span>
                            ))}
                          </div>
                          <MagneticBtn href={job.applicationLink} target="_blank" rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-gradient-to-r ${job.accent} text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all interactive`}>
                            View & Apply <ArrowRight size={18} />
                          </MagneticBtn>
                        </div>
                      </motion.div>
                    )
                  })()}
                </AnimatePresence>
              </div>

              {/* ── Navigation — Framed icon arrows ── */}
              {filtered.length > 1 && (
                <div className="flex items-center justify-between mt-6 px-2">
                  {/* Prev arrow */}
                  <motion.button
                    onClick={prevJob}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.93 }}
                    className="interactive relative w-14 h-14 rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:border-cyan-400/70 hover:text-white transition-colors group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.35) inset' }} />
                    <ArrowLeft size={22} className="relative z-10" />
                  </motion.button>

                  {/* Dot indicators */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {filtered.map((_, i) => (
                      <button key={i} onClick={() => { setDir(i > jobIdx ? 'next' : 'prev'); setJobIdx(i) }}
                        className={`rounded-full transition-all duration-300 interactive ${i === jobIdx ? 'w-6 h-2.5 bg-cyan-400' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'}`} />
                    ))}
                  </div>

                  {/* Next arrow */}
                  <motion.button
                    onClick={nextJob}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.93 }}
                    className="interactive relative w-14 h-14 rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:border-cyan-400/70 hover:text-white transition-colors group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.35) inset' }} />
                    <ArrowRight size={22} className="relative z-10" />
                  </motion.button>
                </div>
              )}
            </div>
          </section>

          {/* ════════════════════ HOW WE HIRE ═════════════════════════════════════ */}
          <section className="mb-24 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <Orb size="300px" color="radial-gradient(circle,#3b82f6,transparent)" top="10%" left="60%" delay={1} blur="3xl" />
            </div>

            <motion.h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-white"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              How We Hire
            </motion.h2>
            <motion.p className="text-center text-slate-400 mb-16 max-w-md mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              A transparent, four-step process designed to find the right fit for both sides.
            </motion.p>

            {/* 3D flip carousel */}
            <div className="relative max-w-xl mx-auto" style={{ perspective: '1800px', minHeight: '380px' }}>
              <AnimatePresence mode="wait" custom={hDir}>
                <motion.div key={hiringSteps[hIdx].title}
                  className="absolute inset-0 glass rounded-3xl p-10 flex flex-col items-center justify-center text-center border border-cyan-500/20 shadow-2xl overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                  custom={hDir} variants={hiringV} initial="enter" animate="center" exit="exit">

                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${hiringSteps[hIdx].color} opacity-5 pointer-events-none`} />
                  {/* Top accent */}
                  <div className={`absolute top-0 left-12 right-12 h-0.5 bg-gradient-to-r ${hiringSteps[hIdx].color}`} />
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40" />

                  {/* Step badge */}
                  <div className="text-xs text-cyan-500/70 font-bold tracking-widest uppercase mb-4">
                    Step {hIdx + 1} of {hiringSteps.length}
                  </div>

                  {/* Icon with animated rings */}
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${hiringSteps[hIdx].color} flex items-center justify-center text-white shadow-2xl relative z-10`}>
                      {hiringSteps[hIdx].icon}
                    </div>
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-spin-very-slow" style={{ transform: 'scale(1.4)' }} />
                    <div className="absolute inset-0 rounded-full border border-blue-400/15 animate-spin-reverse" style={{ transform: 'scale(1.7)' }} />
                    {/* Glow */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${hiringSteps[hIdx].color} opacity-20 blur-xl scale-150`} />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4">{hiringSteps[hIdx].title}</h3>
                  <p className="text-slate-300 max-w-sm leading-relaxed">{hiringSteps[hIdx].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* How We Hire nav — framed icon arrows */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <motion.button
                onClick={prevH}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className="interactive relative w-14 h-14 rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:border-cyan-400/70 hover:text-white transition-colors group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.35) inset' }} />
                <ArrowLeft size={22} className="relative z-10" />
              </motion.button>

              <div className="flex gap-2.5">
                {hiringSteps.map((_, i) => (
                  <button key={i} onClick={() => { setHDir(i > hIdx ? 'next' : 'prev'); setHIdx(i) }}
                    className={`rounded-full transition-all duration-300 interactive ${i === hIdx ? 'w-6 h-2.5 bg-cyan-400' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'}`} />
                ))}
              </div>

              <motion.button
                onClick={nextH}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className="interactive relative w-14 h-14 rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-cyan-400 hover:border-cyan-400/70 hover:text-white transition-colors group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.35) inset' }} />
                <ArrowRight size={22} className="relative z-10" />
              </motion.button>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
