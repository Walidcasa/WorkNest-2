'use client'

import { ArrowRight, Bot, LayoutDashboard, LineChart, Users } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function Home() {
  const { t } = useTranslation()
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent2/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent1/20 blur-[120px] rounded-full animate-pulse" />

      <nav className="fixed top-0 w-full p-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent2 rounded-xl flex items-center justify-center shadow-lg shadow-accent2/30">
            <Bot className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-outfit text-text">Clarity</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#features" className="nav-link">{t('features')}</a>
          <a href="#pricing" className="nav-link">{t('pricing')}</a>
          <a href="#about" className="nav-link">{t('about')}</a>
        </div>
        <a href="/login" className="btn-primary">
          {t('signIn')}
        </a>
      </nav>

      <section className="text-center max-w-4xl z-10 mt-20">
        <div className="inline-flex items-center gap-2 bg-accent1/10 text-accent1 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-accent1/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent1 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent1"></span>
          </span>
          {t('aiPowered')}
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold font-outfit text-text leading-[1.1] mb-6">
          {t('landingTitle1')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent2 via-accent1 to-accent3">
            {t('landingTitle2')}
          </span>
        </h1>
        
        <p className="text-xl text-text/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('landingSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2 rounded-xl shadow-lg shadow-accent2/20">
            {t('startFreeTrial')} <ArrowRight className="w-5 h-5" />
          </a>
          <a href="/login" className="bg-white text-text px-8 py-4 rounded-xl font-medium border border-text/10 shadow-sm hover:bg-secondary transition-all">
            {t('signInToDashboard')}
          </a>
        </div>
      </section>

      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mt-24 w-full">
        {[
          { title: t('smartFinances'), desc: t('smartFinancesDesc'), icon: LineChart },
          { title: t('aiAdvisor'), desc: t('aiAdvisorDesc'), icon: Bot },
          { title: t('projectHub'), desc: t('projectHubDesc'), icon: LayoutDashboard },
        ].map((feat, i) => (
          <div key={i} className="glass-card p-8 flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-accent2/10 rounded-lg flex items-center justify-center">
              <feat.icon className="text-accent2 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-outfit">{feat.title}</h3>
            <p className="text-text/60">{feat.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
