// server component
import dynamic from "next/dynamic"

const ThreeBackgroundClient = dynamic(() => import("./three-background-client"), {
  ssr: true, // desativa renderização no servidor
})

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <ThreeBackgroundClient />

      {/* Vinheta overlay com gradiente azul/roxo sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-950/20 via-slate-950/40 to-slate-950 pointer-events-none" />

      {/* Glow decorativo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1), rgba(147,51,234,0.05), transparent 60%)",
        }}
      />
    </div>
  )
}