import { ThreeBackground } from "@/components/three-background"
import { ProfileCard } from "@/components/profile-card"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <ThreeBackground />

      <div className="relative z-10 w-full max-w-2xl">
        <ProfileCard />
      </div>

      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-b from-background/50 via-background/30 to-background/50 pointer-events-none" />
    </main>
  )
}
