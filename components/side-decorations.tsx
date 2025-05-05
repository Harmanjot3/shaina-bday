"use client"

import { useEffect, useState } from "react"

interface Decoration {
  id: number
  type: "heart" | "flower" | "sparkle"
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  animationDuration: number
}

export function SideDecorations() {
  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (windowSize.width === 0) return

    // Generate decorations based on window size
    const newDecorations: Decoration[] = []
    const count = Math.floor(windowSize.height / 100) // One decoration per 100px of height

    // Left side decorations
    for (let i = 0; i < count; i++) {
      newDecorations.push({
        id: i,
        type: getRandomType(),
        x: Math.random() * 100,
        y: (i * windowSize.height) / count + Math.random() * 50,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.2,
        animationDuration: Math.random() * 10 + 10,
      })
    }

    // Right side decorations
    for (let i = 0; i < count; i++) {
      newDecorations.push({
        id: i + count,
        type: getRandomType(),
        x: windowSize.width - Math.random() * 100,
        y: (i * windowSize.height) / count + Math.random() * 50,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.2,
        animationDuration: Math.random() * 10 + 10,
      })
    }

    setDecorations(newDecorations)
  }, [windowSize])

  const getRandomType = (): "heart" | "flower" | "sparkle" => {
    const types: ("heart" | "flower" | "sparkle")[] = ["heart", "flower", "sparkle"]
    return types[Math.floor(Math.random() * types.length)]
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {decorations.map((decoration) => (
        <div
          key={decoration.id}
          className="absolute"
          style={{
            left: `${decoration.x}px`,
            top: `${decoration.y}px`,
            transform: `rotate(${decoration.rotation}deg)`,
            opacity: decoration.opacity,
            animation: `float ${decoration.animationDuration}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {decoration.type === "heart" && (
            <svg
              width={decoration.size}
              height={decoration.size}
              viewBox="0 0 24 24"
              fill="#ff5c8f"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {decoration.type === "flower" && (
            <svg
              width={decoration.size}
              height={decoration.size}
              viewBox="0 0 24 24"
              fill="#ffb6c1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,2C9.8,2 8,3.8 8,6C8,8.2 9.8,10 12,10C14.2,10 16,8.2 16,6C16,3.8 14.2,2 12,2M12,14C9.8,14 8,15.8 8,18C8,20.2 9.8,22 12,22C14.2,22 16,20.2 16,18C16,15.8 14.2,14 12,14M6,8C3.8,8 2,9.8 2,12C2,14.2 3.8,16 6,16C8.2,16 10,14.2 10,12C10,9.8 8.2,8 6,8M18,8C15.8,8 14,9.8 14,12C14,14.2 15.8,16 18,16C20.2,16 22,14.2 22,12C22,9.8 20.2,8 18,8Z" />
            </svg>
          )}
          {decoration.type === "sparkle" && (
            <svg
              width={decoration.size}
              height={decoration.size}
              viewBox="0 0 24 24"
              fill="#ffd700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
