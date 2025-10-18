"use client"

import { useEffect, useState, useRef } from "react"

export function IntroVideo() {
  const [showIntro, setShowIntro] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // 세션 스토리지에서 인트로 재생 여부 확인
    const played = sessionStorage.getItem("intro-played")
    if (!played) {
      setShowIntro(true)
      // 비디오 자동 재생 시도
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log("Autoplay prevented:", error)
          })
        }
      }, 100)
    } else {
      setHasPlayed(true)
    }
  }, [])

  const handleVideoEnd = () => {
    sessionStorage.setItem("intro-played", "true")
    setShowIntro(false)
    setHasPlayed(true)
  }

  if (!showIntro || hasPlayed) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: "#efefef" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={true}
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain"
      >
        <source src="/local-intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

