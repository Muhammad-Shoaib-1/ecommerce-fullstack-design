import { useState, useEffect } from 'react'
import styles from './Admin.module.css'
import api from '../../api/axios'

const EMPTY_FORM = {
  name: '', description: '', price: '', oldPrice: '', stock: '',
  condition: 'Brand new', shipping: 'Free Shipping',
  isFeatured: false, isDeals: false, discount: '',
  categoryId: '', imageUrl: '',
  sellerName: '', sellerCompany: '', sellerCountry: '', sellerVerified: false,
}

function AdminProducts() {
  const [products, setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal]         = useState(0)
  const [page, setPage]           = useState(1)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [editId, setEditId]       = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')

  const fetchProducts = async (p = page, q = search) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: p, limit: 10 })
      if (q) params.set('search', q)
      const { data } = await api.get(`/products?${params}`)
      setProducts(data.products)
      setTotal(data.total)
      setPages(data.pages)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchProducts() }, [page])
  useEffect(() => { api.get('/categories').then(({ data }) => setCategories(data.categories)) }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setError(''); setShowForm(true) }
  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      oldPrice: product.oldPrice || '',
      stock: product.stock,
      condition: product.condition,
      shipping: product.shipping,
      isFeatured: product.isFeatured,
      isDeals: product.isDeals,
      discount: product.discount || '',
      categoryId: product.category?._id || product.category || '',
      imageUrl: product.images?.[0]?.url || '',
      sellerName: product.seller?.name || '',
      sellerCompany: product.seller?.company || '',
      sellerCountry: product.seller?.country || '',
      sellerVerified: product.seller?.verified || false,
    })
    setEditId(product._id)
    setError('')
    setShowForm(true)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
    } catch (e) { alert(e.response?.data?.message || 'Delete failed') }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      const payload = {
        name:        form.name,
        description: form.description,
        price:       Number(form.price),
        oldPrice:    form.oldPrice ? Number(form.oldPrice) : null,
        stock:       Number(form.stock),
        condition:   form.condition,
        shipping:    form.shipping,
        isFeatured:  form.isFeatured,
        isDeals:     form.isDeals,
        discount:    form.discount || null,
        category:    form.categoryId,
        images:      form.imageUrl ? [{ url: form.imageUrl, isMain: true }] : [],
        seller: {
          name:     form.sellerName,
          company:  form.sellerCompany,
          country:  form.sellerCountry,
          verified: form.sellerVerified,
        },
      }
      if (editId) {
        await api.put(`/products/${editId}`, payload)
      } else {
        await api.post('/products', payload)
      }
      setShowForm(false)
      fetchProducts()
    } catch (e) {
      setError(e.response?.data?.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const getImg = (p) => p.images?.find(i => i.isMain)?.url || p.images?.[0]?.url || ''
  const F = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Products</h4>
          <p className={styles.pageSubtitle}>{total} products total</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className={styles.formCard}>
          <h6 className={styles.formTitle}>{editId ? 'Edit Product' : 'Add New Product'}</h6>
          {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
          <form onSubmit={handleSave}>
            <div className={styles.formGrid}>
              <div><label className={styles.label}>Product Name *</label><input className="form-control form-control-sm" value={form.name} onChange={F('name')} required /></div>
              <div><label className={styles.label}>Category *</label>
                <select className="form-select form-select-sm" value={form.categoryId} onChange={F('categoryId')} required>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className={styles.label}>Price ($) *</label><input type="number" min="0" step="0.01" className="form-control form-control-sm" value={form.price} onChange={F('price')} required /></div>
              <div><label className={styles.label}>Old Price ($)</label><input type="number" min="0" step="0.01" className="form-control form-control-sm" value={form.oldPrice} onChange={F('oldPrice')} /></div>
              <div><label className={styles.label}>Stock *</label><input type="number" min="0" className="form-control form-control-sm" value={form.stock} onChange={F('stock')} required /></div>
              <div><label className={styles.label}>Condition</label>
                <select className="form-select form-select-sm" value={form.condition} onChange={F('condition')}>
                  <option>Brand new</option><option>Refurbished</option><option>Used</option>
                </select>
              </div>
              <div><label className={styles.label}>Discount Label</label><input className="form-control form-control-sm" placeholder="-25%" value={form.discount} onChange={F('discount')} /></div>
              <div><label className={styles.label}>Shipping</label><input className="form-control form-control-sm" value={form.shipping} onChange={F('shipping')} /></div>
              <div className={styles.formGridFull}>
                <label className={styles.label}>Image URL *</label>
                <input className="form-control form-control-sm" placeholder="https://..." value={form.imageUrl} onChange={F('imageUrl')} required />
              </div>
              <div className={styles.formGridFull}>
                <label className={styles.label}>Description</label>
                <textarea className="form-control form-control-sm" rows={3} value={form.description} onChange={F('description')} />
              </div>
              {/* Seller */}
              <div><label className={styles.label}>Seller Name</label><input className="form-control form-control-sm" value={form.sellerName} onChange={F('sellerName')} /></div>
              <div><label className={styles.label}>Seller Company</label><input className="form-control form-control-sm" value={form.sellerCompany} onChange={F('sellerCompany')} /></div>
              <div><label className={styles.label}>Seller Country</label><input className="form-control form-control-sm" value={form.sellerCountry} onChange={F('sellerCountry')} /></div>
              {/* Toggles */}
              <div className="d-flex gap-4 align-items-center pt-3">
                <div className="form-check"><input className="form-check-input" type="checkbox" id="feat" checked={form.isFeatured} onChange={F('isFeatured')} /><label className="form-check-label" htmlFor="feat" style={{ fontSize: '13px' }}>Featured</label></div>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="deal" checked={form.isDeals} onChange={F('isDeals')} /><label className="form-check-label" htmlFor="deal" style={{ fontSize: '13px' }}>Deal</label></div>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="verified" checked={form.sellerVerified} onChange={F('sellerVerified')} /><label className="form-check-label" htmlFor="verified" style={{ fontSize: '13px' }}>Seller Verified</label></div>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}</button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className={styles.filterBar}>
        <input className="form-control form-control-sm" style={{ maxWidth: '280px' }} placeholder="Search products..."
          value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchProducts(1, search)} />
        <button className="btn btn-outline-primary btn-sm" onClick={() => fetchProducts(1, search)}>Search</button>
        {search && <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSearch(''); fetchProducts(1, '') }}>Clear</button>}
      </div>

      {/* Table */}
      <div className={styles.card}>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><img src={getImg(p)} alt={p.name} className={styles.productThumb} /></td>
                  <td><div style={{ fontWeight: 500, maxWidth: '220px' }}>{p.name}</div></td>
                  <td style={{ color: '#8B96A5' }}>{p.category?.name}</td>
                  <td>
                    <strong>${p.price.toFixed(2)}</strong>
                    {p.oldPrice && <span style={{ fontSize: '11px', color: '#8B96A5', textDecoration: 'line-through', marginLeft: '6px' }}>${p.oldPrice}</span>}
                  </td>
                  <td>
                    <span style={{ color: p.stock < 5 ? '#dc3545' : p.stock < 20 ? '#856404' : '#28a745', fontWeight: 600 }}>{p.stock}</span>
                  </td>
                  <td>
                    {p.isFeatured && <span className={`${styles.badge} ${styles.badgeShipped}`} style={{ marginRight: '4px' }}>Featured</span>}
                    {p.isDeals    && <span className={`${styles.badge} ${styles.badgePending}`}>Deal</span>}
                  </td>
                  <td>
                    <button className={styles.btnEdit}   onClick={() => openEdit(p)}>Edit</button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(p._id, p.name)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan={7}><div className={styles.emptyState}><div className={styles.emptyIcon}>📦</div>No products found</div></td></tr>}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>
          ))}
          <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
