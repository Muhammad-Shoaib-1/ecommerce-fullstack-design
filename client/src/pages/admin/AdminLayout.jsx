import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import styles from './Admin.module.css'

const NAV = [
  { to: '/admin',            label: 'Dashboard',  icon: '📊', end: true },
  { to: '/admin/products',   label: 'Products',   icon: '📦' },
  { to: '/admin/orders',     label: 'Orders',     icon: '🧾' },
  { to: '/admin/categories', label: 'Categories', icon: '🗂️'  },
  { to: '/admin/coupons',    label: 'Coupons',    icon: '🎟️' },
  { to: '/admin/users',      label: 'Users',      icon: '👥' },
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'admin') { navigate('/'); }
  }, [user, navigate])

  if (!user || user.role !== 'admin') return null

  return (
    <div className={styles.layout}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>🛍️</span>
            <span className={styles.logoText}>Brand</span>
          </Link>
          <div className={styles.adminBadge}>ADMIN</div>
        </div>

        <nav className={styles.nav}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminUser}>
            <div className={styles.adminAvatar}>{user.name[0].toUpperCase()}</div>
            <div>
              <div className={styles.adminName}>{user.name}</div>
              <div className={styles.adminRole}>Administrator</div>
            </div>
          </div>
          <div className={styles.sidebarActions}>
            <Link to="/" className={styles.sidebarActionBtn}>🏠 Store</Link>
            <button className={styles.sidebarActionBtn} onClick={() => { logout(); navigate('/login') }}>🚪 Logout</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout
