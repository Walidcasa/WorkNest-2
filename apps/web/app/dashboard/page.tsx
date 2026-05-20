'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Brain,
  TrendingUp,
  Target,
  Loader2
} from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function UnifiedDashboard() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({
    cashSummary: { totalIncome: 0, totalExpenses: 0, netCashFlow: 0 },
    timeSummary: { focusScore: 0, wastePercentage: 0 },
    aiInsight: null,
    user: null
  })

  const fetchData = async () => {
    try {
      const storedUser = localStorage.getItem('worknest_user')
      const token = localStorage.getItem('worknest_token')

      if (token) {
        const [cash, score, breakdown, insights] = await Promise.all([
          apiRequest('/transactions/summary').catch(() => ({ totalIncome: 0, totalExpenses: 0, netCashFlow: 0 })),
          apiRequest('/activities/focus-score').catch(() => 0),
          apiRequest('/activities/breakdown').catch(() => ({ PRODUCTIVE: 0, NEUTRAL: 0, WASTE: 0 })),
          apiRequest('/ai/insights').catch(() => [])
        ])
        
        const totalMin = (breakdown?.PRODUCTIVE || 0) + (breakdown?.NEUTRAL || 0) + (breakdown?.WASTE || 0)
        const waste = totalMin > 0 ? Math.round(((breakdown?.WASTE || 0) / totalMin) * 100) : 0

        setData({
          cashSummary: cash || { totalIncome: 0, totalExpenses: 0, netCashFlow: 0 },
          timeSummary: { focusScore: score || 0, wastePercentage: waste },
          aiInsight: (Array.isArray(insights) && insights.length > 0) ? insights[0] : null,
          user: storedUser ? JSON.parse(storedUser) : null
        })
      } else {
        setData((prev: any) => ({
          ...prev,
          user: storedUser ? JSON.parse(storedUser) : null
        }))
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black font-outfit text-text tracking-tighter uppercase">{t('clarityOverview')}</h1>
          <p className="text-text/60 mt-2 font-medium">{t('claritySubtitle')}</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-white p-2 rounded-2xl border border-text/5 shadow-sm">
          <div className="px-4 py-2 bg-secondary rounded-xl text-xs font-black uppercase tracking-widest text-text/40">{t('dailyCheckpoint')}</div>
          <div className="w-10 h-10 bg-accent2 text-white rounded-xl flex items-center justify-center shadow-lg shadow-accent2/20">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Link href="/dashboard/finances" className="glass-card p-8 bg-white border-l-8 border-l-blue-600 hover:shadow-2xl transition-all group cursor-pointer">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{t('finances')}</h3>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-1">{t('netFlowMonth')}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex items-baseline gap-4">
            <h2 className={`text-5xl font-black font-outfit tracking-tighter ${data.cashSummary.netCashFlow >= 0 ? 'text-text' : 'text-danger'}`}>
              ${data.cashSummary.netCashFlow.toLocaleString()}
            </h2>
            <div className={`flex items-center gap-1 text-xs font-black ${data.cashSummary.netCashFlow >= 0 ? 'text-success' : 'text-danger'}`}>
              {data.cashSummary.netCashFlow >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {data.cashSummary.netCashFlow >= 0 ? t('profit') : t('loss')}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-text/5">
            <div>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest">{t('income')}</p>
              <p className="text-xl font-black text-success mt-1">+${data.cashSummary.totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest">{t('expenses')}</p>
              <p className="text-xl font-black text-danger mt-1">-${data.cashSummary.totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/time" className="glass-card p-8 bg-white border-l-8 border-l-amber-500 hover:shadow-2xl transition-all group cursor-pointer">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{t('time')}</h3>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-1">{t('dailyFocusScore')}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <h2 className="text-5xl font-black font-outfit tracking-tighter text-text">
              {data.timeSummary.focusScore}
            </h2>
            <div className="flex items-center gap-1 text-xs font-black text-accent2">
              <Zap className="w-4 h-4" />
              {t('focus')}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-text/5 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-text/40">{t('wasteAwareness')}</span>
              <span className={data.timeSummary.wastePercentage > 30 ? 'text-danger' : 'text-success'}>{data.timeSummary.wastePercentage}%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${data.timeSummary.wastePercentage > 30 ? 'bg-danger' : 'bg-success'}`} 
                style={{ width: `${data.timeSummary.wastePercentage}%` }} 
                />
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Link href="/dashboard/ai-insights" className="xl:col-span-2 glass-card p-8 bg-gradient-to-br from-text to-text/90 text-white border-none shadow-2xl group">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 opacity-60">
                <Brain className="w-5 h-5 text-accent2" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('systemInsight')}</span>
              </div>
              <h3 className="text-2xl font-black font-outfit tracking-tight leading-tight group-hover:text-accent2 transition-colors">
                {data.aiInsight ? `"${data.aiInsight.description}"` : '"Analyze your business data to get personalized strategic advice."'}
              </h3>
              {data.aiInsight && (
                <p className="mt-4 text-xs font-bold text-accent2 uppercase tracking-widest">
                  {t('aiInsights')}: {data.aiInsight.title}
                </p>
              )}
            </div>
            <div className="shrink-0 px-8 py-4 bg-accent2 text-white rounded-2xl font-black uppercase tracking-widest text-xs group-hover:scale-105 transition-all shadow-xl shadow-accent2/20">
              {t('viewInsights')}
            </div>
          </div>
        </Link>

        <Link href="/dashboard/projects" className="glass-card p-8 bg-white border-2 border-dashed border-text/10 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-accent2 transition-all">
          <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center mb-6 group-hover:bg-accent2/10 transition-colors">
            <Target className="w-8 h-8 text-text/20 group-hover:text-accent2 transition-colors" />
          </div>
          <h4 className="font-black font-outfit uppercase tracking-tight">{t('activeProjects')}</h4>
          <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-2">{t('manageTasks')}</p>
        </Link>
      </div>
    </div>
  )
}
