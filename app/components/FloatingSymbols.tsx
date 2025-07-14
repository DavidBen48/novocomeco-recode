'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const symbols = ['⚡', '🚀', '💡', '🎯', '⭐', '🔥', '💎', '🌟', '✨']

export default function FloatingSymbols() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useEffect(() => {
    // Set window width after component mounts (client-side only)
    setWindowWidth(window.innerWidth)

    // Optional: Update on window resize
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Don't render until we have the window width
  if (windowWidth === null) {
    return null
  }

  return (
    <div className="floating-symbols">
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="floating-symbol"
          initial={{ y: '100vh', x: Math.random() * windowWidth }}
          animate={{
            y: '-100px',
            x: Math.random() * windowWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  )
}