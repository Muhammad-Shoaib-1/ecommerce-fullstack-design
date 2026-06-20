import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import styles from './OrderDetail.module.css'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const STATUS_STYLES = {
  pending:    { bg: '#FFF3CD', color: '#856404' },
  confirmed:  { bg: '#D1ECF1', color: '#0C5460' },
  processing: { bg: '#CCE5FF', color: '#004085' },
  shipped:    { bg: '#D4EDDA', color: '#155724' },
  delivered:  { bg: '#C3E6CB', color: '#155724' },
  cancelled:  { bg: '#F8D7DA', color: '#721C24' },
}

function OrderDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const location = useLocation()
  const justPlaced = location.state?.justPlaced

  const [order, setOrder]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`)
        setOrder(data.order)
      } catch (err) {
        setError(err.response?.data?.message || 'Order not found')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    setCancelling(true)
    try {
      const { data } = await api.put(`/orders/${id}/cancel`)
      setOrder(data.order)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel order')
    } finally {
      setCancelling(false)
    }
  }

  if (!user) return <div className="text-center py-5"><Link to="/login" className="btn btn-primary">Login</Link></div>
  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
  if (error)   return <div className="text-center py-5 text-danger">{error}</div>
  if (!order)  return null

  const statusIndex = STATUS_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'cancelled'
  const canCancel   = ['pending', 'confirmed', 'processing'].includes(order.status)

  return (
    <div className={styles.pageWrapper}>
      <div className="container py-4">

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.sep}>›</span>
          <Link to="/orders" className={styles.breadcrumbLink}>My Orders</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadcrumbActive}>#{order._id.slice(-8).toUpperCase()}</span>
        </div>

        {/* Success banner */}
        {justPlaced && (
          <div className={styles.successBanner}>
            <span className={styles.successIcon}>🎉</span>
            <div>
              <strong>Order placed successfully!</strong>
              <div style={{ fontSize: '13px', marginTop: '2px' }}>Thank you for your order. We'll notify you when it's confirmed.</div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h4 className={styles.pageTitle}>Order #{order._id.slice(-8).toUpperCase()}</h4>
            <p className={styles.pageDate}>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span style={{
              background: STATUS_STYLES[order.status]?.bg,
              color: STATUS_STYLES[order.status]?.color,
              padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600
            }}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            {canCancel && (
              <button className="btn btn-outline-danger btn-sm" onClick={handleCancel} disabled={cancelling}>
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        {!isCancelled && (
          <div className={styles.tracker}>
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className={styles.trackerStep}>
                <div className={`${styles.trackerDot} ${i <= statusIndex ? styles.trackerDotDone : ''}`}>
                  {i < statusIndex ? '✓' : i + 1}
                </div>
                <div className={`${styles.trackerLabel} ${i === statusIndex ? styles.trackerLabelActive : ''}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`${styles.trackerLine} ${i < statusIndex ? styles.trackerLineDone : ''}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {isCancelled && (
          <div className={styles.cancelledBanner}>
            ❌ This order was cancelled.
            {order.trackingNumber && ` Refund reference: ${order.trackingNumber}`}
          </div>
        )}

        <div className={styles.mainLayout}>

          {/* LEFT */}
          <div className={styles.left}>

            {/* Order Items */}
            <div className={styles.card}>
              <h6 className={styles.cardTitle}>Items Ordered</h6>
              {order.items.map((item, i) => (
                <div key={i} className={styles.itemRow}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemMeta}>Qty: {item.qty} × ${item.price.toFixed(2)}</div>
                  </div>
                  <div className={styles.itemTotal}>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className={styles.card}>
              <h6 className={styles.cardTitle}>📦 Shipping Address</h6>
              <div className={styles.addressBlock}>
                <strong>{order.shippingAddress.fullName}</strong><br />
                📞 {order.shippingAddress.phone}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className={styles.card}>
                <h6 className={styles.cardTitle}>📝 Order Notes</h6>
                <p className={styles.notes}>{order.notes}</p>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className={styles.right}>

            {/* Price Summary */}
            <div className={styles.card}>
              <h6 className={styles.cardTitle}>Payment Summary</h6>
              <div className={styles.summaryRow}>
                <span>Items ({order.items.reduce((s, i) => s + i.qty, 0)})</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={order.shippingPrice === 0 ? 'text-success' : ''}>
                  {order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryRow}>
                <span>Payment Method</span>
                <span style={{ fontWeight: 600 }}>
                  {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : order.paymentMethod === 'card' ? '💳 Card' : '🅿️ PayPal'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Payment Status</span>
                <span style={{ color: order.isPaid ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                  {order.isPaid ? '✓ Paid' : '⏳ Pending'}
                </span>
              </div>
            </div>

            {/* Tracking */}
            {order.trackingNumber && (
              <div className={styles.card}>
                <h6 className={styles.cardTitle}>🚚 Tracking</h6>
                <div className={styles.trackingNumber}>{order.trackingNumber}</div>
              </div>
            )}

            <div className={styles.actions}>
              <Link to="/orders" className="btn btn-outline-secondary w-100">← Back to Orders</Link>
              <Link to="/products" className="btn btn-primary w-100">Continue Shopping</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
