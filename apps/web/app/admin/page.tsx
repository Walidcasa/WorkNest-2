'use client'

import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api-client'
import { Users, DollarSign, TrendingUp, Globe, Loader2, UserCheck, ChevronDown } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

const ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN']
const PLANS = ['FREE_TRIAL', 'MONTHLY', 'YEARLY', 'EXPIRED']

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          apiRequest('/admin/stats'),
          apiRequest('/admin/users'),
        ])
        setStats(statsData)
        setUsers(usersData)
      } catch (err) {
        console.error('Failed to fetch admin data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateUser = async (userId: string, patch: { role?: string; plan?: string; suspended?: boolean }) => {
    setUpdating(userId)
    try {
      const updated = await apiRequest(`/admin/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updated } : u))
    } catch (e) {
      console.error(e)
    }
    setUpdating(null)
    setOpenMenu(null)
  }

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  const cards = [
    { name: t('totalUsers'), value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: t('premiumUsers'), value: stats.premiumUsers, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { name: t('totalRevenue'), value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: t('conversionRate'), value: `${stats.conversionRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{card.name}</p>
                <h3 className="text-3xl font-black font-outfit mt-2">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">User Management</h3>
            <p className="text-xs text-gray-400 mt-1">Change roles, plans, or suspend accounts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-black">User</th>
                  <th className="px-6 py-4 font-black">Role</th>
                  <th className="px-6 py-4 font-black">Plan</th>
                  <th className="px-6 py-4 font-black">Status</th>
                  <th className="px-6 py-4 font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {users.map((user) => {
                  const isSuspended = user.emailVerified === false
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-600' :
                          user.role === 'ADMIN' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          user.plan === 'YEARLY' ? 'bg-green-100 text-green-600' :
                          user.plan === 'MONTHLY' ? 'bg-blue-100 text-blue-600' :
                          user.plan === 'EXPIRED' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}>{user.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${isSuspended ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {isSuspended ? 'Suspended' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 relative">
                        {updating === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-accent2" />
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg text-xs font-bold hover:bg-accent2/10 transition-colors"
                            >
                              Manage <ChevronDown className="w-3 h-3" />
                            </button>
                            {openMenu === user.id && (
                              <div className="absolute right-0 top-8 z-50 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                                <div className="p-2">
                                  <p className="text-[10px] font-black text-gray-400 uppercase px-2 py-1">Change Role</p>
                                  {ROLES.map(r => (
                                    <button key={r} onClick={() => updateUser(user.id, { role: r })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${user.role === r ? 'bg-accent2/10 text-accent2' : 'hover:bg-gray-50 text-gray-700'}`}>
                                      {r}
                                    </button>
                                  ))}
                                  <p className="text-[10px] font-black text-gray-400 uppercase px-2 py-1 mt-2">Change Plan</p>
                                  {PLANS.map(p => (
                                    <button key={p} onClick={() => updateUser(user.id, { plan: p })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${user.plan === p ? 'bg-accent2/10 text-accent2' : 'hover:bg-gray-50 text-gray-700'}`}>
                                      {p}
                                    </button>
                                  ))}
                                  <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button onClick={() => updateUser(user.id, { suspended: !isSuspended })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-colors ${isSuspended ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}>
                                      {isSuspended ? '✓ Activate Account' : '⊘ Suspend Account'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geo */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">{t('geoDistribution')}</h3>
          </div>
          <div className="p-6 space-y-6">
            {stats.usersByCountry.map((item: any) => (
              <div key={item.countryCode} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-700">{item.countryCode || 'Unknown'}</span>
                  </div>
                  <span className="font-black text-accent2">{item._count} users</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-accent2 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(item._count / stats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Close menu on outside click */}
      {openMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  )
}
