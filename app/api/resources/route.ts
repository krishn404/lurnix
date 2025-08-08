import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    const topic = extractTopic(query)
    
    const resources = {
      topic,
      concepts: generateConcepts(topic),
      videos: await searchVideos(topic),
      blogs: await searchBlogs(topic),
      courses: await searchCourses(topic),
      community: await searchCommunity(topic)
    }

    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error generating resources:', error)
    return NextResponse.json(
      { error: 'Failed to generate resources' },
      { status: 500 }
    )
  }
}

function extractTopic(query: string): string {
  const topics = ['git', 'github', 'python', 'javascript', 'react', 'machine learning', 'ai', 'web development']
  const lowerQuery = query.toLowerCase()
  
  for (const topic of topics) {
    if (lowerQuery.includes(topic)) {
      return topic
    }
  }
  
  const words = query.toLowerCase().split(' ')
  const importantWords = words.filter(word => 
    word.length > 3 && 
    !['want', 'learn', 'from', 'scratch', 'help', 'with'].includes(word)
  )
  
  return importantWords[0] || 'programming'
}

async function searchVideos(topic: string) {
  return [
    {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Tutorial for Beginners - Full Course`,
      channel: "freeCodeCamp.org",
      duration: "4:32:15",
      views: "2.1M views",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`
    },
    {
      title: `Learn ${topic.charAt(0).toUpperCase() + topic.slice(1)} in 1 Hour`,
      channel: "Programming with Mosh",
      duration: "1:08:43",
      views: "856K views",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' crash course')}`
    },
    {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Explained in 100 Seconds`,
      channel: "Fireship",
      duration: "2:34",
      views: "1.2M views",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' explained')}`
    }
  ]
}

async function searchBlogs(topic: string) {
  return [
    {
      title: `Complete Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
      author: "Dev Community",
      platform: "Dev.to",
      readTime: "12 min read",
      excerpt: `Comprehensive guide covering everything you need to know about ${topic}`,
      url: `https://dev.to/search?q=${encodeURIComponent(topic)}`
    },
    {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Best Practices`,
      author: "Medium Writers",
      platform: "Medium",
      readTime: "8 min read",
      excerpt: `Industry best practices and tips for mastering ${topic}`,
      url: `https://medium.com/search?q=${encodeURIComponent(topic)}`
    }
  ]
}

async function searchCourses(topic: string) {
  return [
    {
      title: `Complete ${topic.charAt(0).toUpperCase() + topic.slice(1)} Course`,
      platform: "Udemy",
      price: "Free",
      rating: "4.6",
      students: "45k",
      description: `Master ${topic} from beginner to advanced level`,
      url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}&price=price-free`
    },
    {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Specialization`,
      platform: "Coursera",
      price: "Free to audit",
      rating: "4.8",
      students: "120k",
      description: `University-level course on ${topic} fundamentals`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`
    }
  ]
}

async function searchCommunity(topic: string) {
  return [
    {
      title: `Best resources to learn ${topic}?`,
      platform: "Reddit",
      content: `Community discussion about the most effective ways to learn ${topic}`,
      comments: "127",
      score: "456",
      url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic + ' learning resources')}`
    },
    {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} learning roadmap`,
      platform: "Reddit",
      content: `Step-by-step guide shared by the community for mastering ${topic}`,
      comments: "89",
      score: "234",
      url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic + ' roadmap')}`
    }
  ]
}

function generateConcepts(topic: string) {
  const conceptMap: { [key: string]: any[] } = {
    git: [
      { title: "Version Control", description: "System for tracking changes in files over time" },
      { title: "Repository", description: "A directory containing your project files and Git history" },
      { title: "Commit", description: "A snapshot of your project at a specific point in time" },
      { title: "Branch", description: "A parallel version of your repository for feature development" }
    ],
    github: [
      { title: "Remote Repository", description: "A Git repository hosted on GitHub's servers" },
      { title: "Pull Request", description: "A request to merge changes from one branch to another" },
      { title: "Fork", description: "A copy of someone else's repository in your GitHub account" },
      { title: "Clone", description: "Creating a local copy of a remote repository" }
    ],
    python: [
      { title: "Variables", description: "Containers for storing data values" },
      { title: "Functions", description: "Reusable blocks of code that perform specific tasks" },
      { title: "Data Types", description: "Different kinds of data like strings, integers, and lists" },
      { title: "Loops", description: "Structures that repeat code execution" }
    ]
  }
  
  return conceptMap[topic] || [
    { title: "Fundamentals", description: `Basic concepts and principles of ${topic}` },
    { title: "Best Practices", description: `Industry standards and recommended approaches for ${topic}` },
    { title: "Common Patterns", description: `Frequently used patterns and techniques in ${topic}` },
    { title: "Advanced Topics", description: `Complex concepts and advanced features of ${topic}` }
  ]
}
