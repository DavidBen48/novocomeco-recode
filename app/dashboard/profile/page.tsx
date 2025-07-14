'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Download,
  Edit,
  Save,
  Zap,
  Target
} from 'lucide-react'

interface Certificate {
  id: string
  courseName: string
  completedDate: string
  qrCode: string
}

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  joinDate: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    joinDate: ''
  })
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesEnrolled: 0,
    jobsApplied: 0
  })
  const [showCertificate, setShowCertificate] = useState<Certificate | null>(null)

  useEffect(() => {
    // Load profile data
    const savedName = localStorage.getItem('userName') || 'Usuário'
    const savedEmail = localStorage.getItem('userEmail') || 'usuario@email.com'
    const savedProfile = localStorage.getItem('userProfile')
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      setProfile({
        ...parsedProfile,
        name: savedName,
        email: savedEmail
      })
    } else {
      setProfile({
        name: savedName,
        email: savedEmail,
        phone: '(11) 99999-9999',
          location: 'São Paulo, SP',
        bio: 'Desenvolvedor apaixonado por tecnologia e inovação.',
        joinDate: '15/01/2025'
      })
    }

    // Load certificates
    const savedCertificates = localStorage.getItem('userCertificates')
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates))
    }

    // Load stats
    const dashboardStats = localStorage.getItem('dashboardStats')
    if (dashboardStats) {
      const parsed = JSON.parse(dashboardStats)
      setStats({
        coursesCompleted: parsed.completedCourses || 0,
        coursesEnrolled: parsed.enrolledCourses || 0,
        jobsApplied: parsed.appliedJobs || 0
      })
    }
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data (except email)
    const profileToSave = { ...profile }
    delete (profileToSave as any).email // Don't save email changes
    localStorage.setItem('userProfile', JSON.stringify(profileToSave))
    localStorage.setItem('userName', profile.name)
  }

  const downloadCertificate = (certificate: Certificate) => {
    // Simulate certificate download
    alert(`Baixando certificado: ${certificate.courseName} 📜`)
  }

  const generateQRCode = () => {
    // Simple QR code placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PC9zdmc+'
  }

  // Filtrar certificados únicos por curso
  const uniqueCertificates = certificates.filter((cert, idx, arr) => arr.findIndex(c => c.courseName === cert.courseName) === idx)

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
            Meu <span className="gradient-text-animated">Perfil</span>
          </h1>
          <p className="text-gray-400 text-lg">Gerencie suas informações pessoais e conquistas</p>
        </div>
        <motion.button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:shadow-lg transition-all"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          <span>{isEditing ? 'Salvar' : 'Editar'}</span>
        </motion.button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 w-full">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-fit"
        >
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
            >
              <span className="text-4xl font-black text-white">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-4 border-transparent border-t-white/30 rounded-full"
              />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {profile.name}
            </h2>
            <p className="text-gray-400 mb-4">{profile.email}</p>
            <div className="flex justify-center space-x-2">
              <span className="px-3 py-1 bg-gradient-primary rounded-full text-white text-sm font-semibold">
                Membro Ativo
              </span>
              <span className="px-3 py-1 bg-gradient-green rounded-full text-white text-sm font-semibold">
                Verificado
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-green-400" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Membro desde {profile.joinDate}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>Estatísticas</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-black gradient-text-animated">
                  {stats.coursesCompleted}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Certificados
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-black gradient-text-animated">
                  {stats.coursesEnrolled}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Cursos
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-black gradient-text-animated">
                  {stats.jobsApplied}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Vagas
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
            <User className="w-6 h-6 text-purple-400" />
            <span>Informações Pessoais</span>
          </h3>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    isEditing
                      ? 'bg-white/10 border-white/20 hover:bg-white/15'
                      : 'bg-white/5 border-white/10 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">O email não pode ser alterado</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    isEditing
                      ? 'bg-white/10 border-white/20 hover:bg-white/15'
                      : 'bg-white/5 border-white/10 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Localização
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    isEditing
                      ? 'bg-white/10 border-white/20 hover:bg-white/15'
                      : 'bg-white/5 border-white/10 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Sobre mim
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${
                  isEditing
                    ? 'bg-white/10 border-white/20 hover:bg-white/15'
                    : 'bg-white/5 border-white/10 cursor-not-allowed'
                }`}
                placeholder="Conte um pouco sobre você, suas paixões e objetivos profissionais..."
              />
            </div>
          </form>
        </motion.div>
      </div>

      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-400" />
          <span>Meus Certificados</span>
          <span className="px-3 py-1 bg-gradient-primary rounded-full text-white text-sm font-semibold">
            {uniqueCertificates.length}
          </span>
        </h3>

        {uniqueCertificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      {certificate.courseName}
                    </h4>
                    <p className="text-gray-400">
                      Concluído em {certificate.completedDate}
                    </p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto bg-white rounded-xl p-2 mb-3">
                    <img
                      src={generateQRCode()}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-400">QR Code de verificação</p>
                </div>

                <motion.button
                  onClick={() => setShowCertificate(certificate)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2"
                >
                  <Award className="w-5 h-5" />
                  <span>Visualizar Certificado</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">
              Nenhum certificado ainda
            </h4>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Complete seus cursos para ganhar certificados verificados e impulsionar sua carreira!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/dashboard/courses"
                className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <Zap className="w-5 h-5" />
                <span>Explorar Cursos</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {showCertificate && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <button onClick={() => setShowCertificate(null)} className="absolute top-8 left-8 px-4 py-2 rounded bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold">Voltar para Perfil</button>
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center">
            <h2 className="text-3xl font-black mb-4">Certificado de Conclusão</h2>
            <p className="mb-6">Eu, <span className="font-bold">{profile.name}</span>, declaro que concluo o curso <span className="font-bold">{showCertificate.courseName}</span> com êxito nesta plataforma.</p>
            <p className="mb-6">Data de conclusão: <span className="font-bold">{showCertificate.completedDate}</span></p>
            <p className="mb-6">Assinatura: <span className="font-bold">CEO Novo Começo</span></p>
            <p className="mb-6">Empresa: <span className="font-bold">Novo Começo</span></p>
            <img src={showCertificate.qrCode} alt="QR Code" className="mx-auto my-4 w-32 h-32" />
          </div>
        </div>
      )}
    </div>
  )
}