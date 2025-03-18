import { useEffect, useRef } from "react"
import "./Testimonials.css"


export default function Testimonials() {
  const marqueeRef = useRef(null)

  const testimonials = [
    { id: 1, text: "The education I received here transformed my career path completely.", author: "Jane D., Alumni" },
    {
      id: 2,
      text: "Professors are not just teachers but mentors who guide you through your journey.",
      author: "Michael R., Current Student",
    },
    { id: 3, text: "The campus facilities and resources are world-class.", author: "Sarah T., Parent" },
    { id: 4, text: "I've made connections that will last a lifetime.", author: "David L., Graduate" },
    { id: 5, text: "The practical approach to learning prepared me for the real world.", author: "Emily K., Alumni" },
  ]

  // Duplicate content for continuous scrolling
  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (marqueeElement) {
      const originalContent = marqueeElement.innerHTML
      marqueeElement.innerHTML = originalContent + originalContent
    }
  }, [])

  return (
    <div className="testimonials-section">
      <div className="marquee-container">
        <div className="marquee" ref={marqueeRef}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

