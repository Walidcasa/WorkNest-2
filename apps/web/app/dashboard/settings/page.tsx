'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Shield, Palette, Globe, Save, Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@clarity.com',
    currency: 'USD',
    notifications: true,
    weeklyReport: true,
    twoFactor: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) return null

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-text">{t('settings')}</h1>
        <p className="text-text/60 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="glass-card bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent2/10 rounded-xl"><User className="w-5 h-5 text-accent2" /></div>
          <h2 className="text-lg font-bold font-outfit">{t('profile')}</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text/60 mb-2">{t('fullName')}</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text/60 mb-2">{t('emailAddress')}</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Global Preferences */}
      <div className="glass-card bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent3/10 rounded-xl"><Globe className="w-5 h-5 text-accent3" /></div>
          <h2 className="text-lg font-bold font-outfit">{t('globalPreferences')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text/60 mb-2">{t('language')}</label>
            <select
              value={lang}
              onChange={e => setLang(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm appearance-none"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-text/60 mb-2">{t('currency')}</label>
            <select
              value={form.currency}
              onChange={e => setForm({ ...form, currency: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm appearance-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MAD">MAD (DH)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-text/5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-text text-sm">{t('themeAppearance')}</p>
            <p className="text-xs text-text/40 mt-0.5">Toggle between light and dark mode</p>
          </div>
          <div className="flex bg-secondary/50 rounded-xl p-1">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-lg flex items-center gap-2 transition-all ${theme === 'light' ? 'bg-white shadow-sm text-accent2' : 'text-text/60 hover:text-text'}`}
            >
              <Sun className="w-4 h-4" /> <span className="text-xs font-bold">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-lg flex items-center gap-2 transition-all ${theme === 'dark' ? 'bg-white shadow-sm text-accent2' : 'text-text/60 hover:text-text'}`}
            >
              <Moon className="w-4 h-4" /> <span className="text-xs font-bold">Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent1/10 rounded-xl"><Bell className="w-5 h-5 text-accent1" /></div>
          <h2 className="text-lg font-bold font-outfit">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'notifications', label: 'Push Notifications', desc: 'Get alerts for important activity' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly business summary' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-text/5">
              <div>
                <p className="font-semibold text-text text-sm">{item.label}</p>
                <p className="text-xs text-text/40 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => setForm({ ...form, [item.key]: !form[item.key as keyof typeof form] })}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  form[item.key as keyof typeof form] ? 'bg-accent2' : 'bg-text/10'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  form[item.key as keyof typeof form] ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-8 py-3 flex items-center gap-2 font-bold rounded-xl shadow-lg shadow-accent2/20"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? '✓ Saved!' : saving ? 'Saving...' : t('saveChanges')}
        </button>
      </div>
    </div>
  )
}
