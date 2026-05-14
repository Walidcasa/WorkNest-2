'use client'

import { useEffect, useState } from 'react'
import { Plus, UserPlus, Phone, Mail, ExternalLink, MoreHorizontal, Loader2 } from 'lucide-react'
import { apiRequest, dashboardApi } from '@/lib/api-client'
import { AddClientModal } from '@/components/dashboard/add-client-modal'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function ClientsPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<any[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getClients()
      setClients(data)
    } catch (err) {
      console.error('Failed to fetch clients', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalCollected = clients.reduce((acc, curr) => acc + (curr.totalPaid || 0), 0)
  const totalOutstanding = clients.reduce((acc, curr) => acc + (curr.remainingBalance || 0), 0)

  if (loading && clients.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('clients')}</h1>
          <p className="text-text/60">{t('manageRelationships')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-4 py-2">
          <Plus className="w-4 h-4" /> {t('addClient')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-white border-l-4 border-l-accent2">
          <p className="text-sm font-medium text-text/60">{t('totalActiveClients')}</p>
          <h3 className="text-2xl font-bold font-outfit mt-1">{clients.filter(c => c.status === 'Active').length}</h3>
        </div>
        <div className="glass-card p-6 bg-white border-l-4 border-l-success">
          <p className="text-sm font-medium text-text/60">{t('totalRevenueCollected')}</p>
          <h3 className="text-2xl font-bold font-outfit mt-1">${totalCollected.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 bg-white border-l-4 border-l-warning">
          <p className="text-sm font-medium text-text/60">{t('outstandingBalance')}</p>
          <h3 className="text-2xl font-bold font-outfit mt-1">${totalOutstanding.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="glass-card p-6 bg-white hover:shadow-xl transition-shadow border-white/50">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-text/40" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-text">{client.name}</h3>
                  <p className="text-sm text-text/40">{client.contact}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                client.status === 'Active' ? 'bg-success/10 text-success' : 
                client.status === 'New' ? 'bg-accent1/10 text-accent1' : 'bg-warning/10 text-warning'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-text/60">
                <Mail className="w-4 h-4" /> {client.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-text/60">
                <Phone className="w-4 h-4" /> +1 (555) 000-0000
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <div>
                <p className="text-[10px] font-bold text-text/40 uppercase">{t('totalPaid')}</p>
                <p className="font-bold text-success">${client.totalPaid.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-text/40 uppercase">{t('balance')}</p>
                <p className={`font-bold ${client.remainingBalance > 0 ? 'text-danger' : 'text-text/60'}`}>
                  ${client.remainingBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 rounded-lg border border-text/10 text-sm font-bold text-text/60 hover:bg-secondary transition-all flex items-center justify-center gap-2">
                {t('viewProjects')} <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg border border-text/10 text-text/40 hover:bg-secondary transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}
