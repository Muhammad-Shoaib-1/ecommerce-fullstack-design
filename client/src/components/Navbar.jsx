import { useState } from 'react'
import { FaUser, FaComment, FaClipboardList, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    navigate(`/products?${params}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="border-bottom py-3 bg-white">
      <div className="container d-flex align-items-center justify-content-between gap-3">

        {/* Logo */}
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <div className="bg-primary rounded p-2">
            <FaShoppingCart color="white" size={20} />
          </div>
          <span className="fw-bold text-primary fs-4">Brand</span>
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1" style={{ maxWidth: '600px' }} onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control rounded-0 rounded-start border-primary"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="form-select rounded-0 border-start-0 border-primary"
            style={{ width: '150px' }}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All category</option>
            <option value="electronics">Electronics</option>
            <option value="clothes-and-wear">Clothing</option>
          </select>
          <button type="submit" className="btn btn-primary rounded-0 rounded-end px-4">
            Search
          </button>
        </form>

        {/* Icons */}
        <div className="d-flex gap-4 align-items-center">

          {/* Profile / Auth */}
          {user ? (
            <div className="dropdown">
              <div
                className="d-flex flex-column align-items-center text-secondary"
                style={{ cursor: 'pointer' }}
                data-bs-toggle="dropdown"
              >
                <FaUser size={22} />
                <small style={{ fontSize: '11px' }}>{user.name.split(' ')[0]}</small>
              </div>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item-text text-muted" style={{ fontSize: '12px' }}>{user.email}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">My Profile</Link></li>
                <li><Link className="dropdown-item" to="#">Orders</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="d-flex flex-column align-items-center text-secondary text-decoration-none">
              <FaUser size={22} />
              <small style={{ fontSize: '11px' }}>Sign in</small>
            </Link>
          )}

          {/* Message */}
          <div className="d-flex flex-column align-items-center text-secondary" style={{ cursor: 'pointer' }}>
            <FaComment size={22} />
            <small style={{ fontSize: '11px' }}>Message</small>
          </div>

          {/* Orders */}
          <div className="d-flex flex-column align-items-center text-secondary" style={{ cursor: 'pointer' }}>
            <FaClipboardList size={22} />
            <small style={{ fontSize: '11px' }}>Orders</small>
          </div>

          {/* Cart with badge */}
          <Link to="/cart" className="d-flex flex-column align-items-center text-secondary text-decoration-none position-relative">
            <div className="position-relative">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '10px' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <small style={{ fontSize: '11px' }}>My cart</small>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
