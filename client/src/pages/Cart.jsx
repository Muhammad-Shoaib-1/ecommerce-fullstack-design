import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Cart.module.css'

const initialCartItems = [
  { id: 1, name: 'Bags with multiple colors, for men and lady', specs: 'Size: medium, Color: blue, Material: Plastic', seller: 'Artel Market', price: 78.99, qty: 9, img: '/src/assets/images/bag.png' },
  { id: 2, name: 'Branded coat for men', specs: 'Size: medium, Color: blue, Material: Plastic', seller: 'Best factory LLC', price: 39.00, qty: 3, img: '/src/assets/images/coat.png' },
  { id: 3, name: 'T-shirts with multiple colors, for men and lady', specs: 'Size: medium, Color: blue, Material: Plastic', seller: 'Artel Market', price: 170.50, qty: 1, img: '/src/assets/images/Sleeve T-shirt.jpg' },
]

const savedItems = [
  { id: 1, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, img: '/src/assets/images/GoPro Cameras.png' },
  { id: 2, name: 'Hp Core i5 7th gen', price: 99.50, img: '/src/assets/images/laptops.png' },
  { id: 3, name: 'Kitchen Mixer', price: 99.50, img: '/src/assets/images/kitchen mixer.png' },
  { id: 4, name: 'Techno Spark Neo7', price: 99.50, img: '/src/assets/images/consumer Mobile.png' },
]

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [coupon, setCoupon] = useState('')

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: Number(qty) } : item))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = 60.00
  const tax = 14.00
  const total = subtotal - discount + tax

  return (
    <div className={styles.pageWrapper}>
      <div className="container py-3">

        {/* Page Title */}
        <h4 className={styles.pageTitle}>My cart ({cartItems.length})</h4>

        {/* Main Layout */}
        <div className={styles.mainLayout}>

          {/* Left: Cart */}
          <div className={styles.cartSection}>

            {/* Cart Box */}
            <div className={styles.cartBox}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>

                  {/* Image */}
                  <div className={styles.cartItemImg}>
                    <img src={item.img} alt={item.name} />
                  </div>

                  {/* Info */}
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemName}>{item.name}</div>
                    <div className={styles.cartItemSpecs}>{item.specs}</div>
                    <div className={styles.cartItemSeller}>Seller: {item.seller}</div>
                    <div className={styles.cartItemActions}>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                      <button className={styles.saveBtn}>Save for later</button>
                    </div>
                  </div>

                  {/* Qty + Price */}
                  <div className={styles.cartItemRight}>
                    <div className={styles.cartItemPrice}>${item.price.toFixed(2)}</div>
                    <select
                      className={styles.qtySelect}
                      value={item.qty}
                      onChange={e => updateQty(item.id, e.target.value)}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>Qty: {n}</option>
                      ))}
                    </select>
                  </div>

                </div>
              ))}

              {/* Cart Footer */}
              <div className={styles.cartFooter}>
                <Link to="/products" className={styles.backBtn}>
                  ← Back to shop
                </Link>
                <button
                  className={styles.removeAllBtn}
                  onClick={() => setCartItems([])}
                >
                  Remove all
                </button>
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
            <div className={styles.savedSection}>
              <h5 className={styles.savedTitle}>Saved for later</h5>
              <div className={styles.savedGrid}>
                {savedItems.map((item, i) => (
                  <div key={i} className={styles.savedCard}>
                    <div className={styles.savedImgWrapper}>
                      <img src={item.img} alt={item.name} className={styles.savedImg} />
                    </div>
                    <div className={styles.savedPrice}>${item.price.toFixed(2)}</div>
                    <div className={styles.savedName}>{item.name}</div>
                    <button className={styles.moveToCartBtn}>
                      🛒 Move to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Aside */}
          <div className={styles.aside}>

            {/* Coupon Block */}
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

            {/* Summary Block */}
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
                <span title="Apple Pay">💳</span>
              </div>
            </div>

          </div>
        </div>

        {/* Discount Banner */}
        <div className={styles.discountBanner}>
          <div className={styles.bannerLeft}>
            <div className={styles.bannerTitle}>Super discount on more than 100 USD</div>
            <div className={styles.bannerDesc}>Have you ever finally just write dummy info</div>
          </div>
          <button className={styles.bannerBtn}>Shop now</button>
        </div>

      </div>
    </div>
  )
}

export default Cart