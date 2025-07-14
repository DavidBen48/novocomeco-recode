'use client'

import { motion } from 'framer-motion'
import { Quote, Linkedin, Twitter, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function CEOSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-dark dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black mb-6 text-white">
            <span className='gradient-text-animated'>N</span>osso <span className="gradient-text-animated">Fundador</span>!
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça a mente visionária por trás da revolução na empregabilidade negra
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 z-10"></div>
              <Image
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="David Ben - CEO"
                fill
                className="object-cover"
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 w-16 h-16 bg-gradient-secondary rounded-full z-20"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-10 left-10 w-12 h-12 border-2 border-green-400 rounded-lg z-20"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-4xl font-black text-white mb-2">David Ben</h3>
              <p className="text-xl text-green-400 font-semibold">CEO & Fundador</p>
              <p className="text-gray-300 mt-2">24 anos • Rio de Janeiro, Brasil</p>
            </div>

            <div className="relative">
              <Quote className="w-8 h-8 text-purple-500 mb-4" />
              <blockquote className="text-lg text-gray-300 leading-relaxed italic">
                "Acredito que a educação de qualidade é o maior instrumento de 
                transformação social. Nossa missão é quebrar barreiras e criar 
                oportunidades reais para que cada pessoa negra possa alcançar 
                seu máximo potencial profissional."
              </blockquote>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white">Trajetória</h4>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-green-400">Visionário Tecnológico:</strong> 
                  Formado em Engenharia de Software, David sempre teve a visão de 
                  usar a tecnologia como ferramenta de inclusão social.
                </p>
                <p>
                  <strong className="text-blue-400">Empreendedor Social:</strong> 
                  Aos 22 anos, já havia desenvolvido 3 projetos sociais focados 
                  em educação e empregabilidade.
                </p>
                <p>
                  <strong className="text-purple-400">Líder Inspirador:</strong> 
                  Reconhecido como um dos jovens empreendedores mais promissores 
                  do Brasil pela revista Forbes Under 30.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: Linkedin, color: 'text-blue-400' },
                { icon: Twitter, color: 'text-blue-300' },
                { icon: Instagram, color: 'text-pink-400' },
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-primary rounded-xl p-6 text-white"
            >
              <h5 className="text-lg font-bold mb-2">Conquistas Recentes</h5>
              <ul className="space-y-1 text-sm">
                <li>• 10.000+ vidas transformadas em 2024</li>
                <li>• Parcerias com 50+ empresas Fortune 500</li>
                <li>• 95% de taxa de empregabilidade dos alunos</li>
                <li>• Prêmio Inovação Social 2024</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}