import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)   // { _id, items: [...] }
  const [cartLoading, setCartLoading] = useState(false)

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
    } catch (err) {
      console.error(err)
    }
  }

  // Derived values
  const activeItems   = cart?.items?.filter((i) => !i.savedForLater) ?? []
  const savedItems    = cart?.items?.filter((i) => i.savedForLater)  ?? []
  const cartCount     = activeItems.reduce((sum, i) => sum + i.qty, 0)
  const subtotal      = activeItems.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, cartLoading, fetchCart,
      addToCart, updateQty, removeItem, saveForLater, clearCart,
      activeItems, savedItems, cartCount, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
