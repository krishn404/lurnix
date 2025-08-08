"use client"

import { HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function HelpButton() {
  const handleHelpClick = () => {
    console.log("Help button clicked")
  }

  return (
    <Button
      onClick={handleHelpClick}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 shadow-lg z-50"
      size="icon"
    >
      <HelpCircle className="w-5 h-5" />
    </Button>
  )
}
