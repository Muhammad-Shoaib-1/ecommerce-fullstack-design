import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa'
import './MobileNavbar.css'
import MobileSidebar from './MobileSidebar'

function MobileNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            <Link to="/cart"><FaShoppingCart size={22} color="#242424" /></Link>
            <Link to="#"><FaUser size={22} color="#242424" /></Link>
          </div>
        </div>
      </nav>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default MobileNavbar