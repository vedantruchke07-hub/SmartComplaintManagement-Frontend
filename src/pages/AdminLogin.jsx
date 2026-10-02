import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      await axios.post(
        'http://localhost:8080/api/admin/login',
        {
          email: email,
          password: password,
        }
      )

      navigate('/admin')

    } catch (err) {
      console.error(err)

      setError(
        err.response?.data?.message ||
        'Invalid email or password.'
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

          <h1>Welcome back</h1>

          <p>
            Sign in to access the administrator portal.
          </p>

        </div>

        {error && (
          <div className="admin-login-error">
            <AlertCircle size={17} />

            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="login-field">

            <label htmlFor="admin-email">
              Email Address
            </label>

            <div className="login-input-wrapper">

              <Mail size={18} />

              <input
                id="admin-email"
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

            <label htmlFor="admin-password">
              Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="admin-password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Enter your password"
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

          {/* Login Button */}

          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In
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

        {/* Registration Link */}

        <button
          type="button"
          className="student-login-link"
          onClick={() =>
            navigate('/admin/register')
          }
        >
          Create a new administrator account →
        </button>

        {/* Student Portal */}

       

      </div>
    </div>
  )
}

export default AdminLogin