import { useState, useEffect, useRef } from "react"
import axios from "axios"
import "./HeroSlider.css"
import { backEndURL } from "../../Backendurl";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)
  const [heroText, setHeroText] = useState({ textTitle: "", textDetails: "" })
  const [sliderImages, setSliderImages] = useState([]) // State to hold the images

  // Fetch hero text and images from the backend API
  useEffect(() => {
    // Fetch hero text
    axios
      .get(`${backEndURL}/api/hero-text`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setHeroText(response.data[0])
        }
      })
      .catch((error) => {
        console.error("Error fetching hero text:", error)
      })

    // Fetch hero images
    axios
      .get(`${backEndURL}/api/hero-image`)
      .then((response) => {
        const images = response.data;
        setSliderImages(images); // Set the slider images
        setCurrentSlide(0); // Reset current slide to the first image

        // Preload images
        images.forEach(image => {
          const img = new Image();
          img.src = image.imageData;
        });
      })
      .catch((error) => {
        console.error("Error fetching hero images:", error)
      })
  }, [])

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
      }, 2000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, sliderImages.length]) // Added sliderImages.length to dependencies

  // Pause auto play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <section className="hero-section">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${sliderImages[currentSlide]?.imageData || "/placeholder.svg"})` }} // Use fetched image
      ></div>
      <div className="hero-container">
        <div className="hero-content">
          {/* Left side - Slider */}
          <div
            className="slider-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="slider">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                >
                  <img
                    src={image.imageData || "/placeholder.svg"} // Use the fetched image
                    alt={`Slide ${index + 1}`}
                    className="slide-image"
                    loading="lazy" // Lazy loading for images
                  />
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
            <h1 className="hero-title">{heroText.textTitle || "Empowering Minds, Shaping Futures"}</h1>
            <p className="hero-description">
              {heroText.textDetails ||
                "Welcome to our educational institution where excellence meets innovation. We provide a comprehensive learning environment that nurtures critical thinking, creativity, and personal growth."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
