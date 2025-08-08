"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ExternalLink, Clock, Star, DollarSign, Play, BookOpen, MessageCircle, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LearningPanelProps {
  data: any
  onClose: () => void
  isOpen: boolean
}

export function LearningPanel({ data, onClose, isOpen }: LearningPanelProps) {
  if (!data || !isOpen) return null

  const handleResourceClick = (url: string, type: string) => {
    console.log(`Opening ${type}:`, url)
    // Actually open the URL in a new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full bg-white dark:bg-gray-900 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Learning Resources: {data.topic}
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="concepts" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="concepts">📘 Concepts</TabsTrigger>
            <TabsTrigger value="videos">📺 Videos</TabsTrigger>
            <TabsTrigger value="blogs">🧠 Blogs</TabsTrigger>
            <TabsTrigger value="courses">📚 Courses</TabsTrigger>
            <TabsTrigger value="community">🗨️ Community</TabsTrigger>
          </TabsList>

          <TabsContent value="concepts" className="space-y-4">
            <div className="space-y-3">
              {data.concepts?.map((concept: any, index: number) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {concept.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="space-y-3">
              {data.videos?.map((video: any, index: number) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResourceClick(video.url, 'video')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{video.channel}</span>
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
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            <div className="space-y-3">
              {data.blogs?.map((blog: any, index: number) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResourceClick(blog.url, 'blog')}
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
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span>{blog.platform}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="space-y-3">
              {data.courses?.map((course: any, index: number) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResourceClick(course.url, 'course')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                            {course.title}
                          </h3>
                          <Badge variant={course.price === 'Free' ? 'secondary' : 'outline'}>
                            {course.price === 'Free' ? 'Free' : course.price}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span>{course.platform}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                          <span>{course.students} students</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="space-y-3">
              {data.community?.map((post: any, index: number) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResourceClick(post.url, 'community')}
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
                          <span>{post.platform}</span>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments} comments</span>
                          </div>
                          <span>{post.score} upvotes</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
