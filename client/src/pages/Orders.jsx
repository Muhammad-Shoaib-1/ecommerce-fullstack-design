import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Orders.module.css'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const STATUS_STYLES = {
  pending:    { bg: '#FFF3CD', color: '#856404', label: 'Pending' },
  confirmed:  { bg: '#D1ECF1', color: '#0C5460', label: 'Confirmed' },
  processing: { bg: '#CCE5FF', color: '#004085', label: 'Processing' },
  shipped:    { bg: '#D4EDDA', color: '#155724', label: 'Shipped' },
  delivered:  { bg: '#C3E6CB', color: '#155724', label: 'Delivered' },
  cancelled:  { bg: '#F8D7DA', color: '#721C24', label: 'Cancelled' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
      {s.label}
    </span>
  )
}

function Orders() {
  const { user } = useAuth()
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(1)
  const [pages, setPages]     = useState(1)
  const [total, setTotal]     = useState(0)

  useEffect(() => {
    if (!user) return
    const fetch = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/orders?page=${page}&limit=10`)
        setOrders(data.orders)
        setPages(data.pages)
        setTotal(data.total)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user, page])

  if (!user) {
    return (
      <div className="text-center py-5">
        <h5>Please log in to view your orders</h5>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="container py-4">

        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h4 className={styles.pageTitle}>My Orders</h4>
            <p className={styles.pageSubtitle}>{total} order{total !== 1 ? 's' : ''} placed</p>
          </div>
          <Link to="/products" className="btn btn-primary btn-sm">+ Continue Shopping</Link>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h5>No orders yet</h5>
            <p className="text-muted">When you place orders they will appear here.</p>
            <Link to="/products" className="btn btn-primary mt-2">Start Shopping</Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className={styles.ordersList}>
            {orders.map(order => (
              <div key={order._id} className={styles.orderCard}>

                {/* Order Card Header */}
                <div className={styles.orderCardHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>Order #{order._id.slice(-8).toUpperCase()}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items preview */}
                <div className={styles.orderItems}>
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className={styles.orderItemThumb}>
                      <img src={item.image} alt={item.name} />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className={styles.orderItemMore}>+{order.items.length - 3}</div>
                  )}
                  <div className={styles.orderItemsInfo}>
                    <div className={styles.orderItemsNames}>
                      {order.items.slice(0, 2).map(i => i.name).join(', ')}
                      {order.items.length > 2 ? ` +${order.items.length - 2} more` : ''}
                    </div>
                    <div className={styles.orderItemsCount}>
                      {order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className={styles.orderCardFooter}>
                  <div className={styles.orderTotal}>
                    <span className={styles.orderTotalLabel}>Total</span>
                    <span className={styles.orderTotalValue}>${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className={styles.orderPayment}>
                    {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : order.paymentMethod === 'card' ? '💳 Card' : '🅿️ PayPal'}
                  </div>
                  <Link to={`/orders/${order._id}`} className="btn btn-outline-primary btn-sm">
                    View Details →
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
            <span className={styles.pageInfo}>Page {page} of {pages}</span>
            <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next ›</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Orders
