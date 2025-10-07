"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface TiltedCardProps {
  imageSrc: string
  altText: string
  captionText?: string
  containerHeight?: string
  containerWidth?: string
  imageHeight?: string
  imageWidth?: string
  rotateAmplitude?: number
  scaleOnHover?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  displayOverlayContent?: boolean
  overlayContent?: React.ReactNode
  className?: string
}

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
  className = "",
}: TiltedCardProps) {
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

    const rotateX = ((y - centerY) / centerY) * rotateAmplitude
    const rotateY = ((centerX - x) / centerX) * rotateAmplitude

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
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="relative w-full h-full transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? scaleOnHover : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.4), transparent 70%)",
            opacity: isHovered ? 1 : 0,
            filter: "blur(25px)",
            transform: "translateZ(-20px)",
          }}
        />

        {/* Card container */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            transform: "translateZ(0)",
          }}
        >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay content */}
          {displayOverlayContent && overlayContent && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: "translateZ(10px)",
              }}
            >
              {overlayContent}
            </div>
          )}

          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(${rotation.y * 2 + 45}deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
              transform: "translateZ(1px)",
            }}
          />
        </div>

        {/* Caption */}
        {captionText && showTooltip && (
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          >
            {captionText}
          </div>
        )}
      </div>

      {/* Mobile warning */}
      {showMobileWarning && (
        <div className="md:hidden absolute -bottom-12 left-0 right-0 text-center text-xs text-muted-foreground">
          Best viewed on desktop
        </div>
      )}
    </div>
  )
}