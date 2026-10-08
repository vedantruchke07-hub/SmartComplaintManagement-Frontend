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
  AlertCircle,
} from 'lucide-react'

function StudentLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [error, setError] = useState('')

  const handleLogin = async (event) => {

    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError(
        'Please enter your email and password.'
      )
      return
    }

    try {

      await axios.post(
        'http://https://smartcomplaintmanagement-backend.onrender.com/api/student/login',
        {
          email: email,
          password: password,
        }
      )

      navigate('/student')

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

        {/* Brand */}

        <div className="admin-login-brand">

          <div className="admin-login-icon">

            <UserRound
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
            Welcome back
          </h1>

          <p>
            Sign in to submit and track your complaints.
          </p>

        </div>

        {/* Error */}

        {error && (

          <div className="admin-login-error">

            <AlertCircle size={17} />

            <span>
              {error}
            </span>

          </div>

        )}

        {/* Login Form */}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="login-field">

            <label htmlFor="student-login-email">
              Email Address
            </label>

            <div className="login-input-wrapper">

              <Mail size={18} />

              <input
                id="student-login-email"
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

            <label htmlFor="student-login-password">
              Password
            </label>

            <div className="login-input-wrapper">

              <Lock size={18} />

              <input
                id="student-login-password"
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

        {/* Footer */}

        <div className="admin-login-footer">

          <ShieldCheck size={14} />

          <span>
            Student account access
          </span>

        </div>

        {/* Register */}

        <button
          type="button"
          className="student-login-link"
          onClick={() =>
            navigate('/student/register')
          }
        >

          Don't have an account?
          Create one →

        </button>

      </div>

    </div>
  )
}

export default StudentLogin