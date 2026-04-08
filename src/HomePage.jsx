import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Wifi,
  Shield,
  BarChart,
  Activity,
  Brain,
  Satellite,
  Cloud,
  Cpu,
  Send,
} from "lucide-react";
import {
  ThreeDBackground,
  CustomCursor,
  LoadingScreen,
  BackToTopButton,
} from "./SharedComponents";
import {
  logoVideo,
  promoVideo, 
  iidasImage,
  lineMonitoringImage,
  gridReliabilityImage,
  automatedInspectionsImg,
  aiWorkforceImg,
  predictiveMaintenanceImg,
  realtimeAnalyticsImg,
  dataCollectionImg,
  anomalyDetectionImg,
  edgeProcessingImg,
  sapIntegrationImg,
  fieldResponseImg,
  preventOutagesImg,
  cutCostsImg,
  scaleIntelligenceImg,
  sustainabilitySafetyImg,
} from "./assets/assetHelper";

/* ── Image slot with animated placeholder ───────────────────────── */
const ImgSlot = ({ src, alt, className = "w-full h-48", label, style }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const isPlaceholder = !src || src.startsWith("data:");

  if (isPlaceholder || failed) {
    return (
      <div
        className={`img-placeholder corner-accent relative ${className}`}
        style={{ minHeight: "192px", ...style }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>{label || alt}</span>
      </div>
    );
  }
  return (
    <div
      className={`relative ${className} overflow-hidden rounded-lg`}
      style={{ minHeight: "192px", ...style }}
    >
      {!loaded && (
        <div className="img-placeholder absolute inset-0">
          <span>{label || alt}</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
      />
    </div>
  );
};

/* ── 3D tilt helpers ─────────────────────────────────────────────── */
const tilt = (e) => {
  const el = e.currentTarget,
    r = el.getBoundingClientRect();
  const x = (e.clientY - r.top) / r.height - 0.5;
  const y = (e.clientX - r.left) / r.width - 0.5;
  el.style.transform = `perspective(900px) rotateX(${-x * 10}deg) rotateY(${y * 10}deg) translateY(-8px) scale(1.02)`;
};
const untilt = (e) => {
  e.currentTarget.style.transform = "";
};

/* ── Section heading ─────────────────────────────────────────────── */
const SectionHeading = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 glow-text">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
      {children}
    </span>
  </h2>
);

/* ── Rich animated section background ───────────────────────────── */
const SectionBg = ({ variant = "a" }) => {
  if (variant === "a")
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        {/* Rotating diamond */}
        <div className="absolute top-1/4 right-10 w-24 h-24 border border-cyan-500/15 rotate-45 animate-spin-very-slow" />
        <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-blue-500/15 rounded-lg animate-bounce-very-slow" />
        {/* Data nodes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30 animate-node-pulse"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + (i % 2) * 84}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        {/* Horizontal data lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(4)].map((_, i) => (
            <line
              key={i}
              x1="0%"
              y1={`${25 + i * 20}%`}
              x2="100%"
              y2={`${25 + i * 20}%`}
              stroke="rgba(6,182,212,0.5)"
              strokeWidth="1"
              strokeDasharray="6 14"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>
    );
  if (variant === "b")
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/3 left-1/2 w-20 h-20 border-2 border-cyan-400/10 animate-rotate-scale" />
        {/* Vertical data lines */}
        <svg className="absolute inset-0 w-full h-full opacity-8">
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={`${15 + i * 18}%`}
              y1="0%"
              x2={`${15 + i * 18}%`}
              y2="100%"
              stroke="rgba(6,182,212,0.4)"
              strokeWidth="1"
              strokeDasharray="4 20"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </svg>
      </div>
    );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-float-slow" />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

/* ── Glass card component ────────────────────────────────────────── */
const GlassCard = ({ children, className = "", onMouseMove, onMouseLeave }) => (
  <div
    className={`glass glass-hover card-3d rounded-2xl relative overflow-hidden ${className}`}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
  >
    {/* Corner accents */}
    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none transition-all duration-300 group-hover:border-cyan-400/80 group-hover:w-6 group-hover:h-6" />
    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40 pointer-events-none transition-all duration-300 group-hover:border-cyan-400/80 group-hover:w-6 group-hover:h-6" />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40 pointer-events-none transition-all duration-300" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none transition-all duration-300" />
    {children}
  </div>
);

/* ── Data ─────────────────────────────────────────────────────────── */
const heroSlides = [
  {
    src: iidasImage,
    alt: "IIDaaS",
    overline: "Our proprietary AI solution — IIDaaS",
    title: "Enhanced Grid Safety and Efficiency",
    subtitle: "Intelligent Inspection and Detection as a Service",
    description:
      "Leveraging cutting-edge AI for comprehensive monitoring and predictive analysis to prevent outages and mitigate wildfire risks.",
  },
  {
    src: lineMonitoringImage,
    alt: "Line Monitoring",
    overline: "Advanced Oversight for Critical Infrastructure",
    title: "Real-Time Electrical Line Monitoring & Automation",
    subtitle: "Smart Monitoring for Peak Performance",
    description:
      "Our platform delivers real-time detection of electrical line anomalies using a proprietary Follow-the-Wire model, integrated with IoT-connected drones, edge computing, and SAP BTP/CPI.",
  },
  {
    src: gridReliabilityImage,
    alt: "Grid Reliability",
    overline: "The Next Generation of Power Infrastructure",
    title: "Revolutionizing Grid Reliability with AI, IoT, & SAP Integration",
    subtitle: "Seamless Integration for Unmatched Reliability",
    description:
      "Combine Artificial Intelligence, IoT data, and robust SAP integration to create a resilient, self-optimizing electrical network.",
  },
];


const solutions = [
  {
    title: "Automated Inspections",
    description:
      "AI powered software to inspect electrical infrastructure with precision.",
    icon: <Satellite size={40} className="text-cyan-400" />,
    src: automatedInspectionsImg,
    label: "Automated Inspections",
  },
  {
    title: "AI Augmented Inspection and Detection Workforce",
    description:
      "This AI driven software becomes part of your daily inspection, detection and preventive maintenance making the field workforce AI enabled",
    icon: <Satellite size={40} className="text-cyan-400" />,
    src: aiWorkforceImg,
    label: "AI Augmented Inspection and Detection Workforce",
  },
  {
    title: "Predictive Maintenance",
    description:
      "Machine learning algorithms predict failures before they occur.",
    icon: <Brain size={40} className="text-cyan-400" />,
    src: predictiveMaintenanceImg,
    label: "Predictive Maintenance",
  },
  {
    title: "Real-time Analytics",
    description: "Instant insights into grid health and performance metrics.",
    icon: <BarChart size={40} className="text-cyan-400" />,
    src: realtimeAnalyticsImg,
    label: "Real-time Analytics",
  },
];

const steps = [
  {
    step: "1",
    title: "Data Collection",
    description:
      "IoT enabled drones and other image collection of electrical lines, scan images in real time to detect the health of the grid.",
    icon: <Wifi size={28} className="text-cyan-400" />,
    src: dataCollectionImg,
    label: "Data Collection",
  },
  {
    step: "2",
    title: "Anomaly Detection",
    description:
      "Our Follow-the-Wire model analyzes signal patterns to detect faults.",
    icon: <Activity size={28} className="text-blue-400" />,
    src: anomalyDetectionImg,
    label: "Anomaly Detection",
  },
  {
    step: "3",
    title: "Edge Processing",
    description:
      "Local edge nodes process data instantly, minimizing cloud dependency and latency. The software can also send signals to circuit breakers and simultaneously raise work order for immediate action by the linemen and journeymen.",
    icon: <Cpu size={28} className="text-cyan-400" />,
    src: edgeProcessingImg,
    label: "Edge Processing",
  },
  {
    step: "4",
    title: "SAP Integration",
    description:
      "Detected issues are converted into actionable work orders via SAP CPI, routed through SAP BTP.",
    icon: <Cloud size={28} className="text-blue-400" />,
    src: sapIntegrationImg,
    label: "SAP Integration",
  },
  {
    step: "5",
    title: "Field Response",
    description:
      "Maintenance teams receive precise, geo-tagged tasks—accelerating resolution and grid reliability.",
    icon: <BarChart size={28} className="text-cyan-400" />,
    src: fieldResponseImg,
    label: "Field Response",
  },
];

const benefits = [
  {
    title: "Prevent Outages Before They Happen",
    description:
      "Proactive detection means fewer blackouts and safer communities.",
    icon: <Shield size={28} className="text-cyan-400" />,
    src: preventOutagesImg,
    label: "Prevent Outages",
  },
  {
    title: "Cut Operational Costs",
    description:
      "Automating inspections and work orders reduces manual labor and overhead.",
    icon: <BarChart size={28} className="text-blue-400" />,
    src: cutCostsImg,
    label: "Cut Costs",
  },
  {
    title: "Scale with Intelligence",
    description:
      "Our modular architecture supports expansion across regions and utility networks.",
    icon: <Cloud size={28} className="text-cyan-400" />,
    src: scaleIntelligenceImg,
    label: "Scale Intelligence",
  },
  {
    title: "Sustainability & Safety",
    description:
      "Reduce carbon footprint and protect workers from hazardous conditions.",
    icon: <Activity size={28} className="text-blue-400" />,
    src: sustainabilitySafetyImg,
    label: "Sustainability",
  },
];

const locations = [
  "Florida, USA",
  "California, USA",
  "Kolkata, India",
  "Hyderabad, India",
];

/* ── Component ────────────────────────────────────────────────────── */
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("Initializing systems");
  const [heroIdx, setHeroIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // <--- For Drone Promo Video
  const location = useLocation();

  // Loading
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (5000 / 50);
        if (next >= 100 && Date.now() - start >= 4000) {
          clearInterval(iv);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return Math.min(next, 100);
      });
    }, 50);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const map = [
      { p: 30, t: "Calibrating sensors" },
      { p: 50, t: "Loading AI modules" },
      { p: 70, t: "Establishing connection" },
      { p: 85, t: "Finalizing setup" },
    ];
    const iv = setInterval(
      () =>
        setProgress((p) => {
          const u = map.filter((m) => p >= m.p);
          if (u.length) setDisplayText(u[u.length - 1].t);
          return p;
        }),
      100,
    );
    return () => clearInterval(iv);
  }, []);

  // Hero rotation
  useEffect(() => {
    if (isLoading) return;
    const iv = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroSlides.length),
      5000,
    );
    return () => clearInterval(iv);
  }, [isLoading]);

  // Anchor scroll after load
  useEffect(() => {
    if (!isLoading && location.hash) {
      setTimeout(
        () =>
          document
            .querySelector(location.hash)
            ?.scrollIntoView({ behavior: "smooth" }),
        200,
      );
    }
  }, [isLoading, location.hash]);

  // Scroll reveal
  useEffect(() => {
    if (isLoading) return;
    const check = () =>
      document.querySelectorAll(".feature-card").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight / 1.2)
          el.classList.add("animate");
      });
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [isLoading]);

  const cur = heroSlides[heroIdx];

  return (
    <div className="min-h-screen w-full text-slate-100 font-sans overflow-x-hidden relative">
      <ThreeDBackground />
      <CustomCursor />
      <BackToTopButton />
      <LoadingScreen
        isLoading={isLoading}
        progress={progress}
        displayText={displayText}
      />

      <div
        className={
          isLoading
            ? "opacity-0 pointer-events-none"
            : "opacity-100 transition-opacity duration-700 relative z-10"
        }
      >
        {/* ════════════════════════════════ HERO ════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Hero image carousel */}
          <div className="absolute inset-0 z-0">
            {heroSlides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${i === heroIdx ? "opacity-100" : "opacity-0"}`}
              >
                {s.src && !s.src.startsWith("data:") ? (
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full img-placeholder rounded-none"
                    style={{ borderRadius: 0 }}
                  >
                    <span>{s.alt}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

          {/* 3D ambient elements */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Large floating orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/12 rounded-full blur-3xl animate-float-slow" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-float-slow"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl animate-pulse-slow" />

            {/* Spinning geometric accents */}
            <div className="absolute top-1/4 right-1/4 w-36 h-36 border border-cyan-500/15 rotate-45 animate-spin-very-slow" />
            <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-blue-500/12 rounded-lg animate-bounce-very-slow" />
            <div className="absolute top-1/3 right-1/5 w-20 h-20 border-2 border-cyan-400/10 animate-rotate-scale" />

            {/* Horizontal scan lines */}
            {[0.25, 0.5, 0.75].map((pos, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px animate-beam"
                style={{
                  top: `${pos * 100}%`,
                  background:
                    "linear-gradient(90deg,transparent,rgba(34,211,238,0.2),transparent)",
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}

            {/* Vertical light beams */}
            <div
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent animate-beam"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-beam"
              style={{ animationDelay: "2s" }}
            />

            {/* Animated particles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-400/35 blur-sm"
                style={{
                  width: `${Math.random() * 7 + 3}px`,
                  height: `${Math.random() * 7 + 3}px`,
                  top: `${5 + i * 5}%`,
                  left: `${3 + ((i * 67) % 94)}%`,
                  animation: `float ${6 + i * 0.5}s ease-in-out infinite, glow ${3 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            ))}

            {/* Connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <linearGradient
                  id="heroLine"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="cyan" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="cyan" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="blue" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1={`${10 + i * 15}%`}
                  y1={`${20 + i * 10}%`}
                  x2={`${60 + i * 7}%`}
                  y2={`${50 + i * 8}%`}
                  stroke="url(#heroLine)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              ))}
            </svg>

            {/* Floating tech card accents */}
            <div
              className="absolute top-1/4 left-16 w-14 h-14 bg-cyan-500/6 rounded-lg backdrop-blur-sm border border-cyan-500/15 flex items-center justify-center animate-float-slow"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-7 h-7 border-2 border-cyan-400/30 rounded animate-spin-slow" />
            </div>
            <div
              className="absolute bottom-1/4 right-16 w-14 h-14 bg-blue-500/6 rounded-lg backdrop-blur-sm border border-blue-500/15 flex items-center justify-center animate-float-slow"
              style={{ animationDelay: "3s" }}
            >
              <div className="w-7 h-7 border-2 border-blue-400/30 animate-pulse" />
            </div>
          </div>

          {/* Hero text */}
          <div className="container mx-auto px-4 z-20 max-w-6xl">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-4xl p-6 md:p-8"
            >
              <p
                className="text-xs md:text-sm font-semibold text-cyan-400 tracking-[0.3em] uppercase mb-4 animate-fade-in-up"
                style={{ animationDelay: "100ms", animationFillMode: "both" }}
              >
                {cur.overline}
              </p>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold my-6 leading-tight animate-fade-in-up"
                style={{
                  animationDelay: "250ms",
                  animationFillMode: "both",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-cyan-300">
                  {cur.title}
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl text-cyan-400 mb-6 font-light animate-fade-in-up"
                style={{ animationDelay: "400ms", animationFillMode: "both" }}
              >
                {cur.subtitle}
              </p>
              <p
                className="text-lg text-slate-300 font-light max-w-3xl leading-relaxed mb-10 animate-fade-in-up"
                style={{ animationDelay: "550ms", animationFillMode: "both" }}
              >
                {cur.description}
              </p>
              {/* <div
                className="animate-fade-in-up"
                style={{ animationDelay: "700ms", animationFillMode: "both" }}
              >
                <a
                  href="#solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("solutions")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center px-8 py-4 shimmer-btn text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group interactive"
                >
                  Explore Solutions{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div> */}
              <div
                className="animate-fade-in-up flex flex-wrap gap-4"
                style={{ animationDelay: "700ms", animationFillMode: "both" }}
              >
                {/* Existing Explore Solutions Button */}
                <a
                  href="#solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("solutions")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center px-8 py-4 shimmer-btn text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group interactive"
                >
                  Explore Solutions{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* NEW: See Video Demo Button */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center px-8 py-4 glass glass-hover text-cyan-300 font-semibold rounded-full border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-100 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group interactive"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                  See Video Demo
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 group"
            onClick={() =>
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center hover:border-cyan-400 transition-all animate-bounce backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-cyan-400/30">
              <div className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2 animate-pulse" />
            </div>
          </button>
        </section>

        {/* Central container */}
        <div className="container mx-auto px-4 max-w-7xl">
          {/* ════════════════════════════════ SOLUTIONS ════════════════════════════════ */}
          <section id="solutions" className="py-24 relative">
            <SectionBg variant="a" />
            <SectionHeading>Our Solutions</SectionHeading>
            <p className="text-center text-cyan-100 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
              Cutting edge AI based electrical grid image inspection and
              detection software and IoT integration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {solutions.map((s, i) => (
                <div
                  key={i}
                  className={`feature-card stagger-${i + 1} glass glass-hover card-3d rounded-2xl p-8 flex flex-col items-center group relative overflow-hidden`}
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                >
                  {/* Glow accent top-right */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse-slow pointer-events-none" />
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400/70 transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400/70 transition-colors" />
                  {/* Icon */}
                  <div className="w-20 h-20 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                    {s.icon}
                  </div>
                  {/* Image */}
                  <div className="w-full mb-6 relative overflow-hidden rounded-lg">
                    <ImgSlot
                      src={s.src}
                      alt={s.title}
                      label={s.label}
                      className="w-full h-48"
                    />
                    {/* Scan line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-down pointer-events-none z-10" />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-300 transition-colors relative z-10">
                    {s.title}
                  </h3>
                  <p className="text-cyan-100 text-center leading-relaxed relative z-10">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════ HOW IT WORKS ════════════════════════════════ */}
          <section id="technology" className="py-24 relative">
            <SectionBg variant="b" />
            <SectionHeading>How It Works</SectionHeading>
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {steps.map((item, i) => (
                <div
                  key={i}
                  className={`feature-card stagger-${(i % 3) + 1} group`}
                >
                  <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden">
                    {/* Numbered step badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                      {item.step}
                    </div>
                    {/* Hover glow */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-cyan-900/40 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-cyan-800/60 group-hover:scale-105 transition-all">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-80 flex-shrink-0 overflow-hidden rounded-lg">
                        <ImgSlot
                          src={item.src}
                          alt={item.title}
                          label={item.label}
                          className="w-full h-48"
                        />
                      </div>
                      <p className="text-cyan-100 leading-relaxed flex-1 pt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════ BENEFITS ════════════════════════════════ */}
          <section id="benefits" className="py-24 relative">
            <SectionBg variant="a" />
            <SectionHeading>Why It Matters</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className={`feature-card stagger-${(i % 2) + 1} card-3d glass rounded-2xl p-8 group relative overflow-hidden`}
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                >
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/25 group-hover:border-cyan-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/25 group-hover:border-cyan-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/4 to-blue-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="flex items-center mb-5 relative z-10">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4 group-hover:bg-cyan-800/50 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden rounded-lg mb-5 relative z-10">
                    <ImgSlot
                      src={item.src}
                      alt={item.title}
                      label={item.label}
                      className="w-full h-48"
                    />
                  </div>
                  <p className="text-cyan-100 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════ CONTACT ════════════════════════════════ */}
          <section id="contact" className="py-24 relative">
            <SectionBg variant="c" />
            <div className="text-center mb-16">
              <SectionHeading>Get In Touch & Our Locations</SectionHeading>
              <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
                Ready to transform your electrical grid management?
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Contact card */}
              <div className="glass glass-hover rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h3 className="text-2xl font-bold mb-6 text-cyan-400 relative z-10">
                  Send us a message
                </h3>
                <p className="text-cyan-100 mb-8 max-w-sm leading-relaxed relative z-10">
                  Have a question or want to request a demo? Click below to open
                  our contact form.
                </p>
                <a
                  href="https://forms.gle/ou4h4RWvYLPB983h7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs shimmer-btn text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 interactive relative z-10"
                >
                  <Send size={20} /> Open Contact Form
                </a>
              </div>
              {/* Locations */}
              <div className="glass rounded-2xl p-6 relative overflow-hidden">
                {/* Animated nodes */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400/20 animate-node-pulse pointer-events-none"
                    style={{
                      top: `${20 + i * 22}%`,
                      right: "8px",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
                <h3 className="text-xl font-semibold text-cyan-400 mb-6 text-center">
                  Our Global Offices
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      className="glass-hover border border-cyan-500/20 rounded-xl p-4 flex items-center gap-3 hover:border-cyan-400/50 transition-all group/loc"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-900/40 flex items-center justify-center group-hover/loc:bg-cyan-800/60 transition-colors flex-shrink-0">
                        <MapPin
                          size={16}
                          className="text-cyan-400 group-hover/loc:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-cyan-200 font-medium">{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* end container */}

        {/* ════════════════════════════════ FOOTER ════════════════════════════════ */}
        <footer className="border-t border-cyan-500/20 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block animate-tilt-3d mb-2 relative z-10 mt-6">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl animate-pulse -z-10" />
              <video
                key="footer-logo-vid"
                src={logoVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-40 sm:h-56 w-auto object-contain mx-auto pointer-events-none scale-[1.8]"
                style={{
                  mixBlendMode: "screen",
                  filter: "contrast(2.5) brightness(1.4)",
                }}
              />
            </div>
            <p className="text-cyan-300 font-light">
              © 2025 All rights reserved.
            </p>
          </div>
        </footer>
      </div>





      {/* ════════════════════════════════ VIDEO MODAL ════════════════════════════════ */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl transition-opacity duration-300">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setIsVideoModalOpen(false)}></div>
            
            {/* Modal Container */}
            <div className="relative w-full max-w-5xl glass border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 animate-stagger-in">
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-danger text-white rounded-full flex items-center justify-center border border-white/10 hover:border-danger transition-all backdrop-blur-md"
              >
                ✕
              </button>
              
              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video 
                  src={promoVideo} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
