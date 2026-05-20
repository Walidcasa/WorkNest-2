'use client'

import { useEffect, useState } from 'react'
import { Plus, Users, DollarSign, Calendar, MoreVertical, Search, Loader2 } from 'lucide-react'
import { apiRequest, dashboardApi } from '@/lib/api-client'
import { AddEmployeeModal } from '@/components/dashboard/add-employee-modal'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function EmployeesPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getEmployees()
      setEmployees(data)
    } catch (err) {
      console.error('Failed to fetch employees', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.position.toLowerCase().includes(search.toLowerCase())
  )

  const totalPayroll = employees.reduce((acc, curr) => acc + (curr.salary || 0), 0)
  const pendingPayments = employees.filter(e => e.paymentStatus !== 'PAID').length

  if (loading && employees.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('employees')}</h1>
          <p className="text-text/60">{t('manageTeam')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-4 py-2">
          <Plus className="w-4 h-4" /> {t('addEmployee')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent2/10 rounded-xl text-accent2">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text/60">{t('totalStaff')}</p>
              <h3 className="text-2xl font-bold font-outfit">{employees.length}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-xl text-success">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text/60">{t('monthlyPayroll')}</p>
              <h3 className="text-2xl font-bold font-outfit">${totalPayroll.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-xl text-warning">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text/60">{t('pendingPayments')}</p>
              <h3 className="text-2xl font-bold font-outfit">{pendingPayments}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card bg-white">
        <div className="p-6 border-b border-text/5 flex justify-between items-center">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
            <input 
              type="text" 
              placeholder={t('searchTeam')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-text/10 focus:outline-none focus:ring-2 focus:ring-accent2/20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50 text-text/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">{t('employeeLabel')}</th>
                <th className="px-6 py-4 font-semibold">{t('positionLabel')}</th>
                <th className="px-6 py-4 font-semibold">{t('salaryLabel')}</th>
                <th className="px-6 py-4 font-semibold">{t('paymentStatus')}</th>
                <th className="px-6 py-4 font-semibold text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              {filteredEmployees.map((e) => (
                <tr key={e.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent2/10 text-accent2 rounded-full flex items-center justify-center font-bold">
                        {e.avatar || e.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-text">{e.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text/60">{e.position}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${e.salary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      e.paymentStatus === 'PAID' ? 'bg-success/10 text-success' :
                      e.paymentStatus === 'PENDING' ? 'bg-warning/10 text-warning' : 'bg-accent1/10 text-accent1'
                    }`}>
                      {e.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-text/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}
