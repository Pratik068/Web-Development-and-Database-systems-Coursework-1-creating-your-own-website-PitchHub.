import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaRocket, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('entrepreneur')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Registration successful! Please login.')
        navigate('/login')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Back to Home Link */}
        <Link to="/" className="back-link">
          <FaArrowLeft />
          Back to Home
        </Link>

        {/* Register Form Card */}
        <div className="register-card">
          <div className="register-header">
            <div className="logo-section">
              <FaRocket className="logo-icon" />
              <h1>Join PitchHub</h1>
            </div>
            <p>Create your account and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="input-icon" />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="form-input"
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role">
                <FaUserTie className="input-icon" />
                I am a...
              </label>
              <div className="role-options">
                <label className={`role-option ${role === 'entrepreneur' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="entrepreneur"
                    checked={role === 'entrepreneur'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <div className="role-content">
                    <FaRocket className="role-icon" />
                    <span>Entrepreneur</span>
                    <small>Share your ideas and find investors</small>
                  </div>
                </label>
                <label className={`role-option ${role === 'investor' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="investor"
                    checked={role === 'investor'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <div className="role-content">
                    <FaUserTie className="role-icon" />
                    <span>Investor</span>
                    <small>Discover and invest in great ideas</small>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="login-link">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
