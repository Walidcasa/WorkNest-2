'use client'

import Link from 'next/link'
import { Wallet, Clock, ArrowUpRight, ArrowDownRight, Zap, Brain, Target, Users, Folder, Loader2 } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function CompanyDashboard({ data }: { data: any }) {
  const { t } = useTranslation()
  if (!data) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 text-accent2 animate-spin" /></div>

  const { cash, focusScore, wastePercentage, insights, projects, employees, clients } = data
  const aiInsight = Array.isArray(insights) && insights.length > 0 ? insights[0] : null
  const activeProjects = Array.isArray(projects) ? projects.filter((p: any) => p.status === 'IN_PROGRESS').length : 0

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-text/40 uppercase tracking-widest mb-1">Company Dashboard</p>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight">{t('clarityOverview')}</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-text/5 shadow-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-black text-text/40 uppercase tracking-widest">{t('dailyCheckpoint')}</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('income'), value: `$${(cash?.totalIncome || 0).toLocaleString()}`, color: 'text-success', bg: 'bg-green-50', border: 'border-l-green-500' },
          { label: t('expenses'), value: `$${(cash?.totalExpenses || 0).toLocaleString()}`, color: 'text-danger', bg: 'bg-red-50', border: 'border-l-red-500' },
          { label: t('employees'), value: Array.isArray(employees) ? employees.length : 0, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-l-blue-500' },
          { label: t('clients'), value: Array.isArray(clients) ? clients.length : 0, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-l-purple-500' },
        ].map(k => (
          <div key={k.label} className={`bg-white rounded-2xl border-l-4 ${k.border} p-5 shadow-sm`}>
            <p className="text-[10px] font-black text-text/40 uppercase tracking-widest">{k.label}</p>
            <p className={`text-2xl font-black font-outfit mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link href="/dashboard/finances" className="glass-card p-8 bg-white border-l-8 border-l-blue-600 hover:shadow-2xl transition-all group cursor-pointer">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{t('finances')}</h3>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-1">{t('netFlowMonth')}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className={`text-4xl font-black font-outfit tracking-tighter ${(cash?.netCashFlow || 0) >= 0 ? 'text-text' : 'text-danger'}`}>
              ${(cash?.netCashFlow || 0).toLocaleString()}
            </h2>
            <div className={`flex items-center gap-1 text-xs font-black ${(cash?.netCashFlow || 0) >= 0 ? 'text-success' : 'text-danger'}`}>
              {(cash?.netCashFlow || 0) >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {(cash?.netCashFlow || 0) >= 0 ? t('profit') : t('loss')}
            </div>
          </div>
        </Link>

        <Link href="/dashboard/time" className="glass-card p-8 bg-white border-l-8 border-l-amber-500 hover:shadow-2xl transition-all group cursor-pointer">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{t('time')}</h3>
              <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-1">{t('dailyFocusScore')}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-black font-outfit tracking-tighter text-text">{focusScore}</h2>
            <div className="flex items-center gap-1 text-xs font-black text-accent2"><Zap className="w-4 h-4" />{t('focus')}</div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-text/40">{t('wasteAwareness')}</span>
              <span className={wastePercentage > 30 ? 'text-danger' : 'text-success'}>{wastePercentage}%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${wastePercentage > 30 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${wastePercentage}%` }} />
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Link href="/dashboard/ai-insights" className="xl:col-span-2 glass-card p-8 bg-gradient-to-br from-text to-text/90 text-white border-none shadow-2xl group">
          <div className="flex items-center gap-2 mb-4 opacity-60">
            <Brain className="w-5 h-5 text-accent2" />
            <span className="text-[10px] font-black uppercase tracking-widest">{t('systemInsight')}</span>
          </div>
          <h3 className="text-xl font-black font-outfit tracking-tight leading-snug group-hover:text-accent2 transition-colors">
            {aiInsight ? `"${aiInsight.description}"` : '"Add your business data to get personalized AI advice."'}
          </h3>
          {aiInsight && <p className="mt-3 text-xs font-bold text-accent2 uppercase tracking-widest">{aiInsight.title}</p>}
          <div className="mt-6 inline-block px-6 py-2 bg-accent2 text-white rounded-xl font-black uppercase tracking-widest text-xs group-hover:scale-105 transition-all shadow-lg">
            {t('viewInsights')}
          </div>
        </Link>

        <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
          <Link href="/dashboard/projects" className="glass-card p-6 bg-white flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-accent2/10 rounded-2xl flex items-center justify-center group-hover:bg-accent2/20 transition-colors">
              <Folder className="w-6 h-6 text-accent2" />
            </div>
            <div>
              <p className="text-2xl font-black text-text">{activeProjects}</p>
              <p className="text-[10px] font-black text-text/40 uppercase tracking-widest">{t('activeProjects')}</p>
            </div>
          </Link>
          <Link href="/dashboard/employees" className="glass-card p-6 bg-white flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-text">{Array.isArray(employees) ? employees.length : 0}</p>
              <p className="text-[10px] font-black text-text/40 uppercase tracking-widest">{t('employees')}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
