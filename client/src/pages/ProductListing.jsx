import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styles from './ProductListing.module.css'
import './ProductListing.mobile.css'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

function StarRating({ count }) {
  return (
    <div className={styles.gridCardRating}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? '#FF9017' : '#D5CDC5' }}>★</span>
      ))}
    </div>
  )
}

function ProductListing() {
  const [searchParams] = useSearchParams()
  const { addToCart } = useCart()

  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal]           = useState(0)
  const [pages, setPages]           = useState(1)
  const [loading, setLoading]       = useState(true)
  const [addingId, setAddingId]     = useState(null)
  const [viewMode, setViewMode]     = useState('list')
  const [page, setPage]             = useState(1)
  const [limit, setLimit]           = useState(10)
  const [minPrice, setMinPrice]     = useState('')
  const [maxPrice, setMaxPrice]     = useState('')
  const [condition, setCondition]   = useState('Any')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  // Sync URL params when they change (user searches from navbar)
  useEffect(() => {
    const s = searchParams.get('search') || ''
    const c = searchParams.get('category') || ''
    setSearchQuery(s)
    setSelectedCategory(c)
    setPage(1)
  }, [searchParams])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.set('category', selectedCategory)
      if (searchQuery)       params.set('search', searchQuery)
      if (minPrice)          params.set('minPrice', minPrice)
      if (maxPrice)          params.set('maxPrice', maxPrice)
      if (condition !== 'Any') params.set('condition', condition)
      params.set('page', page)
      params.set('limit', limit)

      const { data } = await api.get(`/products?${params}`)
      setProducts(data.products)
      setTotal(data.total)
      setPages(data.pages)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchQuery, minPrice, maxPrice, condition, page, limit])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data.categories)).catch(() => {})
  }, [])

  const handleAddToCart = async (productId) => {
    setAddingId(productId)
    const result = await addToCart(productId, 1)
    if (!result.success) alert(result.message)
    setAddingId(null)
  }

  const getImg = (product) => {
    const main = product.images?.find(i => i.isMain)
    return main?.url || product.images?.[0]?.url || ''
  }

  return (
    <>
      <div className={styles.pageWrapper}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className="container">
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            {searchQuery
              ? <span className={styles.breadcrumbActive}>Search: "{searchQuery}"</span>
              : <span className={styles.breadcrumbActive}>{selectedCategory ? categories.find(c => c._id === selectedCategory)?.name : 'All Products'}</span>
            }
          </div>
        </div>

        <div className="container">
          <div className={styles.mainLayout}>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <div className={styles.sidebarHeading}><span>Category</span><span>▲</span></div>
                <a href="#" className={`${styles.sidebarLink} ${!selectedCategory ? styles.sidebarLinkActive : ''}`}
                  onClick={e => { e.preventDefault(); setSelectedCategory(''); setPage(1) }}>All</a>
                {categories.map(cat => (
                  <a key={cat._id} href="#"
                    className={`${styles.sidebarLink} ${selectedCategory === cat._id ? styles.sidebarLinkActive : ''}`}
                    onClick={e => { e.preventDefault(); setSelectedCategory(cat._id); setPage(1) }}>
                    {cat.name}
                  </a>
                ))}
              </div>

              <div className={styles.sidebarSection}>
                <div className={styles.sidebarHeading}><span>Price range</span><span>▲</span></div>
                <div className="d-flex gap-2 mt-2">
                  <input type="number" className="form-control form-control-sm" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                  <input type="number" className="form-control form-control-sm" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>
                <button className={styles.applyBtn} onClick={() => { setPage(1); fetchProducts() }}>Apply</button>
              </div>

              <div className={styles.sidebarSection}>
                <div className={styles.sidebarHeading}><span>Condition</span><span>▲</span></div>
                {['Any','Brand new','Refurbished','Used'].map((c, i) => (
                  <div key={i} className="form-check py-1">
                    <input className="form-check-input" type="radio" name="condition" id={`cond-${i}`}
                      checked={condition === c} onChange={() => { setCondition(c); setPage(1) }} />
                    <label className={`form-check-label ${styles.checkLabel}`} htmlFor={`cond-${i}`}>{c}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>

              {/* Results Bar */}
              <div className={styles.resultsBar}>
                <span className={styles.resultsText}>
                  {searchQuery
                    ? <><strong>{total}</strong> results for "<strong>{searchQuery}</strong>"</>
                    : <><strong>{total}</strong> items found</>
                  }
                </span>
                <div className="d-flex align-items-center gap-3">
                  <select className="form-select form-select-sm" style={{ width: '130px' }}>
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="d-flex">
                    <button className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleBtnActive : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
                    <button className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleBtnActive : ''}`} onClick={() => setViewMode('list')}>☰</button>
                  </div>
                </div>
              </div>

              {/* Search banner */}
              {searchQuery && (
                <div className={styles.searchBanner}>
                  <span>🔍 Showing results for "<strong>{searchQuery}</strong>"</span>
                  <button className={styles.clearSearch} onClick={() => { setSearchQuery(''); setPage(1) }}>✕ Clear</button>
                </div>
              )}

              {loading && <div className="text-center py-5"><div className="spinner-border text-primary" /></div>}

              {/* List View */}
              {!loading && viewMode === 'list' && (
                <div className={styles.productList}>
                  {products.map(product => (
                    <div key={product._id} className={styles.listCard}>
                      <img src={getImg(product)} alt={product.name} className={styles.listCardImg} />
                      <div className={styles.listCardBody}>
                        <div className={styles.listCardTitle}>{product.name}</div>
                        <div>
                          <span className={styles.listCardPrice}>${product.price.toFixed(2)}</span>
                          {product.oldPrice && <span className={styles.listCardOldPrice}>${product.oldPrice.toFixed(2)}</span>}
                        </div>
                        <div className={styles.listCardMeta}>
                          <StarRating count={product.rating} />
                          <span>{product.orders} orders &nbsp;•&nbsp;</span>
                          <span className={styles.freeShipping}>{product.shipping}</span>
                        </div>
                        <div className={styles.listCardDesc}>{product.description || 'No description available.'}</div>
                        <div className="d-flex gap-2 mt-2">
                          <Link to={`/product/${product._id}`} className={styles.viewDetails}>View details</Link>
                          <button className="btn btn-primary btn-sm" disabled={addingId === product._id} onClick={() => handleAddToCart(product._id)}>
                            {addingId === product._id ? '...' : '+ Cart'}
                          </button>
                        </div>
                      </div>
                      <button className={styles.wishlistBtn}>♡</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid View */}
              {!loading && viewMode === 'grid' && (
                <div className={styles.productGrid}>
                  {products.map(product => (
                    <div key={product._id} className={styles.gridCard}>
                      <div className={styles.gridCardImgWrapper}>
                        <img src={getImg(product)} alt={product.name} className={styles.gridCardImg} />
                      </div>
                      <div className={styles.gridCardBody}>
                        <div>
                          <span className={styles.gridCardPrice}>${product.price.toFixed(2)}</span>
                          {product.oldPrice && <span className={styles.gridCardOldPrice}>${product.oldPrice.toFixed(2)}</span>}
                        </div>
                        <StarRating count={product.rating} />
                        <div className={styles.gridCardDesc}>{product.name}</div>
                        <Link to={`/product/${product._id}`} className="btn btn-outline-primary btn-sm w-100 mt-1">View</Link>
                      </div>
                      <button className={styles.gridWishlistBtn}>♡</button>
                    </div>
                  ))}
                </div>
              )}

              {!loading && products.length === 0 && (
                <div className="text-center py-5">
                  <div style={{ fontSize: '48px' }}>🔍</div>
                  <h5 className="mt-3">No products found</h5>
                  <p className="text-muted">Try different keywords or remove filters</p>
                  <button className="btn btn-outline-primary mt-2" onClick={() => { setSearchQuery(''); setSelectedCategory(''); setCondition('Any'); setMinPrice(''); setMaxPrice('') }}>
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className={styles.pagination}>
                <span style={{ fontSize: '13px' }}>Show</span>
                <select className={styles.showSelect} value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1) }}>
                  <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
                </select>
                <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListing
