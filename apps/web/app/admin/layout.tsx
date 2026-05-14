'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api-client'
import { Loader2, ShieldCheck } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // We'll use a specific endpoint that only admins can access
        await apiRequest('/admin/stats')
        setAuthorized(true)
      } catch (err) {
        console.error('Not authorized as admin', err)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    checkAdmin()
  }, [router])

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-accent2 animate-spin mx-auto" />
        <p className="mt-4 font-bold text-text/60">Securing Admin Session...</p>
      </div>
    </div>
  )

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent1 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black font-outfit uppercase tracking-tight">Super Admin Panel</h1>
        </div>
        <button 
          onClick={() => router.push('/dashboard')}
          className="text-sm font-bold text-text/60 hover:text-text"
        >
          Back to App
        </button>
      </header>
      <main className="p-8">
        {children}
      </main>
    </div>
  )
}
