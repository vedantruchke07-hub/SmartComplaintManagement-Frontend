import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import {
  ArrowLeft,
  LoaderCircle,
  AlertTriangle,
  FileText,
  User,
  Mail,
  Tag,
  Clock3,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'

const API_URL = 'http://localhost:8080/api/complaints'

function AdminComplaintDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(`${API_URL}/${id}`)
        setComplaint(response.data)
      } catch (err) {
        console.error(err)
        setError(
          'Unable to load complaint details. Please check whether the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchComplaint()
  }, [id])

  const getStatusLabel = (status) => {
    switch (status) {
      case 'OPEN':
        return 'Pending'

      case 'IN_PROGRESS':
        return 'In Progress'

      case 'RESOLVED':
        return 'Resolved'

      default:
        return status || 'Unknown'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'OPEN':
        return 'status-pending'

      case 'IN_PROGRESS':
        return 'status-progress'

      case 'RESOLVED':
        return 'status-resolved'

      default:
        return ''
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'priority-high'

      case 'LOW':
        return 'priority-low'

      default:
        return 'priority-medium'
    }
  }

  const formatDate = (date) => {
    if (!date) {
      return '—'
    }

    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <section className="dashboard-content">
        <div className="empty-state">
          <LoaderCircle size={30} className="spin" />
          <p>Loading complaint details...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="dashboard-content">
        <div className="error-banner">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft size={17} />
          Back to Admin Dashboard
        </button>
      </section>
    )
  }

  if (!complaint) {
    return null
  }

  return (
    <section className="dashboard-content admin-details-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-content">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft size={17} />
            Back to Admin Dashboard
          </button>

          <div className="page-header-badge">
            <FileText size={16} />
            Complaint Details
          </div>

          <h2>Complaint #{complaint.id}</h2>
          <div style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
  TEST FEEDBACK PAGE
</div>

          <p>
            Review the complete complaint information and current
            status.
          </p>

        </div>
      </div>


      {/* DETAILS GRID */}
      <div className="details-grid">

        {/* LEFT SIDE */}
        <div className="dashboard-card details-main-card">

          <div className="card-header">
            <div>
              <h3>Complaint Information</h3>
              <p>Details submitted by the student.</p>
            </div>

            <span
              className={`status-badge ${getStatusClass(
                complaint.status
              )}`}
            >
              {getStatusLabel(complaint.status)}
            </span>
          </div>


          <div className="details-content">

            {/* DESCRIPTION */}
            <div className="detail-section">

              <div className="detail-section-title">
                <FileText size={18} />
                <h4>Description</h4>
              </div>

              <div className="description-box">
                {complaint.description ||
                  'No description provided.'}
              </div>

            </div>


            {/* CLASSIFICATION */}
            <div className="detail-section">

              <div className="detail-section-title">
                <Tag size={18} />
                <h4>Classification</h4>
              </div>


              <div className="details-info-grid">

                <div className="detail-item">
                  <span>Category</span>

                  <strong>
                    {complaint.category || 'General'}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Department</span>

                  <strong>
                    {complaint.department ||
                      'General Department'}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Priority</span>

                  <strong>
                    <span
                      className={`priority-badge ${getPriorityClass(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority || 'MEDIUM'}
                    </span>
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Submitted On</span>

                  <strong>
                    {formatDate(complaint.createdAt)}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="details-side-column">

          {/* STUDENT INFORMATION */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h3>Student Information</h3>
                <p>Complaint submitted by</p>
              </div>
            </div>


            <div className="student-details">

              <div className="student-detail-row">

                <div className="detail-icon">
                  <User size={17} />
                </div>

                <div>
                  <span>Name</span>

                  <strong>
                    {complaint.name || 'Student'}
                  </strong>
                </div>

              </div>


              <div className="student-detail-row">

                <div className="detail-icon">
                  <Mail size={17} />
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {complaint.email || 'Not provided'}
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* CURRENT STATUS */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h3>Current Status</h3>
                <p>Complaint progress</p>
              </div>
            </div>


            <div className="status-detail">

              <div
                className={`large-status-icon ${getStatusClass(
                  complaint.status
                )}`}
              >
                {complaint.status === 'RESOLVED' ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <Clock3 size={24} />
                )}
              </div>


              <div>
                <span>Status</span>

                <strong>
                  {getStatusLabel(complaint.status)}
                </strong>
              </div>

            </div>

          </div>


          {/* STUDENT FEEDBACK */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h3>Student Feedback</h3>

                <p>
                  Feedback submitted by the student.
                </p>
              </div>

            </div>


            <div className="feedback-details">

              {/* RATING */}
              <div className="feedback-rating">

                <span>Rating</span>

                <strong>
                  {complaint.feedbackRating !== null &&
                  complaint.feedbackRating !== undefined
                    ? `${complaint.feedbackRating}/5`
                    : 'Not provided'}
                </strong>

              </div>


              {/* COMMENT */}
              <div className="feedback-comment">

                <div className="detail-section-title">
                  <MessageSquare size={17} />
                  <h4>Comment</h4>
                </div>


                <p>
                  {complaint.feedbackComment ||
                    'No feedback comment provided.'}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default AdminComplaintDetails