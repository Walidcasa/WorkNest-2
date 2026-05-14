'use client'

import { useEffect, useState } from 'react'
import { 
  Plus, 
  Clock, 
  Zap, 
  Brain, 
  Trash2, 
  Coffee,
  Activity as ActivityIcon,
  Loader2,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { AddActivityModal } from '@/components/dashboard/add-activity-modal'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function TimeProductivityPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activities, setActivities] = useState<any[]>([])
  const [focusScore, setFocusScore] = useState(0)
  const [breakdown, setBreakdown] = useState({ PRODUCTIVE: 0, NEUTRAL: 0, WASTE: 0 })

  const fetchData = async () => {
    try {
      setLoading(true)
      const [acts, score, breakd] = await Promise.all([
        apiRequest('/activities/today'),
        apiRequest('/activities/focus-score'),
        apiRequest('/activities/breakdown')
      ])
      setActivities(acts)
      setFocusScore(score)
      setBreakdown(breakd)
    } catch (err) {
      console.error('Failed to fetch time data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading && activities.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  const totalMinutes = breakdown.PRODUCTIVE + breakdown.NEUTRAL + breakdown.WASTE
  const wastePercentage = totalMinutes > 0 ? Math.round((breakdown.WASTE / totalMinutes) * 100) : 0

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight uppercase">{t('time')}</h1>
          <p className="text-text/60">{t('claritySubtitle')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-6 py-2.5 rounded-2xl shadow-xl shadow-accent2/20">
          <Plus className="w-4 h-4" /> {t('logActivity')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FocusCard 
          title={t('focusScore')} 
          value={focusScore} 
          subtitle={t('realTimeRatio')} 
          icon={<Brain className="w-6 h-6 text-accent2" />} 
          progress={focusScore}
        />
        <div className="glass-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-widest text-text/40">{t('distractionAlert')}</p>
            <AlertCircle className={`w-5 h-5 ${wastePercentage > 30 ? 'text-danger animate-pulse' : 'text-text/20'}`} />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-outfit tracking-tighter">{wastePercentage}%</h3>
            <p className="text-[10px] font-bold text-text/60 uppercase tracking-wider mt-1">{t('lowValueTasks')}</p>
          </div>
          <div className="w-full bg-secondary h-1.5 rounded-full mt-6 overflow-hidden">
            <div className="bg-danger h-full" style={{ width: `${wastePercentage}%` }} />
          </div>
        </div>
        <div className="glass-card p-6 bg-amber-500 text-white border-none shadow-xl shadow-amber-500/20">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">{t('topDailyActivity')}</p>
            <Zap className="w-5 h-5 opacity-50" />
          </div>
          <h3 className="text-2xl font-black font-outfit mt-4 leading-tight uppercase tracking-tight">{t('deepWork')}</h3>
          <p className="text-[10px] font-bold mt-4 opacity-80 uppercase tracking-widest">3h 45m {t('loggedToday')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 bg-white">
          <h3 className="text-lg font-black font-outfit tracking-tight uppercase mb-8">{t('todaySchedule')}</h3>
          <div className="space-y-6">
            {activities.map((a) => (
              <div key={a.id} className="flex gap-6 group">
                <div className="text-right w-16 shrink-0">
                  <p className="text-xs font-black text-text uppercase tracking-tight">
                    {a.duration >= 60 ? `${Math.floor(a.duration / 60)}h ${a.duration % 60}m` : `${a.duration}m`}
                  </p>
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest">{t('logged')}</p>
                </div>
                <div className="relative flex-1 pb-6 border-l-2 border-text/5 pl-8 group-last:pb-0">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    a.level === 'PRODUCTIVE' ? 'bg-success' : a.level === 'WASTE' ? 'bg-danger' : 'bg-text/20'
                  }`} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-black text-text uppercase tracking-tight">{a.name}</h4>
                      <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mt-0.5">{a.category}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      a.level === 'PRODUCTIVE' ? 'bg-success/10 text-success' : 
                      a.level === 'WASTE' ? 'bg-danger/10 text-danger' : 'bg-secondary text-text/40'
                    }`}>
                      {t(a.level.toLowerCase())}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-text/5">
                <Clock className="w-12 h-12 text-text/10 mx-auto mb-4" />
                <p className="text-xs font-black text-text/30 uppercase tracking-widest leading-relaxed">
                  {t('timeTruthHint')}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 bg-white">
            <h3 className="text-lg font-black font-outfit tracking-tight uppercase mb-8">{t('weeklyTrend')}</h3>
            <div className="h-40 flex items-end gap-3 px-2">
              {[60, 45, 80, 55, 90, 70, 40].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${i === 4 ? 'bg-accent2' : 'bg-secondary group-hover:bg-accent2/30'}`} 
                    style={{ height: `${val}%` }} 
                  />
                  <span className="text-[8px] font-black text-text/30 uppercase">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none shadow-2xl shadow-indigo-900/20">
            <h3 className="font-black font-outfit uppercase tracking-tight mb-4 flex items-center gap-2">
              {t('behaviorNudge')} <Brain className="w-5 h-5 text-accent2" />
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-80">
              {t('behaviorQuestion')}
            </p>
            <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{t('eliminationTask')}</p>
              <p className="text-xs font-bold">{t('eliminationGoal')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}

function FocusCard({ title, value, subtitle, icon, progress }: any) {
  return (
    <div className="glass-card p-6 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-secondary rounded-2xl">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-xs font-black text-text/40 uppercase tracking-widest">{title}</p>
          <h3 className="text-4xl font-black font-outfit tracking-tighter mt-1">{value}</h3>
        </div>
      </div>
      <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mb-4">{subtitle}</p>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div 
          className="bg-accent2 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(var(--accent2),0.5)]" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  )
}
