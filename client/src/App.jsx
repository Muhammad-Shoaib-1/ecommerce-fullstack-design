import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SecondaryNav from './components/SecondaryNav'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import MobileNavbar from './components/MobileNavbar'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCategories from './pages/admin/AdminCategories'
import AdminCoupons from './pages/admin/AdminCoupons'
import AdminUsers from './pages/admin/AdminUsers'
import Contact from './pages/Contact';

// Wrapper for public pages — includes navbar, newsletter, footer
function PublicLayout({ children }) {
  return (
    <>
      <div className="desktop-only">
        <Navbar />
        <SecondaryNav />
      </div>
      <div className="mobile-only">
        <MobileNavbar />
      </div>
      {children}
      <Newsletter />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public routes (with Navbar + Footer) ── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><ProductListing /></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/orders" element={<PublicLayout><Orders /></PublicLayout>} />
        <Route path="/orders/:id" element={<PublicLayout><OrderDetail /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />


        {/* ── Admin routes (own layout, no public navbar) ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products"   element={<AdminProducts />} />
          <Route path="orders"     element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="coupons"    element={<AdminCoupons />} />
          <Route path="users"      element={<AdminUsers />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
