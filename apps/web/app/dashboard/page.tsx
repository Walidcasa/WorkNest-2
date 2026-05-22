'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import CompanyDashboard from '@/components/dashboard/company-dashboard'
import SellerDashboard from '@/components/dashboard/seller-dashboard'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [accountType, setAccountType] = useState<string>('COMPANY')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('worknest_user')
    const user = stored ? JSON.parse(stored) : {}
    const type = user.accountType || 'COMPANY'
    setAccountType(type)

    const fetchAll = async () => {
      try {
        if (type === 'PERSONAL') {
          const [cash, products, clients, insights, transactions] = await Promise.all([
            apiRequest('/transactions/summary').catch(() => ({ totalIncome: 0, totalExpenses: 0, netCashFlow: 0 })),
            apiRequest('/products').catch(() => []),
            apiRequest('/clients').catch(() => []),
            apiRequest('/ai/insights').catch(() => []),
            apiRequest('/transactions').catch(() => []),
          ])
          setData({ cash, products, clients, insights, transactions, user })
        } else {
          const [cash, score, breakdown, insights, projects, employees, clients] = await Promise.all([
            apiRequest('/transactions/summary').catch(() => ({ totalIncome: 0, totalExpenses: 0, netCashFlow: 0 })),
            apiRequest('/activities/focus-score').catch(() => 0),
            apiRequest('/activities/breakdown').catch(() => ({ PRODUCTIVE: 0, NEUTRAL: 0, WASTE: 0 })),
            apiRequest('/ai/insights').catch(() => []),
            apiRequest('/projects').catch(() => []),
            apiRequest('/employees').catch(() => []),
            apiRequest('/clients').catch(() => []),
          ])
          const totalMin = (breakdown?.PRODUCTIVE || 0) + (breakdown?.NEUTRAL || 0) + (breakdown?.WASTE || 0)
          const waste = totalMin > 0 ? Math.round(((breakdown?.WASTE || 0) / totalMin) * 100) : 0
          setData({ cash, focusScore: score || 0, wastePercentage: waste, insights, projects, employees, clients, user })
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  if (accountType === 'PERSONAL') return <SellerDashboard data={data} />
  return <CompanyDashboard data={data} />
}
