"use client"

import { motion } from "framer-motion"

export function TypingIndicator() {
  return (
    <div className="bg-white dark:bg-[#363537] rounded-2xl p-4 shadow-sm inline-flex items-center space-x-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-blue-500"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-blue-500"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-blue-500"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </div>
  )
}
