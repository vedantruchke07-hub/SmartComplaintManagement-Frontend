import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  MessageSquare,
  Star,
  LoaderCircle,
  AlertTriangle,
} from 'lucide-react'

const API_URL = '/api/complaints'
function AdminFeedback() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(API_URL)

        setComplaints(response.data)
      } catch (err) {
        console.error(err)

        setError(
          'Unable to load feedback. Please check whether the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const feedbackList = complaints.filter(
    (complaint) =>
      complaint.feedbackRating !== null &&
      complaint.feedbackRating !== undefined
  )

  const totalFeedback = feedbackList.length

  const averageRating =
    totalFeedback > 0
      ? (
          feedbackList.reduce(
            (sum, complaint) =>
              sum + complaint.feedbackRating,
            0
          ) / totalFeedback
        ).toFixed(1)
      : '0.0'

  return (
    <section className="dashboard-content admin-page">
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-header-badge">
            <MessageSquare size={16} />
            Feedback Management
          </div>

          <h2>Student Feedback</h2>

          <p>
            Review feedback submitted after complaint resolution.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <LoaderCircle size={30} className="spin" />
          <p>Loading feedback...</p>
        </div>
      ) : error ? (
        <div className="error-banner">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <MessageSquare size={21} />
              </div>

              <div>
                <span>Total Feedback</span>
                <strong>{totalFeedback}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon yellow">
                <Star size={21} />
              </div>

              <div>
                <span>Average Rating</span>
                <strong>{averageRating}/5</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Feedback Records</h3>
                <p>
                  Feedback received from students.
                </p>
              </div>
            </div>

            {feedbackList.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={30} />

                <p>No feedback submitted yet.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="complaints-table">
                  <thead>
                    <tr>
                      <th>Complaint ID</th>
                      <th>Student</th>
                      <th>Rating</th>
                      <th>Comment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feedbackList.map((complaint) => (
                      <tr key={complaint.id}>
                        <td>
                          #{complaint.id}
                        </td>

                        <td>
                          {complaint.name || 'Student'}
                        </td>

                        <td>
                          <strong>
                            ⭐ {complaint.feedbackRating}/5
                          </strong>
                        </td>

                        <td>
                          {complaint.feedbackComment ||
                            'No comment'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default AdminFeedback