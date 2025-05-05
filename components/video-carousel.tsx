"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useSwipeable } from "react-swipeable"

interface Video {
  src: string
  poster?: string
  caption?: string
}

interface VideoCarouselProps {
  videos: Video[]
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const currentVideo = videoRefs.current[currentIndex]

  const goToPrevious = () => {
    if (currentVideo) {
      currentVideo.pause()
      setIsPlaying(false)
    }

    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? videos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    if (currentVideo) {
      currentVideo.pause()
      setIsPlaying(false)
    }

    const isLastSlide = currentIndex === videos.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const togglePlay = () => {
    if (!currentVideo) return

    if (isPlaying) {
      currentVideo.pause()
    } else {
      currentVideo.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!currentVideo) return

    currentVideo.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length)
  }, [videos])

  // Handle video end
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsPlaying(false)
    }

    const video = videoRefs.current[currentIndex]
    if (video) {
      video.addEventListener("ended", handleVideoEnd)
      return () => {
        video.removeEventListener("ended", handleVideoEnd)
      }
    }
  }, [currentIndex])

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  if (videos.length === 0) {
    return <div>No videos to display</div>
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
      {/* Videos */}
      <div {...handlers} className="relative aspect-video w-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              poster={video.poster}
              className="w-full h-full object-contain"
              preload="metadata"
              playsInline
              muted={isMuted}
            />
            {video.caption && (
              <div className="absolute bottom-16 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                <p className="text-center">{video.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-4 z-20 flex items-center justify-between">
        <button
          onClick={togglePlay}
          className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm">
            {currentIndex + 1} / {videos.length}
          </span>
          <button
            onClick={goToNext}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
            aria-label="Next video"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button
          onClick={toggleMute}
          className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  )
}
