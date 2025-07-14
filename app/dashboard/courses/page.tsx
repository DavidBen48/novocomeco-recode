'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'

import { 

  BookOpen, Play, Award, 
  Clock, User, CheckCircle,
  Download, ArrowLeft,
  Star, Zap, Target,

} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  thumbnail: string
  progress: number
  enrolled: boolean
  completed: boolean
  modules: Module[]
}

interface Module {
  id: string
  title: string
  duration: string
  completed: boolean
  videoUrl?: string
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'completed'>('all')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [courseToEnroll, setCourseToEnroll] = useState<Course | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)
  const [userName, setUserName] = useState('')

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'HTML & CSS',
      description: 'Aprenda os fundamentos do desenvolvimento web com HTML5 e CSS3. Domine a estruturação de páginas e estilização moderna.',
      instructor: 'Ana Silva',
      duration: '20 horas',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Introdução ao HTML', duration: '2h', completed: false },
        { id: '2', title: 'Tags e Elementos', duration: '3h', completed: false },
        { id: '3', title: 'CSS Básico', duration: '4h', completed: false },
        { id: '4', title: 'Layout e Flexbox', duration: '5h', completed: false },
        { id: '5', title: 'Projeto Final', duration: '6h', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Bootstrap',
      description: 'Domine o framework CSS mais popular do mundo. Crie interfaces responsivas rapidamente.',
      instructor: 'Carlos Santos',
      duration: '15 horas',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400', // imagem de JavaScript
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Introdução ao Bootstrap', duration: '2h', completed: false },
        { id: '2', title: 'Grid System', duration: '3h', completed: false },
        { id: '3', title: 'Componentes', duration: '4h', completed: false },
        { id: '4', title: 'Customização', duration: '3h', completed: false },
        { id: '5', title: 'Projeto Prático', duration: '3h', completed: false }
      ]
    },
    {
      id: '3',
      title: 'JavaScript',
      description: 'Programação dinâmica para web com JavaScript moderno. Aprenda ES6+, DOM e muito mais.',
      instructor: 'Maria Oliveira',
      duration: '40 horas',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400', // imagem de Bootstrap
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Fundamentos do JavaScript', duration: '8h', completed: false },
        { id: '2', title: 'DOM e Eventos', duration: '8h', completed: false },
        { id: '3', title: 'ES6+ Features', duration: '8h', completed: false },
        { id: '4', title: 'Async/Await e Promises', duration: '8h', completed: false },
        { id: '5', title: 'Projeto Final', duration: '8h', completed: false }
      ]
    },
    {
      id: '4',
      title: 'TypeScript',
      description: 'JavaScript com tipagem estática para projetos robustos. Aprenda a criar aplicações escaláveis.',
      instructor: 'João Ferreira',
      duration: '25 horas',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Introdução ao TypeScript', duration: '5h', completed: false },
        { id: '2', title: 'Tipos e Interfaces', duration: '5h', completed: false },
        { id: '3', title: 'Classes e Herança', duration: '5h', completed: false },
        { id: '4', title: 'Generics e Decorators', duration: '5h', completed: false },
        { id: '5', title: 'Projeto Avançado', duration: '5h', completed: false }
      ]
    },
    {
      id: '5',
      title: 'React',
      description: 'Biblioteca JavaScript para construção de interfaces modernas. Componentes, hooks e estado.',
      instructor: 'Pedro Lima',
      duration: '35 horas',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Fundamentos do React', duration: '7h', completed: false },
        { id: '2', title: 'Components e Props', duration: '7h', completed: false },
        { id: '3', title: 'State e Hooks', duration: '7h', completed: false },
        { id: '4', title: 'Context API e Redux', duration: '7h', completed: false },
        { id: '5', title: 'Projeto Completo', duration: '7h', completed: false }
      ]
    },
    {
      id: '6',
      title: 'Node.js',
      description: 'JavaScript no servidor para aplicações backend. APIs, Express e banco de dados.',
      instructor: 'Lucas Costa',
      duration: '30 horas',
      thumbnail: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Introdução ao Node.js', duration: '6h', completed: false },
        { id: '2', title: 'Express.js Framework', duration: '6h', completed: false },
        { id: '3', title: 'Banco de Dados', duration: '6h', completed: false },
        { id: '4', title: 'APIs RESTful', duration: '6h', completed: false },
        { id: '5', title: 'Deploy e Produção', duration: '6h', completed: false }
      ]
    },
    {
      id: '7',
      title: 'Java & Spring',
      description: 'Desenvolvimento enterprise com Java e Spring Framework. Aplicações robustas e escaláveis.',
      instructor: 'Rafael Souza',
      duration: '50 horas',
      thumbnail: 'https://images.pexels.com/photos/11035364/pexels-photo-11035364.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Fundamentos do Java', duration: '10h', completed: false },
        { id: '2', title: 'Spring Boot', duration: '10h', completed: false },
        { id: '3', title: 'Spring Data JPA', duration: '10h', completed: false },
        { id: '4', title: 'Spring Security', duration: '10h', completed: false },
        { id: '5', title: 'Projeto Enterprise', duration: '10h', completed: false }
      ]
    },
    {
      id: '8',
      title: 'Docker',
      description: 'Containerização de aplicações para desenvolvimento e produção. DevOps e deploy moderno.',
      instructor: 'Bruno Alves',
      duration: '20 horas',
      thumbnail: 'https://images.pexels.com/photos/11035393/pexels-photo-11035393.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 0,
      enrolled: false,
      completed: false,
      modules: [
        { id: '1', title: 'Introdução ao Docker', duration: '4h', completed: false },
        { id: '2', title: 'Dockerfile e Images', duration: '4h', completed: false },
        { id: '3', title: 'Docker Compose', duration: '4h', completed: false },
        { id: '4', title: 'Volumes e Networks', duration: '4h', completed: false },
        { id: '5', title: 'Deploy com Docker', duration: '4h', completed: false }
      ]
    }
  ])

  useEffect(() => {
    // Load courses from localStorage
    const savedCourses = localStorage.getItem('userCourses')
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
  }, [])

  const saveCourses = (updatedCourses: Course[]) => {
    setCourses(updatedCourses)
    localStorage.setItem('userCourses', JSON.stringify(updatedCourses))
    
    // Update dashboard stats
    const enrolled = updatedCourses.filter(c => c.enrolled && !c.completed).length
    const completed = updatedCourses.filter(c => c.completed).length
    const totalProgress = updatedCourses.reduce((sum, c) => sum + c.progress, 0)
    const averageProgress = enrolled > 0 ? Math.round(totalProgress / enrolled) : 0
    
    const stats = {
      enrolledCourses: enrolled,
      completedCourses: completed,
      appliedJobs: JSON.parse(localStorage.getItem('appliedJobs') || '0'),
      averageProgress
    }
    
    localStorage.setItem('dashboardStats', JSON.stringify(stats))
  }

  const filteredCourses = courses.filter(course => {
    switch (activeTab) {
      case 'enrolled':
        return course.enrolled && !course.completed
      case 'completed':
        return course.completed
      default:
        return true
    }
  })

  // Substituir handleEnrollClick e confirmEnrollment para inscrição automática
  const handleEnrollClick = (course: Course) => {
    const updatedCourses = courses.map(c =>
      c.id === course.id ? { ...c, enrolled: true } : c
    )
    saveCourses(updatedCourses)
  }

  // Remover confirmEnrollment e setShowConfirmModal
  const markModuleComplete = (courseId: string, moduleId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module =>
          module.id === moduleId ? { ...module, completed: !module.completed } : module
        )
        const completedModules = updatedModules.filter(m => m.completed).length
        const progress = Math.round((completedModules / updatedModules.length) * 100)
        const completed = progress === 100
        
        return {
          ...course,
          modules: updatedModules,
          progress,
          completed
        }
      }
      return course
    })
    saveCourses(updatedCourses)
  }

  const generateCertificate = async (course: Course) => {
    try {
      const qrContent = `Certificado do curso: ${course.title} - ID ${Date.now()}`
      const qrCode = await QRCode.toDataURL(qrContent)
  
      const certificates = JSON.parse(localStorage.getItem('userCertificates') || '[]')
      const newCertificate = {
        id: Date.now().toString(),
        courseName: course.title,
        completedDate: new Date().toLocaleDateString('pt-BR'),
        qrCode
      }
  
      certificates.push(newCertificate)
      localStorage.setItem('userCertificates', JSON.stringify(certificates))
  
      alert(`Certificado gerado para o curso: ${course.title}! 🎉`)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
      alert('Erro ao gerar o certificado. Tente novamente.')
    }
  }
  

  const startQuiz = () => {
    setShowQuiz(true)
  }

  const submitQuiz = async (score: number) => {
    setQuizScore(score)
    setShowQuiz(false)
  
    if (score >= 7 && selectedCourse) {
      const updatedCourses = courses.map(course =>
        course.id === selectedCourse.id ? { ...course, completed: true, progress: 100 } : course
      )
      saveCourses(updatedCourses)
  
      await generateCertificate(selectedCourse) // async
    } else {
      alert('Você precisa acertar pelo menos 7 questões para ser aprovado. Tente novamente!')
    }
  }
  

  // Adicionar função para verificar se já existe certificado para o curso
  const hasCertificate = (courseTitle: string) => {
    const certificates = JSON.parse(localStorage.getItem('userCertificates') || '[]')
    return certificates.some((cert: any) => cert.courseName === courseTitle)
  }

  if (selectedCourse) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <motion.button
          onClick={() => setSelectedCourse(null)}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar aos cursos</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20" />
              <div className="relative z-10 text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-20 h-20 mx-auto mb-4" />
                </motion.div>
                <p className="text-xl font-bold">Vídeo do curso será exibido aqui</p>
                <p className="text-gray-300 mt-2">Experiência de aprendizado imersiva</p>
              </div>
            </motion.div>

            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h1 className="text-3xl font-black text-white mb-3 gradient-text-animated">
                {selectedCourse.title}
              </h1>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {selectedCourse.description}
              </p>
              <div className="flex items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{selectedCourse.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">{selectedCourse.progress}% concluído</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Course Modules */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span>Módulos do Curso</span>
            </h3>
            
            <div className="space-y-3">
              {selectedCourse.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">
                      {module.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {module.duration}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => markModuleComplete(selectedCourse.id, module.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-xl transition-all ${
                      module.completed
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">
                  Progresso do Curso
                </span>
                <span className="text-sm text-purple-400 font-bold">
                  {selectedCourse.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedCourse.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-primary h-3 rounded-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {selectedCourse.progress === 100 && !selectedCourse.completed && (
                <motion.button
                  onClick={startQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-secondary text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Fazer Prova Final</span>
                </motion.button>
              )}
              
              {selectedCourse.completed && (
                hasCertificate(selectedCourse.title) ? (
                  <motion.button
                    onClick={() => setShowCertificate(true)}
                    className="w-full bg-gradient-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 opacity-70 cursor-not-allowed"
                    disabled
                  >
                    <Award className="w-5 h-5" />
                    <span>Certificado já gerado</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={async () => { await generateCertificate(selectedCourse); setShowCertificate(true); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Gerar Certificado</span>
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Quiz Modal */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Prova Final - {selectedCourse.title}
                </h3>
                <p className="text-gray-300 text-center mb-8">
                  Responda às 10 questões. Você precisa acertar pelo menos 7 para ser aprovado.
                </p>
                
                <div className="text-center space-y-4">
                  <p className="text-white text-lg">Simulação da prova...</p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={() => submitQuiz(8)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold"
                    >
                      Simular Aprovação (8/10)
                    </motion.button>
                    <motion.button
                      onClick={() => submitQuiz(5)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
                    >
                      Simular Reprovação (5/10)
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showCertificate && (
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
            <button onClick={() => setShowCertificate(false)} className="absolute top-8 left-8 px-4 py-2 rounded bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold">Voltar para Cursos</button>
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center">
              <h2 className="text-3xl font-black mb-4">Certificado de Conclusão</h2>
              <p className="mb-6">Eu, <span className="font-bold">{userName}</span>, declaro que concluo o curso <span className="font-bold">{selectedCourse.title}</span> com êxito nesta plataforma.</p>
              <p className="mb-6">Data de conclusão: <span className="font-bold">{new Date().toLocaleDateString('pt-BR')}</span></p>
              <p className="mb-6">Assinatura: <span className="font-bold">CEO Novo Começo</span></p>
              <p className="mb-6">Empresa: <span className="font-bold">Novo Começo</span></p>
              {/* <img src={generateQRCode()} alt="QR Code" className="mx-auto my-4 w-32 h-32" /> */}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      <button onClick={() => window.location.href = '/dashboard'} className="mb-4 px-4 py-2 rounded bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold">Voltar Para Área do Aluno</button>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Meus <span className="gradient-text-animated">Cursos</span>
          </h1>
          <p className="text-gray-400 text-lg">Desenvolva suas habilidades e conquiste o mercado</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <BookOpen className="w-5 h-5" />
          <span>{filteredCourses.length} cursos disponíveis</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-2 bg-black/40 backdrop-blur-xl rounded-2xl p-2 border border-white/10"
      >
        {[
          { key: 'all', label: 'Todos os Cursos', count: courses.length },
          { key: 'enrolled', label: 'Inscritos', count: courses.filter(c => c.enrolled && !c.completed).length },
          { key: 'completed', label: 'Concluídos', count: courses.filter(c => c.completed).length }
        ].map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
              activeTab === tab.key
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-white/20' : 'bg-white/10'
            }`}>
              {tab.count}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-none">
        <AnimatePresence>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  {course.completed ? (
                    <div className="p-2 bg-green-500 rounded-full">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  ) : course.enrolled ? (
                    <div className="p-2 bg-blue-500 rounded-full">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="p-2 bg-purple-500 rounded-full">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {course.enrolled && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">
                        Progresso
                      </span>
                      <span className="text-sm text-purple-400 font-bold">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {!course.enrolled ? (
                    <motion.button
                      onClick={() => handleEnrollClick(course)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-primary text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Inscrever-se
                    </motion.button>
                  ) : course.completed ? (
                    <motion.button
                      onClick={() => generateCertificate(course)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Certificado</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setSelectedCourse(course)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-secondary text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Continuar</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && courseToEnroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-4 border border-white/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Confirmar Inscrição
                </h3>
                <p className="text-gray-300 mb-6">
                  Tem certeza que deseja se inscrever no curso "{courseToEnroll.title}"?
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setShowConfirmModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors font-semibold"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    // onClick={confirmEnrollment}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-primary text-white py-3 px-4 rounded-xl font-bold"
                  >
                    Confirmar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}