import { useState, useEffect } from 'react'
import styles from './Admin.module.css'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

function AdminUsers() {
  const { user: currentUser } = useAuth()
  const [users, setUsers]     = useState([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/users')
      setUsers(data.users); setTotal(data.total)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [])

  const toggleRole = async (userId, currentRole) => {
    if (userId === currentUser._id) return alert("You can't change your own role.")
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    if (!window.confirm(`Change this user to ${newRole}?`)) return
    setUpdatingId(userId)
    try {
      const { data } = await api.put(`/admin/users/${userId}/role`, { role: newRole })
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: data.user.role } : u))
    } catch (e) { alert(e.response?.data?.message || 'Update failed') }
    finally { setUpdatingId(null) }
  }

  const handleDelete = async (userId, userName) => {
    if (userId === currentUser._id) return alert("You can't delete your own account.")
    if (!window.confirm(`Delete user "${userName}"?`)) return
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(prev => prev.filter(u => u._id !== userId))
      setTotal(t => t - 1)
    } catch (e) { alert(e.response?.data?.message || 'Delete failed') }
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>Users</h4>
          <p className={styles.pageSubtitle}>{total} registered users</p>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', background: u.role === 'admin' ? '#E8D5FF' : '#EBF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: u.role === 'admin' ? '#5A00A3' : '#0d6efd', flexShrink: 0 }}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '13px' }}>{u.name}</div>
                        {u._id === currentUser._id && <div style={{ fontSize: '10px', color: '#28a745' }}>● You</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#8B96A5', fontSize: '13px' }}>{u.email}</td>
                  <td>
                    <span className={`${styles.badge} ${u.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ color: '#8B96A5', fontSize: '12px' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.btnEdit}
                      onClick={() => toggleRole(u._id, u.role)}
                      disabled={updatingId === u._id || u._id === currentUser._id}
                    >
                      {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(u._id, u.name)}
                      disabled={u._id === currentUser._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5}><div className={styles.emptyState}><div className={styles.emptyIcon}>👥</div>No users found</div></td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
