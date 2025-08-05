import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FaRocket, 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaChartLine, 
  FaUsers, 
  FaStar,
  FaSignOutAlt,
  FaUser,
  FaLightbulb
} from 'react-icons/fa'
import './Dashboard.css'

function Dashboard() {
  const [pitches, setPitches] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pitch_deck_url: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  // Check authentication on load
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    // Decode token to get user info (basic implementation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser({
        id: payload.id,
        name: payload.name || 'User',
        role: payload.role || 'entrepreneur'
      })
    } catch (error) {
      console.error('Token decode error:', error)
      localStorage.removeItem('token')
      navigate('/login')
      return
    }

    fetchPitches()
  }, [token, navigate])

  // Fetch user pitches
  const fetchPitches = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/pitches/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
        return
      }

      if (res.ok) {
        const data = await res.json()
        setPitches(Array.isArray(data) ? data : [])
      } else {
        setError('Failed to load pitches')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Submit new pitch
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch('http://localhost:5000/api/pitches/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
        return
      }

      if (!res.ok) {
        // setError(data.message || 'Failed to submit pitch')
      } else {
        setSuccess('Pitch submitted successfully!')
        setPitches([data, ...pitches])
        setFormData({
          title: '',
          description: '',
          category: '',
          pitch_deck_url: ''
        })
        setShowForm(false)
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Submit error:', error)
      setError('Network error. Please try again.')
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // Delete pitch
  const handleDeletePitch = async (pitchId) => {
    if (!window.confirm('Are you sure you want to delete this pitch?')) return

    try {
      const res = await fetch(`http://localhost:5000/api/pitches/${pitchId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.ok) {
        setPitches(pitches.filter(pitch => pitch.id !== pitchId))
        setSuccess('Pitch deleted successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to delete pitch')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    }
  }

  if (!token) {
    return null // Will redirect to login
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <FaRocket className="logo-icon" />
            <h1>PitchHub Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <FaUser className="user-icon" />
              <span>Welcome, {user?.name || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <FaRocket className="stat-icon" />
            <div className="stat-content">
              <h3>{pitches.length}</h3>
              <p>Total Pitches</p>
            </div>
          </div>
          <div className="stat-card">
            <FaEye className="stat-icon" />
            <div className="stat-content">
              <h3>{pitches.reduce((sum, pitch) => sum + (pitch.views || 0), 0)}</h3>
              <p>Total Views</p>
            </div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div className="stat-content">
              <h3>{pitches.reduce((sum, pitch) => sum + (pitch.likes || 0), 0)}</h3>
              <p>Total Likes</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{pitches.reduce((sum, pitch) => sum + (pitch.investors || 0), 0)}</h3>
              <p>Investors Reached</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Submit New Pitch Section */}
          <div className="pitch-form-section">
            <div className="section-header">
              <h2>
                <FaLightbulb className="section-icon" />
                Submit New Pitch
              </h2>
              <button 
                onClick={() => setShowForm(!showForm)} 
                className="toggle-form-btn"
              >
                <FaPlus />
                {showForm ? 'Cancel' : 'New Pitch'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="pitch-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Pitch Title</label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Enter your pitch title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select Category</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your pitch idea..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="form-input"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pitch_deck_url">Pitch Deck URL (Optional)</label>
                  <input
                    id="pitch_deck_url"
                    type="url"
                    name="pitch_deck_url"
                    placeholder="https://example.com/pitch-deck.pdf"
                    value={formData.pitch_deck_url}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <FaRocket />
                  Submit Pitch
                </button>
              </form>
            )}
          </div>

          {/* Messages */}
          {error && (
            <div className="message error-message">
              <span>{error}</span>
              <button onClick={() => setError('')} className="close-btn">×</button>
            </div>
          )}
          {success && (
            <div className="message success-message">
              <span>{success}</span>
              <button onClick={() => setSuccess('')} className="close-btn">×</button>
            </div>
          )}

          {/* Your Pitches Section */}
          <div className="pitches-section">
            <div className="section-header">
              <h2>
                <FaChartLine className="section-icon" />
                Your Pitches
              </h2>
              <button onClick={fetchPitches} className="refresh-btn" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your pitches...</p>
              </div>
            ) : pitches.length === 0 ? (
              <div className="empty-state">
                <FaRocket className="empty-icon" />
                <h3>No pitches yet</h3>
                <p>Start by submitting your first pitch idea!</p>
                <button onClick={() => setShowForm(true)} className="cta-btn">
                  <FaPlus />
                  Create Your First Pitch
                </button>
              </div>
            ) : (
              <div className="pitches-grid">
                {pitches.map((pitch) => (
                  <div key={pitch.id} className="pitch-card">
                    <div className="pitch-header">
                      <h3>{pitch.title}</h3>
                      <span className="category-badge">{pitch.category}</span>
                    </div>
                    <p className="pitch-description">{pitch.description}</p>
                    <div className="pitch-stats">
                      <span><FaEye /> {pitch.views || 0} views</span>
                      <span><FaStar /> {pitch.likes || 0} likes</span>
                    </div>
                    <div className="pitch-actions">
                      {pitch.pitch_deck_url && (
                        <a 
                          href={pitch.pitch_deck_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="action-btn view-btn"
                        >
                          <FaEye />
                          View Deck
                        </a>
                      )}
                      <button 
                        onClick={() => handleDeletePitch(pitch.id)}
                        className="action-btn delete-btn"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
