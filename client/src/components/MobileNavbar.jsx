import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa'
import './Mobilenavbar.css'
import MobileSidebar from './MobileSidebar'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function MobileNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { cartCount } = useCart()
  const { user } = useAuth()

  return (
    <>
      <nav className="mobile-navbar">
        <div className="mobile-navbar-inner">
          <FaBars
            size={22}
            color="#1C1C1C"
            style={{ cursor: 'pointer' }}
            onClick={() => setSidebarOpen(true)}
          />
          <Link to="/" className="mobile-logo">
            <div className="mobile-logo-icon">
              <FaShoppingCart color="white" size={16} />
            </div>
            <span className="mobile-logo-text">Brand</span>
          </Link>
          <div className="mobile-navbar-icons">
            <Link to="/cart" style={{ position: 'relative' }}>
              <FaShoppingCart size={22} color="#242424" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-8px',
                  background: '#fa3434', color: 'white', borderRadius: '50%',
                  fontSize: '10px', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <Link to={user ? '#' : '/login'}>
              <FaUser size={22} color="#242424" />
            </Link>
          </div>
        </div>
      </nav>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
    </>
  )
}

export default MobileNavbar
