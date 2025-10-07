"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Linkedin, Github, Mail } from "lucide-react"
import Image from "next/image"

export function ProfileCard() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 8
    const rotateY = ((centerX - x) / centerX) * 8

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" style={{ perspective: "1500px" }}>
      <div
        ref={cardRef}
        className="relative transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2), transparent 70%)",
            opacity: isHovered ? 1 : 0,
            filter: "blur(40px)",
            transform: "translateZ(-30px)",
          }}
        />

        {/* Main Card */}
        <div
          className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700/50 overflow-hidden"
          style={{
            transform: "translateZ(0)",
          }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(${rotation.y * 3 + 135}deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Profile Image */}
            <div
              className="relative w-44 h-44 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <Image
                src="/portrait.jpeg"
                alt="Marcio Sardou - Frontend Developer"
                fill
                className="object-cover"
                priority
              />
              {/* Image glow on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </div>

            {/* Name and Title */}
            <div
              className="text-center space-y-3"
              style={{
                transform: "translateZ(30px)",
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-slate-100 bg-clip-text text-transparent">
                Marcio Sardou
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
                <p className="text-lg md:text-xl text-slate-400 font-mono">
                  Frontend Developer
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <span>5+ anos de experiência</span>
                <span>•</span>
                <span>React • Node.js • TypeScript</span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-center text-slate-300 max-w-lg text-base md:text-lg leading-relaxed"
              style={{
                transform: "translateZ(20px)",
              }}
            >
              Especializado em criar experiências web{" "}
              <span className="text-blue-400 font-semibold">modernas</span>,{" "}
              <span className="text-purple-400 font-semibold">performáticas</span> e{" "}
              <span className="text-green-400 font-semibold">acessíveis</span> usando as
              melhores tecnologias do mercado.
            </p>

            {/* Stats */}
            {/* <div
              className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-md mt-2"
              style={{
                transform: "translateZ(25px)",
              }}
            >
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm hover:bg-slate-700/60 transition-colors">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-xs text-slate-400 mt-1">Projetos</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm hover:bg-slate-700/60 transition-colors">
                <div className="text-2xl font-bold text-purple-400">5+</div>
                <div className="text-xs text-slate-400 mt-1">Anos Exp.</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm hover:bg-slate-700/60 transition-colors">
                <div className="text-2xl font-bold text-green-400">10+</div>
                <div className="text-xs text-slate-400 mt-1">Empresas</div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4"
              style={{
                transform: "translateZ(35px)",
              }}
            >
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                onClick={() => {
                  window.open("/portfolio.pdf", "_blank")
                }}
              >
                <Download className="w-5 h-5" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-slate-800/60 border-slate-700 hover:bg-slate-700/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  window.open("https://linkedin.com/in/yourprofile", "_blank")
                }}
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center gap-4 mt-2"
              style={{
                transform: "translateZ(30px)",
              }}
            >
              <button
                className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-300 group"
                onClick={() => window.open("https://github.com/yourprofile", "_blank")}
              >
                <Github className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
              </button>
              <button
                className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-300 group"
                onClick={() => window.open("mailto:your.email@example.com")}
              >
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}