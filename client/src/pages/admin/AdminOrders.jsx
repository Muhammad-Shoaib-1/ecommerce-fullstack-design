import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Admin.module.css'
import api from '../../api/axios'

const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled']
const STATUS_BADGE = {
  pending: styles.badgePending, confirmed: styles.badgeConfirmed,
  processing: styles.badgeProcessing, shipped: styles.badgeShipped,
  delivered: styles.badgeDelivered, cancelled: styles.badgeCancelled,
}

function AdminOrders() {
  const [orders, setOrders]     = useState([])
  const [total, setTotal]       = useState(0)
  const [page, setPage]         = useState(1)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchOrders = async (p = page, s = filter) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: p, limit: 15 })
      if (s) params.set('status', s)
      const { data } = await api.get(`/admin/orders?${params}`)
      setOrders(data.orders); setTotal(data.total); setPages(data.pages)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchOrders() }, [page, filter])

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId)
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { status })
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: data.order.status } : o))
    } catch (e) { alert(e.response?.data?.message || 'Update failed') }
    finally { setUpdatingId(null) }
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Orders</h4>
          <p className={styles.pageSubtitle}>{total} orders total</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <select className="form-select form-select-sm" style={{ width: '180px' }} value={filter} onChange={e => { setFilter(e.target.value); setPage(1) }}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Date</th><th>Status</th><th>Update Status</th></tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/orders/${order._id}`} style={{ color: '#0d6efd', fontFamily: 'monospace', fontSize: '12px', textDecoration: 'none' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{order.user?.name || '—'}</div>
                    <div style={{ fontSize: '11px', color: '#8B96A5' }}>{order.user?.email}</div>
                  </td>
                  <td>{order.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td><strong>${order.totalPrice.toFixed(2)}</strong></td>
                  <td style={{ textTransform: 'uppercase', fontSize: '11px', color: '#8B96A5' }}>{order.paymentMethod}</td>
                  <td style={{ color: '#8B96A5', fontSize: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><span className={`${styles.badge} ${STATUS_BADGE[order.status]}`}>{order.status}</span></td>
                  <td>
                    {order.status !== 'cancelled' && order.status !== 'delivered' ? (
                      <select
                        className="form-select form-select-sm"
                        style={{ width: '140px' }}
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                      >
                        {STATUSES.filter(s => s !== 'cancelled').map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#8B96A5' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && <tr><td colSpan={8}><div className={styles.emptyState}><div className={styles.emptyIcon}>🧾</div>No orders found</div></td></tr>}
            </tbody>
          </table>
        )}
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>
          ))}
          <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
