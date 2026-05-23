'use client'

import { useState } from 'react'
import { X, MessageSquare, ShieldAlert, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'
import { apiRequest } from '@/lib/api-client'

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    severity: 'MEDIUM'
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/support', { method: 'POST', body: JSON.stringify(formData) })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        setFormData({ subject: '', description: '', severity: 'MEDIUM' })
      }, 3000)
    } catch (err) {
      console.error('Support report failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-text/5">
        <div className="p-6 border-b border-text/5 flex justify-between items-center bg-secondary/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent2/10 rounded-xl text-accent2">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black font-outfit text-text uppercase tracking-tight">{t('reportIssue')}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="w-5 h-5 text-text/40" />
          </button>
        </div>

        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-xl font-bold text-text">{t('reportSuccess')}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-text/40 uppercase tracking-widest">{t('subject')}</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Dashboard not loading"
                className="w-full px-4 py-3 bg-secondary/30 rounded-xl border border-text/5 focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm font-bold"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-text/40 uppercase tracking-widest">{t('severity')}</label>
              <div className="grid grid-cols-3 gap-3">
                {['LOW', 'MEDIUM', 'HIGH'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, severity: s })}
                    className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      formData.severity === s 
                        ? 'bg-accent2 text-white border-accent2' 
                        : 'bg-secondary/30 text-text/40 border-text/5 hover:border-text/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-text/40 uppercase tracking-widest">Description</label>
              <textarea 
                required
                rows={4}
                placeholder={t('issueDescription')}
                className="w-full px-4 py-3 bg-secondary/30 rounded-xl border border-text/5 focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm font-bold resize-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-accent2/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              <span className="font-black uppercase tracking-widest">{t('submitReport')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
