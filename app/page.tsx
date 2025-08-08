"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Chat } from "@/components/chat"
import { ResourceSidebar } from "@/components/resource-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [resourceSidebarOpen, setResourceSidebarOpen] = useState(false)
  const [resourceContent, setResourceContent] = useState(null)

  const handleOpenResourceSidebar = (content: any) => {
    if (content === null) {
      setResourceSidebarOpen(false)
      setResourceContent(null)
    } else {
      setResourceContent(content)
      setResourceSidebarOpen(true)
    }
  }

  const handleCloseResourceSidebar = () => {
    setResourceSidebarOpen(false)
    setResourceContent(null)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <motion.div 
        className="flex-1 flex flex-col min-w-0"
        animate={{ 
          marginLeft: sidebarOpen ? "0px" : "0px" 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        
        <div className="flex-1 flex overflow-hidden">
          <motion.div
            className={`flex-1 ${resourceSidebarOpen ? 'max-w-[60%]' : 'w-full'}`}
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Chat 
              onOpenSidebar={handleOpenResourceSidebar}
              sidebarOpen={sidebarOpen}
            />
          </motion.div>
          
          {resourceSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "40%",
                opacity: 1
              }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="border-l border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <ResourceSidebar 
                content={resourceContent}
                onClose={handleCloseResourceSidebar}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
