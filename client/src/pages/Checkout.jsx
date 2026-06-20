import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Checkout.module.css'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const STEPS = ['Shipping', 'Payment', 'Review']

const COUNTRIES = ['Pakistan', 'United Arab Emirates', 'United States', 'United Kingdom',
  'Germany', 'France', 'Saudi Arabia', 'Canada', 'Australia', 'India']

function Checkout() {
  const { user } = useAuth()
  const { activeItems, subtotal, cartCount, fetchCart, appliedCoupon, couponDiscount, removeCoupon } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  const discount       = subtotal === 0 ? 0 : couponDiscount
  const taxableAmount  = Math.max(subtotal - discount, 0)
  const shippingPrice  = subtotal > 100 ? 0 : 10
  const taxPrice       = parseFloat((taxableAmount * 0.08).toFixed(2))
  const totalPrice     = parseFloat((taxableAmount + shippingPrice + taxPrice).toFixed(2))

  const [shipping, setShipping] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [notes, setNotes] = useState('')

  const getImg = (product) => {
    const main = product?.images?.find(i => i.isMain)
    return main?.url || product?.images?.[0]?.url || ''
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    const required = ['fullName', 'phone', 'address', 'city', 'state', 'zipCode', 'country']
    for (const f of required) {
      if (!shipping[f].trim()) {
        setError(`Please fill in: ${f}`)
        return
      }
    }
    setError('')
    setStep(1)
  }

  const handlePlaceOrder = async () => {
    setPlacing(true)
    setError('')
    try {
      const { data } = await api.post('/orders', {
        shippingAddress: shipping,
        paymentMethod,
        notes,
        couponCode: appliedCoupon?.code || null,
      })
      removeCoupon()
      await fetchCart()
      navigate(`/orders/${data.order._id}`, { state: { justPlaced: true } })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.')
      setStep(0)
    } finally {
      setPlacing(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-5">
        <h5>Please log in to checkout</h5>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    )
  }

  if (cartCount === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: '48px' }}>🛒</div>
        <h5 className="mt-3">Your cart is empty</h5>
        <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="container py-4">

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to="/cart" className={styles.breadcrumbLink}>Cart</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbActive}>Checkout</span>
        </div>

        <h4 className={styles.pageTitle}>Checkout</h4>

        {/* Step Indicator */}
        <div className={styles.stepper}>
          {STEPS.map((s, i) => (
            <div key={s} className={styles.stepperItem}>
              <div className={`${styles.stepCircle} ${i <= step ? styles.stepCircleActive : ''} ${i < step ? styles.stepCircleDone : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <div className={styles.mainLayout}>

          {/* ── LEFT: Step Content ── */}
          <div className={styles.formSection}>

            {/* STEP 0: Shipping */}
            {step === 0 && (
              <div className={styles.card}>
                <h5 className={styles.cardTitle}>📦 Shipping Address</h5>
                <form onSubmit={handleShippingSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className={styles.label}>Full Name *</label>
                      <input className="form-control" value={shipping.fullName}
                        onChange={e => setShipping({ ...shipping, fullName: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className={styles.label}>Phone Number *</label>
                      <input className="form-control" placeholder="+92 300 0000000" value={shipping.phone}
                        onChange={e => setShipping({ ...shipping, phone: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className={styles.label}>Street Address *</label>
                      <input className="form-control" placeholder="House no., Street, Area" value={shipping.address}
                        onChange={e => setShipping({ ...shipping, address: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className={styles.label}>City *</label>
                      <input className="form-control" placeholder="e.g. Lahore" value={shipping.city}
                        onChange={e => setShipping({ ...shipping, city: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className={styles.label}>State / Province *</label>
                      <input className="form-control" placeholder="e.g. Punjab" value={shipping.state}
                        onChange={e => setShipping({ ...shipping, state: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className={styles.label}>ZIP / Postal Code *</label>
                      <input className="form-control" placeholder="e.g. 54000" value={shipping.zipCode}
                        onChange={e => setShipping({ ...shipping, zipCode: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className={styles.label}>Country *</label>
                      <select className="form-select" value={shipping.country}
                        onChange={e => setShipping({ ...shipping, country: e.target.value })}>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className={styles.label}>Order Notes (optional)</label>
                      <textarea className="form-control" rows={2} placeholder="Any special instructions..."
                        value={notes} onChange={e => setNotes(e.target.value)} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <Link to="/cart" className="btn btn-outline-secondary">← Back to Cart</Link>
                    <button type="submit" className="btn btn-primary px-5">Continue to Payment →</button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 1: Payment */}
            {step === 1 && (
              <div className={styles.card}>
                <h5 className={styles.cardTitle}>💳 Payment Method</h5>

                <div className={styles.paymentOptions}>
                  {[
                    { value: 'cod',    icon: '💵', label: 'Cash on Delivery',  desc: 'Pay when your order arrives' },
                    { value: 'card',   icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
                    { value: 'paypal', icon: '🅿️', label: 'PayPal',             desc: 'Fast & secure checkout' },
                  ].map(opt => (
                    <label key={opt.value} className={`${styles.paymentOption} ${paymentMethod === opt.value ? styles.paymentOptionActive : ''}`}>
                      <input type="radio" name="payment" value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={() => setPaymentMethod(opt.value)}
                        className={styles.radioInput}
                      />
                      <span className={styles.paymentIcon}>{opt.icon}</span>
                      <div>
                        <div className={styles.paymentLabel}>{opt.label}</div>
                        <div className={styles.paymentDesc}>{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className={`${styles.cardInputs} mt-3`}>
                    <div className="mb-3">
                      <label className={styles.label}>Card Number</label>
                      <input className="form-control" placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className="row g-3">
                      <div className="col-6">
                        <label className={styles.label}>Expiry Date</label>
                        <input className="form-control" placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div className="col-6">
                        <label className={styles.label}>CVV</label>
                        <input className="form-control" placeholder="123" maxLength={4} type="password" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={styles.label}>Name on Card</label>
                      <input className="form-control" placeholder="As it appears on your card" />
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-outline-secondary" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary px-5" onClick={() => setStep(2)}>Review Order →</button>
                </div>
              </div>
            )}

            {/* STEP 2: Review */}
            {step === 2 && (
              <div className={styles.card}>
                <h5 className={styles.cardTitle}>📋 Review Your Order</h5>

                {/* Shipping summary */}
                <div className={styles.reviewSection}>
                  <div className={styles.reviewSectionHeader}>
                    <span>Shipping to</span>
                    <button className={styles.editBtn} onClick={() => setStep(0)}>Edit</button>
                  </div>
                  <div className={styles.reviewContent}>
                    <strong>{shipping.fullName}</strong> · {shipping.phone}<br />
                    {shipping.address}, {shipping.city}, {shipping.state} {shipping.zipCode}<br />
                    {shipping.country}
                  </div>
                </div>

                {/* Payment summary */}
                <div className={styles.reviewSection}>
                  <div className={styles.reviewSectionHeader}>
                    <span>Payment</span>
                    <button className={styles.editBtn} onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <div className={styles.reviewContent}>
                    {paymentMethod === 'cod' ? '💵 Cash on Delivery' : paymentMethod === 'card' ? '💳 Credit/Debit Card' : '🅿️ PayPal'}
                  </div>
                </div>

                {/* Items */}
                <div className={styles.reviewSection}>
                  <div className={styles.reviewSectionHeader}>
                    <span>Items ({cartCount})</span>
                    <Link to="/cart" className={styles.editBtn}>Edit</Link>
                  </div>
                  <div className={styles.reviewItems}>
                    {activeItems.map(item => (
                      <div key={item._id} className={styles.reviewItem}>
                        <img src={getImg(item.product)} alt={item.product?.name} className={styles.reviewItemImg} />
                        <div className={styles.reviewItemInfo}>
                          <div className={styles.reviewItemName}>{item.product?.name}</div>
                          <div className={styles.reviewItemMeta}>Qty: {item.qty}</div>
                        </div>
                        <div className={styles.reviewItemPrice}>
                          ${(item.product?.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>← Back</button>
                  <button
                    className="btn btn-primary px-5"
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing
                      ? <><span className="spinner-border spinner-border-sm me-2" />Placing Order...</>
                      : `Place Order · $${totalPrice}`
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className={styles.aside}>
            <div className={styles.summaryCard}>
              <h6 className={styles.summaryTitle}>Order Summary</h6>

              <div className={styles.summaryItems}>
                {activeItems.map(item => (
                  <div key={item._id} className={styles.summaryItem}>
                    <img src={getImg(item.product)} alt={item.product?.name} className={styles.summaryItemImg} />
                    <div className={styles.summaryItemName}>{item.product?.name}</div>
                    <div className={styles.summaryItemPrice}>${(item.product?.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryRow}>
                <span>Subtotal ({cartCount} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className={styles.summaryRow}>
                  <span>Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}</span>
                  <span className="text-success">- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={shippingPrice === 0 ? 'text-success' : ''}>
                  {shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (8%)</span>
                <span>${taxPrice}</span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              {subtotal <= 100 && (
                <div className={styles.shippingNote}>
                  Add <strong>${(100 - subtotal).toFixed(2)}</strong> more for free shipping!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
