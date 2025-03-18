import { useState, useEffect, useRef } from "react"
import "./HeroSlider.css"
import New01 from "../../Assets/images/back.jpg"
import New02 from "../../Assets/images/back01.jpg"
import New03 from "../../Assets/images/back02.jpg"
import New04 from "../../Assets/images/back.jpg"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)

  const sliderImages = [
    {
      url: New01,
    },
    {
      url: New02,
    },
    {
      url: New03,
    },
    {
      url: New04,
    },
  ]

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Auto play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 1000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentSlide])

  // Pause auto play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <section className="hero-section">
      <div className="hero-background" style={{ backgroundImage: `url(${sliderImages[currentSlide].url})`}}></div>
      <div className="hero-container">
        <div className="hero-content">
          {/* Left side - Slider */}
          <div className="slider-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="slider">
              {sliderImages.map((image, index) => (
                <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
                  <img src={image.url || "/placeholder.svg"} alt={image.title} className="slide-image" />
                </div>
              ))}
              {/* Dots indicator */}
              <div className="slider-dots">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="hero-text">
            <h1 className="hero-title">Empowering Minds, Shaping Futures</h1>
            <p className="hero-description">
              Welcome to our educational institution where excellence meets innovation. We provide a comprehensive
              learning environment that nurtures critical thinking, creativity, and personal growth.
            </p>
            <p className="hero-description">
              Our dedicated faculty and state-of-the-art facilities ensure that students receive the highest quality
              education, preparing them for success in an ever-changing global landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

