'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, Briefcase, Target, Star } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: '10,247',
      label: 'Estudantes Ativos',
      growth: '+23%',
      color: 'text-blue-400',
    },
    {
      icon: Award,
      number: '8,932',
      label: 'Certificados Emitidos',
      growth: '+45%',
      color: 'text-green-400',
    },
    {
      icon: Briefcase,
      number: '7,156',
      label: 'Pessoas Empregadas',
      growth: '+67%',
      color: 'text-purple-400',
    },
    {
      icon: Target,
      number: '95%',
      label: 'Taxa de Empregabilidade',
      growth: '+12%',
      color: 'text-orange-400',
    },
    {
      icon: Star,
      number: '4.9',
      label: 'Avaliação Média',
      growth: '+0.3',
      color: 'text-yellow-400',
    },
    {
      icon: TrendingUp,
      number: '156%',
      label: 'Crescimento Anual',
      growth: '+89%',
      color: 'text-pink-400',
    },
  ]

  const predictions = [
    {
      year: '2025',
      students: '25,000',
      employed: '18,750',
      companies: '150',
    },
    {
      year: '2026',
      students: '50,000',
      employed: '42,500',
      companies: '300',
    },
    {
      year: '2027',
      students: '100,000',
      employed: '90,000',
      companies: '500',
    },
  ]

  return (
    <section className="min-h-screen flex items-center bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black mb-6">
            <span className="gradient-text-animated">E</span>
            <span className="text-black dark:text-white">statísticas da</span>
            <span className="gradient-text-animated"> Empresa</span>
            <span className="text-black dark:text-white">!</span>
            
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Números que comprovam nosso impacto na transformação de carreiras
          </p>
        </motion.div>

        {/* Current Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover-glow transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-primary`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${stat.color} bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full`}>
                  {stat.growth}
                </span>
              </div>
              <div className="text-3xl font-black text-black dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-dark dark:bg-black rounded-2xl p-8 text-white"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className='gradient-text-animated'>E</span>statísticas de <span className='gradient-text-animated'>Crescimento</span>!
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-black gradient-text-animated mb-4">
                  {prediction.year}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {prediction.students}
                    </div>
                    <div className="text-sm text-gray-300">Estudantes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {prediction.employed}
                    </div>
                    <div className="text-sm text-gray-300">Empregados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {prediction.companies}
                    </div>
                    <div className="text-sm text-gray-300">Empresas Parceiras</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Baseado em nosso crescimento atual e parcerias estratégicas, 
              projetamos um impacto exponencial na empregabilidade da 
              comunidade negra nos próximos anos.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}