'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Layout, Mail, Lock, Loader2, User } from 'lucide-react'
import { authApi } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await authApi.login(form)
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent2/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-accent1/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-accent2 rounded-2xl flex items-center justify-center shadow-lg shadow-accent2/30 mb-4">
            <Bot className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('loginTitle')}</h1>
          <p className="text-text/60 mt-2">{t('loginSubtitle')}</p>
        </div>

        <div className="glass-card p-8 bg-white shadow-xl border-white/50">
          {error && <p className="bg-rose-50 text-rose-500 p-3 rounded-xl text-sm mb-6 font-medium">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">{t('emailAddress')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30" />
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-text/70">{t('themeAppearance') === 'Theme' ? 'Password' : (t('themeAppearance').includes('ظهر') ? 'كلمة السر' : 'Mot de passe')}</label>
                <a href="#" className="text-xs font-medium text-accent2 hover:underline">{t('forgotPassword')}</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30" />
                <input 
                  type="password" 
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-bold shadow-lg shadow-accent2/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('signIn')}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-text/10 w-full" />
              <span className="absolute bg-white px-4 text-xs font-medium text-text/40 uppercase">{t('orContinueWith')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-text/10 rounded-xl hover:bg-secondary transition-all font-medium text-text/70">
                <Layout className="w-5 h-5" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-text/10 rounded-xl hover:bg-secondary transition-all font-medium text-text/70">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> Google
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-text/60">
          {t('noAccount')} <Link href="/register" className="text-accent2 font-bold hover:underline">{t('signUpFree')}</Link>
        </p>
      </div>
    </div>
  )
}
