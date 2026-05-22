'use client'

import { useEffect, useState } from 'react'
import { Plus, Download, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Loader2 } from 'lucide-react'
import { dashboardApi } from '@/lib/api-client'
import { AddTransactionModal } from '@/components/dashboard/add-transaction-modal'
import { formatCurrency } from '@/lib/currency'
import { useTranslation } from '@/components/providers/i18n-provider'
import { exportToPDF } from '@/lib/pdf-export'

export default function FinancesPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const [summary, setSummary] = useState({ revenue: 0, expenses: 0, net: 0 })

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getFinances()
      setTransactions(data)
      
      const rev = data.filter((t: any) => t.type === 'REVENUE').reduce((acc: number, curr: any) => acc + curr.amount, 0)
      const exp = data.filter((t: any) => t.type === 'EXPENSE').reduce((acc: number, curr: any) => acc + curr.amount, 0)
      
      setSummary({ revenue: rev, expenses: exp, net: rev - exp })
    } catch (err) {
      console.error('Failed to fetch finances', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading && transactions.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )
  return (
    <div className="space-y-8" id="finances-content">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('finances')}</h1>
          <p className="text-text/60">{t('manageFinance')}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportToPDF('finances-content', 'Finances Report')} className="flex items-center gap-2 bg-white text-text border border-text/10 px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-secondary transition-all">
            <Download className="w-4 h-4" /> {t('export')}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-4 py-2">
            <Plus className="w-4 h-4" /> {t('addTransaction')}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-text/60">{t('totalRevenue')}</p>
              <h3 className="text-2xl font-bold font-outfit mt-1">${summary.revenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-success font-medium mt-4">+12% {t('fromLastMonth')}</p>
        </div>

        <div className="glass-card p-6 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-text/60">{t('totalExpenses')}</p>
              <h3 className="text-2xl font-bold font-outfit mt-1">${summary.expenses.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-danger/10 rounded-lg text-danger">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-danger font-medium mt-4">-4% {t('fromLastMonth')}</p>
        </div>

        <div className="glass-card p-6 bg-accent2 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">{t('netProfit')}</p>
              <h3 className="text-2xl font-bold font-outfit mt-1">${summary.net.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-medium mt-4 opacity-90">{t('healthyCashFlow')}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card overflow-hidden bg-white">
        <div className="p-6 border-b border-text/5 flex justify-between items-center">
          <h3 className="font-bold font-outfit">{t('recentTransactions')}</h3>
          <button className="text-text/40 hover:text-text">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-text/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">{t('description')}</th>
                <th className="px-6 py-4 font-semibold">{t('category')}</th>
                <th className="px-6 py-4 font-semibold">{t('date')}</th>
                <th className="px-6 py-4 font-semibold">{t('amount')}</th>
                <th className="px-6 py-4 font-semibold text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-text">{t.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-secondary text-text/60 text-xs font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text/60">{t.date}</td>
                  <td className="px-6 py-4">
                    <span className={t.type === 'REVENUE' ? 'text-success font-bold' : 'text-danger font-bold'}>
                      {t.type === 'REVENUE' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-text/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}
