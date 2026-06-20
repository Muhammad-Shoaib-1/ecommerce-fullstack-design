import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)   // { _id, items: [...] }
  const [cartLoading, setCartLoading] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)  // { code, type, value, description }
  const [couponDiscount, setCouponDiscount] = useState(0)

  // Fetch cart whenever user logs in
  const fetchCart = useCallback(async () => {
    if (!user) { setCart(null); return }
    setCartLoading(true)
    try {
      const { data } = await api.get('/cart')
      setCart(data.cart)
    } catch {
      setCart(null)
    } finally {
      setCartLoading(false)
    }
  }, [user])

  useEffect(() => { fetchCart() }, [fetchCart])

  // Clear coupon whenever user logs out or cart is emptied
  useEffect(() => {
    if (!user) { setAppliedCoupon(null); setCouponDiscount(0) }
  }, [user])

  const addToCart = async (productId, qty = 1) => {
    if (!user) return { success: false, message: 'Please login to add to cart' }
    try {
      const { data } = await api.post('/cart', { productId, qty })
      setCart(data.cart)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to add to cart' }
    }
  }

  const updateQty = async (itemId, qty) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { qty })
      setCart(data.cart)
    } catch (err) {
      console.error(err)
    }
  }

  const removeItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`)
      setCart(data.cart)
    } catch (err) {
      console.error(err)
    }
  }

  const saveForLater = async (itemId) => {
    try {
      const { data } = await api.put(`/cart/${itemId}/save`)
      setCart(data.cart)
    } catch (err) {
      console.error(err)
    }
  }

  const clearCart = async () => {
    try {
      await api.delete('/cart')
      setCart((prev) => prev ? { ...prev, items: [] } : null)
      setAppliedCoupon(null)
      setCouponDiscount(0)
    } catch (err) {
      console.error(err)
    }
  }

  // Derived values
  const activeItems   = cart?.items?.filter((i) => !i.savedForLater) ?? []
  const savedItems    = cart?.items?.filter((i) => i.savedForLater)  ?? []
  const cartCount     = activeItems.reduce((sum, i) => sum + i.qty, 0)
  const subtotal      = activeItems.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.qty, 0)

  // Validate a coupon code against the backend for the current subtotal
  const applyCoupon = async (code) => {
    if (!code?.trim()) return { success: false, message: 'Enter a coupon code' }
    if (subtotal === 0) return { success: false, message: 'Add items to your cart first' }
    try {
      const { data } = await api.post('/coupons/validate', { code: code.trim(), subtotal })
      setAppliedCoupon(data.coupon)
      setCouponDiscount(data.discount)
      return { success: true, discount: data.discount }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid coupon' }
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscount(0)
  }

  // Re-validate the applied coupon whenever the subtotal changes (e.g. qty updated)
  // Guards against loops: only runs when subtotal actually changes, not on coupon state changes
  useEffect(() => {
    if (subtotal === 0) {
      setAppliedCoupon(null)
      setCouponDiscount(0)
      return
    }
    if (appliedCoupon) {
      api.post('/coupons/validate', { code: appliedCoupon.code, subtotal })
        .then(({ data }) => setCouponDiscount(data.discount))
        .catch(() => { setAppliedCoupon(null); setCouponDiscount(0) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal])

  return (
    <CartContext.Provider value={{
      cart, cartLoading, fetchCart,
      addToCart, updateQty, removeItem, saveForLater, clearCart,
      activeItems, savedItems, cartCount, subtotal,
      appliedCoupon, couponDiscount, applyCoupon, removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
