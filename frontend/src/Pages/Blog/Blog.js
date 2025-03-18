import { useState } from "react"
import BlogPopup from "./BlogPopup"
import "./Blog.css"

// Sample blog data - in a real application, this would come from an API
const blogData = [
    {
        id: 1,
        title: "The Art of Photography in Modern Education",
        description:
            "Photography has become an essential tool in modern education, allowing students to express creativity while learning technical skills. This visual medium helps students develop critical thinking and observation skills that are valuable across all subjects. Through photography projects, students learn to communicate complex ideas and emotions in a single frame, fostering both artistic expression and analytical thinking.",
        fullContent:
            "Photography has become an essential tool in modern education, allowing students to express creativity while learning technical skills. This visual medium helps students develop critical thinking and observation skills that are valuable across all subjects. Through photography projects, students learn to communicate complex ideas and emotions in a single frame, fostering both artistic expression and analytical thinking.\n\nIn today's digital age, visual literacy is increasingly important. Photography education helps students understand how images convey meaning and influence perception. By analyzing photographs and creating their own, students become more discerning consumers of visual media.\n\nPhotography also serves as an entry point to technology education. Students learn about camera mechanics, lighting principles, and digital editing software. These technical skills can transfer to other areas of study and future career paths.\n\nMoreover, photography encourages students to observe their surroundings more carefully and appreciate details they might otherwise overlook. This heightened awareness can enhance learning across disciplines, from science observations to literary descriptions.\n\nSchools that incorporate photography into their curriculum report increased student engagement and improved attendance. The hands-on, creative nature of photography appeals to diverse learning styles and can reach students who struggle with traditional academic approaches.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery%20popup-4zyb74xOpEiw4eQnwvi7s2mdWSyo8A.png",
        date: "March 15, 2025",
        author: "Emma Johnson",
        category: "Education",
        tags: ["photography", "visual arts", "creative learning", "digital skills"],
    },
    {
        id: 2,
        title: "How Digital Learning is Transforming Classrooms",
        description:
            "The integration of digital tools in education has revolutionized traditional learning environments. Interactive whiteboards, educational apps, and online resources have created more engaging and personalized learning experiences. Students now have access to a wealth of information beyond textbooks, allowing them to explore subjects in greater depth and at their own pace. Teachers are finding new ways to assess understanding and provide immediate feedback through these digital platforms.",
        fullContent:
            "The integration of digital tools in education has revolutionized traditional learning environments. Interactive whiteboards, educational apps, and online resources have created more engaging and personalized learning experiences. Students now have access to a wealth of information beyond textbooks, allowing them to explore subjects in greater depth and at their own pace. Teachers are finding new ways to assess understanding and provide immediate feedback through these digital platforms.\n\nOne of the most significant advantages of digital learning is its ability to personalize education. Adaptive learning technologies can identify each student's strengths and weaknesses, then tailor content accordingly. This individualized approach helps ensure that all students can progress at their optimal pace.\n\nDigital tools also facilitate collaborative learning across distances. Students can now work with peers from different schools, regions, or even countries on shared projects. This global connectivity exposes them to diverse perspectives and prepares them for an increasingly interconnected world.\n\nFor teachers, digital platforms offer powerful assessment capabilities. Real-time data on student performance helps educators identify areas where additional support is needed. Many digital tools also automate grading for certain types of assignments, freeing teachers to focus on more meaningful interactions with students.\n\nHowever, the transition to digital learning comes with challenges. Schools must address issues of digital equity to ensure all students have access to necessary devices and reliable internet connections. Teachers need ongoing professional development to effectively integrate technology into their teaching practices.\n\nDespite these challenges, the benefits of digital learning are compelling. When implemented thoughtfully, digital tools can enhance educational experiences and outcomes for students of all backgrounds and abilities.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-rt8R08tfIH7NnHyfSAaO7CMN1tWO6u.png",
        date: "March 10, 2025",
        author: "Michael Chen",
        category: "Technology",
        tags: ["edtech", "digital learning", "classroom technology", "online education"],
    },
    {
        id: 3,
        title: "The Importance of Collaborative Learning Spaces",
        description:
            "Modern educational environments are increasingly designed to facilitate collaboration and group work. These spaces feature flexible furniture arrangements, shared workstations, and technology that enables students to work together effectively. Research shows that collaborative learning enhances problem-solving abilities, communication skills, and social development. By working together on projects, students learn to value diverse perspectives and develop the teamwork skills essential for future success in the workplace.",
        fullContent:
            "Modern educational environments are increasingly designed to facilitate collaboration and group work. These spaces feature flexible furniture arrangements, shared workstations, and technology that enables students to work together effectively. Research shows that collaborative learning enhances problem-solving abilities, communication skills, and social development. By working together on projects, students learn to value diverse perspectives and develop the teamwork skills essential for future success in the workplace.\n\nThe physical design of learning spaces significantly impacts how students interact and learn. Traditional classrooms with rows of desks facing forward primarily support lecture-based instruction. In contrast, collaborative spaces with modular furniture, writable surfaces, and multiple display areas encourage active, group-based learning.\n\nEffective collaborative spaces are designed with flexibility in mind. Furniture can be easily reconfigured to support different types of activities, from small group discussions to whole-class presentations. This adaptability allows teachers to vary their instructional approaches based on learning objectives.\n\nTechnology plays a crucial role in modern collaborative spaces. Shared digital workspaces allow students to contribute simultaneously to projects, while display screens enable groups to share their work with the class. Wireless connectivity supports seamless information sharing across devices.\n\nBeyond the physical and technological elements, collaborative spaces require thoughtful implementation. Teachers need strategies for forming effective groups, structuring collaborative tasks, and assessing both individual contributions and group outcomes. When these elements come together, collaborative learning spaces can transform educational experiences.\n\nSchools that have invested in collaborative learning environments report numerous benefits, including increased student engagement, improved critical thinking skills, and better preparation for future workplace demands. As our understanding of effective learning continues to evolve, the importance of well-designed collaborative spaces will only grow.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery%20popup-4zyb74xOpEiw4eQnwvi7s2mdWSyo8A.png",
        date: "March 5, 2025",
        author: "Sarah Williams",
        category: "Education",
        tags: ["classroom design", "collaborative learning", "group work", "learning environments"],
    },
    {
        id: 4,
        title: "Balancing Screen Time and Traditional Learning Methods",
        description:
            "As digital devices become more prevalent in education, finding the right balance between screen time and traditional learning methods has become crucial. While technology offers numerous benefits, educators are discovering the continued importance of hands-on activities, face-to-face discussions, and physical books. This balanced approach ensures students develop a full range of skills, from digital literacy to interpersonal communication and fine motor skills. The most effective classrooms integrate both approaches thoughtfully.",
        fullContent:
            "As digital devices become more prevalent in education, finding the right balance between screen time and traditional learning methods has become crucial. While technology offers numerous benefits, educators are discovering the continued importance of hands-on activities, face-to-face discussions, and physical books. This balanced approach ensures students develop a full range of skills, from digital literacy to interpersonal communication and fine motor skills. The most effective classrooms integrate both approaches thoughtfully.\n\nResearch on cognitive development suggests that different learning modalities activate different parts of the brain. Physical manipulation of objects, handwriting, and face-to-face communication develop neural pathways that screen-based activities alone cannot replicate. Conversely, digital tools offer interactive experiences and instant access to information that traditional methods cannot match.\n\nEducators are increasingly adopting a 'blended learning' approach that combines the strengths of both digital and traditional methods. For example, students might research a topic online, discuss their findings in small groups, create physical models to demonstrate concepts, and then use digital tools to present their work.\n\nConsiderations of student well-being also factor into decisions about screen time. Extended periods of screen use can contribute to eye strain, disrupted sleep patterns, and reduced physical activity. By alternating between digital and non-digital activities, teachers can mitigate these potential negative effects.\n\nAge-appropriate balance is essential. Younger children generally benefit from more hands-on, physical learning experiences with limited screen time, while older students can productively engage with digital tools for longer periods. However, students of all ages need opportunities to develop both digital and non-digital skills.\n\nUltimately, the goal is not to choose between traditional and digital approaches, but to thoughtfully integrate both in ways that enhance learning outcomes and support students' overall development.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-rt8R08tfIH7NnHyfSAaO7CMN1tWO6u.png",
        date: "February 28, 2025",
        author: "David Rodriguez",
        category: "Wellness",
        tags: ["screen time", "digital balance", "traditional learning", "student health"],
    },
    {
        id: 5,
        title: "The Rise of Project-Based Learning in Schools",
        description:
            "Project-based learning has gained significant traction in educational institutions worldwide. This approach engages students in solving real-world problems or answering complex questions over an extended period. Through these projects, students develop deeper knowledge of subjects while honing critical thinking, creativity, and communication skills. The hands-on nature of project-based learning makes abstract concepts more concrete and meaningful, leading to better retention and application of knowledge.",
        fullContent:
            "Project-based learning has gained significant traction in educational institutions worldwide. This approach engages students in solving real-world problems or answering complex questions over an extended period. Through these projects, students develop deeper knowledge of subjects while honing critical thinking, creativity, and communication skills. The hands-on nature of project-based learning makes abstract concepts more concrete and meaningful, leading to better retention and application of knowledge.\n\nAt its core, project-based learning is driven by student inquiry. Rather than passively receiving information, students actively investigate questions that matter to them. This ownership over the learning process increases motivation and engagement, addressing one of education's perennial challenges.\n\nEffective project-based learning is carefully structured around clear learning goals. While students have significant autonomy in how they approach projects, teachers ensure that the work aligns with curriculum standards and develops targeted skills. This balance between structure and freedom is essential for successful implementation.\n\nInterdisciplinary connections are a natural outcome of project-based learning. A project focused on designing an environmentally sustainable community, for example, might incorporate elements of science, mathematics, social studies, language arts, and visual arts. These connections help students understand how knowledge and skills from different disciplines work together in real-world contexts.\n\nAssessment in project-based learning often looks different from traditional approaches. While final products are important, the process is equally valued. Students typically document their journey through portfolios, reflections, and presentations, demonstrating not just what they learned but how they learned it.\n\nResearch on project-based learning shows promising results, including improved content knowledge, enhanced critical thinking skills, greater engagement, and better preparation for future learning and work environments. As education continues to evolve toward more authentic and meaningful learning experiences, project-based approaches will likely play an increasingly important role.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery%20popup-4zyb74xOpEiw4eQnwvi7s2mdWSyo8A.png",
        date: "February 20, 2025",
        author: "Lisa Thompson",
        category: "Education",
        tags: ["project-based learning", "student engagement", "authentic learning", "21st century skills"],
    },
    {
        id: 6,
        title: "Creating Inclusive Learning Environments for All Students",
        description:
            "Inclusive education focuses on ensuring all students, regardless of abilities or backgrounds, can participate fully in the learning process. Modern classrooms are implementing universal design principles, diverse teaching methods, and supportive technologies to accommodate different learning styles and needs. By creating environments where every student feels valued and capable, schools are seeing improvements in academic performance, social cohesion, and emotional well-being across their student populations.",
        fullContent:
            "Inclusive education focuses on ensuring all students, regardless of abilities or backgrounds, can participate fully in the learning process. Modern classrooms are implementing universal design principles, diverse teaching methods, and supportive technologies to accommodate different learning styles and needs. By creating environments where every student feels valued and capable, schools are seeing improvements in academic performance, social cohesion, and emotional well-being across their student populations.\n\nThe philosophy of inclusive education represents a shift from viewing student differences as problems to be fixed to seeing diversity as a strength that enriches the learning environment for everyone. This mindset change is fundamental to creating truly inclusive classrooms.\n\nUniversal Design for Learning (UDL) provides a framework for inclusive education by offering multiple means of engagement, representation, and expression. For example, teachers might present information in both visual and auditory formats, allow students to demonstrate learning through various mediums, and provide options for how students engage with content.\n\nSupportive technologies play a crucial role in inclusive classrooms. Text-to-speech software, speech recognition tools, and other assistive technologies remove barriers to learning for students with disabilities. Meanwhile, translation services and culturally responsive digital content support students from diverse linguistic and cultural backgrounds.\n\nTeacher preparation and ongoing professional development are essential components of successful inclusive education. Educators need knowledge about diverse learning needs and strategies for differentiating instruction, as well as attitudes that value all students and believe in their capacity to learn.\n\nCollaboration among general education teachers, special education specialists, families, and support staff creates a network of support for inclusive practices. Regular communication and shared responsibility for student success help ensure that inclusive approaches are implemented consistently and effectively.\n\nResearch consistently shows that well-implemented inclusive education benefits all students, not just those with identified needs. When diversity is embraced and supported, the entire learning community thrives.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-rt8R08tfIH7NnHyfSAaO7CMN1tWO6u.png",
        date: "February 15, 2025",
        author: "James Wilson",
        category: "Inclusion",
        tags: ["inclusive education", "accessibility", "universal design", "educational equity"],
    },
]

function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    // Get all unique categories
    const categories = ["All", ...new Set(blogData.map((blog) => blog.category))]

    // Filter blogs based on category and search term
    const filteredBlogs = blogData.filter((blog) => {
        const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
        const matchesSearch =
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Handle back button click
    const handleBackClick = () => {
        console.log("Back button clicked")
        // In a real application, this would navigate back to the home page
        window.history.back()
    }

    // Open blog popup
    const openBlogPopup = (blogId) => {
        const blog = blogData.find((blog) => blog.id === blogId)
        if (blog) {
            setSelectedBlog(blog)
            setIsPopupOpen(true)
            document.body.style.overflow = "hidden" // Prevent scrolling behind the popup
            console.log("Popup Opened:", blog)
        }
    }

    // Close blog popup
    const closeBlogPopup = () => {
        setIsPopupOpen(false)
        document.body.style.overflow = "auto" // Re-enable scrolling
    }

    return (
        <div className="container">
            <header>
                <h1>OUR BLOG</h1>
                <button className="back-btn" onClick={handleBackClick}>
                    Back
                </button>
            </header>

            <div className="blog-controls">
                <div className="blog-search">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="blog-categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="blog-container">
                {filteredBlogs.map((blog) => (
                    <div className="blog-card" key={blog.id}>
                        <div className="blog-image">
                            <img src={blog.image || "/placeholder.svg"} alt={blog.title} />
                            <div className="blog-category">{blog.category}</div>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span className="blog-date">{blog.date}</span>
                                <span className="blog-author">By {blog.author}</span>
                            </div>
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-description">{blog.description}</p>
                            <button className="read-more-btn" onClick={() => openBlogPopup(blog.id)}>
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div className="no-results">
                    <h3>No blogs found matching your criteria</h3>
                    <p>Try adjusting your search or category selection</p>
                </div>
            )}

            {true && selectedBlog && <BlogPopup blog={selectedBlog} onClose={closeBlogPopup} />}

        </div>
    )
}

export default Blog

