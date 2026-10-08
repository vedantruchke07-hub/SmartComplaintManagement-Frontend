import { useState } from 'react'
import axios from 'axios'
import {
  Star,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react'


function Feedback() {

  const [complaintId, setComplaintId] = useState('')
  const [complaint, setComplaint] = useState(null)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  // ============================
  // FIND COMPLAINT
  // ============================

  const findComplaint = async (event) => {

    event.preventDefault()

    setError('')
    setSuccess('')
    setComplaint(null)
    setRating(0)
    setComment('')

    if (!complaintId.trim()) {

      setError(
        'Please enter a complaint ID.'
      )

      return
    }


    try {

      setLoading(true)

      const response = await axios.get(
        `http://https://smartcomplaintmanagement-backend.onrender.com/api/complaints/${complaintId.trim()}`
      )

      setComplaint(response.data)

    } catch (err) {

      console.error(err)

      setError(
        'Complaint not found. Please check the complaint ID.'
      )

    } finally {

      setLoading(false)

    }
  }


  // ============================
  // SUBMIT FEEDBACK
  // ============================

  const submitFeedback = async (event) => {

    event.preventDefault()

    setError('')
    setSuccess('')


    if (!complaint) {

      setError(
        'Please find a complaint first.'
      )

      return
    }


    if (complaint.status !== 'RESOLVED') {

      setError(
        'Feedback can only be submitted for a resolved complaint.'
      )

      return
    }


    if (rating < 1 || rating > 5) {

      setError(
        'Please select a rating between 1 and 5.'
      )

      return
    }


    if (!comment.trim()) {

      setError(
        'Please enter your feedback comment.'
      )

      return
    }


    try {

      setSubmitting(true)


      await axios.post(
        `http://https://smartcomplaintmanagement-backend.onrender.com/api/complaints/${complaint.id}/feedback`,
        null,
        {
          params: {
            rating: rating,
            comment: comment,
          },
        }
      )


      setSuccess(
        'Thank you! Your feedback has been submitted successfully.'
      )


      setComment('')

    } catch (err) {

      console.error(err)

      if (err.response?.data?.message) {

        setError(
          err.response.data.message
        )

      } else {

        setError(
          'Unable to submit feedback. Please try again.'
        )

      }

    } finally {

      setSubmitting(false)

    }
  }


  return (
    <section className="dashboard-content">


      {/* ============================
          HEADER
      ============================ */}

      <div className="welcome-section">

        <div>

          <p className="eyebrow">
            FEEDBACK
          </p>

          <h2>
            Give Feedback
          </h2>

          <p>
            Share your experience after your complaint has been resolved.
          </p>

        </div>

      </div>


      {/* ============================
          SEARCH COMPLAINT
      ============================ */}

      <section className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>
              Find Resolved Complaint
            </h3>

            <p>
              Enter the complaint ID to provide feedback.
            </p>

          </div>

        </div>


        <form
          onSubmit={findComplaint}
          style={{
            padding: '28px',
          }}
        >

          <label
            htmlFor="feedbackComplaintId"
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

            <input
              id="feedbackComplaintId"
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
                flex: 1,
                padding: '13px 14px',
                border: '1px solid #dbe3ef',
                borderRadius: '10px',
                outline: 'none',
              }}
            />


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

                  Find Complaint

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
          SUCCESS
      ============================ */}

      {success && (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px',
            padding: '16px 18px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            color: '#166534',
          }}
        >

          <CheckCircle2 size={20} />

          <span>
            {success}
          </span>

        </div>

      )}


      {/* ============================
          COMPLAINT DETAILS
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
                {complaint.category} • {complaint.department}
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

              {complaint.status === 'RESOLVED'
                ? 'Resolved'
                : complaint.status}

            </span>

          </div>


          {/* ============================
              NOT RESOLVED
          ============================ */}

          {complaint.status !== 'RESOLVED' ? (

            <div
              style={{
                padding: '32px',
                textAlign: 'center',
              }}
            >

              <AlertCircle
                size={42}
                strokeWidth={1.5}
              />

              <h3>
                Feedback Not Available Yet
              </h3>

              <p>
                Feedback can only be submitted after
                this complaint has been resolved.
              </p>

            </div>

          ) : (

            /* ============================
                FEEDBACK FORM
            ============================ */

            <form
              onSubmit={submitFeedback}
              style={{
                padding: '28px',
              }}
            >

              {/* Rating */}

              <div
                style={{
                  marginBottom: '28px',
                }}
              >

                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  How would you rate the resolution?
                </label>


                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                  }}
                >

                  {[1, 2, 3, 4, 5].map(
                    (value) => (

                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setRating(value)
                        }
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: '4px',
                          cursor: 'pointer',
                        }}
                        aria-label={`Rate ${value} stars`}
                      >

                        <Star
                          size={32}
                          fill={
                            value <= rating
                              ? '#f59e0b'
                              : 'none'
                          }
                          color={
                            value <= rating
                              ? '#f59e0b'
                              : '#94a3b8'
                          }
                        />

                      </button>

                    )
                  )}

                </div>


                <p
                  style={{
                    marginTop: '8px',
                    color: '#64748b',
                    fontSize: '14px',
                  }}
                >

                  {rating === 0
                    ? 'Select a rating'
                    : `${rating} out of 5 stars`}

                </p>

              </div>


              {/* Comment */}

              <div
                style={{
                  marginBottom: '24px',
                }}
              >

                <label
                  htmlFor="feedbackComment"
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Your Feedback
                </label>


                <div
                  style={{
                    position: 'relative',
                  }}
                >

                  <MessageSquare
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '16px',
                    }}
                  />


                  <textarea
                    id="feedbackComment"
                    value={comment}
                    onChange={(event) =>
                      setComment(
                        event.target.value
                      )
                    }
                    placeholder="Tell us about your experience..."
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '13px 14px 13px 44px',
                      border: '1px solid #dbe3ef',
                      borderRadius: '10px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />

                </div>

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="primary-button"
                disabled={submitting}
              >

                {submitting ? (

                  <>
                    <Loader2
                      size={18}
                      className="spin"
                    />

                    Submitting...

                  </>

                ) : (

                  <>
                    <Star size={18} />

                    Submit Feedback

                  </>

                )}

              </button>

            </form>

          )}

        </section>

      )}

    </section>
  )
}

export default Feedback