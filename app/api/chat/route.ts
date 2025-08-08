import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are a helpful AI assistant. Analyze the user's message and respond appropriately.

User message: "${message}"

Instructions:
- If the user is asking for learning resources, tutorials, or guides about a specific topic, provide a comprehensive response with structured content
- Include specific mentions of popular learning platforms like youtube.com, udemy.com, coursera.org, figma.com, medium.com, dev.to, freecodecamp.org, etc.
- Format your response with clear sections using HTML headings and lists
- For learning requests, organize content into sections like:
  * Quick Start Guides and Crash Courses
  * Video Tutorials  
  * Step-by-Step Guides
  * Key Concepts to Focus On
  * Practice Resources
- Mention specific course names, tutorial series, and learning paths
- Include time estimates and difficulty levels where relevant
- For casual conversation, respond normally without educational structure

Format as HTML with:
- <h3> for section headings  
- <ul> and <li> for bullet points
- <strong> for emphasis
- <p> for paragraphs

Example for learning requests:
<h3>Quick Start Guides and Crash Courses:</h3>
<ul>
<li><strong>Figma Crash Course:</strong> This comprehensive tutorial on youtube.com covers all essential Figma features for landing page design in under 2 hours.</li>
<li><strong>Landing Page Design Bootcamp:</strong> Available on udemy.com, this course focuses specifically on creating high-converting landing pages.</li>
</ul>`,
    })

    // Determine if this is a learning request that should show agent button
    const isLearningRequest = detectLearningIntent(message)

    return NextResponse.json({ 
      response: text,
      hasAgentButton: isLearningRequest,
      query: isLearningRequest ? message : null
    })
  } catch (error) {
    console.error('Error generating chat response:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

function detectLearningIntent(message: string): boolean {
  const learningKeywords = [
    'learn', 'teach', 'how to', 'tutorial', 'guide', 'explain',
    'understand', 'study', 'course', 'lesson', 'training',
    'master', 'beginner', 'advanced', 'basics', 'fundamentals',
    'help me with', 'show me', 'walk me through', 'resources',
    'materials', 'content', 'practice', 'examples'
  ]
  
  const casualKeywords = [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
    'how are you', 'what\'s up', 'thanks', 'thank you', 'bye', 'goodbye'
  ]
  
  const lowerMessage = message.toLowerCase()
  
  // Check for casual greetings first
  if (casualKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return false
  }
  
  // Check for learning intent
  return learningKeywords.some(keyword => lowerMessage.includes(keyword))
}
