'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Globe, Save, Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslation } from '@/components/providers/i18n-provider'
import { apiRequest } from '@/lib/api-client'

const AVATARS = [
  '🧑','👨','👩','🧔','👱','🧑‍💼','👨‍💼','👩‍💼','🧑‍🎨','👨‍🎨',
  '👩‍🎨','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍💻','👨‍💻','👩‍💻','🧑‍🚀','👨‍🚀','👩‍🚀',
  '🦊','🐺','🦁','🐯','🐻','🐼','🦝','🦄','🐸','🐲',
  '🎭','👾','🤖','👑','💎','🔥','⚡','🌟','🎯','🚀',
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    currency: 'USD',
    notifications: true,
    weeklyReport: true,
  })

  useEffect(() => {
    setMounted(true)
    const stored = typeof window !== 'undefined' ? localStorage.getItem('nexus_user') : null
    if (stored) {
      try {
        const user = JSON.parse(stored)
        setForm(f => ({ ...f, name: user.name || '', email: user.email || '', currency: user.currency || 'USD' }))
        setSelectedAvatar(user.avatar || '')
      } catch {}
    }
    apiRequest('/users/me').then((user: any) => {
      setForm(f => ({ ...f, name: user.name || '', email: user.email || '', currency: user.currency || 'USD' }))
      const stored2 = localStorage.getItem('nexus_user')
      const existing = stored2 ? JSON.parse(stored2) : {}
      localStorage.setItem('nexus_user', JSON.stringify({ ...existing, ...user }))
    }).catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await apiRequest('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: form.name, currency: form.currency, language: lang }),
      })
      const stored = localStorage.getItem('nexus_user')
      const existing = stored ? JSON.parse(stored) : {}
      const next = { ...existing, ...updated, avatar: selectedAvatar }
      localStorage.setItem('nexus_user', JSON.stringify(next))
      window.dispatchEvent(new Event('nexus_avatar_changed'))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {}
    setSaving(false)
  }

  if (!mounted) return null

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-text">{t('settings')}</h1>
        <p className="text-text/60 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Avatar Picker */}
      <div className="glass-card bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent2/10 rounded-xl"><User className="w-5 h-5 text-accent2" /></div>
          <h2 className="text-lg font-bold font-outfit">{t('profile')}</h2>
        </div>

        {/* Avatar preview + grid */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text/60 mb-3">Avatar</label>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-accent2/10 flex items-center justify-center text-3xl border-2 border-accent2/30">
              {selectedAvatar || <span className="text-accent2 text-xl font-black">{form.name ? form.name.charAt(0).toUpperCase() : '?'}</span>}
            </div>
            <p className="text-xs text-text/40">Choisi ton avatar</p>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedAvatar(emoji)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all hover:scale-110 ${
                  selectedAvatar === emoji
                    ? 'bg-accent2/20 ring-2 ring-accent2 scale-110'
                    : 'bg-secondary/40 hover:bg-secondary'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {selectedAvatar && (
            <button onClick={() => setSelectedAvatar('')} className="mt-2 text-xs text-text/40 hover:text-danger transition-colors">
              Remove avatar
            </button>
          )}
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
              disabled
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent text-sm opacity-50 cursor-not-allowed"
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
                className={`w-12 h-6 rounded-full transition-all relative ${form[item.key as keyof typeof form] ? 'bg-accent2' : 'bg-text/10'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form[item.key as keyof typeof form] ? 'left-7' : 'left-1'}`} />
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
