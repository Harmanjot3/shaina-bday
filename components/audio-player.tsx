"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dancing_Script } from "next/font/google"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import config from "@/config"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const updateProgress = () => {
    if (!audioRef.current) return

    const { currentTime, duration } = audioRef.current
    if (duration) {
      setProgress((currentTime / duration) * 100)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(updateProgress, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return

    const progressBar = e.currentTarget
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
    const progressBarWidth = progressBar.clientWidth
    const percentage = (clickPosition / progressBarWidth) * 100

    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percentage / 100) * audioRef.current.duration
      setProgress(percentage)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg my-16 border border-pink-200">
      <h2 className={`${dancingScript.className} text-2xl md:text-3xl text-center text-pink-600 mb-4`}>
        Birthday Song
      </h2>

      <div className="flex flex-col items-center">
        <audio
          ref={audioRef}
          src={config.audio.src}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={updateProgress}
          preload="metadata"
        />

        <div className="w-full flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={togglePlay}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <div className="flex-1 max-w-md">
            <div className="h-3 bg-pink-100 rounded-full overflow-hidden cursor-pointer" onClick={handleProgressClick}>
              <div className="h-full bg-pink-500 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <button
            onClick={toggleMute}
            className="text-pink-500 hover:text-pink-600 p-2 rounded-full transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">{config.audio.title}</p>
      </div>
    </div>
  )
}
