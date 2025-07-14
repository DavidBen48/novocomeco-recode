'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('isLoggedIn'))
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 dark:bg-black/90 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold gradient-text-animated">
              Novo Começo
            </span>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-500" />
              )}
            </motion.button>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-deluxe flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Acessar Área do Usuário</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-deluxe flex items-center space-x-2"
                  onClick={() => { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userName'); localStorage.removeItem('userEmail'); window.location.reload(); }}
                >
                  <span>Sair</span>
                </motion.button>
              </>
            ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-deluxe flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Faça Login</span>
              </motion.button>
            </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}