"use client"

import { useState, useEffect } from "react"

interface Heart {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
  duration: number
}

export function HeartCursor() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [lastAddTime, setLastAddTime] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [touchInterval, setTouchInterval] = useState<NodeJS.Timeout | null>(null)

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const now = Date.now()
      // Only add hearts every 100ms to avoid too many elements
      if (now - lastAddTime > 100) {
        addHeart(e.clientX, e.clientY)
        setLastAddTime(now)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [lastAddTime])

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true)
      const touch = e.touches[0]

      // Vibrate device if supported
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }

      // Create continuous hearts while touching
      const interval = setInterval(() => {
        addHeart(touch.clientX, touch.clientY, true) // true for touch-triggered hearts
      }, 100)

      setTouchInterval(interval)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTouching) {
        const touch = e.touches[0]
        setMousePos({ x: touch.clientX, y: touch.clientY })
      }
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
      if (touchInterval) {
        clearInterval(touchInterval)
        setTouchInterval(null)
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      if (touchInterval) {
        clearInterval(touchInterval)
      }
    }
  }, [isTouching, touchInterval])

  // Remove hearts after their animation completes
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => Date.now() - heart.id < heart.duration))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const addHeart = (x: number, y: number, isTouch = false) => {
    const newHeart: Heart = {
      id: Date.now(),
      x,
      y,
      scale: isTouch ? Math.random() * 1 + 1 : Math.random() * 0.5 + 0.5, // Larger hearts for touch
      opacity: 1,
      duration: Math.random() * 1000 + (isTouch ? 2000 : 1000), // Longer duration for touch
    }

    setHearts((prevHearts) => [...prevHearts, newHeart])
  }

  // Custom cursor style
  const cursorStyle = {
    cursor: "none",
  }

  return (
    <>
      {/* Apply custom cursor to body */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto; /* Restore default cursor on mobile */
          }
        }
      `}</style>

      {/* Heart cursor */}
      <div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff5c8f" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Trailing hearts */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {hearts.map((heart) => {
          const age = Date.now() - heart.id
          const progress = age / heart.duration
          const translateY = progress * -50 // Move up by 50px
          const currentOpacity = Math.max(0, 1 - progress * 1.5)

          return (
            <div
              key={heart.id}
              className="absolute select-none"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${heart.scale})`,
                opacity: currentOpacity,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff5c8f" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )
        })}
      </div>
    </>
  )
}
