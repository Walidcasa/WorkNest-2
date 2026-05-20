'use client'

import { useState } from 'react'
import { 
  Target, 
  TrendingUp, 
  Flag, 
  ChevronRight, 
  ShieldCheck,
  Zap
} from 'lucide-react'
import { AddProjectModal } from '@/components/dashboard/add-project-modal'

import { useTranslation } from '@/components/providers/i18n-provider'

export default function GoalsPage() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [goals, setGoals] = useState([
    { id: 1, type: 'FINANCIAL', title: 'Revenue Goal YTD', target: 120000, current: 45000, color: 'bg-blue-600' },
    { id: 2, type: 'PRODUCTIVITY', title: 'Weekly Productive Hours', target: 40, current: 28, color: 'bg-amber-500' },
    { id: 3, type: 'FINANCIAL', title: 'Emergency Fund', target: 20000, current: 15000, color: 'bg-emerald-500' },
  ])

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight uppercase">{t('goalsTargets')}</h1>
          <p className="text-text/60">{t('behaviorQuestion')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-6 py-2.5 rounded-2xl shadow-xl shadow-accent2/20 font-black uppercase text-xs tracking-widest"
        >
          {t('newTarget')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="glass-card p-8 bg-white hover:shadow-2xl transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 ${goal.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {goal.type === 'FINANCIAL' ? <TrendingUp className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text/40">{goal.type}</span>
                    {goal.current >= goal.target && <ShieldCheck className="w-3 h-3 text-success" />}
                  </div>
                  <h3 className="text-xl font-black font-outfit tracking-tight uppercase">{goal.title}</h3>
                </div>
              </div>
              
              <div className="text-right w-full md:w-auto">
                <p className="text-xs font-black text-text/40 uppercase tracking-widest mb-1">{t('progress')}</p>
                <h4 className="text-3xl font-black font-outfit tracking-tighter">
                  {Math.round((goal.current / goal.target) * 100)}%
                </h4>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-text/60">{t('current')}: ${goal.current.toLocaleString()}</span>
                <span>{t('target')}: ${goal.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                <div 
                  className={`${goal.color} h-full transition-all duration-1000 shadow-sm`} 
                  style={{ width: `${(goal.current / goal.target) * 100}%` }} 
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-text/5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text/40 uppercase tracking-widest">
                <Flag className="w-3 h-3" /> {t('deadline')}: Dec 31, 2024
              </div>
              <button className="flex items-center gap-1 text-[10px] font-black text-accent2 uppercase tracking-widest group-hover:gap-2 transition-all">
                {t('adjustTarget')} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {}} 
      />
    </div>
  )
}
