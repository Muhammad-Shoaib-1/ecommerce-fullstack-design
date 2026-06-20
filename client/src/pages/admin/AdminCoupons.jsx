import { useState, useEffect } from 'react'
import styles from './Admin.module.css'
import api from '../../api/axios'

const EMPTY_FORM = {
  code: '', type: 'percent', value: '', minOrderAmount: '', maxDiscount: '',
  usageLimit: '', perUserLimit: '1', expiresAt: '', description: '',
}

function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetch = async () => {
    setLoading(true)
    try { const { data } = await api.get('/admin/coupons'); setCoupons(data.coupons) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const F = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      await api.post('/admin/coupons', {
        code: form.code,
        type: form.type,
        value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        perUserLimit: form.perUserLimit ? Number(form.perUserLimit) : 1,
        expiresAt: form.expiresAt || null,
        description: form.description,
      })
      setForm(EMPTY_FORM)
      setShowForm(false)
      fetch()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create coupon')
    } finally { setSaving(false) }
  }

  const toggleActive = async (coupon) => {
    try {
      await api.put(`/admin/coupons/${coupon._id}`, { isActive: !coupon.isActive })
      fetch()
    } catch (e) { alert(e.response?.data?.message || 'Update failed') }
  }

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Delete coupon "${code}"?`)) return
    try { await api.delete(`/admin/coupons/${id}`); fetch() }
    catch (e) { alert(e.response?.data?.message || 'Delete failed') }
  }

  const isExpired = (c) => c.expiresAt && new Date(c.expiresAt) < new Date()

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Coupons</h4>
          <p className={styles.pageSubtitle}>{coupons.length} coupon codes</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(s => !s)}>
          {showForm ? 'Cancel' : '+ Add Coupon'}
        </button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h6 className={styles.formTitle}>Create New Coupon</h6>
          {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
          <form onSubmit={handleAdd}>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Code *</label>
                <input className="form-control form-control-sm" placeholder="SAVE10" value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} required />
              </div>
              <div>
                <label className={styles.label}>Type *</label>
                <select className="form-select form-select-sm" value={form.type} onChange={F('type')}>
                  <option value="percent">Percent (%)</option>
                  <option value="flat">Flat Amount ($)</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Value * {form.type === 'percent' ? '(%)' : '($)'}</label>
                <input type="number" min="0" step="0.01" className="form-control form-control-sm" value={form.value} onChange={F('value')} required />
              </div>
              <div>
                <label className={styles.label}>Min Order Amount ($)</label>
                <input type="number" min="0" step="0.01" className="form-control form-control-sm" placeholder="0" value={form.minOrderAmount} onChange={F('minOrderAmount')} />
              </div>
              {form.type === 'percent' && (
                <div>
                  <label className={styles.label}>Max Discount Cap ($)</label>
                  <input type="number" min="0" step="0.01" className="form-control form-control-sm" placeholder="No cap" value={form.maxDiscount} onChange={F('maxDiscount')} />
                </div>
              )}
              <div>
                <label className={styles.label}>Total Usage Limit</label>
                <input type="number" min="1" className="form-control form-control-sm" placeholder="Unlimited" value={form.usageLimit} onChange={F('usageLimit')} />
              </div>
              <div>
                <label className={styles.label}>Per-User Limit</label>
                <input type="number" min="1" className="form-control form-control-sm" value={form.perUserLimit} onChange={F('perUserLimit')} />
              </div>
              <div>
                <label className={styles.label}>Expiry Date</label>
                <input type="date" className="form-control form-control-sm" value={form.expiresAt} onChange={F('expiresAt')} />
              </div>
              <div className={styles.formGridFull}>
                <label className={styles.label}>Description</label>
                <input className="form-control form-control-sm" placeholder="e.g. 10% off your order" value={form.description} onChange={F('description')} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-sm mt-3" disabled={saving}>
              {saving ? 'Creating...' : '+ Create Coupon'}
            </button>
          </form>
        </div>
      )}

      <div className={styles.card}>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr><th>Code</th><th>Discount</th><th>Min Order</th><th>Usage</th><th>Expires</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c._id}>
                  <td><code style={{ fontWeight: 700, fontSize: '13px' }}>{c.code}</code></td>
                  <td>
                    {c.type === 'percent' ? `${c.value}%` : `$${c.value}`}
                    {c.maxDiscount && c.type === 'percent' && <span style={{ color: '#8B96A5', fontSize: '11px' }}> (max ${c.maxDiscount})</span>}
                  </td>
                  <td>{c.minOrderAmount > 0 ? `$${c.minOrderAmount}` : '—'}</td>
                  <td style={{ fontSize: '12px' }}>
                    {c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ' / ∞'}
                    <div style={{ color: '#8B96A5' }}>{c.perUserLimit}/user</div>
                  </td>
                  <td style={{ fontSize: '12px', color: isExpired(c) ? '#dc3545' : '#8B96A5' }}>
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never'}
                  </td>
                  <td>
                    {isExpired(c) ? (
                      <span className={`${styles.badge} ${styles.badgeCancelled}`}>Expired</span>
                    ) : (
                      <span className={`${styles.badge} ${c.isActive ? styles.badgeDelivered : styles.badgeUser}`}>
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    )}
                  </td>
                  <td>
                    <button className={styles.btnEdit} onClick={() => toggleActive(c)}>
                      {c.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(c._id, c.code)}>Delete</button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && <tr><td colSpan={7}><div className={styles.emptyState}><div className={styles.emptyIcon}>🎟️</div>No coupons yet</div></td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminCoupons
