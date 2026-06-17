import { Link } from 'react-router-dom'
import './MobileSidebar.css'
import { useAuth } from '../context/AuthContext'

const mainNavItems = [
  { icon: '🏠', label: 'Home', to: '/' },
  { icon: '☰', label: 'Categories', to: '/products' },
  { icon: '🛒', label: 'My cart', to: '/cart' },
  { icon: '🗄️', label: 'My orders', to: '/orders' },
]

const secondaryNavItems = [
  { icon: '🌐', label: 'English | USD', to: '#' },
  { icon: '🎧', label: 'Contact us', to: '#' },
  { icon: '🏢', label: 'About', to: '#' },
]

const footerLinks = [
  { label: 'User agreement', to: '#' },
  { label: 'Partnership', to: '#' },
  { label: 'Privacy policy', to: '#' },
]

function MobileSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()

  if (!isOpen) return null

  return (
    <div className="mobileSidebarOverlay" onClick={onClose}>
      <div className="mobileSidebar" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="mobileSidebarHeader">
          <button className="mobileSidebarClose" onClick={onClose}>✕</button>
          <div className="mobileSidebarAvatar">
            {user ? user.name[0].toUpperCase() : ''}
          </div>
          {user ? (
            <div className="mobileSidebarAuth">
              <span className="mobileSidebarAuthLink" style={{ fontWeight: 600 }}>{user.name}</span>
              <span className="mobileSidebarAuthSep">|</span>
              <button
                className="mobileSidebarAuthLink"
                style={{ background: 'none', border: 'none', color: '#fa3434', cursor: 'pointer', padding: 0 }}
                onClick={() => { logout(); onClose() }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mobileSidebarAuth">
              <Link to="/login" className="mobileSidebarAuthLink" onClick={onClose}>Sign in</Link>
              <span className="mobileSidebarAuthSep">|</span>
              <Link to="/register" className="mobileSidebarAuthLink" onClick={onClose}>Register</Link>
            </div>
          )}
        </div>

        {/* Main nav */}
        <nav className="mobileSidebarNav">
          {mainNavItems.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarNavItem" onClick={onClose}>
              <span className="mobileSidebarNavIcon">{item.icon}</span>
              <span className="mobileSidebarNavLabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mobileSidebarDivider" />

        {/* Secondary nav */}
        <nav className="mobileSidebarNav">
          {secondaryNavItems.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarNavItem" onClick={onClose}>
              <span className="mobileSidebarNavIcon">{item.icon}</span>
              <span className="mobileSidebarNavLabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mobileSidebarDivider" />

        <nav className="mobileSidebarFooterNav">
          {footerLinks.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarFooterLink" onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </div>
  )
}

export default MobileSidebar
