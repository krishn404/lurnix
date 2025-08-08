"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ExternalLink, Play, BookOpen, MessageCircle, Star, Clock, Users, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResourceSidebarProps {
  content: any
  onClose: () => void
}

export function ResourceSidebar({ content, onClose }: ResourceSidebarProps) {
  if (!content) return null

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const resourceCounts = {
    concepts: content.concepts?.length || 0,
    videos: content.videos?.length || 0,
    blogs: content.blogs?.length || 0,
    courses: content.courses?.length || 0,
    community: content.community?.length || 0
  }

  const availableTabs = [
    { key: 'concepts', label: '📘 Concepts', count: resourceCounts.concepts, items: content.concepts },
    { key: 'videos', label: '🎥 Videos', count: resourceCounts.videos, items: content.videos },
    { key: 'blogs', label: '🧠 Blogs', count: resourceCounts.blogs, items: content.blogs },
    { key: 'courses', label: '📚 Courses', count: resourceCounts.courses, items: content.courses },
    { key: 'community', label: '🌐 Community', count: resourceCounts.community, items: content.community }
  ].filter(tab => tab.count > 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full bg-white dark:bg-[#272728] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#363537]">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Learning Resources
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {content.topic} • {Object.values(resourceCounts).reduce((sum, count) => sum + count, 0)} resources
          </p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#363537]"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue={availableTabs[0]?.key} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 m-4 mb-0 dark:bg-[#272728] dark:border-[#363537]">
            {availableTabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className="text-xs">
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4">
            {availableTabs.map((tab) => (
              <TabsContent key={tab.key} value={tab.key} className="mt-0 space-y-4">
                {tab.key === 'concepts' && <ConceptsList items={tab.items} />}
                {tab.key === 'videos' && <VideosList items={tab.items} onExternalLink={handleExternalLink} />}
                {tab.key === 'blogs' && <BlogsList items={tab.items} onExternalLink={handleExternalLink} />}
                {tab.key === 'courses' && <CoursesList items={tab.items} onExternalLink={handleExternalLink} />}
                {tab.key === 'community' && <CommunityList items={tab.items} onExternalLink={handleExternalLink} />}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

// Component implementations remain the same as before...
function ConceptsList({ items }: { items: any[] }) {
  return (
    <div className="space-y-4">
      {items.map((concept, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow dark:bg-[#363537] dark:border-[#363537]">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-[#272728] rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {concept.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {concept.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function VideosList({ items, onExternalLink }: { items: any[], onExternalLink: (url: string) => void }) {
  return (
    <div className="space-y-4">
      {items.map((video, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow cursor-pointer dark:bg-[#363537] dark:border-[#363537]"
          onClick={() => onExternalLink(video.url)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-12 bg-red-100 dark:bg-[#272728] rounded flex items-center justify-center flex-shrink-0">
                <Play className="w-6 h-6 text-red-600 dark:text-red-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <span className="font-medium">{video.channel}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function BlogsList({ items, onExternalLink }: { items: any[], onExternalLink: (url: string) => void }) {
  return (
    <div className="space-y-4">
      {items.map((blog, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow cursor-pointer dark:bg-[#363537] dark:border-[#363537]"
          onClick={() => onExternalLink(blog.url)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="font-medium">{blog.author}</span>
                  <span>•</span>
                  <span>{blog.platform}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CoursesList({ items, onExternalLink }: { items: any[], onExternalLink: (url: string) => void }) {
  return (
    <div className="space-y-4">
      {items.map((course, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow cursor-pointer dark:bg-[#363537] dark:border-[#363537]"
          onClick={() => onExternalLink(course.url)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                    {course.title}
                  </h3>
                  <Badge variant={course.price === 'Free' ? 'secondary' : 'outline'} className="ml-auto">
                    {course.price === 'Free' ? 'Free' : course.price}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="font-medium">{course.platform}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <span>{course.students} students</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CommunityList({ items, onExternalLink }: { items: any[], onExternalLink: (url: string) => void }) {
  return (
    <div className="space-y-4">
      {items.map((post, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow cursor-pointer dark:bg-[#363537] dark:border-[#363537]"
          onClick={() => onExternalLink(post.url)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="font-medium">{post.platform}</span>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments} comments</span>
                  </div>
                  <span>{post.score} upvotes</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
