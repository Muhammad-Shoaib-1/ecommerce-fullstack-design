import { Link } from 'react-router-dom'
import './MobileSidebar.css'

const mainNavItems = [
  { icon: '🏠', label: 'Home', to: '/' },
  { icon: '☰', label: 'Categories', to: '/products' },
  { icon: '♡', label: 'Favorites', to: '/favorites' },
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
  if (!isOpen) return null

  return (
    <div className="mobileSidebarOverlay" onClick={onClose}>
      <div className="mobileSidebar" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="mobileSidebarHeader">
          <button className="mobileSidebarClose" onClick={onClose}>✕</button>
          <div className="mobileSidebarAvatar" />
          <div className="mobileSidebarAuth">
            <Link to="/login" className="mobileSidebarAuthLink">Sign in</Link>
            <span className="mobileSidebarAuthSep">|</span>
            <Link to="/register" className="mobileSidebarAuthLink">Register</Link>
          </div>
        </div>

        {/* Main nav */}
        <nav className="mobileSidebarNav">
          {mainNavItems.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarNavItem">
              <span className="mobileSidebarNavIcon">{item.icon}</span>
              <span className="mobileSidebarNavLabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mobileSidebarDivider" />

        {/* Secondary nav */}
        <nav className="mobileSidebarNav">
          {secondaryNavItems.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarNavItem">
              <span className="mobileSidebarNavIcon">{item.icon}</span>
              <span className="mobileSidebarNavLabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mobileSidebarDivider" />

        {/* Footer links */}
        <nav className="mobileSidebarFooterNav">
          {footerLinks.map((item, i) => (
            <Link key={i} to={item.to} className="mobileSidebarFooterLink">
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </div>
  )
}

export default MobileSidebar
