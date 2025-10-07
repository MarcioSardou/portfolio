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
    const positions = random.inSphere(new Float32Array(count * 3), { radius })
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
    const numLines = 15
    
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
        
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial 
              color="#64748b" 
              transparent 
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </line>
        )
      })}
    </group>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        {/* Luz ambiente sutil */}
        <ambientLight intensity={0.1} />
        
        {/* Camada de fundo - partículas maiores e mais lentas */}
        <ParticleField count={1500} radius={2} color="#334155" />
        
        {/* Camada do meio - partículas médias */}
        <ParticleField count={2500} radius={1.5} color="#475569" />
        
        {/* Camada frontal - partículas menores e mais rápidas */}
        <ParticleField count={2000} radius={1} color="#64748b" />
        
        {/* Linhas de conexão decorativas */}
        <ConnectionLines />
        
        {/* Fog para profundidade */}
        <fog attach="fog" args={["#0f172a", 1, 3.5]} />
      </Canvas>
      
      {/* Vinheta overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/50 pointer-events-none" />
    </div>
  )
}