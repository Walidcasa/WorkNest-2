'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Mail, Lock, User, Loader2, Building2, UserRound } from 'lucide-react'
import { authApi } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function RegisterPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '1', // Default to US
    phoneNumber: '',
    password: '',
    accountType: '', 
    industry: '',
    profession: '',
  })

  const industries = [
    "Technology & Software", "Finance & Investment", "Healthcare & BioTech", "Real Estate", 
    "E-commerce & Retail", "Marketing & Advertising", "Construction & Engineering",
    "Education & EdTech", "Hospitality & Tourism", "Legal Services", "Manufacturing", 
    "Media & Entertainment", "Logistics & Supply Chain", "Agriculture", "Energy & Utilities",
    "Automotive", "Aerospace & Defense", "Apparel & Fashion", "Architecture", "Consulting",
    "Consumer Electronics", "Cybersecurity", "Environmental Services", "Events & Catering",
    "Gaming & Animation", "Graphic Design", "Insurance", "Interior Design", "Luxury Goods",
    "Music & Audio", "Non-Profit & NGO", "Pharmaceuticals", "Photography", "Publishing",
    "Sports & Fitness", "Telecommunications", "Transportation", "Wholesale", "Venture Capital",
    "Artificial Intelligence", "Renewable Energy", "Fitness & Wellness", "Human Resources",
    "Public Relations", "Accounting & Audit", "Mining", "Robotics", "Space Exploration",
    "Chemicals", "Government & Public Sector"
  ]

  const professions = [
    "Software Engineer", "Digital Marketer", "Doctor / Physician", "Real Estate Agent",
    "Freelance Designer", "Content Creator", "Financial Advisor", "Lawyer", "E-commerce Seller",
    "Consultant", "Small Business Owner", "Artist / Creator", "Project Manager",
    "Accountant", "Data Scientist", "Product Manager", "UX/UI Designer", "Copywriter",
    "Sales Representative", "Architect", "Civil Engineer", "Marketing Manager", "HR Specialist",
    "Nurse / Caregiver", "Physical Therapist", "Investment Banker", "Stock Trader", "Broker",
    "Interior Designer", "Photographer", "Videographer", "Social Media Manager", "SEO Specialist",
    "Business Analyst", "Operations Manager", "Supply Chain Manager", "Chef / Restaurateur",
    "Event Planner", "Personal Trainer", "Researcher", "Professor / Teacher", "Journalist",
    "Public Relations Specialist", "Web Developer", "App Developer", "Cybersecurity Analyst",
    "Cloud Architect", "Blockchain Developer", "AI Engineer", "Virtual Assistant"
  ]

  const countryCodes = [
    { code: '1', label: 'US/CA' }, { code: '20', label: 'EG' }, { code: '27', label: 'ZA' },
    { code: '31', label: 'NL' }, { code: '32', label: 'BE' }, { code: '33', label: 'FR' },
    { code: '34', label: 'ES' }, { code: '39', label: 'IT' }, { code: '41', label: 'CH' },
    { code: '44', label: 'UK' }, { code: '49', label: 'DE' }, { code: '52', label: 'MX' },
    { code: '55', label: 'BR' }, { code: '61', label: 'AU' }, { code: '64', label: 'NZ' },
    { code: '65', label: 'SG' }, { code: '81', label: 'JP' }, { code: '86', label: 'CN' },
    { code: '91', label: 'IN' }, { code: '212', label: 'MA' }, { code: '213', label: 'DZ' },
    { code: '216', label: 'TN' }, { code: '218', label: 'LY' }, { code: '221', label: 'SN' },
    { code: '225', label: 'CI' }, { code: '234', label: 'NG' }, { code: '254', label: 'KE' },
    { code: '351', label: 'PT' }, { code: '353', label: 'IE' }, { code: '358', label: 'FI' },
    { code: '852', label: 'HK' }, { code: '966', label: 'SA' }, { code: '971', label: 'UAE' },
    { code: '972', label: 'IL' }, { code: '973', label: 'BH' }, { code: '974', label: 'QA' },
  ].sort((a, b) => parseInt(a.code) - parseInt(b.code))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await authApi.register(form)
      localStorage.setItem('nexus_token', res.access_token)
      localStorage.setItem('nexus_user', JSON.stringify(res.user))
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-accent2 rounded-2xl flex items-center justify-center shadow-lg shadow-accent2/30 mb-4">
            <Bot className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('registerTitle')}</h1>
          <p className="text-text/60 mt-2">{t('registerSubtitle')}</p>
        </div>

        <div className="glass-card p-8 bg-white shadow-xl border-white/50">
          {error && <p className="bg-rose-50 text-rose-500 p-3 rounded-xl text-sm mb-6 font-medium">{error}</p>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-2">{t('fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30" />
                    <input 
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-2">{t('emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30" />
                    <input 
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-2">{t('themeAppearance') === 'Theme' ? 'Phone Number' : (t('themeAppearance').includes('ظهر') ? 'رقم الهاتف' : 'Numéro de téléphone')}</label>
                  <div className="flex gap-2">
                    <select 
                      value={form.countryCode}
                      onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                      className="w-24 px-2 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold text-sm"
                    >
                      {countryCodes.map(c => <option key={c.code} value={c.code}>+{c.code} ({c.label})</option>)}
                    </select>
                    <input 
                      type="tel" required value={form.phoneNumber}
                      onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                      placeholder="600000000"
                      className="flex-1 px-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-2">{t('themeAppearance') === 'Theme' ? 'Password' : (t('themeAppearance').includes('ظهر') ? 'كلمة السر' : 'Mot de passe')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30" />
                    <input 
                      type="password" required value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full btn-primary py-3 font-bold mt-4">{t('nextStep')}</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setForm({ ...form, accountType: 'COMPANY' })}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                      form.accountType === 'COMPANY' ? 'border-accent2 bg-accent2/5' : 'border-text/5'
                    }`}
                  >
                    <Building2 className={`w-8 h-8 ${form.accountType === 'COMPANY' ? 'text-accent2' : 'text-text/30'}`} />
                    <span className="text-sm font-bold">{t('company')}</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setForm({ ...form, accountType: 'PERSONAL' })}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                      form.accountType === 'PERSONAL' ? 'border-accent2 bg-accent2/5' : 'border-text/5'
                    }`}
                  >
                    <UserRound className={`w-8 h-8 ${form.accountType === 'PERSONAL' ? 'text-accent2' : 'text-text/30'}`} />
                    <span className="text-sm font-bold">{t('personal')}</span>
                  </button>
                </div>

                <div className="p-4 bg-secondary/30 rounded-2xl">
                  <p className="text-xs text-text/60 leading-relaxed text-center">
                    {form.accountType === 'COMPANY' 
                      ? "Choose 'Company' if you manage a team and multiple business projects."
                      : "Choose 'Personal' for tracking your private finances and daily productivity."}
                  </p>
                </div>

                {form.accountType === 'COMPANY' ? (
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-2">{t('primaryIndustry')}</label>
                    <select 
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    >
                      <option value="">{t('selectIndustry')}</option>
                      {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-2">{t('yourProfession')}</label>
                    <select 
                      value={form.profession}
                      onChange={(e) => setForm({ ...form, profession: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
                    >
                      <option value="">{t('selectProfession')}</option>
                      {professions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                )}

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 text-text/40 font-bold">{t('back')}</button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-[2] btn-primary py-3 font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('completeSignUp')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-text/60">
          {t('alreadyHaveAccount')} <Link href="/login" className="text-accent2 font-bold hover:underline">{t('signIn')}</Link>
        </p>
      </div>
    </div>
  )
}
