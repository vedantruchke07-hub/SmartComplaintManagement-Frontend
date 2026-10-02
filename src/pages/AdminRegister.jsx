import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

function AdminRegister() {
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

    if (!name || !email || !password || !confirmPassword) {
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
        'http://localhost:8080/api/admin/register',
        {
          name: name,
          email: email,
          password: password,
        }
      )

      alert(
        'Administrator account created successfully!'
      )

      navigate('/admin/login')

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

        <div className="admin-login-brand">

          <div className="admin-login-icon">
            <ShieldCheck
              size={27}
              strokeWidth={2.3}
            />
          </div>

          <div>
            <div className="admin-login-logo">
              Smart<span>Admin</span>
            </div>

            <p>
              Complaint Management System
            </p>
          </div>

        </div>

        <div className="admin-login-heading">

          <h1>
            Create administrator account
          </h1>

          <p>
            Register a new administrator for the
            admin portal.
          </p>

        </div>

        {error && (
          <div className="admin-login-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>

          {/* Full Name */}

          <div className="login-field">

            <label htmlFor="admin-name">
              Full Name
            </label>

            <div className="login-input-wrapper">

              <User size={18} />

              <input
                id="admin-name"
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>

          </div>

          {/* Email */}

          <div className="login-field">

            <label htmlFor="admin-register-email">
              Email Address
            </label>

            <div className="login-input-wrapper">

              <Mail size={18} />

              <input
                id="admin-register-email"
                type="email"
                placeholder="admin@smartcomplaint.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

          </div>

          {/* Password */}

          <div className="login-field">

            <label htmlFor="admin-register-password">
              Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="admin-register-password"
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
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
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

            <label htmlFor="admin-confirm-password">
              Confirm Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="admin-confirm-password"
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
                aria-label={
                  showConfirmPassword
                    ? 'Hide password'
                    : 'Show password'
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

          {/* Register Button */}

          <button
            type="submit"
            className="admin-login-button"
          >
            Create Admin Account
            <ArrowRight size={18} />
          </button>

        </form>

        {/* Admin Access Notice */}

        <div className="admin-login-footer">

          <ShieldCheck size={14} />

          <span>
            Administrator access only
          </span>

        </div>

        {/* Login Link */}

        <button
          type="button"
          className="student-login-link"
          onClick={() =>
            navigate('/admin/login')
          }
        >
          <ArrowLeft size={14} />

          Already have an account?
          Sign in
        </button>

      </div>
    </div>
  )
}

export default AdminRegister