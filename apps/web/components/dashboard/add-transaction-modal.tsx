'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { dashboardApi } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddTransactionModal({ isOpen, onClose, onSuccess }: AddTransactionModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: 'REVENUE',
    amount: '',
    category: '',
    label: '',
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dashboardApi.addTransaction({
        ...form,
        amount: parseFloat(form.amount)
      })
      onSuccess()
      onClose()
      setForm({ type: 'REVENUE', amount: '', category: '', label: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to add transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-text/5">
          <h2 className="text-xl font-bold font-outfit">{t('addTransactionTitle')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex bg-secondary/50 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'REVENUE' })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                form.type === 'REVENUE' ? 'bg-success text-white shadow-md' : 'text-text/60 hover:text-text'
              }`}
            >
              {t('income')}
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'EXPENSE' })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                form.type === 'EXPENSE' ? 'bg-danger text-white shadow-md' : 'text-text/60 hover:text-text'
              }`}
            >
              {t('expenses')}
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text/70 mb-2">{t('amount')}</label>
            <input
              type="number"
              step="0.01"
              required
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text/70 mb-2">{t('category')}</label>
            <input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder={t('placeholderCategory')}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text/70 mb-2">{t('description')}</label>
            <input
              type="text"
              required
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder={t('description')}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 font-bold flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('saveTransaction')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
