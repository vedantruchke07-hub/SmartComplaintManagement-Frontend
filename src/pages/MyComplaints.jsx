import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FileText,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react'

function MyComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get('/api/complaints')
      setComplaints(response.data)
    } catch (err) {
      console.error(err)
      setError(
        'Unable to load complaints. Please make sure the backend server is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter((complaint) => {
    const text = search.toLowerCase()

    return (
      String(complaint.id).includes(text) ||
      complaint.category?.toLowerCase().includes(text) ||
      complaint.department?.toLowerCase().includes(text) ||
      complaint.status?.toLowerCase().includes(text) ||
      complaint.currentAuthority?.toLowerCase().includes(text) ||
      complaint.lastActionRemark?.toLowerCase().includes(text)
    )
  })

  const getPriorityClass = (priority) => {
    return priority?.toLowerCase() || ''
  }

  const getStatusClass = (status) => {
    return status?.toLowerCase().replace(/\s+/g, '-') || ''
  }

  const formatAuthority = (authority) => {
    if (!authority) return 'Not assigned'

    return authority
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  const formatDate = (date) => {
    if (!date) return '-'

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section className="dashboard-content">
      {/* HEADER */}
      <div className="welcome-section">
        <div>
          <p className="eyebrow">COMPLAINTS</p>
          <h2>My Complaints</h2>
          <p>View and track all your submitted complaints.</p>
        </div>

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
      </div>

      {/* ERROR */}
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
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* MAIN CARD */}
      <section className="dashboard-card complaints-card">
        <div className="card-header">
          <div>
            <h3>Complaint History</h3>
            <p>
              {filteredComplaints.length}{' '}
              {filteredComplaints.length === 1
                ? 'complaint'
                : 'complaints'}{' '}
              found
            </p>
          </div>

          {/* SEARCH */}
          <div
            className="search-box"
            style={{ maxWidth: '280px' }}
          >
            <Search size={17} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
            }}
          >
            <RefreshCw size={28} className="spin" />
            <p>Loading complaints...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          /* EMPTY STATE */
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
            }}
          >
            <FileText size={42} strokeWidth={1.5} />
            <h3>No complaints found</h3>
            <p>
              {search
                ? 'Try a different search term.'
                : 'You have not submitted any complaints yet.'}
            </p>
          </div>
        ) : (
          /* COMPLAINT TABLE */
          <div className="table-wrapper">
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Category</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Current Authority</th>
                  <th>Escalation Details</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>
                      <strong>#{complaint.id}</strong>
                    </td>

                    <td>{complaint.category || '-'}</td>

                    <td>{complaint.department || '-'}</td>

                    <td>
                      <span
                        className={`priority-badge ${getPriorityClass(
                          complaint.priority
                        )}`}
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
                        {complaint.status || '-'}
                      </span>
                    </td>

                    {/* CURRENT AUTHORITY */}
                    <td>
                      <span className="status-badge">
                        {formatAuthority(complaint.currentAuthority)}
                      </span>
                    </td>


{/* ESCALATION DETAILS */}
<td>
  <div>
    <strong>
      {complaint.higherAuthorityEmailSent
        ? 'Higher Authority notified'
        : complaint.principalEmailSent
        ? 'Principal notified'
        : complaint.escalatedAt
        ? 'Escalated'
        : 'Not escalated'}
    </strong>

    {complaint.escalatedAt && (
      <div style={{ fontSize: '12px', marginTop: '4px' }}>
        {formatDate(complaint.escalatedAt)}
      </div>
    )}

    {complaint.lastActionRemark && (
      <div
        style={{
          fontSize: '12px',
          marginTop: '4px',
          maxWidth: '260px'
        }}
      >
        {complaint.lastActionRemark}
      </div>
    )}
  </div>
</td>


                    {/* DATE */}
                    <td>{formatDate(complaint.createdAt)}</td>

                    {/* ACTION */}
                    <td>
                      <button
                        className="icon-button"
                        title="View complaint"
                        onClick={() =>
                          alert(
                            `Complaint ID: ${complaint.id}\n` +
                            `Authority: ${formatAuthority(complaint.currentAuthority)}\n` +
                            `Status: ${complaint.status || '-'}\n` +
                            `Escalation: ${complaint.escalatedAt ? formatDate(complaint.escalatedAt) : 'Not escalated'}\n` +
                            `Last action: ${complaint.lastActionRemark || 'No action recorded'}`
                          )
                        }
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default MyComplaints