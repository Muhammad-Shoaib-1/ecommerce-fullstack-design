import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from './Cart.module.css'
import './Cart.mobile.css'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const { user } = useAuth()
  const { activeItems, savedItems, cartCount, subtotal, updateQty, removeItem, saveForLater, clearCart, cartLoading } = useCart()
  const [coupon, setCoupon] = useState('')

  const discount = 60.00
  const tax = 14.00
  const total = subtotal - discount + tax

  const getImg = (product) => {
    const main = product?.images?.find(i => i.isMain)
    return main?.url || product?.images?.[0]?.url || ''
  }

  // Not logged in
  if (!user) {
    return (
      <div className="text-center py-5">
        <h5>Please log in to view your cart</h5>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    )
  }

  if (cartLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className="container py-3">

          <h4 className={styles.pageTitle}>My cart ({cartCount})</h4>

          <div className={styles.mainLayout}>

            {/* Left: Cart Items */}
            <div className={styles.cartSection}>

              <div className={styles.cartBox}>
                {activeItems.length === 0 && (
                  <div className="text-center py-5 text-muted">
                    Your cart is empty. <Link to="/products">Shop now</Link>
                  </div>
                )}

                {activeItems.map((item) => (
                  <div key={item._id} className={styles.cartItem}>
                    <div className={styles.cartItemImg}>
                      <img src={getImg(item.product)} alt={item.product?.name} />
                    </div>
                    <div className={styles.cartItemInfo}>
                      <div className={styles.cartItemName}>{item.product?.name}</div>
                      <div className={styles.cartItemSeller}>Seller: {item.product?.seller?.company || 'Seller'}</div>
                      <div className={styles.cartItemActions}>
                        <button className={styles.removeBtn} onClick={() => removeItem(item._id)}>Remove</button>
                        <button className={styles.saveBtn} onClick={() => saveForLater(item._id)}>Save for later</button>
                      </div>
                    </div>
                    <div className={styles.cartItemRight}>
                      <div className={styles.cartItemPrice}>${item.product?.price?.toFixed(2)}</div>
                      <select
                        className={styles.qtySelect}
                        value={item.qty}
                        onChange={e => updateQty(item._id, Number(e.target.value))}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>Qty: {n}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                <div className={styles.cartFooter}>
                  <Link to="/products" className={styles.backBtn}>← Back to shop</Link>
                  <button className={styles.removeAllBtn} onClick={clearCart}>Remove all</button>
                </div>
              </div>

              {/* Features Strip */}
              <div className={styles.featuresStrip}>
                {[
                  { icon: '🔒', name: 'Secure payment', desc: 'Have you ever finally just' },
                  { icon: '💬', name: 'Customer support', desc: 'Have you ever finally just' },
                  { icon: '🚚', name: 'Free delivery', desc: 'Have you ever finally just' },
                ].map((f, i) => (
                  <div key={i} className={styles.featureItem}>
                    <div className={styles.featureIcon}>{f.icon}</div>
                    <div>
                      <div className={styles.featureName}>{f.name}</div>
                      <div className={styles.featureDesc}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className={styles.savedSection}>
                  <h5 className={styles.savedTitle}>Saved for later ({savedItems.length})</h5>
                  <div className={styles.savedGrid}>
                    {savedItems.map((item) => (
                      <div key={item._id} className={styles.savedCard}>
                        <div className={styles.savedImgWrapper}>
                          <img src={getImg(item.product)} alt={item.product?.name} className={styles.savedImg} />
                        </div>
                        <div className={styles.savedPrice}>${item.product?.price?.toFixed(2)}</div>
                        <div className={styles.savedName}>{item.product?.name}</div>
                        <button className={styles.moveToCartBtn} onClick={() => saveForLater(item._id)}>
                          🛒 Move to cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className={styles.aside}>
              <div className={styles.couponBlock}>
                <div className={styles.couponTitle}>Have a coupon?</div>
                <div className={styles.couponRow}>
                  <input
                    type="text"
                    className={styles.couponInput}
                    placeholder="Add coupon"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                  />
                  <button className={styles.couponApplyBtn}>Apply</button>
                </div>
              </div>

              <div className={styles.summaryBlock}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal:</span>
                  <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Discount:</span>
                  <span className={`${styles.summaryValue} ${styles.discount}`}>- $60.00</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tax:</span>
                  <span className={`${styles.summaryValue} ${styles.tax}`}>+ $14.00</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryTotalRow}>
                  <span className={styles.summaryTotalLabel}>Total:</span>
                  <span className={styles.summaryTotalValue}>${total.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutBtn}>Checkout</button>
                <div className={styles.paymentIcons}>
                  <span title="Amex">💳</span>
                  <span title="Mastercard">💳</span>
                  <span title="PayPal">💳</span>
                  <span title="Visa">💳</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.discountBanner}>
            <div className={styles.bannerLeft}>
              <div className={styles.bannerTitle}>Super discount on more than 100 USD</div>
              <div className={styles.bannerDesc}>Have you ever finally just write dummy info</div>
            </div>
            <button className={styles.bannerBtn}>Shop now</button>
          </div>
        </div>
      </div>

      {/* ========== MOBILE LAYOUT ========== */}
      <div className="mobileCart">
        <div className="mobileHeader">
          <button className="mobileHeaderIcon" onClick={() => window.history.back()}>←</button>
          <div className="mobileHeaderTitle">My cart ({cartCount})</div>
        </div>

        {activeItems.map(item => (
          <div key={item._id} className="mobileCartItem">
            <button className="mobileCartItemMore" onClick={() => removeItem(item._id)}>✕</button>
            <div className="mobileCartItemTop">
              <div className="mobileCartItemImg">
                <img src={getImg(item.product)} alt={item.product?.name} />
              </div>
              <div className="mobileCartItemInfo">
                <div className="mobileCartItemName">{item.product?.name}</div>
                <div className="mobileCartItemSpecs">${item.product?.price?.toFixed(2)} each</div>
              </div>
            </div>
            <div className="mobileCartItemBottom">
              <div className="mobileQtyStepper">
                <button className="mobileQtyBtn" onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}>−</button>
                <span className="mobileQtyValue">{item.qty}</span>
                <button className="mobileQtyBtn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>
              <div className="mobileCartItemPrice">${(item.product?.price * item.qty).toFixed(2)}</div>
            </div>
          </div>
        ))}

        <div className="mobileSummary">
          <div className="mobileSummaryRow">
            <span className="mobileSummaryLabel">Items ({cartCount}):</span>
            <span className="mobileSummaryValue">${subtotal.toFixed(2)}</span>
          </div>
          <div className="mobileSummaryRow">
            <span className="mobileSummaryLabel">Tax:</span>
            <span className="mobileSummaryValue">${tax.toFixed(2)}</span>
          </div>
          <div className="mobileSummaryTotalRow">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mobileCheckoutBtn">Proceed to checkout</button>
        </div>
      </div>
    </>
  )
}

export default Cart
