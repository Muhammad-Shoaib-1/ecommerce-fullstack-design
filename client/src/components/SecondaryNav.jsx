import { Link } from 'react-router-dom'
function SecondaryNav() {
  const navLinks = ['Hot offers', 'Gift boxes', 'Projects', 'Menu item']

  return (
    <div className="border-bottom bg-white py-2">
      <div className="container d-flex align-items-center justify-content-between">

        {/* Left: Category + Links */}
        <div className="d-flex align-items-center gap-4">

          {/* All Category */}
          <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
            <Link to="/products" className="text-decoration-none text-dark d-flex align-items-center gap-2">
              <span>&#9776;</span>
              <span>All category</span>
            </Link>
          </div>

          {/* Nav Links */}
          {navLinks.map(link => (
            <a key={link} href="#" className="text-decoration-none text-dark">
              {link}
            </a>
          ))}

          {/* Help dropdown */}
          <div className="dropdown"
              href="#"
              className="text-decoration-none text-dark dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Help
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">FAQ</a></li>
              <li><a className="dropdown-item" href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Right: Language + Ship to */}
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown"
              href="#"
              className="text-decoration-none text-dark dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              English, USD
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">English, USD</a></li>
              <li><a className="dropdown-item" href="#">Urdu, PKR</a></li>
            </ul>
          </div>

          <div className="dropdown"
              href="#"
              className="text-decoration-none text-dark dropdown-toggle"
              data-bs-toggle="dropdown"
          >
              Ship to 🇩🇪
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">🇩🇪 Germany</a></li>
              <li><a className="dropdown-item" href="#">🇵🇰 Pakistan</a></li>
              <li><a className="dropdown-item" href="#">🇺🇸 USA</a></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SecondaryNav