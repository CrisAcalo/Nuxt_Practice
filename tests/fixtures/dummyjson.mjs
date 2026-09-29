import { createServer } from 'node:http'

const posts = Array.from({ length: 24 }, (_, index) => {
  const id = index + 1
  return {
    id,
    title: id === 1 ? 'A first story' : id === 2 ? 'Love in testing' : `Story number ${id}`,
    body: `This is the complete body of article ${id}. It contains enough text to show the article layout.`,
    tags: ['testing', id % 2 ? 'ideas' : 'nuxt'],
    reactions: { likes: id * 4, dislikes: 0 },
    views: id * 25,
    userId: id,
  }
})

function json(response, status, data) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  response.end(JSON.stringify(data))
}

createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1:3057')
  if (url.pathname === '/health') return json(response, 200, { ok: true })

  if (url.pathname === '/posts' || url.pathname === '/posts/search') {
    const q = (url.searchParams.get('q') || '').toLowerCase()
    if (q === 'trigger-502') return json(response, 503, { message: 'Provider unavailable' })
    const source = q ? posts.filter(post => `${post.title} ${post.body}`.toLowerCase().includes(q)) : posts
    const skip = Number(url.searchParams.get('skip') || 0)
    const limit = Number(url.searchParams.get('limit') || 30)
    return json(response, 200, { posts: source.slice(skip, skip + limit), total: source.length, skip, limit })
  }

  const commentsMatch = url.pathname.match(/^\/posts\/(\d+)\/comments$/)
  if (commentsMatch) {
    const id = Number(commentsMatch[1])
    if (!posts.some(post => post.id === id)) return json(response, 404, { message: 'Not found' })
    const comments = id === 1 ? [{ id: 1, body: 'A thoughtful comment.', postId: id, likes: 2, user: { id: 7, username: 'reader', fullName: 'Test Reader' } }] : []
    return json(response, 200, { comments, total: comments.length, skip: 0, limit: 30 })
  }

  const postMatch = url.pathname.match(/^\/posts\/(\d+)$/)
  if (postMatch) {
    const post = posts.find(item => item.id === Number(postMatch[1]))
    return post ? json(response, 200, post) : json(response, 404, { message: 'Not found' })
  }

  return json(response, 404, { message: 'Not found' })
}).listen(3057, '127.0.0.1')
