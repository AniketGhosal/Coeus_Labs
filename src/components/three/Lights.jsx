export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 6, 4]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#7c5cfc" />
      <pointLight position={[4, 2, -3]} intensity={1.5} color="#00d9ff" />
      <hemisphereLight skyColor="#7c5cfc" groundColor="#050505" intensity={0.5} />
    </>
  )
}
