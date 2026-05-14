'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'

interface AddActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddActivityModal({ isOpen, onClose, onSuccess }: AddActivityModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: '',
    level: 'PRODUCTIVE',
    duration: '30',
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          duration: parseInt(form.duration)
        })
      })
      onSuccess()
      onClose()
      setForm({ name: '', category: '', level: 'PRODUCTIVE', duration: '30' })
    } catch (err) {
      console.error(err)
      alert('Failed to log activity')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-text/5">
          <h2 className="text-xl font-black font-outfit uppercase tracking-tight">Log Activity</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">Activity Level</label>
            <div className="flex bg-secondary/50 p-1 rounded-xl gap-1">
              {['PRODUCTIVE', 'NEUTRAL', 'WASTE'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm({ ...form, level })}
                  className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${
                    form.level === level && level === 'PRODUCTIVE' ? 'bg-success text-white shadow-md' : 
                    form.level === level && level === 'WASTE' ? 'bg-danger text-white shadow-md' :
                    form.level === level && level === 'NEUTRAL' ? 'bg-text text-white shadow-md' :
                    'text-text/60 hover:text-text'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">What did you do?</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Client Meeting, Scrolling Twitter"
              className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-[2]">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">Category</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Work, Break"
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-black text-text/50 mb-2 uppercase tracking-widest">Minutes</label>
              <input
                type="number"
                required
                min="1"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-accent2/20 font-bold"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 font-black uppercase tracking-widest flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log Time'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
