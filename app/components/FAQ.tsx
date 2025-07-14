'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Como funciona o processo de certificação',
      answer: 'Nossos certificados são emitidos automaticamente após a conclusão do curso e aprovação no questionário final. Cada certificado possui um QR Code único para verificação de autenticidade e é reconhecido pelas principais empresas do mercado.',
    },
    {
      question: 'Quais são os requisitos para se inscrever',
      answer: 'Para se inscrever em nossa plataforma, você deve ser uma pessoa negra (autodeclaração), ter mais de 16 anos e possuir acesso à internet. Não exigimos formação prévia específica, pois nossos cursos são desenvolvidos para diferentes níveis de conhecimento.',
    },
    {
      question: 'Os cursos são gratuitos',
      answer: 'Sim! Todos os nossos cursos são completamente gratuitos. Acreditamos que a educação de qualidade deve ser acessível a todos. Nossa missão é democratizar o acesso ao conhecimento e às oportunidades de emprego.',
    },
    {
      question: 'Como vocês garantem oportunidades de emprego',
      answer: 'Temos parcerias estratégicas com mais de 150 empresas comprometidas com a diversidade. Além disso, oferecemos mentoria personalizada, preparação para entrevistas e um programa de indicação que conecta nossos alunos diretamente com recrutadores.',
    },
    {
      question: 'Posso fazer mais de um curso simultaneamente',
      answer: 'Absolutamente! Você pode se inscrever em quantos cursos desejar e estudar no seu próprio ritmo. Nossa plataforma permite que você gerencie seu progresso em múltiplos cursos e organize seus estudos da forma que for mais conveniente.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-dark dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black mb-6 text-white">
            <span className='gradient-text-animated'>P</span>erguntas <span className="gradient-text-animated">Frequentes</span>!
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossa plataforma e metodologia
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="font-semibold text-white pr-4 text-lg">
                  {faq.question}<span className="gradient-text-animated">?</span>
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}