"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import * as random from "maath/random"
import { useRef, useMemo } from "react"

function ParticleField({ count = 3000, radius = 1.5, color = "#4a5568" }) {
  const ref = useRef<any>(null)
  const { pointer } = useThree()
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3)
    random.inSphere(positions, { radius })
    return positions
  }, [count, radius])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x -= delta / 20
    ref.current.rotation.y -= delta / 25
    ref.current.rotation.x += pointer.y * 0.02
    ref.current.rotation.y += pointer.x * 0.02
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.0015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function ConnectionLines() {
  const ref = useRef<any>(null)
  const { pointer } = useThree()

  const lines = useMemo(() => {
    const pts = []
    const numLines = 20
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0))
    }
    return pts
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta / 8
    ref.current.position.x = pointer.x * 0.1
    ref.current.position.y = pointer.y * 0.1
  })

  return (
    <group ref={ref}>
      {lines.map((point, i) => {
        const next = lines[(i + 1) % lines.length]
        const geom = new THREE.BufferGeometry().setFromPoints([point, next])
        const color = i % 2 === 0 ? "#3b82f6" : "#9333ea"
        return (
          <primitive
            key={i}
            object={new THREE.Line(
              geom,
              new THREE.LineBasicMaterial({
                color,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending,
              })
            )}
          />
        )
      })}
    </group>
  )
}

function FloatingOrbs() {
  const orb1 = useRef<any>(null)
  const orb2 = useRef<any>(null)

  useFrame((state) => {
    if (orb1.current)
      orb1.current.position.set(
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5,
        Math.cos(state.clock.elapsedTime * 0.2) * 0.3,
        -0.5
      )
    if (orb2.current)
      orb2.current.position.set(
        Math.cos(state.clock.elapsedTime * 0.25) * 0.6,
        Math.sin(state.clock.elapsedTime * 0.35) * 0.4,
        -0.5
      )
  })

  return (
    <>
      <mesh ref={orb1}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={orb2}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#9333ea" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  )
}

export default function ThreeBackgroundClient() {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <ambientLight intensity={0.15} color="#1e293b" />
      <pointLight position={[-2, 2, -1]} color="#3b82f6" intensity={0.3} distance={5} />
      <pointLight position={[2, -2, -1]} color="#9333ea" intensity={0.3} distance={5} />
      <ParticleField count={1200} radius={2.2} color="#334155" />
      <ParticleField count={2000} radius={1.6} color="#3b82f6" />
      <ParticleField count={1500} radius={1.3} color="#9333ea" />
      <ParticleField count={1800} radius={1} color="#64748b" />
      <ParticleField count={800} radius={0.8} color="#60a5fa" />
      <ConnectionLines />
      <FloatingOrbs />
      <fog attach="fog" args={["#0f172a", 1, 3.8]} />
    </Canvas>
  )
}
