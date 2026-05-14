'use client'

import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Globe, 
  Loader2, 
  UserCheck 
} from 'lucide-react'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          apiRequest('/admin/stats'),
          apiRequest('/admin/users')
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
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">{t('recentUsers')}</h3>
            <button className="text-xs font-bold text-accent2 hover:underline">{t('viewAll')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-black">{t('user')}</th>
                  <th className="px-6 py-4 font-black">{t('plan')}</th>
                  <th className="px-6 py-4 font-black">{t('status')}</th>
                  <th className="px-6 py-4 font-black">{t('joined')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {users.slice(0, 10).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700">{user.plan}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        user.plan === 'EXPIRED' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {user.plan === 'EXPIRED' ? t('inactive') : t('active')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
                    <span className="font-bold text-gray-700">{item.countryCode}</span>
                  </div>
                  <span className="font-black text-accent2">{item._count} {t('dashboard') === 'Overview' ? 'Users' : (t('dashboard').includes('نظرة') ? 'مستخدمين' : 'Utilisateurs')}</span>
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
    </div>
  )
}
