import React, { useState, useEffect } from "react"
import { X, } from "lucide-react"
import "./Gallary.css"
import { backEndURL } from "../../Backendurl"
import { Commet } from "react-loading-indicators" // Import the loader component

// Fetch gallery data from the backend
const fetchGalleryData = async () => {
  const response = await fetch(`${backEndURL}/api/gallery`)
  const data = await response.json()
  return data 
}

const preloadVideos = (items) => {
  items.forEach((item) => {
    if (item.includes("data:video")) {
      const video = document.createElement("video")
      video.src = item
    }
  })
}

export default function Gallery() {
  const [galleryData, setGalleryData] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupAnimation, setPopupAnimation] = useState("")
  const [previewItem, setPreviewItem] = useState(null)
  const [detailPopup, setDetailPopup] = useState(null)
  const [detailAnimation, setDetailAnimation] = useState("")
  const [loadedItems, setLoadedItems] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    const loadGalleryData = async () => {
      const data = await fetchGalleryData()
      setGalleryData(data)
      setIsLoading(false) // Set loading to false after data is fetched

      // Preload videos to reduce lag
      Object.keys(data).forEach((category) => {
        const items = [...data[category].subImages, ...data[category].subVideos]
        preloadVideos(items)
      })
    }
    loadGalleryData()

    // Add ResizeObserver to handle resize events
    const resizeObserver = new ResizeObserver(() => {
      try {
        // Your resize handling logic here
      } catch (error) {
        console.error("ResizeObserver error:", error)
      }
    })

    // Observe the gallery container
    const galleryContainer = document.querySelector(".gallery-container")
    if (galleryContainer) {
      resizeObserver.observe(galleryContainer)
    }

    // Cleanup observer on component unmount
    return () => {
      if (galleryContainer) {
        resizeObserver.unobserve(galleryContainer)
      }
    }
  }, [])

  // Handle opening the main popup with animation
  const openPopup = (category) => {
    setSelectedCategory(category)
    setPopupAnimation("popup-enter")
    setIsPopupOpen(true)

    // Stagger the loading of items for animation
    const items = [...galleryData[category].subImages, ...galleryData[category].subVideos]
    setLoadedItems([])

    items.forEach((item, index) => {
      setTimeout(
        () => {
          setLoadedItems((prev) => [...prev, index])
        },
        100 * (index + 1),
      )
    })
  }

  // Handle closing the main popup with animation
  const closePopup = () => {
    setPopupAnimation("popup-exit")
    setTimeout(() => {
      setIsPopupOpen(false)
      setSelectedCategory(null)
      setPreviewItem(null)
      setLoadedItems([])
    }, 300) // Match this with the CSS animation duration
  }

  const openDetailPopup = (item, event) => {
    event.stopPropagation();
    setDetailPopup(item);
    setDetailAnimation("detail-enter");
  
    if (item.includes("data:video")) {
      setTimeout(() => {
        const videoElement = document.querySelector(".detail-popup video");
        if (videoElement) {
          videoElement.src = item;
          videoElement.load(); // Ensure it loads before playing
          videoElement.muted = true; // Mute the video
          videoElement.oncanplay = () => videoElement.play();
        }
      }, 100); // Add a short delay
    }
  };
  

  // Handle closing the detail popup with animation
  const closeDetailPopup = (event) => {
    event.stopPropagation()
    setDetailAnimation("detail-exit")
    setTimeout(() => {
      setDetailPopup(null)
    }, 300) // Match this with the CSS animation duration
  }

  const showPreview = (item) => {
    setPreviewItem(item);
    if (item.includes("data:video")) {
      setTimeout(() => {
        const videoElement = document.querySelector(".popup-preview video");
        if (videoElement) {
          videoElement.src = item;
          videoElement.load();
          videoElement.muted = true; // Mute the video
          videoElement.oncanplay = () => videoElement.play();
        }
      }, 5);
    }
  };
  

  const hidePreview = () => {
    setPreviewItem(null)
    const videoElement = document.querySelector(".popup-preview video")
    if (videoElement) {
      videoElement.pause()
      videoElement.currentTime = 0
    }
  }

  // Create gallery items using React.createElement
  const galleryItems = Object.keys(galleryData).map((category) => {
    const data = galleryData[category]

    return React.createElement(
      "div",
      {
        key: category,
        className: "category-item",
        onClick: () => openPopup(category),
      },
      [
        React.createElement(
          "div",
          {
            key: `image-container-${category}`, // Add unique key
            className: "category-image-container",
          },
          React.createElement("img", {
            src: data.thumbnail,
            alt: data.title,
            className: "category-thumbnail",
          }),
        ),
        React.createElement(
          "div",
          {
            key: `overlay-${category}`, // Add unique key
            className: "category-overlay",
          },
          React.createElement(
            "h3",
            {
              className: "category-title",
            },
            data.title,
          ),
        ),
      ],
    )
  })

  // Create the detail popup for showing more information
  const detailPopupContent =
    detailPopup &&
    React.createElement(
      "div",
      {
        className: `detail-popup ${detailAnimation}`,
        onClick: closeDetailPopup,
      },
      React.createElement(
        "div",
        {
          className: "detail-popup-content",
          onClick: (e) => e.stopPropagation(),
        },
        [
          React.createElement(
            "button",
            {
              key: "close-detail",
              className: "detail-close-button",
              onClick: closeDetailPopup,
            },
            React.createElement(X, { size: 24 }),
          ),

          React.createElement(
            "div",
            {
              key: "detail-image-container",
              className: "detail-image-container",
            },
            detailPopup.includes("data:image")
              ? React.createElement("img", {
                src: detailPopup,
                alt: "Detail",
                className: "detail-image",
              })
              : React.createElement("video", {
                src: detailPopup,
                alt: "Detail",
                className: "detail-video",
                controls: true,
                autoPlay: true,
                muted: true, // Mute the video
              }),
          ),
        ],
      ),
    )

  // Create main popup content
  const popupContent =
    selectedCategory &&
    React.createElement(
      "div",
      {
        className: `popup-overlay ${popupAnimation}`,
        onClick: closePopup,
      },
      React.createElement(
        "div",
        {
          className: "popup-container",
          onClick: (e) => e.stopPropagation(),
        },
        [
          // Banner
          React.createElement(
            "div",
            {
              key: `banner-${selectedCategory}`, // Add unique key
              className: "popup-banner",
            },
            [
              React.createElement(
                "h2",
                {
                  key: `title-${selectedCategory}`, // Add unique key
                  className: "popup-title",
                },
                galleryData[selectedCategory].title,
              ),
              React.createElement(
                "button",
                {
                  key: `close-${selectedCategory}`, // Add unique key
                  className: "close-button",
                  onClick: closePopup,
                  "aria-label": "Close",
                },
                React.createElement(X, { size: 24 }),
              ),
            ],
          ),

          // Content area
          React.createElement(
            "div",
            {
              key: "content",
              className: "popup-content",
            },
            [
              // Gallery items
              React.createElement(
                "div",
                {
                  key: "items",
                  className: "popup-gallery",
                },
                [...galleryData[selectedCategory].subImages, ...galleryData[selectedCategory].subVideos].map((item, index) =>
                  React.createElement(
                    "div",
                    {
                      key: `gallery-item-${index}`, // Add unique key
                      className: `gallery-item ${loadedItems.includes(index) ? "item-loaded" : ""}`,
                      onMouseEnter: () => showPreview(item),
                      onMouseLeave: hidePreview,
                    },
                    [
                      React.createElement(
                        "div",
                        {
                          key: `img-container-${index}`, // Unique key
                          className: "gallery-item-container",
                        },
                        item.includes("data:image")
                          ? React.createElement("img", {
                              src: item,
                              className: "gallery-item-image",
                            })
                          : React.createElement("video", {
                              src: item,
                              className: "gallery-item-video",
                              controls: true,
                              muted: true, // Mute the video
                              autoPlay: true, // Optional: autoplay the video
                              loop: true, // Optional: loop the video
                            })
                      ),
                    ],
                  ),
                ),
              ),

              // Description and preview
              React.createElement(
                "div",
                {
                  key: "info",
                  className: "popup-info",
                },
                [
                  React.createElement(
                    "div",
                    {
                      key: "description",
                      className: "popup-description",
                    },
                    React.createElement("p", {}, galleryData[selectedCategory].description),
                  ),

                  // Preview area
                  React.createElement(
                    "div",
                    {
                      key: "preview",
                      className: "popup-preview",
                    },
                    previewItem
                      ? [
                        previewItem.includes("data:image")
                          ? React.createElement("img", {
                            key: "preview-img", // Add unique key
                            src: previewItem,
                            alt: "Preview",
                            className: "preview-image",
                          })
                          : React.createElement("video", {
                            key: "preview-video", // Add unique key
                            src: previewItem,
                            className: "preview-video fit-to-card", // Add class to fit the video to the card
                            controls: true,
                            autoPlay: true,
                            muted: true, // Mute the video
                          }),
                      ]
                      : React.createElement(
                        "p",
                        {
                          key: "preview-placeholder", // Add unique key
                          className: "preview-placeholder",
                        },
                        "Hover over an image or video to preview",
                      ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    )

  // Main component
  return React.createElement("div", { className: "gallery-container" }, [
    React.createElement(
      "h1",
      {
        key: "title",
        className: "gallery-heading",
      },
      "Gallery",
    ),

    isLoading
      ? React.createElement("div", { className: "loader-container" }, // Center the loader
          React.createElement(Commet, { color: "#11baff", size: "small" })
        )
      : React.createElement(
          "div",
          {
            key: "gallery",
            className: "category-grid",
          },
          galleryItems,
        ),

    isPopupOpen && popupContent,
    detailPopup && detailPopupContent,
  ])
}

