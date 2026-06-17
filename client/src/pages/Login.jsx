import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(email, password)
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
          <h5 className="fw-bold mb-0">Sign in to your account</h5>
          <p className="text-muted" style={{ fontSize: '13px' }}>
            Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Register</Link>
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check mb-0">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label" htmlFor="remember" style={{ fontSize: '13px' }}>Remember me</label>
            </div>
            <a href="#" className="text-primary text-decoration-none" style={{ fontSize: '13px' }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted" style={{ fontSize: '12px' }}>
            By signing in, you agree to our <a href="#" className="text-primary text-decoration-none">Terms</a> and <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
