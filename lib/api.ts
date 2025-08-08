export async function generateChatResponse(message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  
  if (!response.ok) {
    throw new Error('Failed to generate chat response')
  }
  
  return response.json()
}

export async function generateLearningResources(query: string) {
  const response = await fetch('/api/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
  
  if (!response.ok) {
    throw new Error('Failed to generate learning resources')
  }
  
  return response.json()
}
