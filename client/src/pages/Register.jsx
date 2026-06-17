import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    const result = await register(name, email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', background: '#F5F5F5' }}>
      <div className="bg-white rounded shadow-sm p-4" style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="bg-primary rounded d-inline-flex p-2 mb-2">
            <span className="text-white fs-5">🛍️</span>
          </div>
          <h5 className="fw-bold mb-0">Create your account</h5>
          <p className="text-muted" style={{ fontSize: '13px' }}>
            Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign in</Link>
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Full name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Min. 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Repeat your password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Creating account...</>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted" style={{ fontSize: '12px' }}>
            By registering, you agree to our <a href="#" className="text-primary text-decoration-none">Terms</a> and <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
