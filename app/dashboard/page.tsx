'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Award, 
  Briefcase, 
  TrendingUp,
  Play,
  Calendar,
  MapPin,
  Building,
  Zap,
  Star,
  ArrowRight,
  Target,
  User
} from 'lucide-react'; import Link from 'next/link';

interface DashboardStats {
  enrolledCourses: number
  completedCourses: number
  appliedJobs: number
  averageProgress: number
}

interface Course {
  id: string
  title: string
  thumbnail: string
  instructor: string
  progress: number
  enrolled: boolean
  completed: boolean
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  postedDate: string
  type: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    enrolledCourses: 0,
    completedCourses: 0,
    appliedJobs: 0,
    averageProgress: 0
  })

  const [userName, setUserName] = useState('')

  const allCourses: Course[] = [
    {
      id: '1',
      title: 'HTML & CSS',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Ana Silva',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '2',
      title: 'Bootstrap',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400', // imagem de JavaScript
      instructor: 'Carlos Santos',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '3',
      title: 'JavaScript',
      thumbnail: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400', // imagem de Bootstrap
      instructor: 'Maria Oliveira',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '4',
      title: 'TypeScript',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'João Ferreira',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '5',
      title: 'React',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Pedro Lima',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '6',
      title: 'Node.js',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Lucas Costa',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '7',
      title: 'Java & Spring',
      thumbnail: 'https://images.pexels.com/photos/11035364/pexels-photo-11035364.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Rafael Souza',
      progress: 0,
      enrolled: false,
      completed: false
    },
    {
      id: '8',
      title: 'Docker',
      thumbnail: 'https://images.pexels.com/photos/11035393/pexels-photo-11035393.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructor: 'Bruno Alves',
      progress: 0,
      enrolled: false,
      completed: false
    }
  ]

  const recentJobs: Job[] = [
    {
      id: '1',
      title: 'Desenvolvedor Frontend React',
      company: 'Google',
      location: 'São Paulo, SP',
      postedDate: '15/06',
      type: 'CLT'
    },
    {
      id: '2',
      title: 'Desenvolvedor Backend Node.js',
      company: 'Microsoft',
      location: 'Rio de Janeiro, RJ',
      postedDate: '12/06',
      type: 'CLT'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'Remoto',
      postedDate: '10/06',
      type: 'PJ'
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Brasília, DF',
      postedDate: '08/06',
      type: 'CLT'
    }
  ]

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'Usuário'
    setUserName(savedName)

    // Load stats from localStorage
    const savedStats = localStorage.getItem('dashboardStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const statCards = [
    {
      icon: BookOpen,
      title: 'Cursos Inscritos',
      value: stats.enrolledCourses,
      color: 'from-blue-500 to-purple-600',
      iconColor: 'text-blue-400'
    },
    {
      icon: Award,
      title: 'Cursos Concluídos',
      value: stats.completedCourses,
      color: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-400'
    },
    {
      icon: Briefcase,
      title: 'Vagas Aplicadas',
      value: stats.appliedJobs,
      color: 'from-purple-500 to-pink-600',
      iconColor: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      title: 'Progresso Médio',
      value: `${stats.averageProgress}%`,
      color: 'from-orange-500 to-red-600',
      iconColor: 'text-orange-400'
    }
  ]

  return (
    <div className="w-full max-w-none space-y-8">
      <button onClick={() => window.location.href = '/'} className="mb-4 px-4 py-2 rounded bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold">Sair</button>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-primary rounded-3xl p-8 overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-black text-white">
              Bem-vindo de volta, {userName.split(' ')[0]}! 🚀
            </h2>
          </div>
          <p className="text-blue-100 text-lg mb-6">
            Continue sua jornada de aprendizado e conquiste novas oportunidades no mercado de tecnologia.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explorar Cursos</span>
              </motion.button>
            </Link>
            <Link href="/dashboard/jobs">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-white/30 transition-all"
              >
                <Briefcase className="w-5 h-5" />
                <span>Ver Vagas</span>
              </motion.button> 
            </Link>
          </div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-lg"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-4 right-20 w-8 h-8 bg-yellow-400 rounded-full"
        />
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* All Courses */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:col-span-2 bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Todos os Cursos</h3>
                <p className="text-gray-400">{allCourses.length} cursos disponíveis</p>
              </div>
            </div>
            <Link href="/dashboard/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {allCourses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{course.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{course.instructor}</p>
                    {course.enrolled && (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {course.completed ? (
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Award className="w-5 h-5 text-green-400" />
                      </div>
                    ) : course.enrolled ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Play className="w-5 h-5 text-blue-400" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-gradient-primary rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <Star className="w-5 h-5 text-white" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Jobs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-secondary rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Vagas Recentes</h3>
                <p className="text-gray-400 text-sm">Oportunidades quentes</p>
              </div>
            </div>
            <Link href="/dashboard/jobs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-1"
              >
                <span>Ver todas</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-white text-sm">{job.title}</h4>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                    {job.type}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Publicado em {job.postedDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <Target className="w-6 h-6 text-purple-400" />
          <span>Ações Rápidas</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard/courses">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            >
              <BookOpen className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Explorar Cursos</h4>
              <p className="text-blue-100 text-sm">Descubra novos conhecimentos</p>
            </motion.div>
          </Link>
          
          <Link href="/dashboard/jobs">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-secondary rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            >
              <Briefcase className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Buscar Vagas</h4>
              <p className="text-orange-100 text-sm">Encontre sua oportunidade</p>
            </motion.div>
          </Link>
          
          <Link href="/dashboard/profile">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-green rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all"
            >
              <User className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Meu Perfil</h4>
              <p className="text-green-100 text-sm">Gerencie suas informações</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}