"use client"

import { useState } from "react"
import { Paperclip, Mic, Search, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function PromptInput({
  value,
  onChange,
  onSubmit,
  onMic,
  onAttach,
  placeholder = "Assign a task or ask anything",
  suggestions = [],
  disabled = false
}: {
  value: string,
  onChange: (v: string) => void,
  onSubmit: () => void,
  onMic?: () => void,
  onAttach?: () => void,
  placeholder?: string,
  suggestions?: { icon?: React.ReactNode, label: React.ReactNode, onClick?: () => void }[],
  disabled?: boolean
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        className="w-full bg-white dark:bg-[#363537] rounded-2xl shadow border border-gray-100 dark:border-[#363537] px-4 py-3 flex items-center relative"
        whileTap={{ scale: 0.995 }}
      >
        <Button variant="ghost" size="icon" className="mr-2 text-gray-400 dark:text-gray-200" tabIndex={-1} onClick={onAttach} type="button">
          <Paperclip className="w-5 h-5" />
        </Button>
        <Input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-0 shadow-none focus:ring-0 text-lg placeholder-gray-400 dark:placeholder-gray-400 text-gray-900 dark:text-white"
        />
        <Button variant="ghost" size="icon" className="ml-2 text-gray-400 dark:text-gray-200" tabIndex={-1} onClick={onMic} type="button">
          <Mic className="w-5 h-5" />
        </Button>
      </motion.div>
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full px-4 py-1 text-gray-600 dark:text-gray-100 border-gray-200 dark:border-[#363537] bg-white dark:bg-[#272728] hover:bg-gray-50 dark:hover:bg-[#232323]" 
                onClick={s.onClick} 
                type="button"
              >
                {s.icon && <span className="mr-1">{s.icon}</span>}{s.label}
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
