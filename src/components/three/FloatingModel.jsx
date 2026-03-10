import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox, Torus } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingModel() {
  const groupRef = useRef()
  const innerRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.18
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.5
      innerRef.current.rotation.z = t * 0.25
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.3
      ringRef.current.rotation.z = t * 0.2
    }
  })

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Outer transparent shell */}
      <RoundedBox args={[2, 2, 2]} radius={0.35} smoothness={8}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          roughness={0.02}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.08}
          anisotropy={0.1}
          color="#7c5cfc"
          toneMapped={false}
        />
      </RoundedBox>

      {/* Inner glowing core */}
      <mesh ref={innerRef} scale={0.52}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Orbital ring */}
      <Torus
        ref={ringRef}
        args={[1.55, 0.035, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#7c5cfc"
          emissive="#7c5cfc"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.5}
        />
      </Torus>

      {/* Second ring */}
      <Torus
        args={[1.8, 0.02, 16, 100]}
        rotation={[0.9, 0.3, 0]}
      >
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.6}
        />
      </Torus>
    </group>
  )
}
