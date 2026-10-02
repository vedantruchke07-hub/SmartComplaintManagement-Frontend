import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  FileText,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  Search,
  RefreshCw,
  PlayCircle,
  CheckCheck,
  AlertTriangle,
  Eye,
} from 'lucide-react'

const API_URL = 'http://localhost:8080/api/complaints'

function AdminDashboard() {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  // =====================================================
  // FETCH COMPLAINTS
  // =====================================================

  const fetchComplaints = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const response = await axios.get(API_URL)

      setComplaints(response.data)
    } catch (err) {
      console.error(err)

      setError(
        'Unable to load complaints. Please check whether the backend is running.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComplaints()
  }, [])

  // =====================================================
  // UPDATE COMPLAINT STATUS
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id)
      setError('')

      await axios.put(
        `${API_URL}/${id}/status`,
        null,
        {
          params: {
            status,
          },
        }
      )

      await fetchComplaints(true)
    } catch (err) {
      console.error(err)

      setError(
        `Failed to update complaint #${id}. Please try again.`
      )
    } finally {
      setUpdatingId(null)
    }
  }

  // =====================================================
  // STATISTICS
  // =====================================================

  const total = complaints.length

  const pending = complaints.filter(
    (complaint) => complaint.status === 'OPEN'
  ).length

  const inProgress = complaints.filter(
    (complaint) => complaint.status === 'IN_PROGRESS'
  ).length

  const resolved = complaints.filter(
    (complaint) => complaint.status === 'RESOLVED'
  ).length

  // =====================================================
  // SEARCH
  // =====================================================

 const filteredComplaints = complaints.filter((complaint) => {
  const search = searchTerm.trim().toLowerCase()

  const matchesSearch =
    !search ||
    String(complaint.id)
      .toLowerCase()
      .includes(search) ||
    (complaint.name || '')
      .toLowerCase()
      .includes(search) ||
    (complaint.category || '')
      .toLowerCase()
      .includes(search) ||
    (complaint.department || '')
      .toLowerCase()
      .includes(search) ||
    (complaint.status || '')
      .toLowerCase()
      .includes(search)

  const path = location.pathname

  const matchesStatus =
    path === '/admin/pending'
      ? complaint.status === 'OPEN'
      : path === '/admin/in-progress'
        ? complaint.status === 'IN_PROGRESS'
        : path === '/admin/resolved'
          ? complaint.status === 'RESOLVED'
          : true

  return matchesSearch && matchesStatus
})
  // =====================================================
  // STATUS HELPERS
  // =====================================================

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

  // =====================================================
  // PRIORITY HELPERS
  // =====================================================

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

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return '—'
    }

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="dashboard-content admin-page">

      {/* =================================================
          PAGE HEADER
          ================================================= */}

      <div className="page-header">

        <div className="page-header-content">

          <div className="page-header-badge">
            <CheckCircle2 size={16} />
            Admin Workspace
          </div>

          <h2>
            Admin Dashboard
          </h2>

          <p>
            Manage student complaints, monitor progress,
            and update complaint status.
          </p>

        </div>

        <button
          className="secondary-button"
          onClick={() => fetchComplaints(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={refreshing ? 'spin' : ''}
          />

          {refreshing
            ? 'Refreshing...'
            : 'Refresh'}
        </button>

      </div>


      {/* =================================================
          ERROR
          ================================================= */}

      {error && (
        <div className="error-banner">

          <AlertTriangle size={18} />

          <span>
            {error}
          </span>

        </div>
      )}


      {/* =================================================
          STATISTICS
          ================================================= */}

      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon blue">
            <FileText size={21} />
          </div>

          <div className="stat-content">

            <span>
              Total Complaints
            </span>

            <strong>
              {total}
            </strong>

          </div>

        </div>


        {/* PENDING */}

        <div className="stat-card">

          <div className="stat-icon orange">
            <Clock3 size={21} />
          </div>

          <div className="stat-content">

            <span>
              Pending
            </span>

            <strong>
              {pending}
            </strong>

          </div>

        </div>


        {/* IN PROGRESS */}

        <div className="stat-card">

          <div className="stat-icon purple">
            <LoaderCircle size={21} />
          </div>

          <div className="stat-content">

            <span>
              In Progress
            </span>

            <strong>
              {inProgress}
            </strong>

          </div>

        </div>


        {/* RESOLVED */}

        <div className="stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div className="stat-content">

            <span>
              Resolved
            </span>

            <strong>
              {resolved}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          COMPLAINT MANAGEMENT
          ================================================= */}

      <div className="dashboard-card admin-complaints-card">

        {/* CARD HEADER */}

        <div className="card-header">

          <div className="card-header-content">

            <h3>
              Complaint Management
            </h3>

            <p>
              Review complaints and manage their
              current status.
            </p>

          </div>


          {/* SEARCH */}

          <div className="table-actions">

            <div className="table-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>

          </div>

        </div>


        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="empty-state">

            <LoaderCircle
              size={30}
              className="spin"
            />

            <p>
              Loading complaints...
            </p>

          </div>
        )}


        {/* =================================================
            EMPTY
            ================================================= */}

        {!loading &&
          filteredComplaints.length === 0 && (
            <div className="empty-state">

              <FileText size={32} />

              <p>
                No complaints found.
              </p>

            </div>
          )}


        {/* =================================================
            TABLE
            ================================================= */}

        {!loading &&
          filteredComplaints.length > 0 && (

            <div className="table-wrapper">

              <table className="complaints-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>

                </thead>


                <tbody>

                  {filteredComplaints.map(
                    (complaint) => {

                      const isUpdating =
                        updatingId === complaint.id

                      return (

                        <tr
                          key={complaint.id}
                        >

                          {/* ID */}

                          <td>
                            <span className="complaint-id">
                              #{complaint.id}
                            </span>
                          </td>


                          {/* STUDENT */}

                          <td>
                            <span className="student-name">
                              {complaint.name ||
                                'Student'}
                            </span>
                          </td>


                          {/* CATEGORY */}

                          <td>
                            {complaint.category ||
                              'General'}
                          </td>


                          {/* DEPARTMENT */}

                          <td>
                            {complaint.department ||
                              'General Department'}
                          </td>


                          {/* PRIORITY */}

                          <td>

                            <span
                              className={`priority-badge ${getPriorityClass(
                                complaint.priority
                              )}`}
                            >
                              {complaint.priority ||
                                'MEDIUM'}
                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`status-badge ${getStatusClass(
                                complaint.status
                              )}`}
                            >
                              {getStatusLabel(
                                complaint.status
                              )}
                            </span>

                          </td>


                          {/* DATE */}

                          <td>
                            {formatDate(
                              complaint.createdAt
                            )}
                          </td>


                          {/* ACTION */}

                          <td>

                            <div className="admin-actions">
                              <button
  type="button"
  className="action-button view-button"
  onClick={() =>
    navigate(`/admin/complaints/${complaint.id}`)
  }
>
  <Eye size={15} />
  View
</button>

                              {/* OPEN → IN_PROGRESS */}

                              {complaint.status ===
                                'OPEN' && (

                                <button
                                  type="button"
                                  className="action-button progress-button"
                                  onClick={() =>
                                    updateStatus(
                                      complaint.id,
                                      'IN_PROGRESS'
                                    )
                                  }
                                  disabled={
                                    isUpdating
                                  }
                                >

                                  {isUpdating ? (
                                    <LoaderCircle
                                      size={15}
                                      className="spin"
                                    />
                                  ) : (
                                    <PlayCircle
                                      size={15}
                                    />
                                  )}

                                  Start

                                </button>
                              )}


                              {/* IN_PROGRESS → RESOLVED */}

                              {complaint.status ===
                                'IN_PROGRESS' && (

                                <button
                                  type="button"
                                  className="action-button resolve-button"
                                  onClick={() =>
                                    updateStatus(
                                      complaint.id,
                                      'RESOLVED'
                                    )
                                  }
                                  disabled={
                                    isUpdating
                                  }
                                >

                                  {isUpdating ? (
                                    <LoaderCircle
                                      size={15}
                                      className="spin"
                                    />
                                  ) : (
                                    <CheckCheck
                                      size={15}
                                    />
                                  )}

                                  Resolve

                                </button>
                              )}


                              {/* RESOLVED */}

                              {complaint.status ===
                                'RESOLVED' && (

                                <span className="completed-label">

                                  <CheckCircle2
                                    size={15}
                                  />

                                  Completed

                                </span>
                              )}

                            </div>

                          </td>

                        </tr>

                      )
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

      </div>

    </section>
  )
}

export default AdminDashboard