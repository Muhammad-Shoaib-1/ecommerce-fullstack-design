import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'

function SecondaryNav() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data.categories)).catch(() => {})
  }, [])

  const navLinks = ['Hot offers', 'Gift boxes', 'Projects', 'Menu item']

  return (
    <div className="border-bottom bg-white py-2">
      <div className="container d-flex align-items-center justify-content-between">

        {/* Left: All Category + Links */}
        <div className="d-flex align-items-center gap-4">

          {/* All Category dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none text-dark p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <span>&#9776;</span>
              <span>All category</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/products">All Products</Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              {categories.map(cat => (
                <li key={cat._id}>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate(`/products?category=${cat._id}`)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Links */}
          {navLinks.map(link => (
            <a key={link} href="#" className="text-decoration-none text-dark">{link}</a>
          ))}

          {/* Help dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none text-dark p-0 dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Help
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">FAQ</a></li>
              <li><a className="dropdown-item" href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Right: Language + Ship to */}
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none text-dark p-0 dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              English, USD
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">English, USD</a></li>
              <li><a className="dropdown-item" href="#">Urdu, PKR</a></li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-link text-decoration-none text-dark p-0 dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Ship to 🌍
            </button>
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
