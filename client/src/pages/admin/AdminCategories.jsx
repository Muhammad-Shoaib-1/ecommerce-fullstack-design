import { useState, useEffect } from 'react'
import styles from './Admin.module.css'
import api from '../../api/axios'

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading]  = useState(true)
  const [name, setName]        = useState('')
  const [slug, setSlug]        = useState('')
  const [image, setImage]      = useState('')
  const [saving, setSaving]    = useState(false)
  const [error, setError]      = useState('')

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/categories'); setCategories(data.categories) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  // Auto-generate slug from name
  const handleNameChange = (val) => {
    setName(val)
    setSlug(val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return
    setSaving(true); setError('')
    try {
      await api.post('/categories', { name: name.trim(), slug: slug.trim(), image })
      setName(''); setSlug(''); setImage('')
      fetch()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id, catName) => {
    if (!window.confirm(`Delete category "${catName}"? Products in this category won't be deleted but will lose their category.`)) return
    try { await api.delete(`/categories/${id}`); fetch() }
    catch (e) { alert(e.response?.data?.message || 'Delete failed') }
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Categories</h4>
          <p className={styles.pageSubtitle}>{categories.length} categories</p>
        </div>
      </div>

      {/* Add Form */}
      <div className={styles.formCard}>
        <h6 className={styles.formTitle}>Add New Category</h6>
        {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
        <form onSubmit={handleAdd}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className={styles.label}>Name *</label>
              <input className="form-control form-control-sm" placeholder="e.g. Electronics" value={name}
                onChange={e => handleNameChange(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className={styles.label}>Slug *</label>
              <input className="form-control form-control-sm" placeholder="auto-generated" value={slug}
                onChange={e => setSlug(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className={styles.label}>Image URL</label>
              <input className="form-control form-control-sm" placeholder="https://..." value={image}
                onChange={e => setImage(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm mt-3" disabled={saving}>
            {saving ? 'Adding...' : '+ Add Category'}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className={styles.card}>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>#</th><th>Name</th><th>Slug</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat._id}>
                  <td style={{ color: '#8B96A5' }}>{i + 1}</td>
                  <td><strong>{cat.name}</strong></td>
                  <td><code style={{ fontSize: '12px', color: '#8B96A5' }}>{cat.slug}</code></td>
                  <td>
                    {cat.image
                      ? <img src={cat.image} alt={cat.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E8ECF0' }} />
                      : <span style={{ color: '#8B96A5', fontSize: '12px' }}>—</span>
                    }
                  </td>
                  <td>
                    <button className={styles.btnDelete} onClick={() => handleDelete(cat._id, cat.name)}>Delete</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && <tr><td colSpan={5}><div className={styles.emptyState}><div className={styles.emptyIcon}>🗂️</div>No categories</div></td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminCategories
