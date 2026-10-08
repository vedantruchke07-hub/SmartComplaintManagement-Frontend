import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  PlusCircle,
  FileText,
  Clock3,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Search,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'


function Dashboard() {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // ============================
  // FETCH COMPLAINTS
  // ============================

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(
        'http://https://smartcomplaintmanagement-backend.onrender.com/api/complaints'
      )

      setComplaints(response.data)

    } catch (err) {
      console.error(err)

      setError(
        'Unable to load dashboard data. Please make sure the backend server is running.'
      )

    } finally {
      setLoading(false)
    }
  }


  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComplaints()
  }, [])


  // ============================
  // STATISTICS
  // ============================

  const totalComplaints = complaints.length

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === 'OPEN'
  ).length

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === 'IN_PROGRESS'
  ).length

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === 'RESOLVED'
  ).length


  // ============================
  // RECENT COMPLAINTS
  // ============================

  const recentComplaints = [...complaints]
    .sort((a, b) => {
      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      )
    })
    .slice(0, 5)


  // ============================
  // DATE FORMAT
  // ============================

  const formatDate = (date) => {
    if (!date) {
      return '-'
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
  }


  // ============================
  // STATUS DISPLAY
  // ============================

  const getStatusLabel = (status) => {
    if (status === 'OPEN') {
      return 'Pending'
    }

    if (status === 'IN_PROGRESS') {
      return 'In Progress'
    }

    if (status === 'RESOLVED') {
      return 'Resolved'
    }

    return status || '-'
  }


  const getStatusClass = (status) => {
    if (status === 'OPEN') {
      return 'pending'
    }

    if (status === 'IN_PROGRESS') {
      return 'in-progress'
    }

    if (status === 'RESOLVED') {
      return 'resolved'
    }

    return ''
  }


  // ============================
  // RENDER
  // ============================

  return (
    <section className="dashboard-content">

      {/* ============================
          WELCOME SECTION
      ============================ */}

      <div className="welcome-section">

        <div>

          <p className="eyebrow">
            OVERVIEW
          </p>

          <h2>
            Good Morning, Vedant
          </h2>

          <p>
            Here's what's happening with your complaints today.
          </p>

        </div>


        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >

          <button
            className="text-button"
            onClick={fetchComplaints}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={loading ? 'spin' : ''}
            />

            Refresh
          </button>


          <button
            className="primary-button"
            onClick={() => navigate('/submit')}
          >

            <PlusCircle size={18} />

            Submit Complaint

          </button>

        </div>

      </div>


      {/* ============================
          ERROR
      ============================ */}

      {error && (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 18px',
            marginBottom: '20px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            color: '#b91c1c',
          }}
        >

          <AlertTriangle size={20} />

          <span>
            {error}
          </span>

        </div>

      )}


      {/* ============================
          KPI CARDS
      ============================ */}

      <div className="kpi-grid">

        {/* TOTAL */}

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon blue">
              <FileText size={20} />
            </div>

          </div>

          <div className="kpi-value">
            {loading ? '—' : totalComplaints}
          </div>

          <div className="kpi-label">
            Total Complaints
          </div>

          <div className="kpi-meta">
            All submitted complaints
          </div>

        </div>


        {/* PENDING */}

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon orange">
              <Clock3 size={20} />
            </div>

          </div>

          <div className="kpi-value">
            {loading ? '—' : pendingComplaints}
          </div>

          <div className="kpi-label">
            Pending
          </div>

          <div className="kpi-meta">
            Waiting for action
          </div>

        </div>


        {/* IN PROGRESS */}

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon purple">
              <AlertCircle size={20} />
            </div>

          </div>

          <div className="kpi-value">
            {loading ? '—' : inProgressComplaints}
          </div>

          <div className="kpi-label">
            In Progress
          </div>

          <div className="kpi-meta">
            Currently being handled
          </div>

        </div>


        {/* RESOLVED */}

        <div className="kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon green">
              <CheckCircle2 size={20} />
            </div>

          </div>

          <div className="kpi-value">
            {loading ? '—' : resolvedComplaints}
          </div>

          <div className="kpi-label">
            Resolved
          </div>

          <div className="kpi-meta">
            Successfully completed
          </div>

        </div>

      </div>


      {/* ============================
          DASHBOARD GRID
      ============================ */}

      <div className="dashboard-grid">

        {/* ============================
            RECENT COMPLAINTS
        ============================ */}

        <section className="dashboard-card complaints-card">

          <div className="card-header">

            <div>

              <h3>
                Recent Complaints
              </h3>

              <p>
                Latest complaint activity
              </p>

            </div>


            <button
              className="text-button"
              onClick={() =>
                navigate('/complaints')
              }
            >
              View all
            </button>

          </div>


          {loading ? (

            <div
              style={{
                padding: '50px',
                textAlign: 'center',
              }}
            >

              <RefreshCw
                size={28}
                className="spin"
              />

              <p>
                Loading complaints...
              </p>

            </div>

          ) : recentComplaints.length === 0 ? (

            <div
              style={{
                padding: '50px',
                textAlign: 'center',
              }}
            >

              <FileText
                size={42}
                strokeWidth={1.5}
              />

              <h3>
                No complaints yet
              </h3>

              <p>
                Submit your first complaint to see it here.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  navigate('/submit')
                }
              >
                <PlusCircle size={18} />
                Submit Complaint
              </button>

            </div>

          ) : (

            <div className="table-wrapper">

              <table className="complaint-table">

                <thead>

                  <tr>
                    <th>Complaint ID</th>
                    <th>Category</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>

                </thead>


                <tbody>

                  {recentComplaints.map(
                    (complaint) => (

                      <tr key={complaint.id}>

                        <td>
                          <strong>
                            #{complaint.id}
                          </strong>
                        </td>


                        <td>
                          {complaint.category || '-'}
                        </td>


                        <td>
                          {complaint.department || '-'}
                        </td>


                        <td>

                          <span
                            className={`priority-badge ${
                              complaint.priority
                                ?.toLowerCase() || ''
                            }`}
                          >
                            {complaint.priority || '-'}
                          </span>

                        </td>


                        <td>

                          <span
                            className={`status-badge ${getStatusClass(
                              complaint.status
                            )}`}
                          >

                            <span className="status-dot"></span>

                            {getStatusLabel(
                              complaint.status
                            )}

                          </span>

                        </td>


                        <td>
                          {formatDate(
                            complaint.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ============================
            QUICK ACTIONS
        ============================ */}

        <section className="dashboard-card quick-card">

          <div className="card-header">

            <div>

              <h3>
                Quick Actions
              </h3>

              <p>
                Commonly used actions
              </p>

            </div>

          </div>


          <div className="quick-actions">

            {/* Submit */}

            <button
              className="quick-action"
              onClick={() =>
                navigate('/submit')
              }
            >

              <div className="quick-icon blue">
                <PlusCircle size={20} />
              </div>

              <div>

                <strong>
                  Submit Complaint
                </strong>

                <span>
                  Report a new issue
                </span>

              </div>

            </button>


            {/* Track */}

            <button
              className="quick-action"
              onClick={() =>
                navigate('/track')
              }
            >

              <div className="quick-icon purple">
                <Search size={20} />
              </div>

              <div>

                <strong>
                  Track Complaint
                </strong>

                <span>
                  Check complaint status
                </span>

              </div>

            </button>


            {/* Feedback */}

            <button
              className="quick-action"
              onClick={() =>
                navigate('/feedback')
              }
            >

              <div className="quick-icon green">
                <MessageSquare size={20} />
              </div>

              <div>

                <strong>
                  Give Feedback
                </strong>

                <span>
                  Share your experience
                </span>

              </div>

            </button>

          </div>

        </section>

      </div>

    </section>
  )
}

export default Dashboard