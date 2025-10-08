"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"
import * as THREE from "three"

function ParticleField({ count = 3000, radius = 1.5, color = "#4a5568" }) {
  const ref = useRef<any>(null)
  const { viewport, pointer } = useThree()
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3)
    random.inSphere(positions, { radius })
    return positions
  }, [count, radius])
  
  useFrame((state, delta) => {
    if (ref.current) {
      // Rotação suave base
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 25
      
      // Movimento sutil baseado no mouse
      ref.current.rotation.x += pointer.y * 0.02
      ref.current.rotation.y += pointer.x * 0.02
    }
  })
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color={color} 
          size={0.0015} 
          sizeAttenuation={true} 
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
    const points = []
    const numLines = 20
    
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2
      const radius = 1.2
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
      )
    }
    return points
  }, [])
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta / 8
      ref.current.position.x = pointer.x * 0.1
      ref.current.position.y = pointer.y * 0.1
    }
  })
  
  return (
    <group ref={ref}>
      {lines.map((point, i) => {
        const nextPoint = lines[(i + 1) % lines.length]
        const geometry = new THREE.BufferGeometry().setFromPoints([point, nextPoint])

        // Alterna entre azul e roxo para criar um efeito mais dinâmico
        const color = i % 2 === 0 ? "#3b82f6" : "#9333ea"

        return (
          <primitive
            key={i}
            object={new THREE.Line(
              geometry,
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

// Novo componente: Orbs flutuantes que combinam com os do card
function FloatingOrbs() {
  const orb1Ref = useRef<any>(null)
  const orb2Ref = useRef<any>(null)
  
  useFrame((state) => {
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
      orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.6
      orb2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.4
    }
  })
  
  return (
    <>
      <mesh ref={orb1Ref} position={[-0.5, 0.3, -0.5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[0.5, -0.3, -0.5]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial 
          color="#9333ea" 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        {/* Luz ambiente sutil com toque azulado */}
        <ambientLight intensity={0.15} color="#1e293b" />
        
        {/* Luzes pontuais coloridas para dar profundidade */}
        <pointLight position={[-2, 2, -1]} color="#3b82f6" intensity={0.3} distance={5} />
        <pointLight position={[2, -2, -1]} color="#9333ea" intensity={0.3} distance={5} />
        
        {/* Camada de fundo - partículas slate escuras */}
        <ParticleField count={1200} radius={2.2} color="#334155" />
        
        {/* Camada do meio - partículas azuis */}
        <ParticleField count={2000} radius={1.6} color="#3b82f6" />
        
        {/* Camada intermediária - partículas roxas */}
        <ParticleField count={1500} radius={1.3} color="#9333ea" />
        
        {/* Camada frontal - partículas slate claras */}
        <ParticleField count={1800} radius={1} color="#64748b" />
        
        {/* Pequenos acentos em azul claro */}
        <ParticleField count={800} radius={0.8} color="#60a5fa" />
        
        {/* Linhas de conexão decorativas azul/roxo */}
        <ConnectionLines />
        
        {/* Orbs flutuantes */}
        <FloatingOrbs />
        
        {/* Fog para profundidade com tom azulado */}
        <fog attach="fog" args={["#0f172a", 1, 3.8]} />
      </Canvas>
      
      {/* Vinheta overlay com gradiente azul/roxo sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-950/20 via-slate-950/40 to-slate-950 pointer-events-none" />
      
      {/* Glow decorativo que combina com o card */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), transparent 60%)"
        }}
      />
    </div>
  )
}