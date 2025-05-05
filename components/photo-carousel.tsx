"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"

interface Photo {
  src: string
  caption?: string
}

interface PhotoCarouselProps {
  photos: Photo[]
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === photos.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  // Auto advance slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [currentIndex])

  if (photos.length === 0) {
    return <div>No photos to display</div>
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
      {/* Main carousel */}
      <div {...handlers} className="relative h-[50vh] md:h-[60vh] bg-black">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.caption || `Photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                <p className="text-center">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous photo"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Next photo"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {photos.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToSlide(dotIndex)}
            className={`w-3 h-3 rounded-full transition-all ${
              dotIndex === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
