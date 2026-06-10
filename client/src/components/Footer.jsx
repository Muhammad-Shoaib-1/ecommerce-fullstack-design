function Footer() {
  return (
    <footer style={{ width: '100%', height: '324px', background: '#1C1C1C' }}>

      {/* Top Section */}
      <div
        className="d-flex align-items-start"
        style={{ height: '256px', padding: '40px 129px 0 129px' }}
      >

        {/* 1st — Brand */}
        <div style={{ width: '276px', height: '157px', marginRight: '61px' }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="bg-primary rounded p-1">
              <span className="text-white">🛍️</span>
            </div>
            <span className="fw-bold text-white fs-5">Brand</span>
          </div>
          <p style={{ fontSize: '13px', color: '#ccc' }}>
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="d-flex gap-2 mt-2" style={{ fontSize: '20px' }}>
            {['🐦', '📘', '💼', '📸', '▶️'].map((icon, i) => (
              <span key={i} style={{ cursor: 'pointer' }}>{icon}</span>
            ))}
          </div>
        </div>

        {/* 2nd — About */}
        <div style={{ width: '81px', height: '137px', marginRight: '64px' }}>
          <h6 className="fw-bold text-white mb-3">About</h6>
          {['About Us', 'Find store', 'Categories', 'Blogs'].map((link, i) => (
            <div key={i}>
              <a href="#" className="text-decoration-none" style={{ fontSize: '13px', color: '#ccc' }}>
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* 3rd — Partnership */}
        <div style={{ width: '90px', height: '137px', marginRight: '64px' }}>
          <h6 className="fw-bold text-white mb-3">Partnership</h6>
          {['About Us', 'Find store', 'Categories', 'Blogs'].map((link, i) => (
            <div key={i}>
              <a href="#" className="text-decoration-none" style={{ fontSize: '13px', color: '#ccc' }}>
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* 4th — Information */}
        <div style={{ width: '108px', height: '137px', marginRight: '78px' }}>
          <h6 className="fw-bold text-white mb-3">Information</h6>
          {['Help Center', 'Money Refund', 'Shipping', 'Contact us'].map((link, i) => (
            <div key={i}>
              <a href="#" className="text-decoration-none" style={{ fontSize: '13px', color: '#ccc' }}>
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* 5th — For users */}
        <div style={{ width: '78px', height: '137px', marginRight: '79px' }}>
          <h6 className="fw-bold text-white mb-3">For users</h6>
          {['Login', 'Register', 'Settings', 'My Orders'].map((link, i) => (
            <div key={i}>
              <a href="#" className="text-decoration-none" style={{ fontSize: '13px', color: '#ccc' }}>
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* 6th — Get app */}
        <div style={{ width: '124px', height: '129px' }}>
          <h6 className="fw-bold text-white mb-3">Get app</h6>
          <div className="d-flex flex-column gap-2">
            <img src="https://placehold.co/124x40" alt="App Store" className="img-fluid rounded" />
            <img src="https://placehold.co/124x40" alt="Google Play" className="img-fluid rounded" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          height: '68px',
          borderTop: '1px solid #444',
          padding: '0 129px'
        }}
      >
        <small style={{ color: '#ccc' }}>© 2023 Ecommerce.</small>
        <small style={{ color: '#ccc' }}>🇬🇧 English</small>
      </div>

    </footer>
  )
}

export default Footer