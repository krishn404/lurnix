"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ResponseStream } from "@/components/response-stream"
import { Source, SourceTrigger, SourceContent } from "@/components/source"
import { StartAgentButton } from "@/components/start-agent-button"

interface MessageBubbleProps {
  message: {
    id: string
    type: 'user' | 'assistant'
    content: string
    timestamp: Date
    hasAgentButton?: boolean
    query?: string
  }
  onStartAgent?: (query: string) => void
}

export function MessageBubble({ message, onStartAgent }: MessageBubbleProps) {
  const [showAgentButton, setShowAgentButton] = useState(false)
  const [isStartingAgent, setIsStartingAgent] = useState(false)

  const handleStreamComplete = () => {
    if (message.hasAgentButton) {
      setTimeout(() => setShowAgentButton(true), 500)
    }
  }

  const handleStartAgent = async () => {
    if (!onStartAgent || !message.query) return
    
    setIsStartingAgent(true)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate loading
    onStartAgent(message.query)
    setIsStartingAgent(false)
  }

  // Process content to add embedded links
  const processContentWithLinks = (content: string) => {
    // Replace common domain patterns with embedded links
    const linkPatterns = [
      { pattern: /youtube\.com/g, text: 'youtube.com' },
      { pattern: /udemy\.com/g, text: 'udemy.com' },
      { pattern: /coursera\.org/g, text: 'coursera.org' },
      { pattern: /figma\.com/g, text: 'figma.com' },
      { pattern: /medium\.com/g, text: 'medium.com' },
      { pattern: /dev\.to/g, text: 'dev.to' },
      { pattern: /github\.com/g, text: 'github.com' },
      { pattern: /stackoverflow\.com/g, text: 'stackoverflow.com' },
      { pattern: /freecodecamp\.org/g, text: 'freecodecamp.org' },
      { pattern: /w3schools\.com/g, text: 'w3schools.com' },
    ]

    let processedContent = content

    linkPatterns.forEach(({ pattern, text }) => {
      processedContent = processedContent.replace(pattern, `<embedded-link data-text="${text}" data-url="https://${text}"></embedded-link>`)
    })

    return processedContent
  }

  const renderContentWithEmbeddedLinks = (htmlContent: string) => {
    const parts = htmlContent.split(/(<embedded-link[^>]*><\/embedded-link>)/g)
    
    return parts.map((part, index) => {
      if (part.includes('<embedded-link')) {
        const textMatch = part.match(/data-text="([^"]*)"/)
        const urlMatch = part.match(/data-url="([^"]*)"/)
        
        if (textMatch && urlMatch) {
          const domain = textMatch[1]
          const url = urlMatch[1]
          return (
            <Source key={index} href={url}>
              <SourceTrigger showFavicon />
              <SourceContent title={domain} description="" />
            </Source>
          )
        }
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
    })
  }

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`max-w-[85%] ${
          message.type === 'user' 
            ? 'bg-gradient-to-r from-[#363537] to-[#2a2a2b] text-white rounded-2xl rounded-tr-sm px-5 py-4 shadow-lg' 
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {message.type === 'user' ? (
          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
        ) : (
          <div className="space-y-4">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {message.content.includes('youtube.com') || message.content.includes('udemy.com') || message.content.includes('figma.com') ? (
                <div className="text-base leading-relaxed">
                  {renderContentWithEmbeddedLinks(processContentWithLinks(message.content))}
                </div>
              ) : (
                <div className="w-full min-w-full">
                  <ResponseStream
                    textStream={message.content}
                    mode="fade"
                    className="text-base leading-relaxed"
                    fadeDuration={1200}
                    onComplete={handleStreamComplete}
                  />
                </div>
              )}
            </div>
            
            {/* Start Agent Button */}
            {message.hasAgentButton && showAgentButton && (
              <StartAgentButton 
                onStartAgent={handleStartAgent}
                isLoading={isStartingAgent}
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
