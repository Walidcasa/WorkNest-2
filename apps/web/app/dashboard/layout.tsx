'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Bell, Search, Menu, X, HelpCircle, Loader2 } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'
import { SupportModal } from '@/components/dashboard/support-modal'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('worknest_token')
    if (!token) {
      router.replace('/login')
      return
    }
    const stored = localStorage.getItem('worknest_user')
    if (stored) {
      try {
        const u = JSON.parse(stored)
        setUserName(u.name || '')
        setUserAvatar(u.avatar || '')
      } catch {}
    }
    setAuthChecked(true)
    const onAvatarChange = () => {
      const s = localStorage.getItem('worknest_user')
      if (s) { try { setUserAvatar(JSON.parse(s).avatar || '') } catch {} }
    }
    window.addEventListener('worknest_avatar_changed', onAvatarChange)
    return () => window.removeEventListener('worknest_avatar_changed', onAvatarChange)
  }, [router])

  if (!authChecked) return (
    <div className="h-screen flex items-center justify-center bg-secondary/30">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-text/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="relative flex flex-col h-full bg-white shadow-2xl lg:shadow-none">
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-4 p-2 text-text/40 hover:text-text lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-text/5 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-text lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">{t('dashboard')}</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">{t('search')}</label>
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-text/40" aria-hidden="true" />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-text placeholder:text-text/40 focus:ring-0 sm:text-sm bg-transparent"
                placeholder={t('search') + '...'}
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-text/40 hover:text-text">
                <span className="sr-only">{t('notifications')}</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-text/10" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-accent2/20 flex items-center justify-center text-lg font-black select-none overflow-hidden">
                  {userAvatar ? (
                    <span>{userAvatar}</span>
                  ) : (
                    <span className="text-accent2 text-sm">{userName ? userName.charAt(0).toUpperCase() : '?'}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-text hidden sm:inline">{userName}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="py-10 flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Floating Support Button */}
        <button 
          onClick={() => setIsSupportOpen(true)}
          className="fixed bottom-8 right-8 z-[60] p-4 bg-accent2 text-white rounded-2xl shadow-2xl shadow-accent2/40 hover:scale-110 active:scale-95 transition-all group"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-text text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {t('support')}
          </span>
        </button>

        <SupportModal 
          isOpen={isSupportOpen} 
          onClose={() => setIsSupportOpen(false)} 
        />
      </div>
    </div>
  )
}
