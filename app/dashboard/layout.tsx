'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Home, 
  BookOpen, 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sidebarItems = [
  { icon: Home, label: 'Visão Geral', href: '/dashboard' },
  { icon: BookOpen, label: 'Meus Cursos', href: '/dashboard/courses' },
  { icon: Briefcase, label: 'Vagas', href: '/dashboard/jobs' },
  { icon: User, label: 'Perfil', href: '/dashboard/profile' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Get user name from localStorage
    const savedName = localStorage.getItem('userName') || 'Usuário'
    setUserName(savedName)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-dark relative overflow-hidden">
      {/* Floating Particles */}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 z-50 w-80 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-black gradient-text-animated">
              Novo Começo
            </span>
          </motion.div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold">Olá, {userName.split(' ')[0]}!</h3>
              <p className="text-gray-400 text-sm">Bem-vindo de volta</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-4 p-4 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-semibold text-lg">Sair</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-80 w-full flex flex-col h-screen">
        {/* Top Header */}
        <header className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setSidebarOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Menu className="w-6 h-6 text-white" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-black text-white">
                  Área do <span className="gradient-text-animated">Aluno</span>
                </h1>
                <p className="text-gray-400">Gerencie seus cursos e oportunidades</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/dashboard/profile')} className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center focus:outline-none">
                <span className="text-white font-bold">
                  {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-10 w-full max-w-none flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}