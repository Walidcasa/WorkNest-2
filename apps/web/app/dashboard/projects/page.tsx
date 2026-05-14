'use client'

import { useEffect, useState } from 'react'
import { Plus, MoreHorizontal, Clock, CheckCircle2, AlertCircle, LayoutGrid, List, Loader2 } from 'lucide-react'
import { apiRequest, dashboardApi } from '@/lib/api-client'
import { AddProjectModal } from '@/components/dashboard/add-project-modal'
import { useTranslation } from '@/components/providers/i18n-provider'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Failed to fetch projects', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading && projects.length === 0) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent2 animate-spin" />
    </div>
  )
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-text">{t('projects')}</h1>
          <p className="text-text/60">{t('manageProjects')}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex p-1 bg-white border border-text/10 rounded-xl">
            <button className="p-1.5 bg-secondary rounded-lg text-accent2"><LayoutGrid className="w-4 h-4" /></button>
            <button className="p-1.5 text-text/40 hover:text-text"><List className="w-4 h-4" /></button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 btn-primary px-4 py-2">
            <Plus className="w-4 h-4" /> {t('addProject')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['TODO', 'IN_PROGRESS', 'DONE'].map((column) => (
          <div key={column} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-text/40 uppercase tracking-widest flex items-center gap-2">
                {column === 'TODO' ? t('todo') : column === 'IN_PROGRESS' ? t('inProgress') : t('completed')}
                <span className="bg-secondary text-text/40 px-2 py-0.5 rounded-full text-[10px]">
                  {projects.filter(p => p.status === column).length}
                </span>
              </h3>
              <button className="text-text/20 hover:text-text"><MoreHorizontal className="w-4 h-4" /></button>
            </div>

            <div className="space-y-4 min-h-[500px]">
              {projects.filter(p => p.status === column).map((project) => (
                <div key={project.id} className="glass-card p-5 bg-white hover:border-accent2/30 hover:shadow-xl transition-all group cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-accent2 bg-accent2/5 px-2 py-0.5 rounded">
                      {project.client?.name || t('noClient')}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-text/30" />
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-text mb-4">{project.title}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end text-[10px] font-bold text-text/40 uppercase">
                      <span>{t('progress')}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          project.status === 'DONE' ? 'bg-success' : 'bg-accent2'
                        }`} 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-text/5 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-text/40">
                      {project.status === 'DONE' ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">{project.deadline}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-[10px] font-bold">
                          {i === 1 ? 'JD' : 'AS'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 border-2 border-dashed border-text/10 rounded-xl text-text/20 font-bold text-sm hover:border-accent2/30 hover:text-accent2 transition-all">
                + {t('addTask')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  )
}
