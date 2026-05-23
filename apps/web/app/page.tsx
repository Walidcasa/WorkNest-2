'use client'

import { useState } from 'react'
import { ArrowRight, Bot, LayoutDashboard, LineChart, Check, Zap, Building2, User } from 'lucide-react'

import { useTranslation } from '@/components/providers/i18n-provider'

export default function Home() {
  const { t, lang } = useTranslation()
  const [billing, setBilling] = useState<'monthly' | 'quarterly' | 'annual'>('monthly')

  const prices = {
    basic:  { monthly: 9,  quarterly: 7,  annual: 6  },
    pro:    { monthly: 19, quarterly: 16, annual: 13 },
    agency: { monthly: 49, quarterly: 43, annual: 33 },
  }

  const totals = {
    basic:  { monthly: 9,  quarterly: 21,  annual: 69   },
    pro:    { monthly: 19, quarterly: 45,  annual: 149  },
    agency: { monthly: 49, quarterly: 129, annual: 399  },
  }

  const savings = { monthly: null, quarterly: '15%', annual: '33%' }

  const billingLabel = billing === 'monthly' ? t('billedMonthly') : billing === 'quarterly' ? t('billedQuarterly') : t('billedAnnually')

  const plans = [
    {
      key: 'basic',
      name: t('planBasic'),
      desc: t('planDescBasic'),
      icon: User,
      color: 'text-accent3',
      bg: 'bg-accent3/10',
      popular: false,
      features: [t('feat5Clients'), t('featFinances'), t('featAiBasic')],
      cta: t('getStarted'),
      href: '/register',
    },
    {
      key: 'pro',
      name: t('planPro'),
      desc: t('planDescPro'),
      icon: Zap,
      color: 'text-accent2',
      bg: 'bg-accent2/10',
      popular: true,
      features: [
        `${t('everythingIn')} ${t('planBasic')}`,
        t('featUnlimited'),
        t('featAiFull'),
        t('featPdfInvoices'),
        t('featReports'),
        t('featPrioritySupport'),
      ],
      cta: t('getStarted'),
      href: '/register',
    },
    {
      key: 'agency',
      name: t('planAgency'),
      desc: t('planDescAgency'),
      icon: Building2,
      color: 'text-accent1',
      bg: 'bg-accent1/10',
      popular: false,
      features: [
        `${t('everythingIn')} ${t('planPro')}`,
        t('featMultiCompany'),
        t('featWhatsapp'),
        t('featDedicatedSupport'),
        t('featEarlyAccess'),
      ],
      cta: t('contactUs'),
      href: '/register',
    },
  ]

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
          <span className="text-2xl font-bold font-outfit text-text">NEXUS</span>
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

      {/* Pricing Section */}
      <section id="pricing" className="w-full max-w-7xl mt-32 mb-20 z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-text mb-4">{t('pricingTitle')}</h2>
          <p className="text-text/60 text-lg">{t('pricingSubtitle')}</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-secondary/60 rounded-2xl p-1.5 gap-1">
            {(['monthly', 'quarterly', 'annual'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBilling(period)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  billing === period
                    ? 'bg-white text-text shadow-md'
                    : 'text-text/50 hover:text-text'
                }`}
              >
                {period === 'monthly' ? t('monthly') : period === 'quarterly' ? t('quarterly') : t('annual')}
                {period !== 'monthly' && (
                  <span className="absolute -top-2.5 -right-2 bg-accent1 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    -{savings[period]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const price = prices[plan.key as keyof typeof prices][billing]
            const total = totals[plan.key as keyof typeof totals][billing]
            return (
              <div
                key={plan.key}
                className={`relative glass-card p-8 flex flex-col gap-6 transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-accent2 shadow-2xl shadow-accent2/20 scale-105'
                    : 'border border-text/10 hover:-translate-y-1'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent2 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-accent2/30 uppercase tracking-widest">
                      {t('mostPopular')}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div>
                  <div className={`w-12 h-12 ${plan.bg} rounded-2xl flex items-center justify-center mb-4`}>
                    <plan.icon className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-black font-outfit text-text">{plan.name}</h3>
                  <p className="text-sm text-text/50 mt-1">{plan.desc}</p>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-1">
                    <span className="text-text/50 font-bold mb-2 mr-1">$</span>
                    <span className="text-5xl font-black font-outfit text-text">{price}</span>
                    <span className="text-text/50 font-bold mb-2">{t('perMonth')}</span>
                  </div>
                  {billing !== 'monthly' && (
                    <p className="text-xs text-text/40 mt-1">
                      ${total} — {billingLabel}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full ${plan.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${plan.color}`} />
                      </div>
                      <span className={`font-medium ${i === 0 && plan.key !== 'basic' ? 'text-text/40 italic' : 'text-text/70'}`}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.href}
                  className={`w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-widest text-center transition-all ${
                    plan.popular
                      ? 'btn-primary shadow-lg shadow-accent2/20'
                      : 'border-2 border-text/10 text-text hover:border-accent2 hover:text-accent2'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Free trial note */}
        <p className="text-center text-sm text-text/40 mt-8 font-medium">
          ✓ {t('freeTrial')} &nbsp;·&nbsp; ✓ {t('noCardRequired')}
        </p>
      </section>
    </main>
  )
}
