"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { Heart } from "@/components/heart"
import { PhotoCarousel } from "@/components/photo-carousel"
import { VideoCarousel } from "@/components/video-carousel"
import { HeartCursor } from "@/components/heart-cursor"
import { RenewalForm } from "@/components/renewal-form"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { AudioPlayer } from "@/components/audio-player"
import { SideDecorations } from "@/components/side-decorations"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import config from "@/config"

const playfair = Playfair_Display({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"] })

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const openingRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const secondMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoaded(true)

    // Animate opening section
    const tl = gsap.timeline()
    tl.from(openingRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    })

    // Animate message sections on scroll
    gsap.from(messageRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: messageRef.current,
        start: "top 80%",
      },
    })

    gsap.from(secondMessageRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: secondMessageRef.current,
        start: "top 80%",
      },
    })
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-pink-200 via-rose-100 to-violet-100 z-0" />

      {/* Bokeh/sparkle effect */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-50">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Side decorations */}
      <SideDecorations />

      {/* Trailing heart cursor effect */}
      <HeartCursor />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Opening Section */}
        <section ref={openingRef} className="min-h-[50vh] flex flex-col items-center justify-center py-16">
          <h1
            className={`${dancingScript.className} text-5xl md:text-7xl lg:text-8xl text-center text-pink-600 mb-6`}
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            Happy Birthday Meri Bubuuu!
          </h1>
          <div className="mt-8 w-full max-w-sm mx-auto">
            <Heart />
          </div>
        </section>

        {/* Renewal Form Section */}
        <RenewalForm />

        {/* First Message Section */}
        <section
          ref={messageRef}
          className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg my-16"
        >
          <p className={`${dancingScript.className} text-2xl md:text-3xl text-center text-pink-700 mb-4`}>
            To my incredible girlfriend,
          </p>
          <p className={`${playfair.className} text-lg text-center text-gray-800 leading-relaxed`}>
            {config.firstMessage}
          </p>
        </section>

        {/* Photo Carousel */}
        <section className="my-16">
          <h2 className={`${dancingScript.className} text-3xl md:text-4xl text-center text-pink-600 mb-8`}>
            Our Moments Together
          </h2>
          <PhotoCarousel photos={config.photos} />
        </section>

        {/* Subscription Plans Section */}
        <SubscriptionPlans />

        {/* Second Message Section */}
        <section
          ref={secondMessageRef}
          className="max-w-2xl mx-auto bg-violet-100/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg my-16 border border-violet-200"
        >
          <p className={`${dancingScript.className} text-2xl md:text-3xl text-center text-violet-700 mb-4`}>
            You are special because...
          </p>
          <p className={`${playfair.className} text-lg text-center text-gray-800 leading-relaxed`}>
            {config.secondMessage}
          </p>
        </section>

        {/* Video Carousel */}
        <section className="my-16">
          <h2 className={`${dancingScript.className} text-3xl md:text-4xl text-center text-pink-600 mb-8`}>
            Beautiful Memories
          </h2>
          <VideoCarousel videos={config.videos} />
        </section>

        {/* Audio Player Section */}
        <AudioPlayer />

        {/* Footer */}
        <footer className="text-center py-8 mt-16">
          <p className={`${dancingScript.className} text-xl text-pink-600`}>Made with ❤️ by {config.yourName}</p>
        </footer>
      </div>
    </main>
  )
}
