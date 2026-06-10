import { FaUser, FaComment, FaClipboardList, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="border-bottom py-3 bg-white">
      <div className="container d-flex align-items-center justify-content-between gap-3">

        {/* Logo */}
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <div className="bg-primary rounded p-2">
            <FaShoppingCart color="white" size={20} />
          </div>
          <span className="fw-bold text-primary fs-4">Brand</span>
        </Link>

        {/* Search Bar */}
        <div className="d-flex flex-grow-1" style={{ maxWidth: '600px' }}>
          <input
            type="text"
            className="form-control rounded-0 rounded-start border-primary"
            placeholder="Search"
          />
          <select className="form-select rounded-0 border-start-0 border-primary" style={{ width: '150px' }}>
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
          </select>
          <button className="btn btn-primary rounded-0 rounded-end px-4">
            Search
          </button>
        </div>

        {/* Icons */}
        <div className="d-flex gap-4">
          {[
            { icon: <FaUser size={22} />, label: 'Profile' },
            { icon: <FaComment size={22} />, label: 'Message' },
            { icon: <FaClipboardList size={22} />, label: 'Orders' },
            { icon: <FaShoppingCart size={22} />, label: 'My cart' },
          ].map(({ icon, label }) => (
            <div key={label} className="d-flex flex-column align-items-center text-secondary" style={{ cursor: 'pointer' }}>
              {icon}
              <small style={{ fontSize: '11px' }}>{label}</small>
            </div>
          ))}
        </div>

      </div>
    </nav>
  )
}

export default Navbar