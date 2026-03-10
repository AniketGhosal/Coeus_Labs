import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Particle Swarm ───────────────────────────
const ParticleSwarm = () => {
  const count = 4000
  const points = useRef()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 30
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
      points.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#06b6d4" size={0.07} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

// ── Floating Tech Nodes ───────────────────────
const FloatingNodes = () => {
  const nodes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50 - 15
      ],
      speed: 0.5 + Math.random() * 1.5,
      floatIntensity: 2 + Math.random() * 3,
      color: ['#06b6d4', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)],
      scale: Math.random() * 0.8 + 0.2
    }))
  }, [])

  return (
    <>
      {nodes.map((n, i) => (
        <Float key={i} speed={n.speed} rotationIntensity={3} floatIntensity={n.floatIntensity} position={n.position}>
          <mesh scale={n.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={n.color} wireframe opacity={0.5} transparent blending={THREE.AdditiveBlending} />
            <pointLight distance={6} intensity={0.4} color={n.color} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// ── Glowing Abstract Orbs ─────────────────────
const BackgroundOrbs = () => {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={2} position={[-15, 8, -25]}>
        <Sphere args={[6, 64, 64]}>
          <MeshDistortMaterial color="#06b6d4" attach="material" distort={0.5} speed={1.5} roughness={0.1} opacity={0.15} transparent blending={THREE.AdditiveBlending} />
        </Sphere>
      </Float>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={2} position={[18, -10, -35]}>
        <Sphere args={[9, 64, 64]}>
          <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.6} speed={2} roughness={0.2} opacity={0.12} transparent blending={THREE.AdditiveBlending} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[6, 12, -20]}>
        <Sphere args={[4, 32, 32]}>
          <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.4} speed={2.5} roughness={0.3} opacity={0.2} transparent blending={THREE.AdditiveBlending} />
        </Sphere>
      </Float>
    </>
  )
}

// ── Connecting Lines / Network Grid ───────────
const NetworkGrid = () => {
  const lineRef = useRef()
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
        pts.push(new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 50 - 20
        ))
    }
    return pts
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = []
    // Add lines between close points
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (points[i].distanceTo(points[j]) < 20) {
                positions.push(
                    points[i].x, points[i].y, points[i].z,
                    points[j].x, points[j].y, points[j].z
                )
            }
        }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [points])

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.04
      lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2
    }
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#06b6d4" opacity={0.12} transparent blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

// ── Interactive Camera / Mouse Follow ─────────
const CameraControls = () => {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    // Smooth camera drift based on mouse
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02
    camera.lookAt(0, 0, -10)
  })
  
  return null
}

export const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ backgroundColor: '#000000' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        {/* Dark ethereal ambient lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-15, -10, -15]} intensity={1} color="#3b82f6" />
        <pointLight position={[0, -20, 0]} intensity={0.6} color="#8b5cf6" />
        <spotLight position={[0, 30, 0]} intensity={1} angle={0.8} penumbra={1} color="#22d3ee" />
        
        {/* Beautiful high quality starfield background */}
        <Stars radius={150} depth={50} count={6000} factor={4} saturation={1} fade speed={1.5} />
        
        {/* Creative animated components */}
        <ParticleSwarm />
        <FloatingNodes />
        <BackgroundOrbs />
        <NetworkGrid />
        
        {/* Interactive responsiveness */}
        <CameraControls />
      </Canvas>
    </div>
  )
}
