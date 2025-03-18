"use client"

import { useEffect, useRef } from "react"
import "./VisionMission.css"

export default function VisionMission() {
  const visionRef = useRef(null)
  const missionRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    if (visionRef.current) observer.observe(visionRef.current)
    if (missionRef.current) observer.observe(missionRef.current)

    return () => {
      if (visionRef.current) observer.unobserve(visionRef.current)
      if (missionRef.current) observer.unobserve(missionRef.current)
    }
  }, [])

  return (
    <section className="vision-mission-section" id="vision">
      <div className="container">
        <div className="vision-mission-grid">
          {/* Vision */}
          <div ref={visionRef} className="vision-mission-card vision-card">
            <div className="card-accent"></div>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="card-title">Our Vision</h2>
            <p className="card-text">
              To be a globally recognized center of educational excellence, fostering innovative thinking and creating
              leaders who positively impact society.
            </p>
            <p className="card-text">
              We envision a future where our graduates are at the forefront of solving complex global challenges through
              critical thinking, collaboration, and ethical leadership.
            </p>
            <div className="card-decoration"></div>
          </div>

          {/* Mission */}
          <div ref={missionRef} className="vision-mission-card mission-card">
            <div className="card-accent"></div>
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h2 className="card-title">Our Mission</h2>
            <p className="card-text">
              To provide transformative educational experiences that prepare students for success in a diverse and
              interconnected world.
            </p>
            <div className="card-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

