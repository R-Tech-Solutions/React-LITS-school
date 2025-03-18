import { Users, BookOpen, Video, FileText, TrendingUp, Calendar } from "lucide-react"
import "../styles/dashboard.css"

function Dashboard() {
  // Sample data for dashboard stats
  const stats = [
    { title: "Total Students", value: "1,245", icon: <Users size={24} />, color: "blue" },
    { title: "Total Courses", value: "42", icon: <BookOpen size={24} />, color: "green" },
    { title: "Total Lectures", value: "156", icon: <Video size={24} />, color: "purple" },
    { title: "Blog Posts", value: "38", icon: <FileText size={24} />, color: "orange" },
  ]

  // Sample data for recent activities
  const recentActivities = [
    { id: 1, action: "New course added", course: "Advanced Mathematics", time: "2 hours ago" },
    { id: 2, action: "New student enrolled", course: "Web Development", time: "5 hours ago" },
    { id: 3, action: "Course updated", course: "Introduction to Physics", time: "1 day ago" },
    { id: 4, action: "New blog post published", course: "Learning Strategies", time: "2 days ago" },
  ]

  return (
    <div className="dashboard">
      <div className="page-title">
        <h2>Dashboard</h2>
        <p>Welcome to your education admin dashboard</p>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className={`stat-card ${stat.color}`} key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-activities">
          <div className="card-header">
            <h3>Recent Activities</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-icon">
                  <Calendar size={16} />
                </div>
                <div className="activity-details">
                  <p className="activity-title">{activity.action}</p>
                  <p className="activity-course">{activity.course}</p>
                </div>
                <p className="activity-time">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card performance">
          <div className="card-header">
            <h3>Performance Overview</h3>
          </div>
          <div className="performance-chart">
            <div className="chart-placeholder">
              <TrendingUp size={48} />
              <p>Course Enrollment Trends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

