import { ThreeBackground } from "@/components/three-background"
import { ProfileCard } from "@/components/profile-card"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <ThreeBackground />

      <div className="relative z-10 w-full max-w-2xl">
        <ProfileCard />
      </div>
    </main>
  )
}
