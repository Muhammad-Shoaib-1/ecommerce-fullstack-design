import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SecondaryNav from './components/SecondaryNav'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import MobileNavbar from './components/MobileNavbar'

function App() {
  return (
    <BrowserRouter>

      {/* Desktop Navbar — hidden on mobile via CSS */}
      <div className="desktop-only">
        <Navbar />
        <SecondaryNav />
      </div>

      {/* Mobile Navbar — hidden on desktop via CSS */}
      <div className="mobile-only">
        <MobileNavbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Newsletter />
      <Footer />
    </BrowserRouter>
  )
}

export default App
