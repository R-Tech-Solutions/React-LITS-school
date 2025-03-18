function BlogPopup({ blog, onClose }) {
  // Handle click outside the popup content to close
  const handleOverlayClick = (e) => {
    if (e.target.className === "popup-overlay") {
      onClose()
    }
  }

  // Format the full content with paragraphs
  const formatContent = (content) => {
    return content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="blog-popup-content">
        <div className="popup-header">
          <h2>{blog.title}</h2>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="blog-popup-image">
          <img src={blog.image || "/placeholder.svg"} alt={blog.title} />
          <div className="blog-popup-category">{blog.category}</div>
        </div>

        <div className="blog-popup-meta">
          <span className="blog-popup-date">{blog.date}</span>
          <span className="blog-popup-author">By {blog.author}</span>
        </div>

        <div className="blog-popup-content-text">{formatContent(blog.fullContent || blog.description)}</div>

        {blog.tags && (
          <div className="blog-popup-tags">
            {blog.tags.map((tag, index) => (
              <span key={index} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPopup

