"use client"

import { motion } from "framer-motion"
import { Zap, Search, Download, Filter, Sparkles } from 'lucide-react'

export function AgentLoading() {
  const steps = [
    { icon: Search, text: "Searching the web...", delay: 0 },
    { icon: Filter, text: "Filtering quality resources...", delay: 1 },
    { icon: Download, text: "Gathering content...", delay: 2 },
    { icon: Sparkles, text: "Organizing results...", delay: 3 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
    >
      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Agent Mode Activated
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          AI is now scraping the web for the best learning resources
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay * 0.5, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                delay: step.delay * 0.5,
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
            >
              <step.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {step.text}
            </span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                delay: step.delay * 0.5,
                duration: 1.5, 
                repeat: Infinity 
              }}
              className="flex space-x-1"
            >
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
