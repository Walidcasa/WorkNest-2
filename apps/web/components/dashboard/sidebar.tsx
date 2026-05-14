'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Wallet, 
  Clock, 
  Zap, 
  Sparkles, 
  Settings, 
  CreditCard,
  LogOut,
  Target,
  LineChart,
  Package,
  Users,
  Folder
} from 'lucide-react'
import { clsx } from 'clsx'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/components/providers/i18n-provider'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('worknest_token')
    localStorage.removeItem('worknest_user')
    router.push('/login')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('clients'), href: '/dashboard/clients', icon: Users },
    { name: t('employees'), href: '/dashboard/employees', icon: Users },
    { name: t('projects'), href: '/dashboard/projects', icon: Folder },
    { name: t('finances'), href: '/dashboard/finances', icon: Wallet },
    { name: t('time'), href: '/dashboard/time', icon: Clock },
    { name: t('inventory'), href: '/dashboard/inventory', icon: Package },
    { name: t('goals'), href: '/dashboard/goals', icon: Target },
    { name: t('reports'), href: '/dashboard/cash-flow', icon: LineChart },
    { name: t('aiInsights'), href: '/dashboard/ai-insights', icon: Sparkles },
  ]

  const secondaryNavigation = [
    { name: t('billing'), href: '/dashboard/billing', icon: CreditCard },
    { name: t('settings'), href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-text/5 bg-white dark:bg-secondary/10 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center gap-2">
        <div className="w-8 h-8 bg-accent2 rounded-lg flex items-center justify-center shadow-lg shadow-accent2/20">
          <Zap className="text-white w-5 h-5 fill-current" />
        </div>
        <span className="text-xl font-bold font-outfit text-text tracking-tight uppercase">Clarity</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      pathname === item.href
                        ? 'bg-secondary text-accent2'
                        : 'text-text/60 hover:text-accent2 hover:bg-secondary/50',
                      'group flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold transition-all'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-text/40 uppercase tracking-wider">{t('configuration')}</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      pathname === item.href
                        ? 'bg-secondary text-accent2'
                        : 'text-text/60 hover:text-accent2 hover:bg-secondary/50',
                      'group flex gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold transition-all'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto space-y-2">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="group -mx-2 flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold leading-6 text-text/60 hover:text-accent2 hover:bg-secondary/50 w-full transition-all"
              >
                {theme === 'dark' ? (
                  <Sparkles className="h-6 w-6 shrink-0" aria-hidden="true" />
                ) : (
                  <Sparkles className="h-6 w-6 shrink-0" aria-hidden="true" />
                )}
                {t('toggleTheme')}
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="group -mx-2 flex gap-x-3 rounded-xl p-2 text-sm font-semibold leading-6 text-danger hover:bg-danger/5 w-full transition-all"
            >
              <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
              {t('signOut')}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
