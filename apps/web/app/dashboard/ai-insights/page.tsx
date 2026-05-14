'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Bot, TrendingUp, AlertCircle, Lightbulb, ArrowRight, Loader2 } from 'lucide-react'
import { dashboardApi } from '@/lib/api-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useTranslation } from '@/components/providers/i18n-provider'

export default function AiInsightsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState<any[]>([])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getAiInsights()
      setInsights(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch AI insights', err)
      // fallback in case of error
      setInsights([{
        title: 'Error',
        description: 'Failed to load insights from the server. Please try again.',
        type: 'warning',
        metric: 'Offline'
      }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
      <p className="text-text/50 font-bold uppercase tracking-widest text-xs animate-pulse">{t('analyzeBusinessData')}</p>
    </div>
  )

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight uppercase flex items-center gap-3">
            {t('aiBusinessAdvisor')} <Sparkles className="w-8 h-8 text-accent2 animate-pulse" />
          </h1>
          <p className="text-text/60">{t('scaleBusinessIntelligence')}</p>
        </div>
        <button onClick={fetchInsights} className="btn-primary px-6 py-2.5 rounded-2xl shadow-xl shadow-accent2/20 flex items-center gap-2">
          {t('generateReport')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Recommendation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 bg-gradient-to-br from-white to-accent2/5 border-accent2/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent2 rounded-2xl flex items-center justify-center shadow-lg shadow-accent2/20">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{t('executiveSummary')}</h3>
                <p className="text-sm font-bold text-text/40 tracking-widest uppercase">{t('basedOnLiveData')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${
                  insight.type === 'success' ? 'bg-success/5 border-success/20' :
                  insight.type === 'warning' ? 'bg-warning/5 border-warning/20' :
                  'bg-secondary/50 border-text/10'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {insight.type === 'success' ? <TrendingUp className="w-5 h-5 text-success" /> :
                       insight.type === 'warning' ? <AlertCircle className="w-5 h-5 text-warning" /> :
                       <Lightbulb className="w-5 h-5 text-accent2" />}
                      <h4 className={`font-black uppercase tracking-tight ${
                        insight.type === 'success' ? 'text-success' :
                        insight.type === 'warning' ? 'text-warning' :
                        'text-text'
                      }`}>{insight.title}</h4>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/50 rounded-lg">
                      {insight.metric}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-text/70 leading-relaxed pl-7">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-white">
            <h3 className="font-black font-outfit uppercase tracking-tight mb-4">{t('revenueForecast')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase text-text/40 tracking-widest">{t('nextMonthEst')}</span>
                <span className="text-2xl font-black font-outfit text-success tracking-tighter">{t('profit')}</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-success h-full w-[85%] animate-pulse" />
              </div>
              <p className="text-xs font-bold text-text/40 uppercase tracking-widest">{t('basedOnPipeline')}</p>
            </div>
          </div>

          <div className="glass-card p-6 bg-accent1 text-white border-none shadow-xl shadow-accent1/20">
            <h3 className="font-black font-outfit uppercase tracking-tight mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" /> {t('proTip')}
            </h3>
            <p className="text-sm font-bold opacity-90 leading-relaxed mt-4">
              {t('aiInsights') === 'AI Business Advisor' ? 'Companies with your profile typically save 15% on taxes by consistently logging all daily expenses in the Finances tab.' : 
               (t('aiInsights').includes('IA') ? 'Les entreprises ayant votre profil économisent généralement 15 % sur les taxes en enregistrant systématiquement toutes les dépenses quotidiennes dans l’onglet Finances.' : 'عادةً ما توفر الشركات التي لديها ملفك الشخصي 15٪ من الضرائب من خلال تسجيل جميع النفقات اليومية باستمرار في علامة التبويب المالية.')}
            </p>
            <button 
              onClick={() => router.push('/dashboard/finances')}
              className="mt-6 w-full bg-white text-accent1 hover:bg-white/90 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-white/10"
            >
              {t('gotoFinances')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
