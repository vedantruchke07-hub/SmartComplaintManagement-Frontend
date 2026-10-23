import { useState } from 'react'
import axios from 'axios'
import {
  Send,
  User,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function SubmitComplaint() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  description: '',
  studentDepartment: '',
  armietPin: '',
})

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')


  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess(null)

    if (!formData.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!formData.email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!formData.description.trim()) {
      setError('Please describe your complaint.')
      return
    }

    try {
      setLoading(true)

     
const response = await axios.post(
  '/api/complaints',
  {
    name: formData.name,
    email: formData.email,
    description: formData.description,
    studentDepartment: formData.studentDepartment,
    armietPin: formData.armietPin,
  }
)


      setSuccess(response.data)

      setFormData({
        name: '',
        email: '',
        description: '',
      })

    } catch (err) {
      console.error(err)

      setError(
        'Unable to submit complaint. Please make sure the backend server is running.'
      )
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="dashboard-content">

      {/* ================= PAGE HEADER ================= */}

      <div className="welcome-section">

        <div>

          <p className="eyebrow">
            COMPLAINTS
          </p>

          <h2>
            Submit Complaint
          </h2>

          <p>
            Report an issue and our system will automatically
            classify and route your complaint.
          </p>

        </div>

        <button
          className="text-button"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

      </div>


      {/* ================= SUCCESS MESSAGE ================= */}

      {success && (

        <div
          style={{
            marginBottom: '24px',
            padding: '20px',
            border: '1px solid #bbf7d0',
            background: '#f0fdf4',
            borderRadius: '16px',
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >

            <CheckCircle2
              size={24}
              color="#16a34a"
            />

            <div>

              <h3
                style={{
                  margin: 0,
                  color: '#166534',
                }}
              >
                Complaint Submitted Successfully
              </h3>

              <p
                style={{
                  margin: '4px 0 0',
                  color: '#15803d',
                }}
              >
                Your complaint has been registered.
              </p>

            </div>

          </div>


          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
            }}
          >

            <div>
              <strong>Complaint ID</strong>
              <div>{success.id}</div>
            </div>

            <div>
              <strong>Category</strong>
              <div>{success.category}</div>
            </div>

            <div>
              <strong>Department</strong>
              <div>{success.department}</div>
            </div>

            <div>
              <strong>Priority</strong>
              <div>{success.priority}</div>
            </div>

            <div>
              <strong>Status</strong>
              <div>{success.status}</div>
            </div>

          </div>

        </div>

      )}


      {/* ================= ERROR ================= */}

      {error && (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            padding: '16px 18px',
            border: '1px solid #fecaca',
            background: '#fef2f2',
            color: '#b91c1c',
            borderRadius: '12px',
          }}
        >

          <AlertCircle size={20} />

          <span>{error}</span>

        </div>

      )}


      {/* ================= FORM ================= */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>
              Complaint Details
            </h3>

            <p>
              Provide accurate information about the issue.
            </p>

          </div>

        </div>


        <form
          onSubmit={handleSubmit}
          style={{
            padding: '28px',
          }}
        >

          {/* Name */}

          <div
            style={{
              marginBottom: '22px',
            }}
          >

            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              Your Name
            </label>


            <div
              style={{
                position: 'relative',
              }}
            >

              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 44px',
                  border: '1px solid #dbe3ef',
                  borderRadius: '10px',
                  outline: 'none',
                }}
              />

            </div>

          </div>


          {/* Email */}

          <div
            style={{
              marginBottom: '22px',
            }}
          >

            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              Email Address
            </label>


            <div
              style={{
                position: 'relative',
              }}
            >

              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 44px',
                  border: '1px solid #dbe3ef',
                  borderRadius: '10px',
                  outline: 'none',
                }}
              />

            </div>

          </div>

          
{/* Student Department */}
<div style={{ marginBottom: '22px' }}>
  <label
    htmlFor="studentDepartment"
    style={{
      display: 'block',
      fontWeight: 600,
      marginBottom: '8px',
    }}
  >
    Select Your Department *
  </label>

  <select
    id="studentDepartment"
    name="studentDepartment"
    value={formData.studentDepartment}
    onChange={handleChange}
    disabled={loading}
    required
    style={{
      width: '100%',
      padding: '13px 14px',
      border: '1px solid #dbe3ef',
      borderRadius: '10px',
      outline: 'none',
      background: '#fff',
    }}
  >
    <option value="">Choose your department</option>
    <option value="CSE (AIML)">CSE (AIML)</option>
    <option value="CE">CE</option>
    <option value="IT">IT</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Electrical">Electrical</option>
    <option value="Other">Other</option>
  </select>
</div>

{/* ARMIET PIN */}
<div style={{ marginBottom: '22px' }}>
  <label
    htmlFor="armietPin"
    style={{
      display: 'block',
      fontWeight: 600,
      marginBottom: '8px',
    }}
  >
    Enter Your ARMIET PIN *
  </label>

  <input
    id="armietPin"
    name="armietPin"
    type="text"
    value={formData.armietPin}
    onChange={handleChange}
    placeholder="Enter your ARMIET PIN"
    disabled={loading}
    required
    style={{
      width: '100%',
      padding: '13px 14px',
      border: '1px solid #dbe3ef',
      borderRadius: '10px',
      outline: 'none',
    }}
  />
</div>



          {/* Description */}

          <div
            style={{
              marginBottom: '24px',
            }}
          >

            <label
              htmlFor="description"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              Complaint Description
            </label>


            <div
              style={{
                position: 'relative',
              }}
            >

              <FileText
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '16px',
                }}
              />

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your complaint in detail..."
                rows="7"
                disabled={loading}
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
            disabled={loading}
            style={{
              minWidth: '180px',
              justifyContent: 'center',
            }}
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />

                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />

                Submit Complaint
              </>
            )}

          </button>

        </form>

      </div>

    </section>
  )
}

export default SubmitComplaint