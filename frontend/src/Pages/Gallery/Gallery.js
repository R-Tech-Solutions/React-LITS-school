import React, { useState } from "react"
import { X, Maximize2, Info } from "lucide-react"
import "./Gallary.css"
import NewImage from "../../Assets/images/Chinese.jpg"
// Gallery data with categories and items
const galleryData = {
  nature: {
    title: "Nature",
    description:
      "Beautiful landscapes and natural wonders from around the world. Explore mountains, forests, oceans, and more in this stunning collection of natural beauty.",
    thumbnail: "/Chinese.jpg",
    items: [
      {
        id: 1,
        type: "image",
        src: "/Chinese.jpg",
        caption: "Mountain landscape",
        details: "Majestic mountain peaks rising above the clouds, captured at sunrise.",
      },
      {
        id: 2,
        type: "image",
        src: "/Russian.jpg",
        caption: "Forest view",
        details: "Dense forest with sunlight filtering through the canopy, creating a magical atmosphere.",
      },
      {
        id: 3,
        type: "image",
        src: NewImage,
        caption: "Ocean sunset",
        details: "Breathtaking sunset over calm ocean waters, with vibrant orange and purple hues.",
      },
      {
        id: 4,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Desert dunes",
        details: "Rolling sand dunes stretching to the horizon, shaped by wind and time.",
      },
    ],
  },
  architecture: {
    title: "Architecture",
    description:
      "Impressive buildings and structures from around the world, showcasing human ingenuity and artistic vision in construction and design.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    items: [
      {
        id: 1,
        type: "image",
        src: NewImage,
        caption: "Modern skyscraper",
        details: "Cutting-edge skyscraper with innovative design elements, towering above the city skyline.",
      },
      {
        id: 2,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Historic castle",
        details: "Medieval castle with centuries of history, featuring impressive stonework and defensive structures.",
      },
      {
        id: 3,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Bridge design",
        details: "Engineering marvel spanning across a river, combining functionality with aesthetic beauty.",
      },
      {
        id: 4,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Ancient temple",
        details:
          "Sacred structure built thousands of years ago, showcasing remarkable preservation and cultural significance.",
      },
    ],
  },
  animals: {
    title: "Animals",
    description:
      "Wildlife and animal photography capturing the diversity and beauty of the animal kingdom in their natural habitats.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    items: [
      {
        id: 1,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Lion in savanna",
        details: "Powerful lion resting in the golden grass of the African savanna at dusk.",
      },
      {
        id: 2,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Polar bear",
        details:
          "Majestic polar bear navigating ice floes in the Arctic, showcasing adaptation to extreme environments.",
      },
      {
        id: 3,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Tropical birds",
        details: "Colorful tropical birds displaying vibrant plumage in the rainforest canopy.",
      },
      {
        id: 4,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Underwater reef",
        details:
          "Diverse marine life thriving among coral reefs, creating an underwater paradise of color and movement.",
      },
    ],
  },
  food: {
    title: "Food",
    description:
      "Delicious cuisine from around the world, showcasing culinary artistry, cultural traditions, and mouthwatering presentations.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    items: [
      {
        id: 1,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Gourmet dish",
        details: "Expertly crafted fine dining creation with meticulous plating and premium ingredients.",
      },
      {
        id: 2,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Dessert platter",
        details: "Assortment of decadent desserts featuring chocolate, fruit, and artistic sugar work.",
      },
      {
        id: 3,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Fresh ingredients",
        details: "Vibrant, farm-fresh produce arranged to showcase natural colors and textures.",
      },
      {
        id: 4,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Street food",
        details: "Authentic street food capturing the essence of local culinary traditions and bold flavors.",
      },
    ],
  },
  travel: {
    title: "Travel",
    description:
      "Destinations and travel experiences from across the globe, inspiring wanderlust and showcasing cultural diversity and natural wonders.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    items: [
      {
        id: 1,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "City skyline",
        details:
          "Dramatic urban skyline illuminated at night, showcasing architectural achievements and city planning.",
      },
      {
        id: 2,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Beach resort",
        details: "Idyllic tropical beach resort with crystal clear waters and pristine white sand beaches.",
      },
      {
        id: 3,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Mountain hiking",
        details: "Adventurous hiking trail winding through rugged mountain terrain with breathtaking vistas.",
      },
      {
        id: 4,
        type: "image",
        src: "/placeholder.svg?height=600&width=800",
        caption: "Cultural festival",
        details: "Vibrant local festival celebrating cultural heritage with traditional costumes, music, and dance.",
      },
    ],
  },
}

// JavaScript-only React implementation (no JSX)
export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupAnimation, setPopupAnimation] = useState("")
  const [previewItem, setPreviewItem] = useState(null)
  const [detailPopup, setDetailPopup] = useState(null)
  const [detailAnimation, setDetailAnimation] = useState("")
  const [loadedItems, setLoadedItems] = useState([])

  // Handle opening the main popup with animation
  const openPopup = (category) => {
    setSelectedCategory(category)
    setPopupAnimation("popup-enter")
    setIsPopupOpen(true)

    // Stagger the loading of items for animation
    const items = galleryData[category].items
    setLoadedItems([])

    items.forEach((item, index) => {
      setTimeout(
        () => {
          setLoadedItems((prev) => [...prev, item.id])
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

  // Handle opening the detail popup with animation
  const openDetailPopup = (item, event) => {
    event.stopPropagation()
    setDetailPopup(item)
    setDetailAnimation("detail-enter")
  }

  // Handle closing the detail popup with animation
  const closeDetailPopup = (event) => {
    event.stopPropagation()
    setDetailAnimation("detail-exit")
    setTimeout(() => {
      setDetailPopup(null)
    }, 300) // Match this with the CSS animation duration
  }

  const showPreview = (item) => {
    setPreviewItem(item)
  }

  const hidePreview = () => {
    setPreviewItem(null)
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
            key: "image-container",
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
            key: "overlay",
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
            React.createElement("img", {
              src: detailPopup.src,
              alt: detailPopup.caption,
              className: "detail-image",
            }),
          ),

          React.createElement(
            "div",
            {
              key: "detail-info",
              className: "detail-info",
            },
            [
              React.createElement(
                "h3",
                {
                  key: "detail-title",
                  className: "detail-title",
                },
                detailPopup.caption,
              ),

              React.createElement(
                "p",
                {
                  key: "detail-description",
                  className: "detail-description",
                },
                detailPopup.details,
              ),
            ],
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
              key: "banner",
              className: "popup-banner",
            },
            [
              React.createElement(
                "h2",
                {
                  key: "title",
                  className: "popup-title",
                },
                galleryData[selectedCategory].title,
              ),
              React.createElement(
                "button",
                {
                  key: "close",
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
                galleryData[selectedCategory].items.map((item) =>
                  React.createElement(
                    "div",
                    {
                      key: item.id,
                      className: `gallery-item ${loadedItems.includes(item.id) ? "item-loaded" : ""}`,
                      onMouseEnter: () => showPreview(item),
                      onMouseLeave: hidePreview,
                    },
                    [
                      React.createElement(
                        "div",
                        {
                          key: "img-container",
                          className: "gallery-item-container",
                        },
                        React.createElement("img", {
                          src: item.src,
                          alt: item.caption,
                          className: "gallery-item-image",
                        }),
                      ),
                      React.createElement(
                        "div",
                        {
                          key: "item-overlay",
                          className: "gallery-item-overlay",
                        },
                        [
                          React.createElement(
                            "span",
                            {
                              key: "item-caption",
                              className: "gallery-item-caption",
                            },
                            item.caption,
                          ),
                          React.createElement(
                            "button",
                            {
                              key: "detail-button",
                              className: "detail-button",
                              onClick: (e) => openDetailPopup(item, e),
                              "aria-label": "View details",
                            },
                            React.createElement(Info, { size: 20 }),
                          ),
                        ],
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
                        React.createElement("img", {
                          key: "preview-img",
                          src: previewItem.src,
                          alt: previewItem.caption,
                          className: "preview-image",
                        }),
                        React.createElement(
                          "div",
                          {
                            key: "preview-info",
                            className: "preview-info",
                          },
                          [
                            React.createElement(
                              "p",
                              {
                                key: "preview-caption",
                                className: "preview-caption",
                              },
                              previewItem.caption,
                            ),
                            React.createElement(
                              "button",
                              {
                                key: "expand-button",
                                className: "expand-button",
                                onClick: (e) => openDetailPopup(previewItem, e),
                                "aria-label": "Expand view",
                              },
                              React.createElement(Maximize2, { size: 16 }),
                            ),
                          ],
                        ),
                      ]
                      : React.createElement(
                        "p",
                        {
                          className: "preview-placeholder",
                        },
                        "Hover over an image to preview",
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

    React.createElement(
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

