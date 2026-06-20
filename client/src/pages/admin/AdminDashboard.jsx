import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Admin.module.css'
import api from '../../api/axios'

const STATUS_BADGE = {
  pending:    styles.badgePending,
  confirmed:  styles.badgeConfirmed,
  processing: styles.badgeProcessing,
  shipped:    styles.badgeShipped,
  delivered:  styles.badgeDelivered,
  cancelled:  styles.badgeCancelled,
}

function AdminDashboard() {
  const [stats, setStats]   = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/orders?limit=8'),
    ]).then(([s, o]) => {
      setStats(s.data.stats)
      setOrders(o.data.orders)
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>

  const maxRevenue = Math.max(...(stats?.dailyRevenue?.map(d => d.revenue) || [1]))

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Dashboard</h4>
          <p className={styles.pageSubtitle}>Welcome back! Here's what's happening.</p>
        </div>
        <Link to="/admin/products" className="btn btn-primary btn-sm">+ Add Product</Link>
      </div>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        {[
          { icon: '💰', label: 'Total Revenue',  value: `$${stats?.revenue?.toFixed(2)}`,  bg: '#EBF6FF', trend: `+$${stats?.recentRevenue?.toFixed(2)} this week`, up: true },
          { icon: '🧾', label: 'Total Orders',   value: stats?.totalOrders,                bg: '#FFF3E0', trend: `${stats?.pendingOrders} pending`, up: false },
          { icon: '📦', label: 'Products',        value: stats?.totalProducts,              bg: '#F0FFF4', trend: 'in store' },
          { icon: '👥', label: 'Users',           value: stats?.totalUsers,                 bg: '#FFF0F6', trend: 'registered' },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: s.bg }}>{s.icon}</div>
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              {s.trend && <div className={`${styles.statTrend} ${s.up ? styles.statTrendUp : ''}`}>{s.trend}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Revenue chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h6 className={styles.cardTitle}>Revenue — Last 7 Days</h6>
          </div>
          <div className={styles.chartBar}>
            {stats?.dailyRevenue?.map((d, i) => (
              <div key={i} className={styles.chartBarItem}>
                <span className={styles.chartBarLabel}>{new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}</span>
                <div className={styles.chartBarTrack}>
                  <div className={styles.chartBarFill} style={{ width: `${maxRevenue > 0 ? (d.revenue / maxRevenue) * 100 : 0}%` }} />
                </div>
                <span className={styles.chartBarValue}>${d.revenue.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h6 className={styles.cardTitle}>Order Status</h6>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Pending',    key: 'pending',    color: '#856404', bg: '#FFF3CD' },
              { label: 'Confirmed',  key: 'confirmed',  color: '#0C5460', bg: '#D1ECF1' },
              { label: 'Shipped',    key: 'shipped',    color: '#155724', bg: '#D4EDDA' },
              { label: 'Delivered',  key: 'delivered',  color: '#155724', bg: '#C3E6CB' },
              { label: 'Cancelled',  key: 'cancelled',  color: '#721C24', bg: '#F8D7DA' },
            ].map(s => {
              const count = orders.filter(o => o.status === s.key).length
              return (
                <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#505050' }}>{s.label}</span>
                  <span className={styles.badge} style={{ background: s.bg, color: s.color }}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h6 className={styles.cardTitle}>Recent Orders</h6>
          <Link to="/admin/orders" className="btn btn-outline-primary btn-sm">View all</Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td><Link to={`/orders/${order._id}`} style={{ color: '#0d6efd', fontFamily: 'monospace', textDecoration: 'none' }}>#{order._id.slice(-8).toUpperCase()}</Link></td>
                <td>{order.user?.name || '—'}</td>
                <td>{order.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td><strong>${order.totalPrice.toFixed(2)}</strong></td>
                <td style={{ textTransform: 'uppercase', fontSize: '11px' }}>{order.paymentMethod}</td>
                <td><span className={`${styles.badge} ${STATUS_BADGE[order.status]}`}>{order.status}</span></td>
                <td style={{ color: '#8B96A5' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
