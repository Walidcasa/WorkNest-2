'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { dashboardApi } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddEmployeeModal({ isOpen, onClose, onSuccess }: AddEmployeeModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    position: '',
    salary: '',
    status: 'PENDING',
    avatar: '',
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dashboardApi.addEmployee({
        ...form,
        salary: parseFloat(form.salary),
        avatar: form.avatar || form.name.charAt(0).toUpperCase()
      })
      onSuccess()
      onClose()
      setForm({ name: '', position: '', salary: '', status: 'PENDING', avatar: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-text/5">
          <h2 className="text-xl font-bold font-outfit uppercase tracking-tight">{t('newEmployee')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('fullName')}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Michael Scott"
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('position')}</label>
            <input
              type="text"
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="e.g. Regional Manager"
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('salary')}</label>
            <input
              type="number"
              step="0.01"
              required
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              placeholder="e.g. 5000"
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text/50 mb-2 uppercase tracking-widest">{t('status')}</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            >
              <option value="PENDING">{t('delayed') || 'Pending'}</option>
              <option value="PAID">{t('completed')}</option>
              <option value="UPCOMING">{t('inProgress')}</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 font-bold uppercase tracking-widest flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('addEmployee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
