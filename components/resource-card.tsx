"use client"

import { motion } from "framer-motion"
import { BookOpen, Play, MessageCircle, GraduationCap, Users, ChevronRight, Sparkles } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ResourceCardProps {
  data: any
  onOpenResources: (data: any) => void
}

export function ResourceCard({ data, onOpenResources }: ResourceCardProps) {
  const resourceCounts = {
    concepts: data.concepts?.length || 0,
    videos: data.videos?.length || 0,
    blogs: data.blogs?.length || 0,
    courses: data.courses?.length || 0,
    community: data.community?.length || 0
  }

  const totalResources = Object.values(resourceCounts).reduce((sum, count) => sum + count, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <Card 
        className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-[#272728] dark:to-[#363537] border-2 border-blue-200 dark:border-[#363537] group"
        onClick={() => onOpenResources(data)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Learning Resources
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {data.topic} • {totalResources} resources curated for you
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
            {resourceCounts.concepts > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-white dark:bg-[#272728] rounded-lg border border-gray-200 dark:border-[#363537]">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{resourceCounts.concepts}</p>
                  <p className="text-xs text-gray-500">Concepts</p>
                </div>
              </div>
            )}
            
            {resourceCounts.videos > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-white dark:bg-[#272728] rounded-lg border border-gray-200 dark:border-[#363537]">
                <Play className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{resourceCounts.videos}</p>
                  <p className="text-xs text-gray-500">Videos</p>
                </div>
              </div>
            )}
            
            {resourceCounts.blogs > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-white dark:bg-[#272728] rounded-lg border border-gray-200 dark:border-[#363537]">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{resourceCounts.blogs}</p>
                  <p className="text-xs text-gray-500">Blogs</p>
                </div>
              </div>
            )}
            
            {resourceCounts.courses > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-white dark:bg-[#272728] rounded-lg border border-gray-200 dark:border-[#363537]">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{resourceCounts.courses}</p>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
              </div>
            )}
            
            {resourceCounts.community > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-white dark:bg-[#272728] rounded-lg border border-gray-200 dark:border-[#363537]">
                <Users className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{resourceCounts.community}</p>
                  <p className="text-xs text-gray-500">Community</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-[#363537] text-blue-700 dark:text-blue-200">
                Curated
              </Badge>
              <Badge variant="outline" className="text-xs">
                Free & Paid
              </Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click to explore →
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
