'use client'

import { useState, useEffect } from 'react'
import { X, MessageSquare, Send, Loader2, CheckCircle2, AlertTriangle, Clock } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'
import { apiRequest } from '@/lib/api-client'

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'new' | 'tickets'>('new')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tickets, setTickets] = useState<any[]>([])
  const [ticketsLoading, setTicketsLoading] = useState(false)
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [sendingReply, setSendingReply] = useState<string | null>(null)
  const [formData, setFormData] = useState({ subject: '', description: '', severity: 'MEDIUM' })

  useEffect(() => {
    if (isOpen && tab === 'tickets') {
      loadTickets()
    }
  }, [isOpen, tab])

  if (!isOpen) return null

  const loadTickets = async () => {
    setTicketsLoading(true)
    try {
      const data = await apiRequest('/support/my')
      setTickets(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
    setTicketsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/support', { method: 'POST', body: JSON.stringify(formData) })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setFormData({ subject: '', description: '', severity: 'MEDIUM' })
        setTab('tickets')
        loadTickets()
      }, 2000)
    } catch (err) {
      console.error('Support report failed', err)
    } finally {
      setLoading(false)
    }
  }

  const sendReply = async (ticketId: string) => {
    const msg = replyText[ticketId]?.trim()
    if (!msg) return
    setSendingReply(ticketId)
    try {
      const newMsg = await apiRequest(`/support/${ticketId}/reply`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
      })
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, messages: [...(t.messages || []), newMsg] } : t
      ))
      setReplyText(prev => ({ ...prev, [ticketId]: '' }))
    } catch (e) { console.error(e) }
    setSendingReply(null)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-text/5 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-text/5 flex justify-between items-center bg-secondary/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent2/10 rounded-xl text-accent2">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black font-outfit text-text uppercase tracking-tight">Support</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="w-5 h-5 text-text/40" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 shrink-0">
          <button
            onClick={() => setTab('new')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${tab === 'new' ? 'text-accent2 border-b-2 border-accent2' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {t('reportIssue')}
          </button>
          <button
            onClick={() => setTab('tickets')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${tab === 'tickets' ? 'text-accent2 border-b-2 border-accent2' : 'text-gray-400 hover:text-gray-600'}`}
          >
            My Tickets
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {tab === 'new' && (
            success ? (
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
            )
          )}

          {tab === 'tickets' && (
            <div className="divide-y divide-gray-50">
              {ticketsLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-accent2" />
                </div>
              ) : tickets.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-bold text-sm">No tickets yet</p>
                </div>
              ) : (
                tickets.map(ticket => {
                  const isExpanded = expandedTicket === ticket.id
                  const messages = ticket.messages || []
                  const hasAdminReply = messages.some((m: any) => m.isAdmin)
                  return (
                    <div key={ticket.id}>
                      <div
                        className="p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                        onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            ticket.severity === 'HIGH' ? 'bg-red-100' :
                            ticket.severity === 'MEDIUM' ? 'bg-amber-100' : 'bg-gray-100'
                          }`}>
                            <AlertTriangle className={`w-3.5 h-3.5 ${
                              ticket.severity === 'HIGH' ? 'text-red-500' :
                              ticket.severity === 'MEDIUM' ? 'text-amber-500' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-black text-sm text-gray-900 truncate">{ticket.subject}</p>
                              {hasAdminReply && (
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-accent2/10 text-accent2 shrink-0">Reply</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                              <span className={`px-2 py-0.5 rounded-full font-black uppercase ${
                                ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-600' :
                                ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                              }`}>{ticket.status}</span>
                              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                              {messages.length > 0 && <span>{messages.length} messages</span>}
                            </div>
                          </div>
                          {ticket.status === 'RESOLVED'
                            ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            : <Clock className="w-4 h-4 text-gray-300 shrink-0" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="bg-gray-50/50 border-t border-gray-100">
                          {/* Original message */}
                          <div className="px-4 pt-3 pb-2">
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-black text-gray-500 shrink-0">U</div>
                              <div className="flex-1">
                                <p className="text-[9px] text-gray-400 font-semibold mb-1">You · {new Date(ticket.createdAt).toLocaleString()}</p>
                                <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 text-xs text-gray-700 border border-gray-100">
                                  {ticket.description}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Messages */}
                          {messages.map((msg: any) => (
                            <div key={msg.id} className={`px-4 py-2 flex gap-2 ${msg.isAdmin ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                                msg.isAdmin ? 'bg-accent2 text-white' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {msg.isAdmin ? 'A' : 'U'}
                              </div>
                              <div className={`flex-1 flex flex-col ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                                <p className="text-[9px] text-gray-400 font-semibold mb-1">
                                  {msg.isAdmin ? 'Support Team' : 'You'} · {new Date(msg.createdAt).toLocaleString()}
                                </p>
                                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                                  msg.isAdmin
                                    ? 'bg-accent2 text-white rounded-tr-sm'
                                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                                }`}>
                                  {msg.message}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* User reply input (only if not resolved) */}
                          {ticket.status !== 'RESOLVED' && (
                            <div className="px-4 py-3 flex gap-2">
                              <input
                                type="text"
                                value={replyText[ticket.id] || ''}
                                onChange={e => setReplyText(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && sendReply(ticket.id)}
                                placeholder="Add a message..."
                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent2/20"
                              />
                              <button
                                onClick={() => sendReply(ticket.id)}
                                disabled={sendingReply === ticket.id || !replyText[ticket.id]?.trim()}
                                className="px-3 py-2 bg-accent2 text-white rounded-xl hover:bg-accent2/90 transition-colors disabled:opacity-40"
                              >
                                {sendingReply === ticket.id
                                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  : <Send className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
