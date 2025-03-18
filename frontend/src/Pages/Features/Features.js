"use client"

import { useEffect, useRef } from "react"
import "./Features.css"

export default function Features() {
  const featuresRef = useRef(null)
  const featureRefs = useRef([])

  // Set up intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    if (featuresRef.current) titleObserver.observe(featuresRef.current)

    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    featureRefs.current.forEach((ref) => {
      if (ref) featureObserver.observe(ref)
    })

    return () => {
      if (featuresRef.current) titleObserver.unobserve(featuresRef.current)
      featureRefs.current.forEach((ref) => {
        if (ref) featureObserver.unobserve(ref)
      })
    }
  }, [])

  // Feature data
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Expert Faculty",
      description:
        "Learn from industry experts and renowned academics who bring real-world experience to the classroom.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Innovative Programs",
      description:
        "Our curriculum is designed to meet the demands of today's rapidly evolving industries and technologies.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Innovative Programs",
      description:
        "Our curriculum is designed to meet the demands of today's rapidly evolving industries and technologies.",
    },
    
  ]

  return (
    <section className="features-section">
      <div className="container">
        <div ref={featuresRef} className="features-header">
          <h2 className="section-title">Why Choose Us</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} ref={(el) => (featureRefs.current[index] = el)} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

