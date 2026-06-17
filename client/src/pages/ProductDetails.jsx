import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.css'
import './ProductDetails.mobile.css'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

function StarRating({ count }) {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? '#FF9017' : '#D5CDC5' }}>★</span>
      ))}
    </div>
  )
}

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct]           = useState(null)
  const [relatedProducts, setRelated]   = useState([])
  const [loading, setLoading]           = useState(true)
  const [activeTab, setActiveTab]       = useState('description')
  const [selectedImage, setSelectedImage] = useState('')
  const [qty, setQty]                   = useState(1)
  const [adding, setAdding]             = useState(false)
  const [addMsg, setAddMsg]             = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data.product)
        const mainImg = data.product.images?.find(i => i.isMain)?.url || data.product.images?.[0]?.url || ''
        setSelectedImage(mainImg)

        // Fetch related (same category)
        const rel = await api.get(`/products?category=${data.product.category?._id}&limit=6`)
        setRelated(rel.data.products.filter(p => p._id !== id))
      } catch (err) {
        console.error('Failed to load product:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    setAdding(true)
    const result = await addToCart(product._id, qty)
    setAddMsg(result.success ? '✓ Added to cart!' : result.message)
    setTimeout(() => setAddMsg(''), 3000)
    setAdding(false)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-5 text-muted">Product not found.</div>
  }

  const getImg = (p) => {
    const main = p.images?.find(i => i.isMain)
    return main?.url || p.images?.[0]?.url || ''
  }

  return (
    <>
      {/* Desktop View */}
      <div className={styles.pageWrapper}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className="container">
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbLink}>{product.category?.name}</span>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbActive}>{product.name}</span>
          </div>
        </div>

        <div className="container py-3">
          <div className={styles.contentMain}>

            {/* Left: Image Gallery */}
            <div className={styles.gallerySection}>
              <div className={styles.mainImageWrapper}>
                <img src={selectedImage} alt="product" className={styles.mainImage} />
              </div>
              <div className={styles.thumbnailStrip}>
                {product.images?.map((img, i) => (
                  <div
                    key={i}
                    className={`${styles.thumbnail} ${selectedImage === img.url ? styles.thumbnailActive : ''}`}
                    onClick={() => setSelectedImage(img.url)}
                  >
                    <img src={img.url} alt={`thumb-${i}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Product Info */}
            <div className={styles.productInfo}>
              <div className={styles.statusBadge}>
                <span className={styles.statusCheck}>✓</span>
                <span className={styles.statusText}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
              </div>

              <h4 className={styles.productTitle}>{product.name}</h4>

              <div className={styles.ratingRow}>
                <StarRating count={product.rating} />
                <span className={styles.ratingScore}>{product.rating}.0</span>
                <span className={styles.ratingDot}></span>
                <span className={styles.ratingMeta}>💬 {product.numReviews} reviews</span>
                <span className={styles.ratingDot}></span>
                <span className={styles.ratingMeta}>🛒 {product.orders} sold</span>
              </div>

              {/* Price */}
              <div className="my-3">
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#1C1C1C' }}>${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span style={{ fontSize: '16px', color: '#8B96A5', textDecoration: 'line-through', marginLeft: '10px' }}>
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Specs */}
              {product.specs?.length > 0 && (
                <div className={styles.specsTable}>
                  {product.specs.map((spec, i) => (
                    <div key={i} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}:</span>
                      <span className={styles.specValue}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Qty + Add to Cart */}
              <div className="d-flex align-items-center gap-2 mt-3">
                <select
                  className="form-select form-select-sm"
                  style={{ width: '80px' }}
                  value={qty}
                  onChange={e => setQty(Number(e.target.value))}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
                </select>
                <button
                  className="btn btn-primary"
                  disabled={adding || product.stock === 0}
                  onClick={handleAddToCart}
                >
                  {adding ? 'Adding...' : '🛒 Add to cart'}
                </button>
              </div>
              {addMsg && <div className="mt-2 text-success small">{addMsg}</div>}

              <div className={styles.saveForLater}>
                <span className={styles.saveIcon}>♡</span>
                <span className={styles.saveText}>Save for later</span>
              </div>
            </div>

            {/* Right: Seller Info */}
            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerAvatar}>{product.seller?.name?.[0] || 'S'}</div>
                <div>
                  <div className={styles.sellerName}>{product.seller?.name}</div>
                  <div className={styles.sellerCompany}>{product.seller?.company}</div>
                </div>
              </div>
              <div className={styles.sellerDivider} />
              <div className={styles.sellerInfo}>
                <div className={styles.sellerInfoRow}>
                  <span>🌍</span>
                  <span>{product.seller?.country}</span>
                </div>
                {product.seller?.verified && (
                  <div className={styles.sellerInfoRow}>
                    <span>✓</span>
                    <span>Verified Seller</span>
                  </div>
                )}
                <div className={styles.sellerInfoRow}>
                  <span>🌐</span>
                  <span>{product.shipping}</span>
                </div>
              </div>
              <button className={styles.sendInquiryBtn}>Send inquiry</button>
              <button className={styles.sellerProfileBtn}>Seller's profile</button>
            </div>

          </div>

          {/* Description + Aside */}
          <div className={styles.blockDetailRow}>
            <div className={styles.blockDetail}>
              <div className={styles.tabs}>
                {['description', 'reviews', 'shipping', 'about seller'].map(tab => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'description' && (
                  <div>
                    <p className={styles.description}>{product.description || 'No description available.'}</p>
                    {product.features?.length > 0 && (
                      <div className={styles.featuresList}>
                        {product.features.map((f, i) => (
                          <div key={i} className={styles.featureItem}>
                            <span className={styles.featureCheck}>✓</span>
                            <span className={styles.featureText}>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'reviews' && <div className={styles.tabPlaceholder}>Reviews coming soon...</div>}
                {activeTab === 'shipping' && <div className={styles.tabPlaceholder}>Shipping info coming soon...</div>}
                {activeTab === 'about seller' && <div className={styles.tabPlaceholder}>About seller coming soon...</div>}
              </div>
            </div>

            {/* You may like */}
            <div className={styles.asideItems}>
              <h6 className={styles.asideTitle}>You may like</h6>
              <div className={styles.asideList}>
                {relatedProducts.slice(0, 5).map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id} className={styles.asideItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.asideItemImg}>
                      <img src={getImg(item)} alt={item.name} />
                    </div>
                    <div className={styles.asideItemInfo}>
                      <div className={styles.asideItemName}>{item.name}</div>
                      <div className={styles.asideItemPrice}>${item.price.toFixed(2)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className={styles.relatedSection}>
              <h5 className={styles.relatedTitle}>Related products</h5>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id} className={styles.relatedCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.relatedImgWrapper}>
                      <img src={getImg(item)} alt={item.name} className={styles.relatedImg} />
                    </div>
                    <div className={styles.relatedName}>{item.name}</div>
                    <div className={styles.relatedPrice}>${item.price.toFixed(2)}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
      <div className="mobileProductDetails">
        <div className="mobileHeader">
          <button className="mobileHeaderIcon" onClick={() => window.history.back()}>←</button>
          <div className="mobileHeaderRight">
            <Link to="/cart" className="mobileHeaderIcon">🛒</Link>
          </div>
        </div>

        <div className="mobileGallery">
          <img src={selectedImage} alt={product.name} className="mobileGalleryMainImg" />
        </div>

        <h4 className="mobileProductTitle">{product.name}</h4>

        <div className="mobilePriceRow">
          <span className="mobilePrice">${product.price.toFixed(2)}</span>
          <span className="mobilePriceMeta">{product.orders} sold</span>
        </div>

        <div className="mobileActions">
          <button className="mobileAddToCartBtn" onClick={handleAddToCart} disabled={adding}>
            {adding ? 'Adding...' : 'Add to cart'}
          </button>
          <button className="mobileFavoriteBtn">♡</button>
        </div>
        {addMsg && <div className="text-center text-success small py-1">{addMsg}</div>}

        {product.specs?.slice(0, 4).map((spec, i) => (
          <div key={i} className="mobileFeatureRow">
            <span className="mobileFeatureLabel">{spec.label}</span>
            <span className="mobileFeatureValue">{spec.value}</span>
          </div>
        ))}

        <div className="mobileDescription">
          <p className="mobileDescriptionText">{product.description}</p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mobileRelatedSection">
            <h5 className="mobileRelatedTitle">Related products</h5>
            <div className="mobileRelatedGrid">
              {relatedProducts.slice(0, 3).map(item => (
                <Link to={`/product/${item._id}`} key={item._id} className="mobileRelatedCard" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="mobileRelatedCardImgWrap">
                    <img src={getImg(item)} alt={item.name} className="mobileRelatedCardImg" />
                  </div>
                  <div className="mobileRelatedCardBody">
                    <div className="mobileRelatedCardPrice">${item.price.toFixed(2)}</div>
                    <div className="mobileRelatedCardName">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductDetails
