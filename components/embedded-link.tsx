"use client"

import { motion } from "framer-motion"
import { ExternalLink } from 'lucide-react'

interface EmbeddedLinkProps {
  url: string
  text: string
  onClick?: () => void
}

export function EmbeddedLink({ url, text, onClick }: EmbeddedLinkProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="inline-flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors mx-1 border border-blue-200 dark:border-blue-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{text}</span>
      <ExternalLink className="w-3 h-3" />
    </motion.button>
  )
}
