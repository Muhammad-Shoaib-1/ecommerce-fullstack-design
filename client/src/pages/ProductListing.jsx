import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductListing.module.css'

const products = [
  { id: 1, name: 'Canon Camera EOS 2000, Black 10x zoom', price: 998, oldPrice: 1128, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product1.png' },
  { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product2.png' },
  { id: 3, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product3.png' },
  { id: 4, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 3, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product4.png' },
  { id: 5, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: 1128, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product5.png' },
  { id: 6, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product6.png' },
  { id: 7, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product7.png' },
  { id: 8, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product5.png' },
  { id: 9, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, oldPrice: null, rating: 4, orders: 154, shipping: 'Free Shipping', img: '/src/assets/images/product2.png' },
]

const initialFilters = ['Samsung', 'Apple', 'Metallic', 'Plastic', 'Brand new', 'In stock']

function StarRating({ count }) {
  return (
    <div className={styles.gridCardRating}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? '#FF9017' : '#D5CDC5' }}>★</span>
      ))}
    </div>
  )
}

function ProductListing() {
  const [viewMode, setViewMode] = useState('list')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(999999)
  const [condition, setCondition] = useState('Any')
  const [activeFilters, setActiveFilters] = useState(initialFilters)

  const removeFilter = (filter) => {
    setActiveFilters(prev => prev.filter(f => f !== filter))
  }

  return (
    <div className={styles.pageWrapper}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbActive}>Clothings</span>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbActive}>Men's wear</span>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbActive}>Summer clothing</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container">
        <div className={styles.mainLayout}>

          {/* Sidebar */}
          <div className={styles.sidebar}>

            {/* Category */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Category</span>
                <span>▲</span>
              </div>
              {['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'].map((cat, i) => (
                <a
                  key={i}
                  href="#"
                  className={`${styles.sidebarLink} ${i === 2 ? styles.sidebarLinkActive : ''}`}
                >
                  {cat}
                </a>
              ))}
              <a href="#" className={styles.seeAll}>See all</a>
            </div>

            {/* Brands */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Brands</span>
                <span>▲</span>
              </div>
              {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand, i) => (
                <div key={i} className="form-check py-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`brand-${i}`}
                    defaultChecked={i < 2}
                  />
                  <label
                    className={`form-check-label ${styles.checkLabel}`}
                    htmlFor={`brand-${i}`}
                  >
                    {brand}
                  </label>
                </div>
              ))}
              <a href="#" className={styles.seeAll}>See all</a>
            </div>

            {/* Features */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Features</span>
                <span>▲</span>
              </div>
              {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map((f, i) => (
                <div key={i} className="form-check py-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`feat-${i}`}
                    defaultChecked={i < 1}
                  />
                  <label
                    className={`form-check-label ${styles.checkLabel}`}
                    htmlFor={`feat-${i}`}
                  >
                    {f}
                  </label>
                </div>
              ))}
              <a href="#" className={styles.seeAll}>See all</a>
            </div>

            {/* Price Range */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Price range</span>
                <span>▲</span>
              </div>
              <input type="range" className="form-range" min="0" max="999999" />
              <div className="d-flex gap-2 mt-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                />
              </div>
              <button className={styles.applyBtn}>Apply</button>
            </div>

            {/* Condition */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Condition</span>
                <span>▲</span>
              </div>
              {['Any', 'Refurbished', 'Brand new', 'Old items'].map((c, i) => (
                <div key={i} className="form-check py-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="condition"
                    id={`cond-${i}`}
                    checked={condition === c}
                    onChange={() => setCondition(c)}
                  />
                  <label
                    className={`form-check-label ${styles.checkLabel}`}
                    htmlFor={`cond-${i}`}
                  >
                    {c}
                  </label>
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarHeading}>
                <span>Ratings</span>
                <span>▲</span>
              </div>
              {[5, 4, 3, 2].map((star, i) => (
                <div key={i} className="form-check py-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`star-${i}`}
                  />
                  <label
                    className={`form-check-label ${styles.checkLabel}`}
                    htmlFor={`star-${i}`}
                  >
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: j < star ? '#FF9017' : '#D5CDC5' }}>★</span>
                    ))}
                  </label>
                </div>
              ))}
            </div>

          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>

            {/* Results Bar */}
            <div className={styles.resultsBar}>
              <span className={styles.resultsText}>
                <strong>12,911 items</strong> in Mobile accessory
              </span>
              <div className="d-flex align-items-center gap-3">
                <div className="form-check mb-0">
                  <input className="form-check-input" type="checkbox" id="verified" />
                  <label className={`form-check-label ${styles.checkLabel}`} htmlFor="verified">
                    Verified only
                  </label>
                </div>
                <select className="form-select form-select-sm" style={{ width: '130px' }}>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <div className="d-flex">
                  <button
                    className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    ⊞
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilters.length > 0 && (
              <div className={styles.filterTags}>
                {activeFilters.map((filter, i) => (
                  <div key={i} className={styles.filterTag}>
                    <span>{filter}</span>
                    <button
                      className={styles.filterTagClose}
                      onClick={() => removeFilter(filter)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  className={styles.clearAll}
                  onClick={() => setActiveFilters([])}
                >
                  Clear all filter
                </button>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className={styles.productList}>
                {products.map(product => (
                  <div key={product.id} className={styles.listCard}>
                    <img src={product.img} alt={product.name} className={styles.listCardImg} />
                    <div className={styles.listCardBody}>
                      <div className={styles.listCardTitle}>{product.name}</div>
                      <div>
                        <span className={styles.listCardPrice}>${product.price}.00</span>
                        {product.oldPrice && (
                          <span className={styles.listCardOldPrice}>${product.oldPrice}.00</span>
                        )}
                      </div>
                      <div className={styles.listCardMeta}>
                        <StarRating count={product.rating} />
                        <span>{product.orders} orders &nbsp;•&nbsp;</span>
                        <span className={styles.freeShipping}>{product.shipping}</span>
                      </div>
                      <div className={styles.listCardDesc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua
                      </div>
                      <Link to={`/product/${product.id}`} className={styles.viewDetails}>
                        View details
                      </Link>
                    </div>
                    <button className={styles.wishlistBtn}>♡</button>
                  </div>
                ))}
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className={styles.productGrid}>
                {products.map(product => (
                  <div key={product.id} className={styles.gridCard}>
                    <div className={styles.gridCardImgWrapper}>
                      <img src={product.img} alt={product.name} className={styles.gridCardImg} />
                    </div>
                    <div className={styles.gridCardBody}>
                      <div>
                        <span className={styles.gridCardPrice}>${product.price}.00</span>
                        {product.oldPrice && (
                          <span className={styles.gridCardOldPrice}>${product.oldPrice}.00</span>
                        )}
                      </div>
                      <StarRating count={product.rating} />
                      <div className={styles.gridCardDesc}>{product.name}</div>
                    </div>
                    <button className={styles.gridWishlistBtn}>♡</button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className={styles.pagination}>
              <span style={{ fontSize: '13px' }}>Show</span>
              <select className={styles.showSelect}>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <button className={styles.pageBtn}>‹</button>
              <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>›</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListing
