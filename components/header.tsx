"use client"

import { Search, Bell, User, Menu, X, Moon, Sun, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

interface HeaderProps {
  onSidebarToggle: () => void
  sidebarOpen: boolean
}

export function Header({ onSidebarToggle, sidebarOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  const handleSearch = () => {
    console.log("Search clicked")
  }

  const handleNotifications = () => {
    console.log("Notifications clicked")
  }

  const handleApp = () => {
    console.log("App clicked")
  }

  const handleUpgrade = () => {
    console.log("Upgrade clicked")
  }

  const handleProfile = () => {
    console.log("Profile clicked")
  }



  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-[#272728] border-b border-gray-200 dark:border-[#272728]">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onSidebarToggle}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
        
        <Button
          onClick={handleSearch}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-200" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Lurnix</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={handleNotifications}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-200" />
        </Button>
        
        <Button
          onClick={handleApp}
          variant="ghost"
          className="text-gray-700 dark:text-gray-100"
        >
          App
        </Button>
        
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-200">
          <span>🔥 1,300</span>
          <Button
            onClick={handleUpgrade}
            variant="ghost"
            className="text-blue-600 dark:text-blue-300 text-sm"
          >
            Upgrade
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#232323] rounded-full"
            >
              <div className="w-8 h-8 bg-gray-300 dark:bg-[#232323] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-200" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-[#232323] dark:text-white">
           
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
