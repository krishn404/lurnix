"use client"

import { motion } from "framer-motion"
import { Plus, Share, Star, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const tasks = [
  {
    id: 1,
    title: "Learn JavaScript in 7 Days wit...",
    description: "Here is your 7-day JavaScript learni...",
    date: "Tue",
    icon: "📚",
    priority: 1
  },
  {
    id: 2,
    title: "Fixing Readme Generation Issu...",
    description: "I cannot directly \"regenerate\" or mo...",
    date: "7/9",
    icon: "🔧"
  },
  {
    id: 3,
    title: "Hello",
    description: "Hello! How can I help you today?",
    date: "7/9",
    icon: "👋"
  },
  {
    id: 4,
    title: "Suggest Project Ideas for Goo...",
    description: "I can certainly help you with that! I...",
    date: "7/9",
    icon: "💡"
  },
  {
    id: 5,
    title: "Pitch Deck Creation for Paycry...",
    description: "Your pitch deck for PayCrypt.tech is...",
    date: "7/9",
    icon: "📊"
  },
  {
    id: 6,
    title: "Write an Email",
    description: "I'm ready to help you draft the emai...",
    date: "7/8",
    icon: "✉️"
  }
]

const tabs = [
  { id: "all", label: "All", active: true },
  { id: "favorites", label: "Favorites", active: false },
  { id: "scheduled", label: "Scheduled", active: false }
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const handleNewTask = () => {
    console.log("New task created")
  }

  const handleTaskClick = (taskId: number) => {
    console.log("Task clicked:", taskId)
  }

  const handleTabClick = (tabId: string) => {
    console.log("Tab clicked:", tabId)
  }

  const handleShare = () => {
    console.log("Share clicked")
  }

  return (
    <motion.aside
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 320 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
    >
      <div className="w-80 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleNewTask}
            className="w-full justify-start bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            variant="ghost"
          >
            <Plus className="w-4 h-4 mr-2" />
            New task
            <div className="ml-auto flex items-center space-x-1 text-xs text-gray-500">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </Button>
        </div>

        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                variant="ghost"
                size="sm"
                className={`px-3 py-1 text-sm ${
                  tab.active
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm">
                {task.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {task.date}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {task.description}
                </p>
                {task.priority && (
                  <Badge variant="destructive" className="mt-2 text-xs">
                    {task.priority}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleShare}
            variant="ghost"
            className="w-full justify-between text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center">
              <Share className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="text-sm font-medium">Share Lurnix with a friend</div>
                <div className="text-xs text-gray-500">Get 500 credits each</div>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </Button>
        </div>
      </div>
    </motion.aside>
  )
}
