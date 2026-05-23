'use client'

import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { dashboardApi } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddProjectModal({ isOpen, onClose, onSuccess }: AddProjectModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'TODO',
    progress: '0',
    deadline: '',
    clientId: '',
  })

  useEffect(() => {
    if (isOpen) {
      dashboardApi.getClients().then(setClients).catch(console.error)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dashboardApi.addProject({
        ...form,
        progress: parseInt(form.progress),
        clientId: form.clientId ? parseInt(form.clientId) : undefined
      })
      onSuccess()
      onClose()
      setForm({ title: '', description: '', status: 'TODO', progress: '0', deadline: '', clientId: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to add project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-text/5">
          <h2 className="text-xl font-bold font-outfit uppercase tracking-tight">{t('newProject')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('projectTitle')}</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={t('placeholderProject')}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('description')}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t('manageTasks')}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('status')}</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              >
                <option value="TODO">{t('todo') || 'To Do'}</option>
                <option value="IN_PROGRESS">{t('inProgress')}</option>
                <option value="DONE">{t('completed')}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('progress')} (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('date')}</label>
              <input
                type="text"
                placeholder={t('placeholderDeadline')}
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('clients')}</label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              >
                <option value="">{t('internalProject')}</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 font-bold uppercase tracking-widest flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('createProject')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
