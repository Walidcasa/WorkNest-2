'use client'

import Link from 'next/link'
import { ShoppingBag, Package, Users, Brain, ArrowUpRight, TrendingUp, AlertTriangle, ArrowDownRight } from 'lucide-react'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function SellerDashboard({ data }: { data: any }) {
  const { t } = useTranslation()
  if (!data) return null

  const { cash, products, clients, insights, transactions } = data
  const aiInsight = Array.isArray(insights) && insights.length > 0 ? insights[0] : null

  const productList = Array.isArray(products) ? products : []
  const lowStock = productList.filter((p: any) => p.stock <= p.lowStockAt)
  const totalSold = productList.reduce((a: number, p: any) => a + (p.sold || 0), 0)
  const recentSales = Array.isArray(transactions)
    ? transactions.filter((t: any) => t.type === 'REVENUE').slice(0, 6)
    : []

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-accent2 uppercase tracking-widest mb-1">Seller Dashboard</p>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight">My Store Overview</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-text/5 shadow-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-black text-text/40 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${(cash?.totalIncome || 0).toLocaleString()}`, sub: `Net: $${(cash?.netCashFlow || 0).toLocaleString()}`, color: 'text-success', border: 'border-l-green-500', icon: <ArrowUpRight className="w-5 h-5" /> },
          { label: 'Units Sold', value: totalSold, sub: `${productList.length} products`, color: 'text-blue-600', border: 'border-l-blue-500', icon: <ShoppingBag className="w-5 h-5" /> },
          { label: 'Customers', value: Array.isArray(clients) ? clients.length : 0, sub: 'total clients', color: 'text-purple-600', border: 'border-l-purple-500', icon: <Users className="w-5 h-5" /> },
          { label: 'Low Stock', value: lowStock.length, sub: lowStock.length > 0 ? 'needs restock' : 'all good', color: lowStock.length > 0 ? 'text-danger' : 'text-success', border: lowStock.length > 0 ? 'border-l-red-500' : 'border-l-green-500', icon: <AlertTriangle className="w-5 h-5" /> },
        ].map(k => (
          <div key={k.label} className={`bg-white rounded-2xl border-l-4 ${k.border} p-5 shadow-sm`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-text/40 uppercase tracking-widest">{k.label}</p>
                <p className={`text-2xl font-black font-outfit mt-1 ${k.color}`}>{k.value}</p>
                <p className="text-[10px] text-text/30 mt-0.5">{k.sub}</p>
              </div>
              <div className={`${k.color} opacity-30`}>{k.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-text/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-text/5 flex justify-between items-center">
            <div>
              <h3 className="font-black font-outfit uppercase tracking-tight">Recent Sales</h3>
              <p className="text-[10px] text-text/40 uppercase tracking-widest mt-0.5">Latest revenue transactions</p>
            </div>
            <Link href="/dashboard/finances" className="text-xs font-black text-accent2 hover:underline">View all</Link>
          </div>
          {recentSales.length === 0 ? (
            <div className="p-8 text-center text-text/30">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-bold text-sm">No sales yet — add transactions to track revenue</p>
            </div>
          ) : (
            <div className="divide-y divide-text/5">
              {recentSales.map((sale: any) => (
                <div key={sale.id} className="px-6 py-4 flex justify-between items-center hover:bg-secondary/20 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-text">{sale.label}</p>
                    <p className="text-xs text-text/40">{sale.category} · {new Date(sale.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-black text-success">+${sale.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inventory + AI */}
        <div className="space-y-4">
          <Link href="/dashboard/inventory" className="block bg-white rounded-3xl border border-text/5 shadow-sm p-6 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black font-outfit uppercase tracking-tight text-sm">Inventory</h3>
              <div className="p-2 bg-accent2/10 rounded-xl group-hover:bg-accent2/20 transition-colors">
                <Package className="w-5 h-5 text-accent2" />
              </div>
            </div>
            <p className="text-3xl font-black text-text">{productList.length}</p>
            <p className="text-[10px] text-text/40 uppercase tracking-widest mt-1">Total products</p>
            {lowStock.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 rounded-xl">
                <p className="text-xs font-black text-red-600">{lowStock.length} items low in stock</p>
                <div className="mt-1 space-y-0.5">
                  {lowStock.slice(0, 3).map((p: any) => (
                    <p key={p.id} className="text-[10px] text-red-400">{p.name} — {p.stock} left</p>
                  ))}
                </div>
              </div>
            )}
          </Link>

          <Link href="/dashboard/ai-insights" className="block bg-gradient-to-br from-text to-text/90 text-white rounded-3xl p-6 shadow-2xl hover:scale-[1.02] transition-all group">
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <Brain className="w-4 h-4 text-accent2" />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Advice</span>
            </div>
            <p className="text-sm font-bold leading-snug group-hover:text-accent2 transition-colors line-clamp-3">
              {aiInsight ? `"${aiInsight.description}"` : '"Add data to get personalized business advice."'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-accent2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">{t('viewInsights')}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      {productList.length > 0 && (
        <div className="bg-white rounded-3xl border border-text/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-text/5 flex justify-between items-center">
            <h3 className="font-black font-outfit uppercase tracking-tight">Top Products</h3>
            <Link href="/dashboard/inventory" className="text-xs font-black text-accent2 hover:underline">Manage</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/30 text-text/40 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-3 font-black">Product</th>
                  <th className="px-6 py-3 font-black">Stock</th>
                  <th className="px-6 py-3 font-black">Sold</th>
                  <th className="px-6 py-3 font-black">Revenue</th>
                  <th className="px-6 py-3 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5 text-sm">
                {productList.slice(0, 5).map((p: any) => (
                  <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-text">{p.name}</td>
                    <td className="px-6 py-4 font-bold text-text">{p.stock}</td>
                    <td className="px-6 py-4 text-text/60">{p.sold || 0}</td>
                    <td className="px-6 py-4 font-bold text-success">${((p.sold || 0) * p.sellingPrice).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${p.stock <= p.lowStockAt ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.stock <= p.lowStockAt ? 'Low' : 'OK'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
