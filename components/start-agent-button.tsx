"use client"

import { motion } from "framer-motion"
import { Zap, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface StartAgentButtonProps {
  onStartAgent: () => void
  isLoading?: boolean
}

export function StartAgentButton({ onStartAgent, isLoading = false }: StartAgentButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 flex justify-center"
    >
      <Button
        onClick={onStartAgent}
        disabled={isLoading}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
      >
        <motion.div
          animate={isLoading ? { rotate: 360 } : {}}
          transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <Zap className="w-5 h-5" />
        </motion.div>
        <span>{isLoading ? 'Starting Agent...' : 'Start Agent'}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </Button>
    </motion.div>
  )
}
