import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

function StudentRegister() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

    setError('')

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
     await axios.post(
    'http://localhost:8080/api/student/register',
    {
      name: name,
      email: email,
      password: password,
    }
  )

  alert('Student account created successfully!')

  navigate('/student/login')

} catch (err) {
  console.error(err)

  setError(
    err.response?.data?.message ||
    'Registration failed. Please try again.'
  )
}
  }

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Brand */}

        <div className="admin-login-brand">

          <div className="admin-login-icon">
            <ShieldCheck
              size={27}
              strokeWidth={2.3}
            />
          </div>

          <div>
            <div className="admin-login-logo">
              Smart<span>Complaint</span>
            </div>

            <p>
              Student Complaint Management System
            </p>
          </div>

        </div>

        {/* Heading */}

        <div className="admin-login-heading">

          <h1>
            Create student account
          </h1>

          <p>
            Register to submit and track your complaints.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="admin-login-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>

          {/* Name */}

          <div className="login-field">

            <label htmlFor="student-name">
              Full Name
            </label>

            <div className="login-input-wrapper">

              <UserRound size={18} />

              <input
                id="student-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>

          </div>

          {/* Email */}

          <div className="login-field">

            <label htmlFor="student-email">
              Email Address
            </label>

            <div className="login-input-wrapper">

              <Mail size={18} />

              <input
                id="student-email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

          </div>

          {/* Password */}

          <div className="login-field">

            <label htmlFor="student-password">
              Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="student-password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="login-field">

            <label htmlFor="student-confirm-password">
              Confirm Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="student-confirm-password"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Register */}

          <button
            type="submit"
            className="admin-login-button"
          >
            Create Student Account
            <ArrowRight size={18} />
          </button>

        </form>

        {/* Footer */}

        <div className="admin-login-footer">

          <ShieldCheck size={14} />

          <span>
            Student account registration
          </span>

        </div>

        {/* Login */}

        <button
          type="button"
          className="student-login-link"
          onClick={() =>
            navigate('/student/login')
          }
        >
          Already have an account? Sign in
        </button>

      </div>

    </div>
  )
}

export default StudentRegister