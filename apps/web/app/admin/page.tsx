'use client'

import { useEffect, useState, useRef } from 'react'
import { apiRequest } from '@/lib/api-client'
import { Users, DollarSign, TrendingUp, Globe, Loader2, UserCheck, ChevronDown, MessageSquare, AlertTriangle, CheckCircle2, Clock, Send, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

const ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN']
const PLANS = ['FREE_TRIAL', 'MONTHLY', 'YEARLY', 'EXPIRED']

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [sendingReply, setSendingReply] = useState<string | null>(null)
  const bottomRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData, ticketsData] = await Promise.all([
          apiRequest('/admin/stats'),
          apiRequest('/admin/users'),
          apiRequest('/support/admin'),
        ])
        setStats(statsData)
        setUsers(usersData)
        setTickets(Array.isArray(ticketsData) ? ticketsData : [])
      } catch (err) {
        console.error('Failed to fetch admin data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (expandedTicket && bottomRefs.current[expandedTicket]) {
      bottomRefs.current[expandedTicket]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [expandedTicket, tickets])

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      await apiRequest(`/support/admin/${ticketId}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t))
    } catch (e) { console.error(e) }
  }

  const sendReply = async (ticketId: string) => {
    const msg = replyText[ticketId]?.trim()
    if (!msg) return
    setSendingReply(ticketId)
    try {
      const newMsg = await apiRequest(`/support/admin/${ticketId}/reply`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
      })
      setTickets(prev => prev.map(t =>
        t.id === ticketId
          ? { ...t, messages: [...(t.messages || []), newMsg], status: t.status === 'OPEN' ? 'IN_PROGRESS' : t.status }
          : t
      ))
      setReplyText(prev => ({ ...prev, [ticketId]: '' }))
    } catch (e) { console.error(e) }
    setSendingReply(null)
  }

  const updateUser = async (userId: string, patch: { role?: string; plan?: string; suspended?: boolean }) => {
    setUpdating(userId)
    try {
      const updated = await apiRequest(`/admin/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updated } : u))
    } catch (e) {
      console.error(e)
    }
    setUpdating(null)
    setOpenMenu(null)
  }

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  const cards = [
    { name: t('totalUsers'), value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: t('premiumUsers'), value: stats.premiumUsers, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { name: t('totalRevenue'), value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: t('conversionRate'), value: `${stats.conversionRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{card.name}</p>
                <h3 className="text-3xl font-black font-outfit mt-2">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">User Management</h3>
            <p className="text-xs text-gray-400 mt-1">Change roles, plans, or suspend accounts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-black">User</th>
                  <th className="px-6 py-4 font-black">Role</th>
                  <th className="px-6 py-4 font-black">Plan</th>
                  <th className="px-6 py-4 font-black">Status</th>
                  <th className="px-6 py-4 font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {users.map((user) => {
                  const isSuspended = user.emailVerified === false
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-600' :
                          user.role === 'ADMIN' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          user.plan === 'YEARLY' ? 'bg-green-100 text-green-600' :
                          user.plan === 'MONTHLY' ? 'bg-blue-100 text-blue-600' :
                          user.plan === 'EXPIRED' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}>{user.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${isSuspended ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {isSuspended ? 'Suspended' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 relative">
                        {updating === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-accent2" />
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg text-xs font-bold hover:bg-accent2/10 transition-colors"
                            >
                              Manage <ChevronDown className="w-3 h-3" />
                            </button>
                            {openMenu === user.id && (
                              <div className="absolute right-0 top-8 z-50 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                                <div className="p-2">
                                  <p className="text-[10px] font-black text-gray-400 uppercase px-2 py-1">Change Role</p>
                                  {ROLES.map(r => (
                                    <button key={r} onClick={() => updateUser(user.id, { role: r })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${user.role === r ? 'bg-accent2/10 text-accent2' : 'hover:bg-gray-50 text-gray-700'}`}>
                                      {r}
                                    </button>
                                  ))}
                                  <p className="text-[10px] font-black text-gray-400 uppercase px-2 py-1 mt-2">Change Plan</p>
                                  {PLANS.map(p => (
                                    <button key={p} onClick={() => updateUser(user.id, { plan: p })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${user.plan === p ? 'bg-accent2/10 text-accent2' : 'hover:bg-gray-50 text-gray-700'}`}>
                                      {p}
                                    </button>
                                  ))}
                                  <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button onClick={() => updateUser(user.id, { suspended: !isSuspended })}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-colors ${isSuspended ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}>
                                      {isSuspended ? '✓ Activate Account' : '⊘ Suspend Account'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geo */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">{t('geoDistribution')}</h3>
          </div>
          <div className="p-6 space-y-6">
            {stats.usersByCountry.map((item: any) => (
              <div key={item.countryCode} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-700">{item.countryCode || 'Unknown'}</span>
                  </div>
                  <span className="font-black text-accent2">{item._count} users</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-accent2 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(item._count / stats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent2/10 rounded-xl">
              <MessageSquare className="w-5 h-5 text-accent2" />
            </div>
            <div>
              <h3 className="text-lg font-black font-outfit uppercase tracking-tight">Support Tickets</h3>
              <p className="text-xs text-gray-400 mt-0.5">{tickets.filter(t => t.status === 'OPEN').length} open tickets</p>
            </div>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-bold text-sm">No support tickets yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {tickets.map((ticket) => {
              const isExpanded = expandedTicket === ticket.id
              const messages = ticket.messages || []
              return (
                <div key={ticket.id} className="transition-colors">
                  {/* Ticket header row */}
                  <div
                    className="p-6 flex items-start justify-between gap-4 hover:bg-gray-50/50 cursor-pointer"
                    onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        ticket.severity === 'HIGH' ? 'bg-red-100' :
                        ticket.severity === 'MEDIUM' ? 'bg-amber-100' : 'bg-gray-100'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 ${
                          ticket.severity === 'HIGH' ? 'text-red-500' :
                          ticket.severity === 'MEDIUM' ? 'text-amber-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-sm text-gray-900 truncate">{ticket.subject}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${
                            ticket.severity === 'HIGH' ? 'bg-red-100 text-red-600' :
                            ticket.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'
                          }`}>{ticket.severity}</span>
                          {messages.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-accent2/10 text-accent2 shrink-0">
                              {messages.length} msg
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{ticket.description}</p>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                          <span>{ticket.user?.name} · {ticket.user?.email}</span>
                          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-600' :
                        ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>{ticket.status}</span>
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        {ticket.status !== 'IN_PROGRESS' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                            title="Mark In Progress"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        {ticket.status !== 'RESOLVED' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'RESOLVED')}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                            title="Mark Resolved"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>

                  {/* Chat thread */}
                  {isExpanded && (
                    <div className="border-t border-gray-50 bg-gray-50/30">
                      {/* Original description */}
                      <div className="px-6 pt-4 pb-2">
                        <div className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-600 shrink-0">
                            {ticket.user?.name?.[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 mb-1">{ticket.user?.name} · {new Date(ticket.createdAt).toLocaleString()}</p>
                            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 border border-gray-100">
                              {ticket.description}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      {messages.map((msg: any) => (
                        <div key={msg.id} className={`px-6 py-2 flex gap-3 ${msg.isAdmin ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            msg.isAdmin ? 'bg-accent2 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {msg.sender?.name?.[0]?.toUpperCase()}
                          </div>
                          <div className={`flex-1 ${msg.isAdmin ? 'items-end' : 'items-start'} flex flex-col`}>
                            <p className="text-[10px] font-black text-gray-400 mb-1">
                              {msg.isAdmin ? 'You (Admin)' : msg.sender?.name} · {new Date(msg.createdAt).toLocaleString()}
                            </p>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                              msg.isAdmin
                                ? 'bg-accent2 text-white rounded-tr-sm'
                                : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                            }`}>
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div ref={el => { bottomRefs.current[ticket.id] = el }} />

                      {/* Reply input */}
                      <div className="px-6 py-4">
                        <div className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-accent2 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-1">
                            A
                          </div>
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={replyText[ticket.id] || ''}
                              onChange={e => setReplyText(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                              onKeyDown={e => e.key === 'Enter' && sendReply(ticket.id)}
                              placeholder="Write a reply..."
                              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent2/20"
                            />
                            <button
                              onClick={() => sendReply(ticket.id)}
                              disabled={sendingReply === ticket.id || !replyText[ticket.id]?.trim()}
                              className="px-4 py-2.5 bg-accent2 text-white rounded-xl hover:bg-accent2/90 transition-colors disabled:opacity-40 flex items-center gap-2"
                            >
                              {sendingReply === ticket.id
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Send className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Close menu on outside click */}
      {openMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  )
}
