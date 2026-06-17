import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import './Home.mobile.css'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()
  const [time, setTime] = useState({ days: 4, hours: 13, mins: 34, secs: 56 })

  // API state
  const [categories, setCategories]             = useState([])
  const [dealProducts, setDealProducts]         = useState([])
  const [homeOutdoorProducts, setHomeOutdoorProducts]   = useState([])
  const [electronicsProducts, setElectronicsProducts]   = useState([])
  const [recommendedProducts, setRecommendedProducts]   = useState([])
  const [loading, setLoading]                   = useState(true)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev
        secs--
        if (secs < 0) { secs = 59; mins-- }
        if (mins < 0) { mins = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        return { days, hours, mins, secs }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch all homepage data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, dealsRes, featuredRes, recommendedRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?deals=true&limit=5'),
          api.get('/products?featured=true&limit=8'),
          api.get('/products?limit=10'),
        ])

        setCategories(catRes.data.categories.map(c => c.name))
        setDealProducts(dealsRes.data.products)

        const featured = featuredRes.data.products
        // Split featured into home/outdoor and electronics by category name
        setHomeOutdoorProducts(featured.slice(0, 8))
        setElectronicsProducts(featured.slice(0, 8))
        setRecommendedProducts(recommendedRes.data.products)
      } catch (err) {
        console.error('Homepage fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  // Helper: get main image url from product
  const getImg = (product) => {
    const main = product.images?.find(i => i.isMain)
    return main?.url || product.images?.[0]?.url || ''
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <div className="bg-light">

      {/* ========== MOBILE LAYOUT ========== */}
      <div className="mobileHome">
        <div className="mobileSearch">
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8B96A5' }}>🔍</span>
            <input className="mobileSearchInput" placeholder="Search" />
          </div>
        </div>

        <div className="mobileCategoryPills">
          {['All category', ...categories.slice(0, 4)].map((pill, i) => (
            <button key={i} className="mobilePill">{pill}</button>
          ))}
        </div>

        <div className="mobileBanner">
          <img src="/src/assets/images/hero-bg.png" alt="banner" className="mobileBannerImg" />
          <div className="mobileBannerText">
            <div className="mobileBannerSubtitle">Latest trending</div>
            <div className="mobileBannerTitle">Electronic items</div>
            <button className="mobileBannerBtn">Learn more</button>
          </div>
        </div>

        {/* Deals & Offers */}
        <div className="mobileDealsSection">
          <div className="mobileDealsHeader">
            <div>
              <p className="mobileDealsTitle">Deals and offers</p>
              <p className="mobileDealsSubtitle">Electronic equipments</p>
            </div>
            <div className="mobileCountdown">
              {[{ val: time.hours, label: 'Hour' }, { val: time.mins, label: 'Min' }, { val: time.secs, label: 'Sec' }].map(({ val, label }) => (
                <div key={label} className="mobileCountdownBox">
                  <span className="mobileCountdownNum">{String(val).padStart(2, '0')}</span>
                  <span className="mobileCountdownLabel">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mobileDealsScroll">
            {dealProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="mobileDealCard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={getImg(product)} alt={product.name} />
                <div className="mobileDealName">{product.name}</div>
                <div className="mobileDealBadge">{product.discount}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Home & Outdoor */}
        <div className="mobileCategorySection">
          <div className="mobileCategoryHeader">
            <p className="mobileCategoryTitle">Home and outdoor</p>
            <Link to="/products" className="mobileSourceBtn">Source now →</Link>
          </div>
          <div className="mobileCategoryScroll">
            {homeOutdoorProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="mobileCatCard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={getImg(product)} alt={product.name} />
                <div className="mobileCatName">{product.name}</div>
                <div className="mobileCatPrice">From USD {product.price}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Consumer Electronics */}
        <div className="mobileCategorySection">
          <div className="mobileCategoryHeader">
            <p className="mobileCategoryTitle">Consumer electronics</p>
            <Link to="/products" className="mobileSourceBtn">Source now →</Link>
          </div>
          <div className="mobileCategoryScroll">
            {electronicsProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="mobileCatCard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={getImg(product)} alt={product.name} />
                <div className="mobileCatName">{product.name}</div>
                <div className="mobileCatPrice">From USD {product.price}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mobileQuoteBanner">
          <div className="mobileQuoteTitle">An easy way to send requests to all suppliers</div>
          <button className="mobileQuoteBtn">Send inquiry</button>
        </div>

        {/* Recommended Items */}
        <div className="mobileRecommendedSection">
          <h5 className="mobileRecommendedTitle">Recommended items</h5>
          <div className="mobileRecommendedGrid">
            {recommendedProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="mobileProductCard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="mobileProductCardImg">
                  <img src={getImg(product)} alt={product.name} />
                </div>
                <div className="mobileProductCardBody">
                  <div className="mobileProductCardPrice">${product.price.toFixed(2)}</div>
                  <div className="mobileProductCardName">{product.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className={styles.desktopHome}>

        {/* Hero Section */}
        <div className={`container py-3 ${styles.heroSection}`}>
          <div className="row g-2">
            <div className="col-md-2">
              <div className={styles.categorySidebar}>
                {categories.map((cat, i) => (
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    key={i}
                    className={`${styles.categoryItem} ${i === 0 ? styles.categoryItemActive : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-md-7">
              <div className={styles.heroBanner} style={{ backgroundImage: 'url(/src/assets/images/hero-bg.png)' }}>
                <div>
                  <p className="mb-1 text-muted">Latest trending</p>
                  <h2 className="fw-bold">Electronic items</h2>
                  <Link to="/products" className="btn btn-outline-dark mt-2 rounded-pill px-4">Learn more</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex flex-column gap-2">
              <div className={styles.userCard}>
                <div className={styles.userAvatar}>
                  {user && <span style={{ color: '#0d6efd', fontWeight: 700, fontSize: '18px' }}>{user.name[0].toUpperCase()}</span>}
                </div>
                {user ? (
                  <>
                    <p className="mb-2 fw-semibold" style={{ fontSize: '13px' }}>Hi, {user.name.split(' ')[0]}!<br />Welcome back</p>
                    <div className="d-flex gap-2">
                      <Link to="/cart" className="btn btn-primary btn-sm flex-grow-1">My cart</Link>
                      <Link to="/products" className="btn btn-outline-secondary btn-sm flex-grow-1">Shop</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-2 fw-semibold" style={{ fontSize: '13px' }}>Hi, user<br />let's get started</p>
                    <div className="d-flex gap-2">
                      <Link to="/register" className="btn btn-primary btn-sm flex-grow-1">Join now</Link>
                      <Link to="/login" className="btn btn-outline-secondary btn-sm flex-grow-1">Log in</Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.promoOrange}>
                <p className="text-white mb-0 fw-semibold" style={{ fontSize: '13px' }}>Get US $10 off<br />with a new supplier</p>
              </div>
              <div className={styles.promoBlue}>
                <p className="text-white mb-0 fw-semibold" style={{ fontSize: '13px' }}>Send quotes with<br />supplier preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deals & Offers */}
        <div className={`container py-3 ${styles.dealsSection}`}>
          <div className={styles.dealsSectionInner}>
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <h6 className="fw-bold mb-0">Deals and offers</h6>
                <small className="text-muted">Hygiene equipments</small>
                <div className="d-flex gap-2 mt-2">
                  {[{ val: time.days, label: 'Days' }, { val: time.hours, label: 'Hour' }, { val: time.mins, label: 'Min' }, { val: time.secs, label: 'Sec' }].map(({ val, label }) => (
                    <div key={label} className={styles.countdownBox}>
                      <div className={styles.countdownNum}>{String(val).padStart(2, '0')}</div>
                      <div className={styles.countdownLabel}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-9">
                <div className="d-flex">
                  {dealProducts.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className={styles.dealCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={getImg(product)} alt={product.name} className={styles.dealCardImg} />
                      <div className={styles.dealCardName}>{product.name}</div>
                      <span className="badge rounded-pill text-bg-danger mt-1">{product.discount}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {[
          { title: 'Home and outdoor', bg: '#FFF0E0', bannerImg: '/src/assets/images/home-outdoor-banner.png', products: homeOutdoorProducts },
          { title: 'Consumer electronics and gadgets', bg: '#EBF6FF', bannerImg: '/src/assets/images/electronics-banner.png', products: electronicsProducts },
        ].map((section, si) => (
          <div className={`container py-3 ${styles.categorySection}`} key={si}>
            <div className={styles.categorySectionInner}>
              <div className={styles.categoryBanner} style={{ background: section.bg, backgroundImage: `url(${section.bannerImg})` }}>
                <div className={styles.categoryBannerOverlay} />
                <div className={styles.categoryBannerContent}>
                  <h6 className="fw-bold">{section.title}</h6>
                  <Link to="/products" className="btn btn-outline-secondary btn-sm rounded-pill mt-2">Source now</Link>
                </div>
              </div>
              <div className={styles.categoryProductGrid}>
                {section.products.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id} className={styles.categoryProductCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={getImg(product)} alt={product.name} className={styles.categoryProductImg} />
                    <div className="fw-semibold mt-1" style={{ fontSize: '12px' }}>{product.name}</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>From USD {product.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Quote Banner */}
        <div className={`container py-3 ${styles.quoteBanner}`}>
          <div className={styles.quoteBannerInner} style={{ backgroundImage: 'url(/src/assets/images/quote-banner.png)' }}>
            <div style={{ maxWidth: '400px' }}>
              <h4 className="fw-bold text-white">An easy way to send requests to all suppliers</h4>
              <p className="text-white" style={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className={styles.quoteForm}>
              <h6 className="fw-bold mb-3">Send quote to suppliers</h6>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '13px' }}>What item you need?</label>
                <input type="text" className="form-control form-control-sm" placeholder="Type more details" />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '13px' }}>Quantity</label>
                <div className="d-flex gap-2">
                  <input type="number" className="form-control form-control-sm" placeholder="0" />
                  <select className="form-select form-select-sm" style={{ width: '80px' }}>
                    <option>Pcs</option><option>Kg</option><option>Box</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary btn-sm w-100">Send inquiry</button>
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className={`container py-3 ${styles.recommendedSection}`}>
          <h5 className="fw-bold mb-3">Recommended items</h5>
          <div className={styles.recommendedGrid}>
            {recommendedProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className={styles.recommendedCard} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={getImg(product)} alt={product.name} className={styles.recommendedCardImg} />
                <div className="fw-semibold" style={{ fontSize: '14px' }}>${product.price.toFixed(2)}</div>
                <div className="text-muted" style={{ fontSize: '12px' }}>{product.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Extra Services */}
        <div className={`container py-3 ${styles.servicesSection}`}>
          <h5 className="fw-bold mb-3">Our extra services</h5>
          <div className="d-flex gap-3">
            {[
              { title: 'Source from Industry Hubs', icon: '🔍', bg: '/src/assets/images/service1.png' },
              { title: 'Customize Your Products', icon: '🗂️', bg: '/src/assets/images/service2.png' },
              { title: 'Fast, reliable shipping by ocean or air', icon: '✈️', bg: '/src/assets/images/service3.png' },
              { title: 'Product monitoring and inspection', icon: '🌐', bg: '/src/assets/images/service4.png' },
            ].map((service, i) => (
              <div key={i} className={styles.serviceCard} style={{ backgroundImage: `url(${service.bg})` }}>
                <div className={styles.serviceOverlay}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <span className="text-white fw-semibold" style={{ fontSize: '13px' }}>{service.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suppliers by Region */}
        <div className={`container py-3 ${styles.suppliersSection}`}>
          <div className={styles.suppliersInner}>
            <h6 className="fw-bold mb-2">Suppliers by region</h6>
            <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
              {[
                { country: 'Arabic Emirates', flag: '🇦🇪', url: 'shopname.ae' },
                { country: 'Australia', flag: '🇦🇺', url: 'shopname.com.au' },
                { country: 'United States', flag: '🇺🇸', url: 'shopname.us' },
                { country: 'Russia', flag: '🇷🇺', url: 'shopname.ru' },
                { country: 'Italy', flag: '🇮🇹', url: 'shopname.it' },
                { country: 'Denmark', flag: '🇩🇰', url: 'shopname.com.dk' },
                { country: 'France', flag: '🇫🇷', url: 'shopname.com.fr' },
                { country: 'China', flag: '🇨🇳', url: 'shopname.cn' },
                { country: 'Great Britain', flag: '🇬🇧', url: 'shopname.co.uk' },
              ].map((supplier, i) => (
                <div key={i} className={styles.supplierItem}>
                  <span className={styles.supplierFlag}>{supplier.flag}</span>
                  <div>
                    <div className={styles.supplierName}>{supplier.country}</div>
                    <div className={styles.supplierUrl}>{supplier.url}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
