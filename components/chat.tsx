"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Paperclip, Image, FileText, Globe, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateChatResponse, generateLearningResources } from "@/lib/api"
import { PromptInput } from "@/components/prompt-input"
import { MessageBubble } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { AgentLoading } from "@/components/agent-loading"

interface ChatProps {
  onOpenSidebar: (content: any) => void
  sidebarOpen: boolean
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  hasAgentButton?: boolean
  query?: string
  isTyping?: boolean
}

function getRandomUsername() {
  // Pool of short, fun, fictional names (3-6 chars)
  const names = [
    "Neo", "Zed", "Lux", "Vex", "Ace", "Sky", "Rex", "Max", "Fox", "Ash", "Jet", "Ray", "Mox", "Hex", "Pip", "Blu", "Ryn", "Sol", "Kai", "Zen", "Myn", "Dex", "Jax", "Taz", "Vyn", "Lyn", "Ryu", "Nox", "Fyn", "Kix"
  ];
  let name = names[Math.floor(Math.random() * names.length)];
  // Optionally add a digit to reach up to 6 chars
  if (name.length < 6 && Math.random() > 0.5) {
    name += Math.floor(Math.random() * 10);
  }
  // Ensure length is between 3 and 6
  if (name.length < 3) {
    name = name.padEnd(3, 'x');
  }
  if (name.length > 6) {
    name = name.slice(0, 6);
  }
  return name;
}

export function Chat({ onOpenSidebar, sidebarOpen }: ChatProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isAgentLoading, setIsAgentLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior
      })
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  // Simulate typing effect for AI responses
  const simulateTyping = async (content: string, hasAgentButton: boolean, query: string | null) => {
    setIsTyping(true)
    
    // Add a temporary typing indicator message
    const typingId = Date.now().toString() + "-typing"
    setMessages(prev => [...prev, {
      id: typingId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    }])
    
    // Wait a moment to show typing indicator
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Remove typing indicator and add the real message
    setMessages(prev => prev.filter(m => m.id !== typingId).concat({
      id: Date.now().toString(),
      type: 'assistant',
      content,
      timestamp: new Date(),
      hasAgentButton,
      query: query || undefined
    }))
    
    setIsTyping(false)
  }

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setIsLoading(true)
    setChatStarted(true)

    try {
      // Generate chat response
      const chatResult = await generateChatResponse(currentInput)
      
      // Simulate typing effect
      await simulateTyping(
        chatResult.response, 
        chatResult.hasAgentButton,
        chatResult.query
      )
    } catch (error) {
      console.error('Error generating content:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble right now. Please try again in a moment.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleStartAgent = async (query: string) => {
    setIsAgentLoading(true)
    
    // Add agent loading message
    const agentLoadingId = Date.now().toString() + "-agent-loading"
    setMessages(prev => [...prev, {
      id: agentLoadingId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: false
    }])

    try {
      // Simulate agent processing time
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      // Generate learning resources
      const learningData = await generateLearningResources(query)
      
      // Remove loading message and open sidebar
      setMessages(prev => prev.filter(m => m.id !== agentLoadingId))
      onOpenSidebar(learningData)
    } catch (error) {
      console.error('Error starting agent:', error)
      setMessages(prev => prev.filter(m => m.id !== agentLoadingId).concat({
        id: Date.now().toString(),
        type: 'assistant',
        content: "Sorry, I encountered an error while starting the agent. Please try again.",
        timestamp: new Date()
      }))
    } finally {
      setIsAgentLoading(false)
    }
  }

  const [userName] = useState(() => getRandomUsername());

  if (!chatStarted) {
    const suggestions: { icon?: React.ReactNode, label: React.ReactNode, onClick?: () => void }[] = [
      { 
        label: "Learn Figma landing page in 1 day",
        onClick: () => setInput("Provide me resources to learn figma landing page in 1 day")
      },
      { 
        label: "Master React in 2 weeks",
        onClick: () => setInput("Help me learn React from scratch in 2 weeks")
      },
      { 
        label: "Python for beginners",
        onClick: () => setInput("Best resources to learn Python programming for beginners")
      },
      { 
        label: "UI/UX design fundamentals",
        onClick: () => setInput("Teach me UI/UX design fundamentals and best practices")
      }
    ]

    return (
      <div className="flex-1 flex flex-col h-full min-h-screen bg-gradient-to-br from-[#fafaf8] via-white to-gray-50 dark:from-[#272728] dark:via-[#1a1a1b] dark:to-[#0f0f10]">
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full mx-auto text-center max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl font-serif font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4"
            >
              Hello {userName}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl font-serif text-gray-500 dark:text-gray-400 mb-12"
            >
              What would you like to learn today?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <PromptInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                onMic={() => {}}
                onAttach={() => {}}
                suggestions={suggestions}
                disabled={isLoading}
                placeholder="Ask for learning resources, tutorials, or guides..."
              />
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#1a1a1b] dark:via-[#272728] dark:to-[#0f0f10]">
      {/* Scrollable Content Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto pb-32 scrollbar-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  duration: 0.5 
                }}
                className="mb-8"
              >
                {message.isTyping ? (
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                ) : message.content === '' && message.type === 'assistant' ? (
                  <div className="flex justify-start">
                    <AgentLoading />
                  </div>
                ) : (
                  <MessageBubble 
                    message={message} 
                    onStartAgent={handleStartAgent}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a1a1b]/80 border-t border-gray-200 dark:border-gray-800 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for learning resources, tutorials, or guides..."
              className="w-full min-h-[60px] max-h-[120px] p-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#272728] resize-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-0 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-lg"
            />
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
