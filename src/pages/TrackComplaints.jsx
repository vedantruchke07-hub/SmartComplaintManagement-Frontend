import { useState } from 'react'
import axios from 'axios'
import {
  Search,
  FileText,
  Clock3,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'


function TrackComplaints() {

  const [complaintId, setComplaintId] = useState('')
  const [complaint, setComplaint] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  // ============================
  // SEARCH COMPLAINT
  // ============================

  const handleSearch = async (event) => {

    event.preventDefault()

    setError('')
    setComplaint(null)

    if (!complaintId.trim()) {

      setError(
        'Please enter a complaint ID.'
      )

      return
    }


    try {

      setLoading(true)


      const response = await axios.get(
        `http://localhost:8080/api/complaints/${complaintId.trim()}`
      )


      setComplaint(response.data)

    } catch (err) {

      console.error(err)

      setError(
        'Complaint not found. Please check the complaint ID and try again.'
      )

    } finally {

      setLoading(false)

    }
  }


  // ============================
  // STATUS HELPERS
  // ============================

 

  const isInProgress =
    complaint?.status === 'IN_PROGRESS'

  const isResolved =
    complaint?.status === 'RESOLVED'


  return (
    <section className="dashboard-content">


      {/* ============================
          HEADER
      ============================ */}

      <div className="welcome-section">

        <div>

          <p className="eyebrow">
            TRACKING
          </p>

          <h2>
            Track Complaint
          </h2>

          <p>
            Enter your complaint ID to check the current status.
          </p>

        </div>

      </div>


      {/* ============================
          SEARCH CARD
      ============================ */}

      <section className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>
              Find Your Complaint
            </h3>

            <p>
              Enter the complaint ID you received after submission.
            </p>

          </div>

        </div>


        <form
          onSubmit={handleSearch}
          style={{
            padding: '28px',
          }}
        >

          <label
            htmlFor="complaintId"
            style={{
              display: 'block',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            Complaint ID
          </label>


          <div
            style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '650px',
            }}
          >

            <div
              style={{
                position: 'relative',
                flex: 1,
              }}
            >

              <FileText
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />


              <input
                id="complaintId"
                type="number"
                min="1"
                value={complaintId}
                onChange={(event) =>
                  setComplaintId(
                    event.target.value
                  )
                }
                placeholder="Enter complaint ID e.g. 1"
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 44px',
                  border: '1px solid #dbe3ef',
                  borderRadius: '10px',
                  outline: 'none',
                }}
              />

            </div>


            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >

              {loading ? (

                <>
                  <Loader2
                    size={18}
                    className="spin"
                  />

                  Searching...

                </>

              ) : (

                <>
                  <Search size={18} />

                  Track Complaint

                </>

              )}

            </button>

          </div>

        </form>

      </section>


      {/* ============================
          ERROR
      ============================ */}

      {error && (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px',
            padding: '16px 18px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            color: '#b91c1c',
          }}
        >

          <AlertCircle size={20} />

          <span>
            {error}
          </span>

        </div>

      )}


      {/* ============================
          COMPLAINT RESULT
      ============================ */}

      {complaint && (

        <section
          className="dashboard-card"
          style={{
            marginTop: '24px',
          }}
        >

          <div className="card-header">

            <div>

              <h3>
                Complaint #{complaint.id}
              </h3>

              <p>
                Current complaint information
              </p>

            </div>


            <span
              className={`status-badge ${
                complaint.status
                  ?.toLowerCase()
                  .replace('_', '-')
              }`}
            >

              <span className="status-dot"></span>

              {complaint.status === 'OPEN'
                ? 'Pending'
                : complaint.status ===
                    'IN_PROGRESS'
                  ? 'In Progress'
                  : complaint.status}

            </span>

          </div>


          {/* ============================
              COMPLAINT INFORMATION
          ============================ */}

          <div
            style={{
              padding: '28px',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
            }}
          >

            <div>

              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '6px',
                }}
              >
                Category
              </span>

              <strong>
                {complaint.category || '-'}
              </strong>

            </div>


            <div>

              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '6px',
                }}
              >
                Department
              </span>

              <strong>
                {complaint.department || '-'}
              </strong>

            </div>


            <div>

              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '6px',
                }}
              >
                Priority
              </span>

              <span
                className={`priority-badge ${
                  complaint.priority
                    ?.toLowerCase() || ''
                }`}
              >
                {complaint.priority || '-'}
              </span>

            </div>


            <div>

              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '6px',
                }}
              >
                Submitted By
              </span>

              <strong>
                {complaint.name || '-'}
              </strong>

            </div>

          </div>


          {/* ============================
              DESCRIPTION
          ============================ */}

          <div
            style={{
              padding: '0 28px 28px',
            }}
          >

            <div
              style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >

              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                Complaint Description
              </span>

              <p
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {complaint.description}
              </p>

            </div>

          </div>


          {/* ============================
              STATUS TIMELINE
          ============================ */}

          <div
            style={{
              padding: '0 28px 32px',
            }}
          >

            <h3
              style={{
                marginBottom: '24px',
              }}
            >
              Complaint Timeline
            </h3>


            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >

              {/* OPEN */}

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  position: 'relative',
                  paddingBottom: '28px',
                }}
              >

                <div>

                  <CheckCircle2
                    size={24}
                    color="#2563eb"
                  />

                </div>

                <div>

                  <strong>
                    Complaint Submitted
                  </strong>

                  <p
                    style={{
                      margin: '5px 0 0',
                      color: '#64748b',
                    }}
                  >
                    Complaint has been registered
                    successfully.
                  </p>

                </div>

              </div>


              {/* IN PROGRESS */}

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  position: 'relative',
                  paddingBottom: '28px',
                }}
              >

                <div>

                  {isInProgress ||
                  isResolved ? (

                    <CheckCircle2
                      size={24}
                      color="#7c3aed"
                    />

                  ) : (

                    <Clock3
                      size={24}
                      color="#94a3b8"
                    />

                  )}

                </div>

                <div>

                  <strong>
                    In Progress
                  </strong>

                  <p
                    style={{
                      margin: '5px 0 0',
                      color: '#64748b',
                    }}
                  >

                    {isInProgress ||
                    isResolved
                      ? 'Complaint is being handled by the department.'
                      : 'Waiting for the complaint to be taken up.'}

                  </p>

                </div>

              </div>


              {/* RESOLVED */}

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                }}
              >

                <div>

                  {isResolved ? (

                    <CheckCircle2
                      size={24}
                      color="#16a34a"
                    />

                  ) : (

                    <Clock3
                      size={24}
                      color="#94a3b8"
                    />

                  )}

                </div>

                <div>

                  <strong>
                    Resolved
                  </strong>

                  <p
                    style={{
                      margin: '5px 0 0',
                      color: '#64748b',
                    }}
                  >

                    {isResolved
                      ? 'Complaint has been resolved.'
                      : 'This step will be completed once the issue is resolved.'}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

    </section>
  )
}

export default TrackComplaints