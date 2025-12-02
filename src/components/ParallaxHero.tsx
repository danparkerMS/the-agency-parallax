import { useEffect, useState, ReactNode } from 'react'

interface ParallaxHeroProps {
  children: ReactNode
  backgroundImage?: string
  height?: string
  speed?: number
  overlay?: boolean
}

export function ParallaxHero({
  children,
  backgroundImage,
  height = 'h-screen',
  speed = 0.5,
  overlay = true,
}: ParallaxHeroProps) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${offsetY * speed}px)`,
          }}
        />
      )}
      {!backgroundImage && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary"
          style={{
            transform: `translateY(${offsetY * speed}px)`,
          }}
        />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />
      )}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
