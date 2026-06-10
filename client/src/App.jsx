import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SecondaryNav from './components/SecondaryNav'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SecondaryNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  )
}

export default App