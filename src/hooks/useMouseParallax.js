import { useState, useEffect } from 'react'

export function useMouseParallax(strength = 0.03) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength * 100
      const y = (e.clientY / window.innerHeight - 0.5) * strength * 100
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [strength])

  return offset
}
