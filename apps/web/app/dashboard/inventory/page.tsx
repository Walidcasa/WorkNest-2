'use client'

import { useEffect, useState } from 'react'
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Search,
  ArrowUpRight,
  Loader2,
  DollarSign
} from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { AddProductModal } from '@/components/dashboard/add-product-modal'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function InventoryPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await apiRequest('/products')
      setProducts(res)
    } catch (err) {
      console.error('Failed to fetch inventory', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading && products.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )

  const totalProfit = products.reduce((acc, p) => acc + (p.sellingPrice - p.purchasePrice) * p.sold, 0)
  const lowStockCount = products.filter(p => p.stock <= p.lowStockAt).length

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-text tracking-tight uppercase">{t('inventory')}</h1>
          <p className="text-text/60">{t('inventoryProfit')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary px-6 py-2.5 rounded-2xl shadow-xl shadow-accent2/20 flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('addProduct')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InventoryMetric 
          title={t('potentialProfit')} 
          value={`$${totalProfit.toLocaleString()}`} 
          icon={<TrendingUp className="text-success w-5 h-5" />}
          subtitle={t('sold')}
        />
        <InventoryMetric 
          title={t('stockAlerts')} 
          value={lowStockCount} 
          icon={<AlertTriangle className={`${lowStockCount > 0 ? 'text-danger' : 'text-text/20'} w-5 h-5`} />}
          subtitle={t('waste')}
        />
        <InventoryMetric 
          title={t('totalInventoryValue')} 
          value={`$${products.reduce((acc, p) => acc + (p.purchasePrice * p.stock), 0).toLocaleString()}`} 
          icon={<Package className="text-accent2 w-5 h-5" />}
          subtitle={t('amount')}
        />
      </div>

      <div className="glass-card bg-white overflow-hidden">
        <div className="p-6 border-b border-text/5 flex justify-between items-center bg-secondary/10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30" />
            <input 
              type="text" 
              placeholder={t('searchProducts')} 
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20 text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-text/40 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-black">{t('productName')}</th>
                <th className="px-6 py-4 font-black">{t('purchasePrice')}</th>
                <th className="px-6 py-4 font-black">{t('sellingPrice')}</th>
                <th className="px-6 py-4 font-black">{t('margin')}</th>
                <th className="px-6 py-4 font-black text-center">{t('stock')}</th>
                <th className="px-6 py-4 font-black text-center">{t('sold')}</th>
                <th className="px-6 py-4 font-black text-right">{t('profit')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              {products.map((product) => {
                const margin = product.sellingPrice - product.purchasePrice
                const profit = margin * product.sold
                return (
                  <tr key={product.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-black text-text uppercase tracking-tight">{product.name}</p>
                      <p className="text-[10px] font-bold text-text/40 uppercase">{product.supplier || t('noSupplier')}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-text/60">${product.purchasePrice}</td>
                    <td className="px-6 py-4 font-bold text-text">${product.sellingPrice}</td>
                    <td className="px-6 py-4">
                      <span className="bg-success/10 text-success px-2 py-0.5 rounded text-[10px] font-black">
                        +${margin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-black ${product.stock <= product.lowStockAt ? 'text-danger' : 'text-text'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-text/60">{product.sold}</td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-black text-text">${profit.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-success uppercase">{t('realized')}</p>
                    </td>
                  </tr>
                )
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <Package className="w-12 h-12 text-text/10 mx-auto mb-4" />
                    <p className="text-xs font-black text-text/30 uppercase tracking-widest">{t('inventoryEmpty')}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}

function InventoryMetric({ title, value, icon, subtitle }: any) {
  return (
    <div className="glass-card p-6 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-black text-text/40 uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black font-outfit tracking-tighter mt-2">{value}</h3>
          <p className="text-[10px] font-bold text-text/30 uppercase mt-1">{subtitle}</p>
        </div>
        <div className="p-3 bg-secondary rounded-2xl">
          {icon}
        </div>
      </div>
    </div>
  )
}
