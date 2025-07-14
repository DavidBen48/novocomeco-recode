'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  isBlack: boolean
  terms: boolean
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [blackSelection, setBlackSelection] = useState<boolean | null>(null)
  const [showRejection, setShowRejection] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<RegisterForm>()
  const password = watch('password')

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumbers = (password.match(/\d/g) || []).length >= 2
    const hasMinLength = password.length >= 8

    return {
      hasUpperCase,
      hasSpecialChar,
      hasNumbers,
      hasMinLength,
      isValid: hasUpperCase && hasSpecialChar && hasNumbers && hasMinLength
    }
  }

  const passwordValidation = password ? validatePassword(password) : null

  const onSubmit = async (data: RegisterForm) => {
    if (!blackSelection) {
      setShowRejection(true)
      return
    }

    if (!blackSelection) {
      setError('isBlack', { message: 'Você deve ser uma pessoa negra para se cadastrar' })
      return
    }

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'As senhas não são compatíveis, tente novamente' })
      return
    }

    const passwordCheck = validatePassword(data.password)
    if (!passwordCheck.isValid) {
      setError('password', { message: 'A senha não atende aos requisitos mínimos' })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Register data:', data)
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  const handleBlackSelection = (isBlack: boolean) => {
    setBlackSelection(isBlack)
    if (!isBlack) {
      setShowRejection(true)
    } else {
      setShowRejection(false)
    }
  }

  if (showRejection && blackSelection === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark dark:bg-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md mx-auto px-6"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nossa plataforma é dedicada exclusivamente à empregabilidade e capacitação 
              da comunidade negra. Nosso objetivo é promover a inclusão e igualdade de 
              oportunidades no mercado de trabalho.
            </p>
            <Link href="/">
              <button className="btn-deluxe">
                Voltar ao Início
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark dark:bg-black relative overflow-hidden py-12">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">N</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Criar Conta</h1>
            <p className="text-gray-400">Junte-se à nossa comunidade</p>
          </motion.div>

          {/* Black Identity Selection */}
          {blackSelection === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Você se identifica como pessoa negra?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleBlackSelection(true)}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-all"
                >
                  <Check className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold">Sim</span>
                </button>
                <button
                  onClick={() => handleBlackSelection(false)}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <X className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold">Não</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Form */}
          {blackSelection === true && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Nome é obrigatório',
                      minLength: {
                        value: 2,
                        message: 'Nome deve ter pelo menos 2 caracteres'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Digite seu email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { 
                      required: 'Senha é obrigatória',
                      validate: (value) => {
                        const validation = validatePassword(value)
                        return validation.isValid || 'Senha não atende aos requisitos'
                      }
                    })}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {password && passwordValidation && (
                  <div className="mt-2 space-y-1">
                    <div className={`text-xs flex items-center space-x-2 ${passwordValidation.hasMinLength ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>Pelo menos 8 caracteres</span>
                    </div>
                    <div className={`text-xs flex items-center space-x-2 ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.hasUpperCase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>Uma letra maiúscula</span>
                    </div>
                    <div className={`text-xs flex items-center space-x-2 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.hasSpecialChar ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>Um caractere especial</span>
                    </div>
                    <div className={`text-xs flex items-center space-x-2 ${passwordValidation.hasNumbers ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.hasNumbers ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>Pelo menos 2 números</span>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', { 
                      required: 'Confirmação de senha é obrigatória'
                    })}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </motion.div>

              {/* Terms */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('terms', { required: 'Você deve aceitar os termos' })}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                  />
                  <span className="text-sm text-gray-300">
                    Aceito os{' '}
                    <Link href="#" className="text-purple-400 hover:text-purple-300">
                      termos de uso
                    </Link>{' '}
                    e{' '}
                    <Link href="#" className="text-purple-400 hover:text-purple-300">
                      política de privacidade
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-400 text-sm mt-1">{errors.terms.message}</p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                disabled={isLoading}
                className="w-full btn-deluxe flex items-center justify-center space-x-2 py-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Criar Conta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Login Link */}
          {blackSelection === true && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-6"
            >
              <p className="text-gray-400">
                Já tem conta?{' '}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Faça login
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}