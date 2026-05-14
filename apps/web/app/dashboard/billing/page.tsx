'use client'

import { useEffect, useState } from 'react'
import { Check, CreditCard, Zap, Loader2 } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'

export default function BillingPage() {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<any>(null)
  const [plans, setPlans] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, statusData] = await Promise.all([
          apiRequest('/subscriptions/plans'),
          apiRequest('/subscriptions/status')
        ])
        setPlans(plansData)
        setStatus(statusData)
      } catch (err) {
        console.error('Failed to fetch billing data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  const handleCheckout = async (planId: string) => {
    try {
      const response = await apiRequest('/subscriptions/checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId: planId })
      })
      if (response.url) {
        window.location.href = response.url
      }
    } catch (err) {
      console.error('Checkout failed', err)
      alert('Failed to initiate checkout. Please try again.')
    }
  }

  const uiPlans = [
    { 
      id: 'free',
      name: 'Free Trial', 
      price: '0', 
      period: '7 days', 
      features: ['All core modules', 'AI basic insights', 'Limited projects'],
      isCurrent: status?.plan === 'FREE_TRIAL'
    },
    ...plans.map(p => ({
      ...p,
      period: p.interval === 'month' ? 'month' : 'year',
      isCurrent: status?.plan === p.id.toUpperCase()
    }))
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6 lg:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-black font-outfit text-text uppercase tracking-tight">Subscription & Billing</h1>
        <p className="text-text/60 mt-2">Manage your plan and view your payment history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {uiPlans.map((plan) => (
          <div key={plan.name} className={`glass-card p-8 bg-white flex flex-col relative ${
            plan.id === 'monthly' ? 'border-2 border-accent2 shadow-xl shadow-accent2/10' : 'border-white/50'
          }`}>
            {plan.id === 'monthly' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent2 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-black font-outfit text-text uppercase tracking-tight">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-4xl font-black font-outfit text-text">${plan.price}</span>
              <span className="text-text/40 text-xs font-bold uppercase">/{plan.period}</span>
            </div>
            
            <ul className="mt-8 space-y-4 flex-1">
              {plan.features.map((feat: string) => (
                <li key={feat} className="flex items-start gap-3 text-sm font-bold text-text/70">
                  <Check className="w-5 h-5 text-success shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => !plan.isCurrent && plan.id !== 'free' && handleCheckout(plan.id)}
              disabled={plan.isCurrent || plan.id === 'free'}
              className={`mt-10 py-4 rounded-xl font-black uppercase tracking-widest transition-all text-xs ${
                plan.isCurrent 
                  ? 'bg-secondary text-text/40 cursor-default' 
                  : 'btn-primary shadow-lg shadow-accent2/20 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {plan.isCurrent ? (plan.id === 'free' ? `Trial: ${status.daysLeft} days left` : 'Current Plan') : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 bg-white mt-12">
        <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-6">Payment Method</h3>
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 border border-text/10 rounded-2xl gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-xl">
              <CreditCard className="w-6 h-6 text-text/40" />
            </div>
            <div>
              <p className="font-black text-text">No active payment method</p>
              <p className="text-[10px] font-bold text-text/40 uppercase">Upgrade to add a card</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card bg-white mt-8 overflow-hidden">
        <div className="p-6 border-b border-text/5">
          <h3 className="font-black font-outfit uppercase tracking-tight">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-text/40 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-black">Invoice</th>
                <th className="px-6 py-4 font-black">Date</th>
                <th className="px-6 py-4 font-black">Amount</th>
                <th className="px-6 py-4 font-black">Status</th>
                <th className="px-6 py-4 font-black text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5 text-sm">
              <tr className="text-text/40">
                <td colSpan={5} className="px-6 py-8 text-center font-bold italic">No billing history found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
