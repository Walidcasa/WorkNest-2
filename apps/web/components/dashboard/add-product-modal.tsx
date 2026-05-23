'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { useTranslation } from '@/components/providers/i18n-provider'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    supplier: '',
    lowStockAt: '5',
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          purchasePrice: parseFloat(form.purchasePrice),
          sellingPrice: parseFloat(form.sellingPrice),
          stock: parseInt(form.stock),
          lowStockAt: parseInt(form.lowStockAt),
        })
      })
      onSuccess()
      onClose()
      setForm({ name: '', purchasePrice: '', sellingPrice: '', stock: '', supplier: '', lowStockAt: '5' })
    } catch (err) {
      console.error(err)
      alert('Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-text/5">
          <h2 className="text-xl font-black font-outfit uppercase tracking-tight">{t('newProduct')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('productName')}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('placeholderProduct')}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('buyPrice')}</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.purchasePrice}
                onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('sellPrice')}</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.sellingPrice}
                onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('initialStock')}</label>
              <input
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('lowAlertAt')}</label>
              <input
                type="number"
                required
                min="0"
                value={form.lowStockAt}
                onChange={(e) => setForm({ ...form, lowStockAt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">{t('supplier')}</label>
            <input
              type="text"
              value={form.supplier}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              placeholder={t('placeholderSupplier')}
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 font-black uppercase tracking-widest flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('saveProduct')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
