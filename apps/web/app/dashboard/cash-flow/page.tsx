'use client'

import { useEffect, useState } from 'react'
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Wallet, 
  Filter, 
  Download,
  Loader2
} from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { AddTransactionModal } from '@/components/dashboard/add-transaction-modal'

import { useTranslation } from '@/components/providers/i18n-provider'

export default function CashFlowPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, netCashFlow: 0 })

  const fetchData = async () => {
    try {
      const [trans, summ] = await Promise.all([
        apiRequest('/transactions'),
        apiRequest('/transactions/summary')
      ])
      setTransactions(trans)
      setSummary(summ)
    } catch (err) {
      console.error('Failed to fetch cash flow data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight uppercase">{t('cashFlow')}</h1>
          <p className="text-text/60">{t('visibilityAwareness')}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-text border border-text/10 px-4 py-2.5 rounded-2xl font-bold shadow-sm hover:bg-secondary transition-all">
            <Download className="w-4 h-4" /> {t('export')}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-6 py-2.5 rounded-2xl shadow-xl shadow-accent2/20">
            <Plus className="w-4 h-4" /> {t('addEntry')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title={t('income')} 
          value={`$${summary.totalIncome.toLocaleString()}`} 
          icon={<ArrowUpRight className="text-success w-5 h-5" />} 
          color="bg-success/10"
          t={t}
        />
        <MetricCard 
          title={t('expenses')} 
          value={`$${summary.totalExpenses.toLocaleString()}`} 
          icon={<ArrowDownRight className="text-danger w-5 h-5" />} 
          color="bg-danger/10"
          t={t}
        />
        <div className={`glass-card p-6 border-none shadow-xl ${summary.netCashFlow >= 0 ? 'bg-accent2 text-white shadow-accent2/20' : 'bg-danger text-white shadow-danger/20'}`}>
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">{t('netFlowMonth')}</p>
            <Wallet className="w-5 h-5 opacity-50" />
          </div>
          <h3 className="text-3xl font-black font-outfit mt-2 tracking-tighter">${summary.netCashFlow.toLocaleString()}</h3>
          <p className="text-[10px] font-bold mt-4 opacity-80 uppercase tracking-wider">
            {summary.netCashFlow >= 0 ? t('monthlyProfit') : t('monthlyLoss')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black font-outfit tracking-tight uppercase">{t('spendingByCategory')}</h3>
            <button className="p-2 hover:bg-secondary rounded-xl transition-all"><Filter className="w-4 h-4 text-text/40" /></button>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-text/5 rounded-3xl text-text/30 font-bold uppercase tracking-widest text-xs">
            Bar Chart Integration
          </div>
        </div>

        <div className="glass-card p-8 bg-white">
          <h3 className="text-lg font-black font-outfit tracking-tight uppercase mb-8">{t('recentTruths')}</h3>
          <div className="space-y-6">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex justify-between items-center group">
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'REVENUE' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {t.type === 'REVENUE' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-text uppercase tracking-tight">{t.label}</p>
                    <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest">{t.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black tracking-tight ${t.type === 'REVENUE' ? 'text-success' : 'text-danger'}`}>
                    {t.type === 'REVENUE' ? '+' : '-'}${t.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-bold text-text/30 uppercase">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xs font-bold text-text/30 uppercase tracking-widest leading-relaxed">
                  {t('noDataExposeReality')}
                </p>
              </div>
            )}
          </div>
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

function MetricCard({ title, value, icon, color, t }: any) {
  return (
    <div className="glass-card p-6 bg-white hover:shadow-2xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-black text-text/40 uppercase tracking-widest">{title}</p>
        <div className={`p-2 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-black font-outfit tracking-tighter">{value}</h3>
      <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-success">
        <TrendingUp className="w-3 h-3" /> 12% {t('vsLastMonth')}
      </div>
    </div>
  )
}
