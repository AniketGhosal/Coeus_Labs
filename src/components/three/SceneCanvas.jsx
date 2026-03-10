import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Preload } from '@react-three/drei'
import FloatingModel from './FloatingModel'
import Lights from './Lights'
import Particles from './Particles'

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-20 w-20 rounded-full border-2 border-[#7c5cfc] border-t-transparent animate-spin" />
    </div>
  )
}

export default function SceneCanvas() {
  return (
    <div className="h-[55vh] w-full md:h-[75vh] lg:h-[80vh]">
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Lights />
          <Environment preset="city" />
          <Particles />
          <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
            <FloatingModel />
          </Float>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI * 2 / 3}
          />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  )
}
