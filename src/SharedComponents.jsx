// Shared UI components: ThreeDBackground, CustomCursor, LoadingScreen, BackToTopButton
import { useState, useEffect, useRef } from 'react'
import { Cpu, Cloud, Satellite, Brain, Sparkles, ArrowUp } from 'lucide-react'
import { logoVideo } from './assets/assetHelper'

/* ── Spectacular Multi-Layer 3D Animated Background ────────────── */
export { ThreeDBackground } from './ThreeDBackground'
const ThreeDBackgroundOld = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W = window.innerWidth, H = window.innerHeight
    let mouseX = W / 2, mouseY = H / 2
    let t = 0

    // ── DPR / resize ──────────────────────────────────────────────
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width  = W * dpr; canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      initStars(); initGrid()
    }

    // ── 1) STARFIELD (depth layers) ───────────────────────────────
    let stars = []
    const initStars = () => {
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random(),           // depth 0..1
        r: Math.random() * 1.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.12 + 0.03,
        hue: 170 + Math.random() * 80,
      }))
    }

    // ── 2) GRAVITATIONAL WARP GRID ────────────────────────────────
    const GCOLS = 28, GROWS = 16
    let gridPts = []
    const initGrid = () => {
      gridPts = []
      for (let gy = 0; gy <= GROWS; gy++) {
        for (let gx = 0; gx <= GCOLS; gx++) {
          gridPts.push({ ox: (gx / GCOLS) * W, oy: (gy / GROWS) * H })
        }
      }
    }

    // ── 3) PLASMA ORBS ────────────────────────────────────────────
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      cx: Math.random(), cy: Math.random(),  // 0..1 normalized
      rx: 0.15 + Math.random() * 0.12,       // radius as fraction of W
      ry: 0.15 + Math.random() * 0.12,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      phase: Math.random() * Math.PI * 2,
      hue: [185, 210, 255, 280, 300, 200][i],
    }))

    // ── 4) AURORA RIBBONS ─────────────────────────────────────────
    const AURORA_COUNT = 4

    // ── 5) ENERGY NODES + CONNECTIONS ─────────────────────────────
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.5 + 0.6,
      hue: 170 + Math.random() * 70,
      pulse: Math.random() * Math.PI * 2,
    }))

    initStars(); initGrid()

    const onMouse = e => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', resize)

    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)

      // ── Base deep-space gradient ───────────────────────────────
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.85)
      bg.addColorStop(0,   'rgba(4,8,28,1)')
      bg.addColorStop(0.4, 'rgba(3,10,35,1)')
      bg.addColorStop(1,   'rgba(0,0,6,1)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ══════════════════════════════════════════════════════════
      // LAYER 1 – PLASMA ORBS (behind everything)
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      orbs.forEach(o => {
        o.cx += o.vx; o.cy += o.vy
        if (o.cx < 0 || o.cx > 1) o.vx *= -1
        if (o.cy < 0 || o.cy > 1) o.vy *= -1
        const px = o.cx * W, py = o.cy * H
        const rx = o.rx * W, ry = o.ry * H
        const morphR = rx * (1 + 0.18 * Math.sin(t * 1.1 + o.phase))
        const morphRy = ry * (1 + 0.18 * Math.cos(t * 0.9 + o.phase + 1))
        const hShift = (Math.sin(t * 0.5 + o.phase) * 30)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, Math.max(morphR, morphRy))
        grad.addColorStop(0, `hsla(${o.hue + hShift},90%,70%,0.13)`)
        grad.addColorStop(0.5,`hsla(${o.hue + hShift + 20},80%,55%,0.07)`)
        grad.addColorStop(1,  `hsla(${o.hue},70%,40%,0)`)
        ctx.save()
        ctx.translate(px, py)
        ctx.scale(morphR / Math.max(morphR, morphRy), morphRy / Math.max(morphR, morphRy))
        ctx.beginPath()
        ctx.arc(0, 0, Math.max(morphR, morphRy), 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      })
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 2 – AURORA SINE RIBBONS
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const auroraColors = [
        [185, 90, 65], [265, 80, 60], [200, 85, 58], [300, 75, 55]
      ]
      for (let a = 0; a < AURORA_COUNT; a++) {
        const [hue, sat, lit] = auroraColors[a]
        const yBase = H * (0.15 + a * 0.2)
        const amp   = H * (0.06 + a * 0.025)
        const freq  = 2.5 + a * 0.7
        const speed = 0.4 + a * 0.15
        const thick = 60 + a * 30

        ctx.beginPath()
        ctx.moveTo(0, yBase)
        for (let x = 0; x <= W; x += 4) {
          const wave1 = Math.sin((x / W) * Math.PI * freq + t * speed) * amp
          const wave2 = Math.sin((x / W) * Math.PI * (freq * 1.6) + t * speed * 0.7 + 2) * amp * 0.4
          ctx.lineTo(x, yBase + wave1 + wave2)
        }

        const grd = ctx.createLinearGradient(0, yBase - thick, 0, yBase + thick)
        grd.addColorStop(0,   `hsla(${hue},${sat}%,${lit}%,0)`)
        grd.addColorStop(0.4, `hsla(${hue},${sat}%,${lit}%,0.065)`)
        grd.addColorStop(0.5, `hsla(${hue},${sat}%,${lit}%,0.11)`)
        grd.addColorStop(0.6, `hsla(${hue},${sat}%,${lit}%,0.065)`)
        grd.addColorStop(1,   `hsla(${hue},${sat}%,${lit}%,0)`)
        ctx.strokeStyle = grd
        ctx.lineWidth = thick
        ctx.stroke()
      }
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 3 – GRAVITATIONAL WARP GRID
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      // Slow-moving attractor (Lissajous path)
      const ax = W * (0.5 + 0.35 * Math.sin(t * 0.31))
      const ay = H * (0.5 + 0.28 * Math.cos(t * 0.23))
      const WARP_STRENGTH = 4200

      const getWarped = (ox, oy) => {
        const dx = ax - ox, dy = ay - oy
        const d2 = dx * dx + dy * dy + 1000
        const f  = WARP_STRENGTH / d2
        // Mouse subtle pull
        const mdx = mouseX - ox, mdy = mouseY - oy
        const md2 = mdx * mdx + mdy * mdy + 5000
        const mf  = 800 / md2
        return { x: ox + dx * f + mdx * mf, y: oy + dy * f + mdy * mf }
      }

      // Draw grid lines
      for (let gy = 0; gy <= GROWS; gy++) {
        ctx.beginPath()
        for (let gx = 0; gx <= GCOLS; gx++) {
          const { ox, oy } = gridPts[gy * (GCOLS + 1) + gx]
          const { x, y } = getWarped(ox, oy)
          gx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const α = 0.028 + 0.015 * Math.abs(Math.sin(t * 0.3 + gy * 0.3))
        ctx.strokeStyle = `rgba(6,182,212,${α})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
      for (let gx = 0; gx <= GCOLS; gx++) {
        ctx.beginPath()
        for (let gy = 0; gy <= GROWS; gy++) {
          const { ox, oy } = gridPts[gy * (GCOLS + 1) + gx]
          const { x, y } = getWarped(ox, oy)
          gy === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const α = 0.022 + 0.012 * Math.abs(Math.sin(t * 0.25 + gx * 0.25))
        ctx.strokeStyle = `rgba(96,165,250,${α})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
      // Attractor point glow
      const ag = ctx.createRadialGradient(ax, ay, 0, ax, ay, 60)
      ag.addColorStop(0, 'rgba(34,211,238,0.18)')
      ag.addColorStop(1, 'rgba(34,211,238,0)')
      ctx.fillStyle = ag
      ctx.beginPath(); ctx.arc(ax, ay, 60, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 4 – 3D STARFIELD
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      stars.forEach(s => {
        s.pulse += 0.018
        // parallax shift by depth
        const px = s.x + (mouseX - W / 2) * s.z * 0.018
        const py = s.y + (mouseY - H / 2) * s.z * 0.018
        const alphaStar = (0.3 + 0.7 * s.z) * (0.6 + 0.4 * Math.sin(s.pulse))
        const radius = s.r * (0.5 + s.z * 0.8)
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue},80%,90%,${alphaStar})`
        ctx.fill()
        // bright-star cross glare
        if (s.z > 0.8 && s.r > 1.2) {
          ctx.save()
          ctx.globalAlpha = alphaStar * 0.35
          const gl = ctx.createLinearGradient(px - 8, py, px + 8, py)
          gl.addColorStop(0, 'transparent')
          gl.addColorStop(0.5, `hsla(${s.hue},90%,95%,1)`)
          gl.addColorStop(1, 'transparent')
          ctx.fillStyle = gl
          ctx.fillRect(px - 8, py - 0.5, 16, 1)
          const gv = ctx.createLinearGradient(px, py - 8, px, py + 8)
          gv.addColorStop(0, 'transparent')
          gv.addColorStop(0.5, `hsla(${s.hue},90%,95%,1)`)
          gv.addColorStop(1, 'transparent')
          ctx.fillStyle = gv
          ctx.fillRect(px - 0.5, py - 8, 1, 16)
          ctx.restore()
        }
      })
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 5 – ENERGY NODE NETWORK
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      nodes.forEach((p, i) => {
        p.pulse += 0.025
        const alphaP = 0.25 + 0.35 * Math.abs(Math.sin(p.pulse))

        // Mouse attraction (gentle)
        const mdx = mouseX - p.x, mdy = mouseY - p.y
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < 180) {
          p.vx += (mdx / md) * 0.012
          p.vy += (mdy / md) * 0.012
        }
        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.2) { p.vx *= 0.95; p.vy *= 0.95 }

        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // Glow
        const gn = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        gn.addColorStop(0, `hsla(${p.hue},90%,75%,${alphaP})`)
        gn.addColorStop(1, `hsla(${p.hue},80%,60%,0)`)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fillStyle = gn; ctx.fill()

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},95%,85%,${Math.min(alphaP + 0.2, 0.85)})`
        ctx.fill()

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = p.x - nodes[j].x, dy = p.y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const frac = 1 - dist / 120
            const midH = (p.hue + nodes[j].hue) / 2
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `hsla(${midH},80%,65%,${frac * 0.22})`
            ctx.lineWidth = frac * 1.2
            ctx.stroke()
          }
        }
      })
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 6 – HELICAL DNA STREAM (orbiting center)
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const helixCount = 3
      for (let h = 0; h < helixCount; h++) {
        const helixAngleOffset = (h / helixCount) * Math.PI * 2
        const centerX = W * (0.5 + 0.3 * Math.cos(t * 0.07 + helixAngleOffset))
        const centerY = H * (0.5 + 0.2 * Math.sin(t * 0.09 + helixAngleOffset))
        const helixLen = Math.min(W, H) * 0.38
        const helixW   = helixLen * 0.18

        for (let side = 0; side < 2; side++) {
          ctx.beginPath()
          const sign = side === 0 ? 1 : -1
          for (let k = 0; k <= 60; k++) {
            const prog = k / 60
            const lx = centerX - helixLen / 2 + prog * helixLen
            const ly = centerY + sign * Math.sin(prog * Math.PI * 4 + t * 1.2 + helixAngleOffset) * helixW
            k === 0 ? ctx.moveTo(lx, ly) : ctx.lineTo(lx, ly)
          }
          const hCol = 185 + h * 35
          ctx.strokeStyle = `hsla(${hCol},90%,65%,0.07)`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        // Cross-rungs
        for (let k = 0; k <= 60; k += 5) {
          const prog = k / 60
          const lx = centerX - helixLen / 2 + prog * helixLen
          const ly1 = centerY + Math.sin(prog * Math.PI * 4 + t * 1.2 + helixAngleOffset) * helixW
          const ly2 = centerY - Math.sin(prog * Math.PI * 4 + t * 1.2 + helixAngleOffset) * helixW
          const alpha = 0.04 + 0.06 * Math.abs(Math.sin(prog * Math.PI))
          ctx.beginPath(); ctx.moveTo(lx, ly1); ctx.lineTo(lx, ly2)
          ctx.strokeStyle = `hsla(${185 + h * 35},80%,70%,${alpha})`
          ctx.lineWidth = 1; ctx.stroke()
          // Rung dots
          ctx.beginPath(); ctx.arc(lx, ly1, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${185 + h * 35},90%,80%,${alpha * 2})`; ctx.fill()
          ctx.beginPath(); ctx.arc(lx, ly2, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${185 + h * 35},90%,80%,${alpha * 2})`; ctx.fill()
        }
      }
      ctx.restore()

      // ══════════════════════════════════════════════════════════
      // LAYER 7 – SHOOTING METEORS
      // ══════════════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      const meteorCount = 3
      for (let m = 0; m < meteorCount; m++) {
        const mPhase = t * 0.9 + (m * Math.PI * 2) / meteorCount
        const mProg  = (mPhase % (Math.PI * 2)) / (Math.PI * 2)
        const mx = (mProg * 1.4 - 0.2) * W
        const my = H * (0.1 + m * 0.25) + mProg * H * 0.15
        const tailLen = 90 + m * 30
        const meteorGrad = ctx.createLinearGradient(mx - tailLen, my, mx, my)
        meteorGrad.addColorStop(0, `rgba(34,211,238,0)`)
        meteorGrad.addColorStop(0.6, `rgba(34,211,238,0.1)`)
        meteorGrad.addColorStop(1, `rgba(200,240,255,0.6)`)
        ctx.beginPath(); ctx.moveTo(mx - tailLen, my); ctx.lineTo(mx, my)
        ctx.strokeStyle = meteorGrad; ctx.lineWidth = 1.5 - m * 0.3; ctx.stroke()
        // Head dot
        ctx.beginPath(); ctx.arc(mx, my, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,240,255,0.7)`; ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: '100vw', height: '100vh', background: '#00000f' }}
    />
  )
}

/* ── Custom Cursor ─────────────────────────────────────────────── */
export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const mv = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', mv)
    return () => window.removeEventListener('mousemove', mv)
  }, [])
  useEffect(() => {
    const els = document.querySelectorAll('a,button,.interactive')
    const on = () => setHover(true), off = () => setHover(false)
    els.forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off) })
  })
  return (
    <div
      className={`fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-100 ${
        hover
          ? 'w-10 h-10 bg-cyan-500/20 border-2 border-cyan-400 backdrop-blur-sm shadow-lg shadow-cyan-500/40'
          : 'w-5 h-5 bg-cyan-400/15 border border-cyan-300/60'
      }`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div className={`rounded-full bg-cyan-400 transition-all ${hover ? 'w-2 h-2 opacity-80' : 'w-1 h-1 opacity-60'}`} />
    </div>
  )
}

/* ── Premium Loading Screen ────────────────────────────────────── */
export const LoadingScreen = ({ isLoading, progress, displayText }) => {
  if (!isLoading) return null
  const indicators = [
    { icon: Cpu,      label: 'AI'    },
    { icon: Satellite,label: 'IoT'   },
    { icon: Brain,    label: 'ML'    },
    { icon: Cloud,    label: 'Cloud' },
  ]
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9998] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-cyan-400/20 blur-sm animate-float"
          style={{
            width: `${Math.random() * 6 + 3}px`, height: `${Math.random() * 6 + 3}px`,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 6 + 4}s`, animationDelay: `${Math.random() * 3}s`,
          }} />
      ))}

      {/* Main content */}
      <div className="text-center relative z-10 w-full max-w-md mx-4">
        {/* Logo area with orbiting rings */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-56 h-56">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow" style={{ borderTopColor: 'rgba(6,182,212,0.7)' }} />
            {/* Middle pulsing ring */}
            <div className="absolute inset-3 rounded-full border border-blue-400/20 animate-spin-reverse" style={{ borderBottomColor: 'rgba(96,165,250,0.5)' }} />
            {/* Inner circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#020617] to-black border-2 border-cyan-500/50 flex items-center justify-center shadow-[inset_0_0_30px_rgba(6,182,212,0.4)] overflow-hidden">
              {/* Progress fill */}
              <div className="absolute bottom-0 left-0 right-0 bg-cyan-500/25 transition-all duration-500 backdrop-blur-sm"
                style={{ height: `${progress}%` }} />
              <video src={logoVideo} autoPlay loop muted playsInline className="absolute z-10 h-[100%] w-[100%] object-contain pointer-events-none scale-[1.8]" style={{ mixBlendMode: 'screen', filter: 'contrast(2.5) brightness(1.4)' }} />
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2].map(i => (
              <div key={i} className="absolute top-1/2 left-1/2 w-2.5 h-2.5"
                style={{ animation: `orbit-slow ${3 + i * 0.8}s linear infinite`, animationDelay: `${i * 0.4}s` }}>
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress number */}
        <div className="mb-6">
          <div className="text-4xl font-light text-white mb-2 tracking-tight">
            {Math.round(progress)}<span className="text-xl text-cyan-400/60">%</span>
          </div>
          <div className="text-xs text-slate-400 font-light tracking-[0.25em] uppercase">{displayText}</div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="h-1 bg-slate-800/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Status icons */}
        <div className="flex justify-center gap-6">
          {indicators.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-400 ${
                progress > (i + 1) * 25
                  ? 'border-cyan-500/60 bg-slate-800/60 shadow-md shadow-cyan-500/20'
                  : 'border-slate-700/40 bg-slate-900/40'
              }`}>
                <Icon className={`w-5 h-5 transition-colors duration-500 ${progress > (i + 1) * 25 ? 'text-cyan-400' : 'text-slate-600'}`} />
              </div>
              <span className={`text-xs font-light transition-colors duration-500 ${progress > (i + 1) * 25 ? 'text-cyan-400' : 'text-slate-600'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Status text */}
        <div className="mt-10 text-xs text-slate-500 tracking-widest font-light">
          {progress < 30 ? 'Initializing systems...' : progress < 60 ? 'Loading AI models...' : progress < 90 ? 'Establishing connections...' : 'Almost ready...'}
        </div>
      </div>

      {/* Scan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-scan-line" />
    </div>
  )
}

/* ── Back to Top Button ────────────────────────────────────────── */
export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.pageYOffset > 300)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-cyan-500/50 group animate-pulse-glow ${
        visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} className="transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  )
}
