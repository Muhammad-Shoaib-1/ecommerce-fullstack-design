import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Home.mobile.css'

function Home() {
  const categories = [
    'Automobiles', 'Clothes and wear', 'Home interiors',
    'Computer and tech', 'Tools, equipments', 'Sports and outdoor',
    'Animal and pets', 'Machinery tools', 'More category'
  ]

  const [time, setTime] = useState({ days: 4, hours: 13, mins: 34, secs: 56 })

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

const dealProducts = [
  { name: 'Smart watches', discount: '-25%', img: '/src/assets/images/smart watches.png' },
  { name: 'Laptops', discount: '-15%', img: '/src/assets/images/laptops.png' },
  { name: 'GoPro cameras', discount: '-40%', img: '/src/assets/images/GoPro Cameras.png' },
  { name: 'Headphones', discount: '-25%', img: '/src/assets/images/HeadPhones.png' },
  { name: 'Canon cameras', discount: '-25%', img: '/src/assets/images/Canon Cameras.png' },
]


const homeOutdoorProducts = [
  { name: 'Soft chairs', price: 19, img: '/src/assets/images/soft chairs.png' },
  { name: 'Sofa & chair', price: 19, img: '/src/assets/images/Sofa & Chair.png' },
  { name: 'Kitchen dishes', price: 19, img: '/src/assets/images/Kitchen Dishes.png' },
  { name: 'Smart watches', price: 19, img: '/src/assets/images/Smart-Watches.png' },
  { name: 'Kitchen mixer', price: 100, img: '/src/assets/images/Kitchen Mixer.png' },
  { name: 'Blenders', price: 39, img: '/src/assets/images/Blenders.png' },
  { name: 'Home appliance', price: 19, img: '/src/assets/images/Home Appliance.jpg' },
  { name: 'Coffee maker', price: 10, img: '/src/assets/images/Coffee Maker.png' },
]

const electronicsProducts = [
  { name: 'Smart watches', price: 19, img: '/src/assets/images/consumer Smart watches.png' },
  { name: 'Cameras', price: 89, img: '/src/assets/images/consumer Cameras.png' },
  { name: 'Headphones', price: 10, img: '/src/assets/images/consumer headphones.png' },
  { name: 'Electric Kattle', price: 90, img: '/src/assets/images/consumer Kattle.png' },
  { name: 'Gaming set', price: 35, img: '/src/assets/images/consumer headset.png' },
  { name: 'Laptops & PC', price: 340, img: '/src/assets/images/consumer Laptops & PC.png' },
  { name: 'Smartphones', price: 19, img: '/src/assets/images/consumer Mobile.png' },
  { name: 'Tablet', price: 240, img: '/src/assets/images/consumer tablet.png' },
]

const recommendedProducts = [
  { name: 'T-shirts with multiple colors, for men', price: 10.30, img: '/src/assets/images/TShirt.png' },
  { name: 'Jeans shorts for men blue color', price: 10.30, img: '/src/assets/images/coat.png' },
  { name: 'Brown winter coat medium size', price: 12.50, img: '/src/assets/images/upper.jpg' },
  { name: 'Jeans bag for travel for men', price: 34.00, img: '/src/assets/images/jeans.png' },
  { name: 'Leather wallet', price: 99.00, img: '/src/assets/images/wallet.png' },
  { name: 'Canon camera black, 100x zoom', price: 9.99, img: '/src/assets/images/matka.png' },
  { name: 'Headset for gaming with mic', price: 8.99, img: '/src/assets/images/recommended headphone.png' },
  { name: 'Smartwatch silver color modern', price: 10.30, img: '/src/assets/images/bag.png' },
  { name: 'Blue wallet for men leather metarfial', price: 10.30, img: '/src/assets/images/wallet.png' },
  { name: 'Jeans bag for travel for men', price: 80.95, img: '/src/assets/images/bag.png' },
]

  return (
    <div className="bg-light">

       {/* ========== MOBILE LAYOUT ========== */}
    <div className="mobileHome">

      {/* Search Bar */}
      <div className="mobileSearch">
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8B96A5' }}>🔍</span>
          <input className="mobileSearchInput" placeholder="Search" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mobileCategoryPills">
        {['All category', 'Gadgets', 'Clothes', 'Accessories', 'Electronics'].map((pill, i) => (
          <button key={i} className="mobilePill">{pill}</button>
        ))}
      </div>

      {/* Hero Banner */}
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
            {[
              { val: time.hours, label: 'Hour' },
              { val: time.mins, label: 'Min' },
              { val: time.secs, label: 'Sec' },
            ].map(({ val, label }) => (
              <div key={label} className="mobileCountdownBox">
                <span className="mobileCountdownNum">{String(val).padStart(2, '0')}</span>
                <span className="mobileCountdownLabel">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mobileDealsScroll">
          {dealProducts.map((product, i) => (
            <div key={i} className="mobileDealCard">
              <img src={product.img} alt={product.name} />
              <div className="mobileDealName">{product.name}</div>
              <div className="mobileDealBadge">{product.discount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Home & Outdoor */}
      <div className="mobileCategorySection">
        <div className="mobileCategoryHeader">
          <p className="mobileCategoryTitle">Home and outdoor</p>
          <button className="mobileSourceBtn">Source now →</button>
        </div>
        <div className="mobileCategoryScroll">
          {homeOutdoorProducts.map((product, i) => (
            <div key={i} className="mobileCatCard">
              <img src={product.img} alt={product.name} />
              <div className="mobileCatName">{product.name}</div>
              <div className="mobileCatPrice">From USD {product.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumer Electronics */}
      <div className="mobileCategorySection">
        <div className="mobileCategoryHeader">
          <p className="mobileCategoryTitle">Consumer electronics</p>
          <button className="mobileSourceBtn">Source now →</button>
        </div>
        <div className="mobileCategoryScroll">
          {electronicsProducts.map((product, i) => (
            <div key={i} className="mobileCatCard">
              <img src={product.img} alt={product.name} />
              <div className="mobileCatName">{product.name}</div>
              <div className="mobileCatPrice">From USD {product.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="mobileQuoteBanner">
        <div className="mobileQuoteTitle">An easy way to send requests to all suppliers</div>
        <button className="mobileQuoteBtn">Send inquiry</button>
      </div>

      {/* Recommended Items */}
      <div className="mobileRecommendedSection">
        <h5 className="mobileRecommendedTitle">Recommended items</h5>
        <div className="mobileRecommendedGrid">
          {recommendedProducts.map((product, i) => (
            <div key={i} className="mobileProductCard">
              <div className="mobileProductCardImg">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="mobileProductCardBody">
                <div className="mobileProductCardPrice">${product.price.toFixed(2)}</div>
                <div className="mobileProductCardName">{product.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* ========== DESKTOP LAYOUT ========== */}
    <div className="desktopHome">
      {/* ALL YOUR EXISTING DESKTOP JSX GOES HERE */}
      {/* Hero Section */}
      <div className="container py-3">
        <div className="row g-2">

          {/* Category Sidebar */}
          <div className="col-md-2">
            <div className="bg-white border rounded p-2 h-100">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className={`py-2 px-2 rounded ${i === 0 ? 'text-primary bg-light fw-semibold' : 'text-dark'}`}
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Main Banner */}
          <div className="col-md-7">
            <div
                className="rounded h-100 d-flex align-items-center p-4"
                style={{
                  backgroundImage: 'url(/src/assets/images/hero-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '280px'
                }}
            >
              <div>
                <p className="mb-1 text-muted">Latest trending</p>
                <h2 className="fw-bold">Electronic items</h2>
                <button className="btn btn-outline-dark mt-2 rounded-pill px-4">Learn more</button>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="col-md-3 d-flex flex-column gap-2">
            {/* User Card */}
            <div className="bg-white border rounded p-3 text-center">
              <div
                className="rounded-circle bg-secondary mx-auto mb-2"
                style={{ width: '48px', height: '48px' }}
              />
              <p className="mb-2 fw-semibold" style={{ fontSize: '13px' }}>Hi, user<br />let's get started</p>
              <div className="d-flex gap-2">
                <Link to="#" className="btn btn-primary btn-sm flex-grow-1">Join now</Link>
                <Link to="#" className="btn btn-outline-secondary btn-sm flex-grow-1">Log in</Link>
              </div>
            </div>

            {/* Promo Orange */}
            <div className="rounded p-3" style={{ background: '#fa8232' }}>
              <p className="text-white mb-0 fw-semibold" style={{ fontSize: '13px' }}>
                Get US $10 off<br />with a new supplier
              </p>
            </div>

            {/* Promo Blue */}
            <div className="rounded p-3" style={{ background: '#55bbeb' }}>
              <p className="text-white mb-0 fw-semibold" style={{ fontSize: '13px' }}>
                Send quotes with<br />supplier preferences
              </p>
            </div>
          </div>

        </div>
      </div>

        {/* Deals & Offers */}
        <div className="container py-3">
          <div className="bg-white border rounded p-3">
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <h6 className="fw-bold mb-0">Deals and offers</h6>
                <small className="text-muted">Hygiene equipments</small>
                {/* Countdown Timer */}
                <div className="d-flex gap-2 mt-2">
                  {[
                    { val: time.days, label: 'Days' },
                    { val: time.hours, label: 'Hour' },
                    { val: time.mins, label: 'Min' },
                    { val: time.secs, label: 'Sec' },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center bg-dark text-white rounded px-2 py-1" style={{ minWidth: '45px' }}>
                      <div className="fw-bold" style={{ fontSize: '16px' }}>
                        {String(val).padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: '10px' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Cards */}
              <div className="col-md-9">
                <div className="d-flex">
                  {dealProducts.map((product, i) => (
                    <div
                      key={i}
                      style={{
                        width: '179px',
                        height: '235px',
                        flexShrink: 0,
                      }}
                      className="border-start d-flex flex-column align-items-center justify-content-center p-2"
                    >
                      <img
                        src={product.img}
          alt={product.name}
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      />
                      <div style={{ fontSize: '13px' }} className="mt-2 text-center">{product.name}</div>
                      <span className="badge rounded-pill text-bg-danger mt-1">
          {product.discount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Section Template */}
        {[
          {
            title: 'Home and outdoor',
            bg: '#FFF0E0',
            bannerImg: '/src/assets/images/home-outdoor-banner.png',
            products: homeOutdoorProducts
          },
          {
            title: 'Consumer electronics and gadgets',
            bg: '#EBF6FF',
            bannerImg: '/src/assets/images/electronics-banner.png',
            products: electronicsProducts
          },
        ].map((section, si) => (
          <div className="container py-3" key={si}>
            <div
              className="border rounded bg-white overflow-hidden d-flex"
              style={{ height: '257px' }}
            >

              {/* Left Banner */}
              <div
                className="d-flex flex-column justify-content-between p-3 flex-shrink-0 position-relative"
                style={{
                  width: '280px',
                  background: section.bg,
                  backgroundImage: `url(${section.bannerImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay so text is readable */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                />
                {/* Content above overlay */}
                <div className="position-relative">
                  <h6 className="fw-bold">{section.title}</h6>
                  <button className="btn btn-outline-secondary btn-sm rounded-pill mt-2">
                    Source now
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                <div className="d-flex flex-wrap h-100">
                  {section.products.map((product, i) => (
                    <div
                      key={i}
                      className="border-start border-bottom d-flex flex-column align-items-center justify-content-center p-2 text-center"
                      style={{ width: '225px', height: '128px' }}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      />
                      <div style={{ fontSize: '12px' }} className="fw-semibold mt-1">{product.name}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>
                        From USD {product.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Quote Banner */}
        <div className="container py-3">
          <div
            className="rounded d-flex align-items-center justify-content-between px-5"
            style={{
              backgroundImage: 'url(/src/assets/images/quote-banner.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '420px',
              border: '1px solid #dee2e6'
            }}
          >
            {/* Left Text */}
            <div style={{ maxWidth: '400px' }}>
              <h4 className="fw-bold text-white">An easy way to send requests to all suppliers</h4>
              <p className="text-white" style={{ fontSize: '14px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded p-4" style={{ minWidth: '300px' }}>
              <h6 className="fw-bold mb-3">Send quote to suppliers</h6>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '13px' }}>What item you need?</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Type more details"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: '13px' }}>Quantity</label>
                <div className="d-flex gap-2">
                  <input type="number" className="form-control form-control-sm" placeholder="0" />
                  <select className="form-select form-select-sm" style={{ width: '80px' }}>
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary btn-sm w-100">Send inquiry</button>
            </div>

          </div>
        </div>

        {/* Recommended Items */}
        <div className="container py-3">
          <div style={{ height: '696px' }}>
            <h5 className="fw-bold mb-3">Recommended items</h5>

            {/* Products Grid */}
            <div
              className="d-flex flex-wrap"
              style={{ height: '640px', overflow: 'hidden' }}
            >
              {recommendedProducts.map((product, i) => (
                <div
                  key={i}
                  className="border bg-white d-flex flex-column p-2"
                  style={{ width: '220px', height: '310px', cursor: 'pointer' }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                    className="rounded mb-2"
                  />
                  <div className="fw-semibold mt-1" style={{ fontSize: '14px' }}>
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>
                    {product.name}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Extra Services */}
        <div className="container py-3">
          <div style={{ height: '256px' }}>
            <h5 className="fw-bold mb-3">Our extra services</h5>

            <div className="d-flex gap-3">
              {[
                { title: 'Source from Industry Hubs', icon: '🔍', bg: '/src/assets/images/service1.png' },
                { title: 'Customize Your Products', icon: '🗂️', bg: '/src/assets/images/service2.png' },
                { title: 'Fast, reliable shipping by ocean or air', icon: '✈️', bg: '/src/assets/images/service3.png' },
                { title: 'Product monitoring and inspection', icon: '🌐', bg: '/src/assets/images/service4.png' },
              ].map((service, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden position-relative flex-shrink-0"
                  style={{
                    width: '280px',
                    height: '200px',
                    backgroundImage: `url(${service.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {/* Overlay */}
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2"
                    style={{ background: 'rgba(0,0,0,0.35)' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', fontSize: '16px' }}
                      >
                        {service.icon}
                      </span>
                      <span className="text-white fw-semibold" style={{ fontSize: '13px' }}>
                        {service.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Suppliers by Region */}
        <div className="container py-3">
          <div
            className="bg-white border rounded px-4 py-3"
            style={{ height: '138px' }}
          >
            <h6 className="fw-bold mb-2">Suppliers by region</h6>
            <div
              className="d-flex flex-wrap"
              style={{ gap: '8px' }}
            >
              {[
                { country: 'Arabic Emirates', flag: 'Ae', url: 'shopname.ae' },
                { country: 'Australia', flag: '🇦🇺', url: 'shopname.com.au' },
                { country: 'United States', flag: '🇺🇸', url: 'shopname.us' },
                { country: 'Russia', flag: '🇷🇺', url: 'shopname.ru' },
                { country: 'Italy', flag: '🇮🇹', url: 'shopname.it' },
                { country: 'Denmark', flag: '🇩🇰', url: 'shopname.com.dk' },
                { country: 'France', flag: '🇫🇷', url: 'shopname.com.fr' },
                { country: 'Arabic Emirates', flag: '🇦🇪', url: 'shopname.ae' },
                { country: 'China', flag: '🇨🇳', url: 'shopname.cn' },
                { country: 'Great Britain', flag: '🇬🇧', url: 'shopname.co.uk' },
              ].map((supplier, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center gap-2"
                  style={{ width: '210px', height: '36px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '24px' }}>{supplier.flag}</span>
                  <div>
                    <div className="fw-semibold" style={{ fontSize: '13px' }}>{supplier.country}</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{supplier.url}</div>
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