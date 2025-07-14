'use client'

import { motion } from 'framer-motion'
import { Target, Users, Award, TrendingUp } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: 'Missão Clara',
      description: 'Democratizar o acesso à educação de qualidade e oportunidades de emprego para a comunidade negra.',
    },
    {
      icon: Users,
      title: 'Comunidade Forte',
      description: 'Mais de 10.000 profissionais conectados em uma rede de apoio e crescimento mútuo.',
    },
    {
      icon: Award,
      title: 'Certificação Reconhecida',
      description: 'Certificados com QR Code verificável, aceitos pelas principais empresas do mercado.',
    },
    {
      icon: TrendingUp,
      title: 'Resultados Comprovados',
      description: '95% dos nossos alunos conseguem colocação no mercado de trabalho em até 6 meses.',
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
          <span className="gradient-text-animated">Q</span>
            <span className="text-black dark:text-white">uem Somos </span>
            <span className="gradient-text-animated"> Nós</span>
            <span className="text-black dark:text-white">?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Fundada em janeiro de 2025 no Rio de Janeiro, a Novo Começo nasceu da visão de 
            transformar a realidade profissional da comunidade negra através da educação 
            e oportunidades de qualidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-black dark:text-white">
              Nossa História
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Nascemos da necessidade urgente de criar pontes entre o talento da 
              comunidade negra e as oportunidades do mercado de trabalho. Nossa 
              plataforma combina tecnologia de ponta com metodologias pedagógicas 
              inovadoras.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cada curso é desenvolvido em parceria com especialistas da indústria, 
              garantindo que nossos alunos estejam sempre alinhados com as demandas 
              mais atuais do mercado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Nossa Visão</h4>
              <p className="text-lg leading-relaxed">
                "Ser a principal plataforma de capacitação e empregabilidade 
                para a comunidade negra no Brasil, criando um ecossistema 
                sustentável de oportunidades e crescimento profissional."
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover-glow transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-black dark:text-white">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}