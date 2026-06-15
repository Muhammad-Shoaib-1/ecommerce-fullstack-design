import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.css'
import './ProductDetails.mobile.css'

const product = {
  id: 1,
  name: 'Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle',
  status: 'In stock',
  rating: 4,
  ratingScore: 9.3,
  reviews: 32,
  sold: 154,
  tradePrices: [
    { price: '$98.00', range: '50-100 pcs', highlight: true },
    { price: '$90.00', range: '100-700 pcs', highlight: false },
    { price: '$78.00', range: '700+ pcs', highlight: false },
  ],
  specs: [
    { label: 'Price', value: 'Negotiable' },
    { label: 'Type', value: 'Classic shoes' },
    { label: 'Material', value: 'Plastic material' },
    { label: 'Design', value: 'Modern nice' },
    { label: 'Customization', value: 'Customized logo and design custom packages' },
    { label: 'Protection', value: 'Refund Policy' },
    { label: 'Warranty', value: '2 years full warranty' },
  ],
  tableSpecs: [
    { label: 'Model', value: '#8786867' },
    { label: 'Style', value: 'Classic style' },
    { label: 'Certificate', value: 'ISO-898921212' },
    { label: 'Size', value: '34mm x 450mm x 19mm' },
    { label: 'Memory', value: '36GB RAM' },
  ],
  features: [
    'Some great feature name here',
    'Lorem ipsum dolor sit amet, consectetur',
    'Duis aute irure dolor in reprehenderit',
    'Some great feature name here',
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  images: [
    '/src/assets/images/Sleeve T-shirt.jpg',
    '/src/assets/images/Sleeve T-shirt 1.jpg',
    '/src/assets/images/Sleeve T-shirt 2.jpg',
    '/src/assets/images/Sleeve T-shirt 3.jpg',
    '/src/assets/images/Sleeve T-shirt 4.jpg',
    '/src/assets/images/Sleeve T-shirt 5.jpg',
  ],
  mainImage: '/src/assets/images/Sleeve T-shirt.jpg',
}

const seller = {
  name: 'Supplier',
  company: 'Guanjoi Trading LLC',
  country: '🇩🇪 Germany, Berlin',
  status: 'Verified Seller',
  shipping: 'Worldwide shipping',
}

const relatedProducts = [
  { id: 1, name: 'Samsung Head Phones', price: '$25.00-$30.00', img: '/src/assets/images/HeadPhones.png' },
  { id: 2, name: 'GoPro Cameras', price: '$32.00-$40.00', img: '/src/assets/images/GoPro Cameras.png' },
  { id: 3, name: 'Laptops', price: '$32.00-$40.00', img: '/src/assets/images/Laptops.png' },
  { id: 4, name: 'Smart watches', price: '$32.00-$40.00', img: '/src/assets/images/Smart watches.png' },
  { id: 5, name: 'Wallet Lather Original', price: '$32.00-$40.00', img: '/src/assets/images/Wallet.png' },
  { id: 6, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', img: '/src/assets/images/product1.png' },
]

const youMayLike = [
  { id: 1, name: 'Men Blazers Sets Elegant Formal', price: '$7.00 - $99.50', img: '/src/assets/images/coat.png' },
  { id: 2, name: 'Men Shirt Sleeve Polo Contrast', price: '$7.00 - $99.50', img: '/src/assets/images/Sleeve T-Shirt.jpg' },
  { id: 3, name: 'Apple Watch Series Space Gray', price: '$7.00 - $99.50', img: '/src/assets/images/product7.png' },
  { id: 4, name: 'Basketball Crew Socks Long Stuff', price: '$7.00 - $99.50', img: '/src/assets/images/coat.png' },
  { id: 5, name: "New Summer Men's castrol T-Shirts", price: '$7.00 - $99.50', img: '/src/assets/images/bag.png' },
]

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
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(product.mainImage)

  return (
    <>
      {/* Desktop View */}
      <div className={styles.pageWrapper}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className="container">
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbLink}>Clothings</span>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbLink}>Men's wear</span>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbActive}>Summer clothing</span>
          </div>
        </div>

        <div className="container py-3">

          {/* Content Main */}
          <div className={styles.contentMain}>

            {/* Left: Image Gallery */}
            <div className={styles.gallerySection}>
              <div className={styles.mainImageWrapper}>
                <img src={selectedImage} alt="product" className={styles.mainImage} />
              </div>
              <div className={styles.thumbnailStrip}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`${styles.thumbnail} ${selectedImage === img ? styles.thumbnailActive : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`thumb-${i}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Product Info */}
            <div className={styles.productInfo}>

              {/* Status */}
              <div className={styles.statusBadge}>
                <span className={styles.statusCheck}>✓</span>
                <span className={styles.statusText}>In stock</span>
              </div>

              {/* Title */}
              <h4 className={styles.productTitle}>{product.name}</h4>

              {/* Rating */}
              <div className={styles.ratingRow}>
                <StarRating count={product.rating} />
                <span className={styles.ratingScore}>{product.ratingScore}</span>
                <span className={styles.ratingDot}></span>
                <span className={styles.ratingMeta}>💬 {product.reviews} reviews</span>
                <span className={styles.ratingDot}></span>
                <span className={styles.ratingMeta}>🛒 {product.sold} sold</span>
              </div>

              {/* Trade Price Banner */}
              <div className={styles.tradePriceBanner}>
                {product.tradePrices.map((tp, i) => (
                  <div key={i} className={styles.tradePriceItem}>
                    <div className={`${styles.tradePriceValue} ${tp.highlight ? styles.tradePriceHighlight : ''}`}>
                      {tp.price}
                    </div>
                    <div className={styles.tradePriceRange}>{tp.range}</div>
                    {i < product.tradePrices.length - 1 && <div className={styles.tradePriceDivider} />}
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className={styles.specsTable}>
                {product.specs.map((spec, i) => (
                  <div key={i} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}:</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Save for later */}
              <div className={styles.saveForLater}>
                <span className={styles.saveIcon}>♡</span>
                <span className={styles.saveText}>Save for later</span>
              </div>

            </div>

            {/* Right: Seller Info */}
            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerAvatar}>R</div>
                <div>
                  <div className={styles.sellerName}>{seller.name}</div>
                  <div className={styles.sellerCompany}>{seller.company}</div>
                </div>
              </div>
              <div className={styles.sellerDivider} />
              <div className={styles.sellerInfo}>
                <div className={styles.sellerInfoRow}>
                  <span>🇩🇪</span>
                  <span>{seller.country}</span>
                </div>
                <div className={styles.sellerInfoRow}>
                  <span>✓</span>
                  <span>{seller.status}</span>
                </div>
                <div className={styles.sellerInfoRow}>
                  <span>🌐</span>
                  <span>{seller.shipping}</span>
                </div>
              </div>
              <button className={styles.sendInquiryBtn}>Send inquiry</button>
              <button className={styles.sellerProfileBtn}>Seller's profile</button>
            </div>

          </div>

          {/* Block Detail + Aside */}
          <div className={styles.blockDetailRow}>

            {/* Block Detail */}
            <div className={styles.blockDetail}>

              {/* Tabs */}
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

              {/* Tab Content */}
              <div className={styles.tabContent}>

                {activeTab === 'description' && (
                  <div>
                    <p className={styles.description}>{product.description}</p>

                    {/* Specs Table */}
                    <div className={styles.infoTable}>
                      {product.tableSpecs.map((row, i) => (
                        <div key={i} className={styles.infoRow}>
                          <div className={styles.infoRowLabel}>{row.label}</div>
                          <div className={styles.infoRowValue}>{row.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className={styles.featuresList}>
                      {product.features.map((f, i) => (
                        <div key={i} className={styles.featureItem}>
                          <span className={styles.featureCheck}>✓</span>
                          <span className={styles.featureText}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className={styles.tabPlaceholder}>Reviews coming soon...</div>
                )}

                {activeTab === 'shipping' && (
                  <div className={styles.tabPlaceholder}>Shipping info coming soon...</div>
                )}

                {activeTab === 'about seller' && (
                  <div className={styles.tabPlaceholder}>About seller coming soon...</div>
                )}

              </div>
            </div>

            {/* Aside: You may like */}
            <div className={styles.asideItems}>
              <h6 className={styles.asideTitle}>You may like</h6>
              <div className={styles.asideList}>
                {youMayLike.map((item, i) => (
                  <div key={i} className={styles.asideItem}>
                    <div className={styles.asideItemImg}>
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className={styles.asideItemInfo}>
                      <div className={styles.asideItemName}>{item.name}</div>
                      <div className={styles.asideItemPrice}>{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Related Products */}
          <div className={styles.relatedSection}>
            <h5 className={styles.relatedTitle}>Related products</h5>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((item, i) => (
                <div key={i} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrapper}>
                    <img src={item.img} alt={item.name} className={styles.relatedImg} />
                  </div>
                  <div className={styles.relatedName}>{item.name}</div>
                  <div className={styles.relatedPrice}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner */}
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

        {/* Mobile Header */}
      <div className="mobileHeader">
        <button className="mobileHeaderIcon" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="mobileHeaderRight">
          <Link to="/cart" className="mobileHeaderIcon">🛒</Link>
          <button className="mobileHeaderIcon">👤</button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mobileGallery">
        <img src={selectedImage} alt={product.name} className="mobileGalleryMainImg" />
        <div className="mobileGalleryArrows">
          <button className="mobileGalleryArrowBtn">‹</button>
          <button className="mobileGalleryArrowBtn">›</button>
        </div>
      </div>

      {/* Title */}
      <h4 className="mobileProductTitle">{product.name}</h4>

      {/* Price */}
      <div className="mobilePriceRow">
        <span className="mobilePrice">$129.95</span>
        <span className="mobilePriceMeta">{product.sold} sold</span>
      </div>

      {/* Actions */}
      <div className="mobileActions">
        <button className="mobileAddToCartBtn">Add to cart</button>
        <button className="mobileFavoriteBtn">♡</button>
      </div>

      {/* Features */}
      <div className="mobileFeatures">
        {product.specs.slice(0, 4).map((spec, i) => (
          <div key={i} className="mobileFeatureRow">
            <span className="mobileFeatureLabel">{spec.label}</span>
            <span className="mobileFeatureValue">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mobileDescription">
        <p className="mobileDescriptionText">{product.description}</p>
        <button className="mobileReadMore">Read more +</button>
      </div>

      {/* Seller Card */}
      <div className="mobileSellerCard">
        <div className="mobileSellerRow">
          <div className="mobileSellerRowLeft">
            <div className="mobileSellerBadge">R</div>
            <span>{seller.country}</span>
          </div>
          <span className="mobileSellerChevron">›</span>
        </div>
      </div>

      {/* Rating row */}
      <div className="mobileRatingRow">
        <StarRating count={product.rating} />
        <span className="mobileRatingDot" />
        <div className="mobileRatingMeta">
          <span>💬</span>
          <span>{product.reviews} reviews</span>
        </div>
        <span className="mobileRatingDot" />
        <div className="mobileRatingMeta">
          <span>🛒</span>
          <span>{product.sold} sold</span>
        </div>
      </div>

      {/* Deals and offers (related products) */}
      <div className="mobileRelatedSection">
        <h5 className="mobileRelatedTitle">Deals and offers</h5>
        <div className="mobileRelatedGrid">
          {relatedProducts.slice(0, 3).map(item => (
            <div key={item.id} className="mobileRelatedCard">
              <div className="mobileRelatedCardImgWrap">
                <img src={item.img} alt={item.name} className="mobileRelatedCardImg" />
              </div>
              <div className="mobileRelatedCardBody">
                <div className="mobileRelatedCardPrice">{item.price}</div>
                <div className="mobileRelatedCardName">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}

export default ProductDetails
