"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Linkedin } from "lucide-react"
import Image from "next/image"

export function ProfileCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative bg-card rounded-2xl shadow-2xl p-8 transition-all duration-500 ease-out"
        style={{
          transform: isHovered ? "rotateX(5deg) rotateY(-5deg) scale(1.02)" : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.3), transparent 70%)",
            opacity: isHovered ? 1 : 0,
            filter: "blur(20px)",
            transform: "translateZ(-10px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Profile Image */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-xl">
            <Image src="/professional-developer-portrait.png" alt="Profile Picture" fill className="object-cover" priority />
          </div>

          {/* Name and Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-card-foreground text-balance">Your Name</h1>
            <p className="text-xl text-muted-foreground font-mono">Frontend Developer</p>
          </div>

          {/* Description */}
          <p className="text-center text-card-foreground/80 max-w-md text-pretty leading-relaxed">
            Crafting beautiful, accessible, and performant web experiences with modern technologies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Button
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => {
                // Add your portfolio PDF link here
                window.open("/portfolio.pdf", "_blank")
              }}
            >
              <Download className="w-5 h-5" />
              Download Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => {
                // Add your LinkedIn URL here
                window.open("https://linkedin.com/in/yourprofile", "_blank")
              }}
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
